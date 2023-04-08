import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/airlines/";

export const getAllAirlines = async (setState, setLoading) => {
    const { data } = await axios.get(baseURL);
    if (data) {
        setState(data);
        setLoading && setLoading(false);
    }
};

export const getAirlineById = async (id, setState, setError) => {
    try {
        const { data } = await axios.get(`${baseURL}${id}/`);
        data && setState(data);
    } catch (error) {
        setError(error.response.data.message);
    }
};
