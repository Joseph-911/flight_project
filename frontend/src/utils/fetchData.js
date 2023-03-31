export const fetchData = async (apiFunction, setState, setError) => {
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
