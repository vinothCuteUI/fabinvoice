export const SetNumCnvrt = (str)=>{
    let seNum =  str.toString().split(",").join("");
    return parseInt(seNum) === Number(seNum) ? str+".00":str;
}

export const ConvertNumberFormat = (amt)=>{
    return new Intl.NumberFormat('en-IN').format(amt)
}