import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/countries/";

export const getAllCountries = async (setState, setLoading) => {
    const { data } = await axios.get(baseURL);
    if (data) {
        setState(data);
        setLoading && setLoading(false);
    }
};

export const getCountryById = async (id, setState, setError) => {
    try {
        const { data } = await axios.get(`${baseURL}${id}/`);
        data && setState(data);
    } catch (error) {
        setError(error.response.data.message);
    }
};

export const getCountryAirlines = async (id, setState) => {
    try {
        const { data } = await axios.get(`${baseURL}${id}/airlines/`);
        if (data) {
            setState(data);
        }
    } catch (error) {
        return;
    }
};
