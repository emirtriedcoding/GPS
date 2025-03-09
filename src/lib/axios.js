import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.zobeir.ir",
  withCredentials: true,
});

export default Axios;
