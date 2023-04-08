import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/flights/";

export const getAllFlights = async (setState, setLoading) => {
    const { data } = await axios.get(baseURL);
    if (data) {
        setState(data);
        setLoading && setLoading(false);
    }
};
