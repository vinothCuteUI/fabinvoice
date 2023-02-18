const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

export const VALIDATOR_REQUIRE = (state, action)=>{
    if(action.type === VALIDATOR_TYPE_REQUIRE){
        return {value: action.val, isValid: action.val.trim().length > 0}
    }
    if(action.type === "ON_BLUR"){
        return {value: state.value, isValid: state.value.trim().length > 0}
    }
    return {value:'', isValid:null}
}
export const VALIDATOR_QTY = (state, action)=>{
    if(action.type === VALIDATOR_TYPE_REQUIRE){
        return {value: action.val, isValid: action.val.trim().length > 0}
    }
    if(action.type === "ON_BLUR"){
        return {value: state.value, isValid: state.value.trim().length > 0}
    }
    return {value:'1', isValid:true}
}

// export const esDateReducer = (state, action)=>{
//     if(action.type === "INPT_ESDATE"){
//         return {value: action.val, isValid: action.val.trim().length > 0}
//     }
//     if(action.type === "ON_BLUR"){
//         return {value: state.value, isValid: state.value.trim().length > 0}
//     }
//     return {value:'', isValid:false}
// }
// export const billToReducer = (state, action)=>{
//     if(action.type === "INPT_BILLTO"){
//         return {value: action.val, isValid: action.val.trim().length > 0}
//     }
//     if(action.type === "ON_BLUR"){
//         return {value: state.value, isValid: state.value.trim().length > 0}
//     }
//     return {value:'', isValid:false}
// }

// export const descriptionReducer = (state, action)=>{
//     if(action.type === "INPT_DESCRIPT"){
//         return {value: action.val, isValid: action.val.trim().length > 0}
//     }
//     if(action.type === "ON_BLUR"){
//         return {value: state.value, isValid: state.value.trim().length > 0}
//     }
//     return {value:'', isValid:false}
// }

// export const hsnReducer = (state, action)=>{
    
//     if(action.type === "INPT_HSN"){
//         return {value: action.val, isValid: action.val.trim().length > 0}
//     }
//     if(action.type === "ON_BLUR"){
//         return {value: state.value, isValid: state.value.trim().length > 0}
//     }
//     return {value:'', isValid:false}
// }

// export const qtyReducer = (state, action)=>{
    
//     if(action.type === "INPT_QTY"){
//         return {value: action.val, isValid: action.val.trim().length > 0}
//     }
//     if(action.type === "ON_BLUR"){
//         return {value: state.value, isValid: state.value.trim().length > 0}
//     }
//     return {value:'', isValid:false}
// }
// export const rateReducer = (state, action)=>{
    
//     if(action.type === "INPT_RATE"){
//         return {value: action.val, isValid: action.val.trim().length > 0}
//     }
//     if(action.type === "ON_BLUR"){
//         return {value: state.value, isValid: state.value.trim().length > 0}
//     }
//     return {value:'', isValid:false}
// }
export const VALIDATOR_GST = (state, action)=>{
    
    if(action.type === "INPT_GST"){
        return {value: action.val, isValid: action.val.trim().length > 0}
    }
    if(action.type === "ON_BLUR"){
        return {value: state.value, isValid: state.value.trim().length > 0}
    }
    return {value:'9', isValid:true}
}

export const sgstReducer = (state, action)=>{
    
    if(action.type === "INPT_SGST"){
        return {value: action.val, isValid: action.val.trim().length > 0}
    }
    if(action.type === "ON_BLUR"){
        return {value: state.value, isValid: state.value.trim().length > 0}
    }
    return {value:'9', isValid:true}
}