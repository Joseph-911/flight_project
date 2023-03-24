import axios from "axios";

const baseURL = "http://localhost:8000/api/countries/";

export const getAllCountries = async () => {
    return await axios.get(baseURL).then((response) => response.data);
};

export const getCountryById = async (id) => {
    return await axios
        .get(`${baseURL}${id}/`)
        .then((response) => response.data);
};
