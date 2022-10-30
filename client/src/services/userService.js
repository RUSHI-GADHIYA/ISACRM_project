import api from "../api/api";
import {
  SYSTEM_ERROR,
  GET_USERS_API,
  REGISTER_USER_ENDPOINT,
} from "../config/constants";

// Authentication Service

// original api call service
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(GET_USERS_API())
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

export const createUserApi = (student) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(REGISTER_USER_ENDPOINT(), student)
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

export const updateUser = (user, id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .put(GET_USERS_API() + id, user)
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
