export const storeSession = async (name, val) => {
    try {
        if (Array.isArray(val)) {
            val = JSON.stringify(val);
        } else {
            val = val.trim();
        }
        sessionStorage.setItem(name, val);
    } catch (error) {
        throw error;
    }
};
  
export const getSession = async (name) => {
    try {
        return sessionStorage.getItem(name);
    } catch (error) {
        throw error;
    }
};