import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/flights/";

export const getAllFlights = async () => {
    return axios.get(baseURL).then((response) => response.data);
};
