import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/countries/";

export const getAllCountries = async () => {
    return await axios.get(baseURL).then((response) => response.data);
};

export const getCountryById = async (id) => {
    return await axios
        .get(`${baseURL}${id}/`)
        .then((response) => response.data);
};
