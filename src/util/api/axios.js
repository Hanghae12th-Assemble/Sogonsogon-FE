import axios from "axios";
import QUERY from "../../constants/query";
import { setCookie, getCookie } from "../cookie";
import CryptoJS from "crypto-js";

export default class Axios {
  constructor(url) {
    this.axiosInstance = axios.create({
      baseURL: url,
    });

    this.axiosInstance.interceptors.response.use((response) => {
      const token = response.headers.authorization;

      if (token) {
        const [, parseToken] = token.split(" ");
        setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);

        if (response.data.data) {
          const userInfo = JSON.stringify({
            id: `${response.data.data.id}`,
            userName: `${response.data.data.membername}`,
            nickName: `${response.data.data.nickname}`,
          });

          const secretKey = process.env.REACT_APP_SCRET_KEY;

          const encryptedData = CryptoJS.AES.encrypt(
            userInfo,
            secretKey
          ).toString();

          localStorage.setItem("userInfo", encryptedData);
        }
      }
      return response;
    });
  }

  getAuthHeader() {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    return {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ""}`,
      },
    };
  }

  async get(path) {
    return this.axiosInstance.get(path, this.getAuthHeader());
  }

  async post(path, payload) {
    return this.axiosInstance.post(path, payload, this.getAuthHeader());
  }

  async delete(path) {
    return this.axiosInstance.delete(path, this.getAuthHeader());
  }

  async patch(path, payload, option) {
    return this.axiosInstance.patch(`${path}/${payload}`, option);
  }

  async put(path, payload) {
    return this.axiosInstance.put(path, payload, this.getAuthHeader());
  }
}
