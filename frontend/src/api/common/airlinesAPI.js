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

export const getAirlineFlights = async (id, setState) => {
    try {
        const { data } = await axios.get(`${baseURL}${id}/flights/`);

        data && setState(data);
    } catch (error) {
        return;
    }
};

export const getAirlineByParameters = async (setState, inputs) => {
    const {data} = await axios.post(`${baseURL}filter/`, inputs);
    if (data) {
        setState([data])
    } else {
        setState([])
    }
}