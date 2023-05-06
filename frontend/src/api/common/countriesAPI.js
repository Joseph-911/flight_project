import axios from "axios";

// const baseURL = "http://127.0.0.1:8000/api/countries/";
const baseURL = "https://flight-project10.azurewebsites.net/api/countries/";

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

export const getCountryOriginFlights = async (id, setState) => {
    try {
        const { data } = await axios.get(`${baseURL}${id}/flights/origin/`);
        if (data) {
            setState(data);
        }
    } catch (error) {
        return;
    }
};

export const getCountryDestinationFlights = async (id, setState) => {
    try {
        const { data } = await axios.get(
            `${baseURL}${id}/flights/destination/`
        );
        if (data) {
            setState(data);
        }
    } catch (error) {
        return;
    }
};

export const getCountryDepartureFlights = async (id, setState) => {
    try {
        const { data } = await axios.get(
            `${baseURL}${id}/flights/origin/soon/`
        );
        if (data) {
            setState(data);
        }
    } catch (error) {
        return;
    }
};

export const getCountryArrivalFlights = async (id, setState) => {
    try {
        const { data } = await axios.get(
            `${baseURL}${id}/flights/destination/soon/`
        );
        if (data) {
            setState(data);
        }
    } catch (error) {
        return;
    }
};
