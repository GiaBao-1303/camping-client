export const setSession = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSession = (key: string) => {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
export const removeSession = (key: string) => {
    sessionStorage.removeItem(key);
};
