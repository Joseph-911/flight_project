const baseURL = "profile/administrator";

export const getUser = async (api, pk, setState, setError) => {
    try {
        const { data } = await api.get(`${baseURL}/user/${pk}`);
        if (data) {
            setState(data);
        }
    } catch (error) {
        setError(error);
    }
};

export const getCountry = async (api, pk, setState, setError) => {
    try {
        const { data } = await api.get(`${baseURL}/country/${pk}`);
        if (data) {
            setState(data);
        }
    } catch (error) {
        setError(error);
    }
};
