import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/profile/administrator/";

export const getAllUsers = async (path) => {
    return await axios
        .get(`${baseURL}${path}`)
        .then((response) => response.data);
};
