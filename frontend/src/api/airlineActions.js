const baseURL = "profile/airline";

export const updateAirline = async (api, method, setState) => {
    if (method === "get") {
        try {
            const { data } = await api.get(`${baseURL}/edit/`);
            if (data) {
                setState(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const addFlight = async (api, target, setError, setIsValid, inputs) => {
    try {
        const { data } = await api.post(`${baseURL}/${target}/add/`, inputs);
        if (data) {
            setError(null);
            setIsValid(data.message);
        }
    } catch (error) {
        console.log(error);
        setError(error.response.data);
    }
};
