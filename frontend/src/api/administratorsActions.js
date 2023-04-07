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

export const getUserNoRole = async (api, theState) => {
    const { data } = await api.get(`${baseURL}/users/no-role`);
    if (data) {
        theState(data);
    }
};

export const addCustomer = async (api, target, setState, setError, inputs) => {
    try {
        const { data } = await api.post(`${baseURL}/${target}/add`, inputs);
        if (data) {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const addAirline = async (api, target, setError, setIsValid, inputs) => {
    let data;
    try {
        if (inputs["username"]) {
            ({ data } = await api.post(`${baseURL}/${target}/add`, inputs, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }));
        } else {
            ({ data } = await api.post(`${baseURL}/${target}/add`, inputs));
        }
        if (data) {
            setError(null);
            setIsValid(true);
        }
    } catch (error) {
        setError(error.response.data);
    }
};

export const addAdministrator = async (
    api,
    target,
    setError,
    setIsValid,
    inputs
) => {
    let data;
    try {
        if (inputs["username"]) {
            ({ data } = await api.post(`${baseURL}/${target}/add`, inputs, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }));
        } else {
            ({ data } = await api.post(`${baseURL}/${target}/add`, inputs));
        }
        if (data) {
            setError(null);
            setIsValid(true);
        }
    } catch (error) {
        setError(error.response.data);
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

export const addCountry = async (api, target, setError, setIsValid, inputs) => {
    try {
        const { data } = await api.post(`${baseURL}/${target}/add/`, inputs, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (data) {
            setIsValid(data.message);
        }
    } catch (error) {
        setError(error.response.data);
    }
};
