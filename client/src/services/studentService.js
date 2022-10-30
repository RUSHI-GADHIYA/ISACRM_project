import api from "../api/api";
import { SYSTEM_ERROR, GET_STUDENTS_API, SEARCH_STUDENT_API } from "../config/constants";

// Authentication Service

// original api call service
export const getAllStudentsApi = () => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(GET_STUDENTS_API())
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
// search student by text
export const searchStudentApi = (data) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(SEARCH_STUDENT_API(),data)
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

// original api call service
export const getStudent = (id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(GET_STUDENTS_API() + id)
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


export const createStudentApi = (student) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(GET_STUDENTS_API(), student)
        .then((res) => {
          // TODO : REMOVE THIS
          setTimeout(() => {
            resolve(res.data);
          }, 1000);
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

export const updateStudentApi = (student, id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .put(GET_STUDENTS_API() + id, student)
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
