import api from "../api/api";
import { SYSTEM_ERROR, PROGRAMS_API } from "../config/constants";

export const getAllPrograms = () => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(PROGRAMS_API())
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


export const createProgram = (program) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(PROGRAMS_API(), program)
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