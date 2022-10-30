import api from "../api/api";
import {
  SYSTEM_ERROR,
  SIGN_IN_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  RESET_PASSWORD_ENDPOTINT,
} from "../config/constants";

// Authentication Service

// original api call service
export const logInApi = (email, password) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(SIGN_IN_ENDPOINT(), { email, password })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (err.message) {
            reject(err.message);
          } else {
            reject(SYSTEM_ERROR);
          }
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};

export const forgotPasswordApi = (email) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(FORGOT_PASSWORD_ENDPOINT(), { email })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (err.message) {
            reject(err.message);
          } else {
            reject(SYSTEM_ERROR);
          }
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};

export const resetPasswordApi = (email, code, password) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(RESET_PASSWORD_ENDPOTINT(), { email, code, password })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (err.message) {
            reject(err.message);
          } else {
            reject(SYSTEM_ERROR);
          }
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};
