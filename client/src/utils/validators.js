// This file contains all input validators
// Each of them checks if the input is valid or not
// If it is not valid, it returns an error message
// If it is valid, it returns true

const validateEmail = (email) => {
  if (email === "" || email === null) {
    return "Email is required";
  }
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return true;
  }
  return "Invalid email";
};

const validatePassword = (password) => {
  if (password === "" || password === null) {
    return "Password is required";
  }
  if (password.length >= 8) {
    return true;
  }
  return "Password must be at least 8 characters";
};

const validateNoteTitle = (title) => {
  if (title === "" || title === null) {
    return "Title is required";
  }
  return true;
};

const validateCode = (code) => {
  if (code === "" || code === null) {
    return "Code is required";
  }
  if (code.length >= 6) {
    return true;
  }
  return "Code must be at least 6 characters";
};

const validateFirstName = (firstName) => {
  if (firstName === "" || firstName === null) {
    return "First name is required";
  }
  return true;
};

const validateLastName = (lastName) => {
  if (lastName === "" || lastName === null) {
    return "Last name is required";
  }
  return true;
};

const validateStudentId = (studentId) => {
  if (studentId === "" || studentId === null) {
    return "Student ID is required";
  }
  if (studentId.length >= 8) {
    return true;
  }
  return "Student ID must be at least 8 digits";
};

const validateDateOfBirth = (date) => {
  if (date === "" || date === null) {
    return "Date is required";
  }
  return true;
};

const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber === "" || phoneNumber === null) {
    return "Phone number is required";
  }
  if (phoneNumber.length >= 10) {
    return true;
  }
  return "Phone number must be at least 10 digits";
};

const validateGender = (gender) => {
  if (gender === "" || gender === null) {
    return "Gender selection is required";
  }

  if (gender !== "Male" && gender !== "Female" && gender !== "Unknown") {
    return "Invalid gender is selected";
  }

  return true;
};

const validateCategory = (categories) => {
  if (categories === null || categories.length == 0) {
    return "Atleast one category is required";
  }

  return true;
};

const validateTitle = (title) => {
  if (title === "" || title === null) {
    return "Title is required";
  }
  return true;
};

const validateStaffId = (studentId) => {
  if (studentId === "" || studentId === null) {
    return "Staff ID is required";
  }

  return true;
};

const validateCategoryName = (category) => {
  if (category === "" || category === null) {
    return "Category Name is required";
  }

  return true;
};

const validateCampusName = (category) => {
  if (category === "" || category === null) {
    return "Campus Name is required";
  }

  return true;
};

const validateProgramName = (category) => {
  if (category === "" || category === null) {
    return "Program Name is required";
  }

  return true;
};


export {
  validateEmail,
  validatePassword,
  validateNoteTitle,
  validateCode,
  validateFirstName,
  validateLastName,
  validateStudentId,
  validateDateOfBirth,
  validatePhoneNumber,
  validateGender,
  validateCategory,
  validateTitle,
  validateStaffId,
  validateCategoryName,
  validateCampusName,
  validateProgramName
};
