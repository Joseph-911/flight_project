import axios from "axios";

const baseURL = "http://localhost:8000/api/flights/";

export const getAllFlights = async () => {
    return await axios.get(baseURL).then((response) => response.data);
};

export const getFlightById = async (id) => {
    return await axios
        .get(`${baseURL}${id}/`)
        .then((response) => response.data);
};
