import axios from "axios";
import config from "./config";

const request = axios.create({
    baseURL: config.request.baseURL,
    headers: config.request.globalHeaders
});


export default request;