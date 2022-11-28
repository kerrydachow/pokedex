import axios from 'axios';
import jwt_decode from 'jwt-decode';

const getNewAccessToken = async () => {
  try {
    const res = await axios.post(
      `http://localhost:4001/api/token/createNewAccess`, { token: localStorage.getItem("refresh-token") }
    );
    localStorage.setItem("access-token", res.data.accessToken);
    return res.accessToken;
  } catch (err) {
    console.log(err);
  }
};

const axiosJwt = axios.create();

axiosJwt.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(localStorage.getItem("access-token"));
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      await getNewAccessToken();
      config.headers["auth-access-token"] = localStorage.getItem("access-token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosJwt;
