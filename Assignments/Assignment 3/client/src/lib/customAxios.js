import axios from 'axios';
import jwt_decode from 'jwt-decode';

const getNewAccessToken = async () => {
  try {
    const res = await axios.post(
      `http://localhost:4001/api/token/createNewAccess`
    );
    localStorage.setItem("access-token", res.accessToken);
    return res.accessToken;
  } catch (err) {
    console.log(err);
  }
};

const axiosJwt = axios.create();

axiosJwt.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(accessToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Getting new access token :)");
      await getNewAccessToken();
      config.headers["Authorization"] = localStorage.getItem("access-token");
      return config;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosJwt;
