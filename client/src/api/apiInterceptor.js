import api from "../api/api";

const setUpInterceptors = (logout) => {
  // LocalStorage Helpers
  //function for getting access token from local storage
  const getLocalAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  };
  // function for getting refresh token from local storage
  const getLocalRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
  };
  // function for storing accesstoken
  const setLocalAccessToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
  };

  // function to make an api call with refresh token to get new access token
  const refreshToken = () => {
    return api.post("/auth/refreshtoken", {
      refreshToken: getLocalRefreshToken(),
    });
  };

  //setup to pass token in http header
  api.interceptors.request.use(
    async (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  // setup to get token in response, check validity of token
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired

        if (
          err.response.status === 401 &&
          !originalConfig.retry &&
          originalConfig.url !== "/auth/signin" &&
          originalConfig.url !== "/auth/forgotpassword" &&
          originalConfig.url !== "/auth/resetPassword"
        ) {
          originalConfig.retry = true;
          try {
            const rs = await refreshToken();
            const { accessToken } = rs.data;
            setLocalAccessToken(accessToken);

            return api(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }

        if (err.response.status === 403) {
          logout();
          return Promise.reject(err.response.data);
        }

        return Promise.reject(err.response.data);
      }
      return Promise.reject(err);
    }
  );
};

export default setUpInterceptors;
