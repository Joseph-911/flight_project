export const fetchData = async (apiFunction, setState, setError = null) => {
    try {
        const data = await apiFunction();
        setState(data);
    } catch (error) {
        if (setError) {
            setError(error);
        }
        return;
    }
};
