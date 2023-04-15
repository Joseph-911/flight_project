const baseURL = "profile/customer";

export const addTicket = async (
    api,
    id,
    method,
    setPermissionDenied,
    setNoFlight,
    setData,
    setError,
    setIsValid
) => {
    if (method === "get") {
        try {
            const { data } = await api.get(`${baseURL}/tickets/${id}/add/`);

            if (data) {
                setData(data);
            }
        } catch (error) {
            if (error.response.status === 403) {
                setPermissionDenied(error.response.data.error);
            } else if (error.response.status === 404) {
                setNoFlight(error.response.data.message);
            }
        }
    }

    if (method === "post") {
        try {
            const { data } = await api.post(`${baseURL}/tickets/${id}/add/`);

            if (data) {
                setIsValid(data.message);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }
};
