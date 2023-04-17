const baseURL = "profile/airline";

export const updateAirline = async (
    api,
    method,
    setState,
    setError,
    inputs
) => {
    if (method === "get") {
        const { data } = await api.get(`${baseURL}/edit/`);
        if (data) {
            setState(data);
        }
    }
    if (method === "put") {
        try {
            const { data } = await api.put(`${baseURL}/edit/`, inputs);
            if (data) {
                setState(data.message);
            }
        } catch (error) {
            setError(error.response.data);
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
        setError(error.response.data);
    }
};

export const updateFlight = async (
    api,
    method,
    target,
    setState,
    setError,
    inputs
) => {
    if (method === "get") {
        const { data } = await api.get(`${baseURL}/flights/edit/${target}/`);

        if (data) {
            setState(data);
        }
    }
    if (method === "put") {
        try {
            const { data } = await api.put(
                `${baseURL}/flights/edit/${target}/`,
                inputs
            );

            if (data) {
                setState(data.message);
            }
        } catch (error) {
            setError(error.response.data);
        }
    }
};

export const removeFlight = async (api, pk, setState, setError) => {
    try {
        const { data } = await api.delete(`${baseURL}/flights/delete/${pk}/`);
        if (data) {
            setState(data.message);
        }
    } catch (error) {
        setError(error.response.data.message);
    }
};
