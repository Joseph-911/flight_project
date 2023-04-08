const baseURL = "profile/airline";

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
