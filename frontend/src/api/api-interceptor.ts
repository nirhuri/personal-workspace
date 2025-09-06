export const processResponseFromServer = (response: { data?: any }): unknown => {
    return response?.data ? response.data : null;
}