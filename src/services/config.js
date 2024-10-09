import axios from "axios";

const blogfetch = axios.create({
    baseURL: "http://localhost:8080"
})

export default blogfetch;