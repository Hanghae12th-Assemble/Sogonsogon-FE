import Cookies from "js-cookie";

const isLogin = () => !!Cookies.get("access-token");

export default isLogin;
