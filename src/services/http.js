import axios from "axios";
import * as CryptoJS from "crypto-js";
import { getItem } from "../common/localStorage";
// import { STATUS_CODE } from "../common";
// import { message } from "antd";

export const API_URL = process.env.REACT_APP_API_URL_PRIMECARE_CLIENT_STAGE;

export function createPayloadKeys(encryptionKey) {
  let mdString = CryptoJS.MD5(encryptionKey).toString();
  let key = CryptoJS.enc.Utf8.parse(mdString.substring(0, 16));
  let iv = CryptoJS.enc.Utf8.parse(mdString.substring(16));
  return { key, iv };
}

// Function to encrypt payload
export const encryptPayload = (textToEncrypt, keyData) => {
  let encrypted = CryptoJS.AES.encrypt(textToEncrypt, keyData.key, {
    iv: keyData.iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

// Function to decrypt payload
export const decryptPayload = (encryptedText, keyData) => {
  let decrypted = CryptoJS.AES.decrypt(encryptedText, keyData.key, {
    iv: keyData.iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// HTTP client class
export default class Http {
  static post(url, body) {
    return new Promise((resolve, reject) => {
      // Generate encryption keys
      const { key, iv } = createPayloadKeys(
        process.env.REACT_APP_ENCRYPTION_KEY
      );

      // Encrypt the payload
      const encryptedBody = encryptPayload(JSON.stringify(body), { key, iv });

      // Make API request
      axios
        .post(
          API_URL + "/" + url,
          { body: encryptedBody },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : undefined,
              brandId: 2,
              lang: getItem("language"),
            },
          }
        )
        .then((response) => {
          // Decrypt the response
          const decryptedResponse = decryptPayload(response.data.body, {
            key,
            iv,
          });
          resolve(JSON.parse(decryptedResponse));
        })
        .catch((error) => {
          if (
            error?.response?.status === 401 ||
            error?.message === "Network Error"
          ) {
            window.location.replace("/")
            localStorage.clear();
          }  else {
            const decryptedResponse = decryptPayload(
              error?.response?.data?.body,
              { key, iv }
            );
            reject(JSON.parse(decryptedResponse).message);
          }
        });
    });
  }
}
