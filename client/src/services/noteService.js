import api from "../api/api";
import { SYSTEM_ERROR, NOTES_API, NOTES_API_ID, DOCS_API, DOWNLOAD_API } from "../config/constants";

export const createNoteApi = (formData, id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .post(NOTES_API(id), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
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

export const getAllNotesApi = (id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(NOTES_API(id))
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

export const DeleteNoteApi = (id, noteid) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .delete(NOTES_API_ID(id, noteid))
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

export const getAllDocsApi = (id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(DOCS_API(id))
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

export const downloadDoc = (filename, id) => {
  return new Promise((resolve, reject) => {
    try {
      // handle any pre login logic here
      api
        .get(DOWNLOAD_API(id), {
          responseType: "blob"
        })
        .then((res) => {
          resolve(true);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
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
