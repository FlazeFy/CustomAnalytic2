import { convertSignedNumber } from "./converter";

export const isNumInRange = (current, index, range) => {
    let res = true
    let dif = current - index

    if(convertSignedNumber(dif, "+") > range){
        res = false
    } 
    
    return res
};