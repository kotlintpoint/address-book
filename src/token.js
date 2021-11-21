const AUTH_TOKEN = "token";

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN);
export const setAuthToken = (token) => localStorage.setItem(AUTH_TOKEN, token);
export const deleteAuthToken = () => localStorage.removeItem(AUTH_TOKEN);
