export const fetchData = async (apiFunction, setState) => {
    const data = await apiFunction();
    setState(data);
};
