const baseURL = "profile";

/* --------------------------------------------- */
/* ----------------- Get All X ----------------- */
/* --------------------------------------------- */
/* The arguments accepted in this function is:
path1 = sender (Example: administrator)
path2 = target (Example: users)
api = the link for api in Django rest framework (check AuthContext)
setState = state to save the data
setError = state to save the error
setLoading = state to save loading state
search_query = search query inputs (if found)

** Examples for using this function: **

Example 1:
    path: profile/administrator/users
    This path is for users that their role is admin, and they requesting to fetch all users from the database
    
Example 2:
    path: profile/customer/tickets
    This path is for users that their role is customer, and they requesting to fetch all tickets from the database


In case the user doesn't have the permission to request the data, a 403 component will be rendered
*/
export const getAllData = async (
    path1,
    path2,
    api,
    setState,
    setError,
    setLoading,
    search_query = null
) => {
    setLoading(false);
    let data;

    if (search_query) {
        const search_data = { search_query: search_query };
        ({ data } = await api.post(
            `${baseURL}/${path1}/${path2}/`,
            search_data
        ));
    } else {
        ({ data } = await api.get(`${baseURL}/${path1}/${path2}/`));
    }
    try {
        if (data) {
            setState(data);
        }
    } catch (error) {
        if (error.response.status === 403) {
            setError(true);
        }
    }
};
