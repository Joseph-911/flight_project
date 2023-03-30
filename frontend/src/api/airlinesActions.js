import axios from "axios";

const baseURL = "http://localhost:8000/api/airlines/";

export const getAllAirlines = async () => {
    return await axios.get(baseURL).then((response) => response.data);
};

export const getAirlineById = async (id) => {
    return await axios
        .get(`${baseURL}${id}/`)
        .then((response) => response.data);
};