import axios from "axios";

const api = axios.create({
    baseURL: "https://script.googleusercontent.com/macros/echo?user_content_key=hpZY9CeleOH0FYgRbQnuuj3FVtL3u7NMG5q-uRrFJs3BmNXdnoUFvSWNY3bfyc-A9NiGf-bKykUCDGAXXT3vFfX87tqH1XaSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnM-fd3mqh8N85zVtcJBo_tzt_Qfhb3ozLhZOMoOlub6m9GpbKdDV_9rfteonmrlKr65CTnfaEJFCwihBfMI2SSW9XQ7wvhRsndz9Jw9Md8uu&lib=MYbud8kx7CZpqtgD6WhGzljASOm8PvMds",
});

export default api;