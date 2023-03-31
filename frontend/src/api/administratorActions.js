const baseURL = "profile/administrator/";

export const getAllUsers = async (
    api,
    setUsers,
    setError,
    setLoading,
    search_query = null
) => {
    setLoading(false);

    let data;

    if (search_query) {
        const search_data = { search_query: search_query };
        ({ data } = await api.post(`${baseURL}users/`, search_data));
    } else {
        ({ data } = await api.get(`${baseURL}users/`));
    }
    try {
        if (data) {
            setUsers(data);
        }
    } catch (error) {
        if (error.response.status === 403) {
            setError(true);
        }
    }
};
