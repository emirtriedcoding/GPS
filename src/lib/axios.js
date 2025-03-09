import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.saadatapp.ir",
  withCredentials: true,
});

export default Axios;
