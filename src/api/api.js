import axios from "axios";

const api = axios.create({
    baseURL: "https://script.google.com/macros/s/AKfycbzCb-8nGF6HHsHh3laACkLl_rk_5PYMh3h5z7TwRQfKtnDrCL6YR6Vdtt7-LXUyckCMJw/exec",
});

export default api;