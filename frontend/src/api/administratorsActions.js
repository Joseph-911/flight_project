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
