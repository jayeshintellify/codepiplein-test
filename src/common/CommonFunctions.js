export const handleKeyPressSpace = (event) => {
  // Prevent typing a space at the beginning
  if (event.key === " " && event.target.selectionStart === 0) {
    event.preventDefault();
  }
};
// Handle Product Code validation
export const handleKeyPress = (event) => {
  const regex = /^[a-zA-Z0-9-_]*$/;
  if (!regex.test(event.key)) {
    event.preventDefault();
  }
};

// Handle Copy Paste functionality for blank space
export const handlePaste = (event) => {
  // Get the clipboard data
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedData = clipboardData.getData("Text");

  // Check if the pasted data contains only whitespace
  if (!pastedData.trim()) {
    event.preventDefault();
  }
};

export const handleInputChange = (e) => {
  const { value, maxLength } = e.target;
  if (value.length > maxLength) {
    e.target.value = value.slice(0, maxLength);
  }
};

// Handle up and down arrow
export const handleKeyDown = (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
};

// Not allowed minus value in that
export const notAllowedMinusValue = (event) => {
  // Prevent typing a space at the beginning
  if (event.key === "-" || event.key === "+") {
    event.preventDefault();
  }
};

// Handle length of mobile number
export const handleNumberFieldLength = (event) => {
  // if (event.target.value.length > 0) {
  //   event.target.value = event.target.value.slice(0, 6); // Limiting to 10 characters
  // }
  const input = event.target.value;
  
  // Filter non-numeric values
  const numericInput = input.replace(/\D/g, "");
  
  // Limit the input length to 4 characters
  event.target.value = numericInput.slice(0, 10);
};

export const handleSSNNumberFieldLength = (event) => {
  const input = event.target.value;
  
  // Filter non-numeric values
  const numericInput = input.replace(/\D/g, "");
  
  // Limit the input length to 4 characters
  event.target.value = numericInput.slice(0, 4);
};

// Get Initial if firstname then show first name and if add first name and last name then show that initials for update profile
export const getInitials = (fullName) => {
  if (!fullName) return "";
  
  const nameParts = fullName.trim().split(" ");
  
  if (nameParts.length > 1) {
    // More than one word, take first letter of each word
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  } else if (nameParts.length === 1) {
    // Single word, take the first letter
    return nameParts[0][0].toUpperCase();
  } else {
    return ""; // Handle case when fullName is empty
  }
};
