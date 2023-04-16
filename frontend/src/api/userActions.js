export const createCustomer = async (api, setState, setError, inputs) => {
    try {
        const { data } = await api.post("create-customer/", inputs);
        if (data) {
            setState(data.message);
        }
    } catch (error) {
        setError(error.response.data);
    }
};
