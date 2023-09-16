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

export const convertSignedNumber = (num, ctx) => {
    if(ctx == "+"){
        if(num < 0){
            return num * -1
        } else {
            return num
        }
    } else if (ctx == "-"){
        if(num > 0){
            return num * -1
        } else {
            return num
        }
    } else {
        return false
    }
}