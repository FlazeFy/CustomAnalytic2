export const storeLocal = (name,val) => {
    try {
        if (Array.isArray(val)) {
            val = JSON.stringify(val)
        } else {
            if(val == null){
                val = val
            } else {
                val = val.trim()
            }
        }
        localStorage.setItem(name, val)
    } catch (error) {
        throw error
    }
}

export const getLocal = (name) => {
    try {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            return localStorage.getItem(name)
        }
        return null
    } catch (error) {
        throw error
    }
};