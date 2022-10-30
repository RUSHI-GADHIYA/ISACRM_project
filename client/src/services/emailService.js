import api from "../api/api";
import {
    SYSTEM_ERROR,
    GET_INTAKE_API, EMAIL_CAMPAIGN
} from "../config/constants";

export const getAllIntakes = () => {
    return new Promise((resolve, reject) => {
        try {
            // handle any pre login logic here
            api
                .get(GET_INTAKE_API())
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

export const getStudentsWithFilters = (data) => {
    return new Promise((resolve, reject) => {
        try {
            // handle any pre login logic here
            api
                .post(EMAIL_CAMPAIGN(), data)
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

