export const fetchData = async (apiFunction, setState, setError) => {
    try {
        const data = await apiFunction();
        setState(data);
    } catch (error) {
        setError(error.response.data.message);
    }
};
