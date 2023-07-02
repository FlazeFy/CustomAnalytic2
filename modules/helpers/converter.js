export const getCleanTitleFromCtx = (val) => {
    try {
        const newVal = val.replaceAll('_', ' ')
        const cap = newVal.split(" ").
            map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        
        return cap
    } catch (error) {
        throw error
    }
};