// localStorageUtil.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'primecare_web_app'; // Replace with your own secret key

// Function to encrypt data
const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) {
        throw new Error('Decryption failed or data is malformed');
    }
    return JSON.parse(decryptedData);
};

// Function to set item in localStorage
export const setItem = (key, value) => {
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
};

// Function to get item from localStorage
export const getItem = (key) => {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
        try {
            return decryptData(encryptedValue);
        } catch (error) {
            console.error('Error decrypting data:', error);
            return null; // or handle the error as needed
        }
    }
    return null; // or return a default value
};

// Function to remove item from localStorage
export const removeItem = (key) => {
    localStorage.removeItem(key);
};