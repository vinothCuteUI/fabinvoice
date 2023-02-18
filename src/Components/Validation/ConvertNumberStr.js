const arrUnits  = ['','one','two','three','four', 'five','six','seven','eight','nine','ten',
    'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const arrTenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

export const Convertnumberstr = (num)=>{
    let getNum = "000000000"+num;
    
    getNum = getNum.slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})/).splice(1, 5);
   
    if(getNum){
        let convertwords = "";
        
        convertwords += (getNum[0] != 0) ? (arrUnits[Number(getNum[0])] || arrTenth[getNum[0][0]] + '' + arrUnits[getNum[0][1]]) + ' crore ' : '';
        convertwords += (getNum[1] != 0) ? (arrUnits[Number(getNum[1])] || arrTenth[getNum[1][0]] + '' + arrUnits[getNum[1][1]]) + ' lakh ' : '';
        convertwords += (getNum[2] != 0) ? (arrUnits[Number(getNum[2])] || arrTenth[getNum[2][0]] + '' + arrUnits[getNum[2][1]]) + ' thousand ' : '';
        convertwords += (getNum[3] != 0) ? (arrUnits[Number(getNum[3])] || arrTenth[getNum[3][0]] + '' + arrUnits[getNum[3][1]]) + ' hundred ' : '';
        convertwords += (getNum[4] != 0) ? ((convertwords != '') ? 'and ' : '') + (arrUnits[Number(getNum[4])] || arrTenth[getNum[4][0]] + ' ' + arrUnits[getNum[4][1]]) + ' only' : '';
        
        return convertwords;
    }
    return "";
}