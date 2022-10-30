import api from "../api/api";
import { SYSTEM_ERROR, CATEGORY_API } from "../config/constants";

// original api call service
export const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(CATEGORY_API())
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

export const createCategory = (category) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(CATEGORY_API(), category)
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

export const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .delete(CATEGORY_API() + id)
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
