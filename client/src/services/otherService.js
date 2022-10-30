import api from "../api/api";
import { SYSTEM_ERROR, DATA_IMPORT_API } from "../config/constants";

export const uploadDataFile = (formData) => {
    return new Promise((resolve, reject) => {
        try {
            // handle any pre login logic here
            api
                .post(DATA_IMPORT_API(), formData, {
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