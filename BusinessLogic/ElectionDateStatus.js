const {isAfter,parseISO,isValid}=require('date-fns')

function compareStartEndDates(start_date,end_date){
    const date1 = new Date(start_date);
    const date2 = new Date(end_date);

   const isAfterResult= isAfter(date2,date1);

   return isAfterResult;
}

function isValidDate(dateString) {
    const date = parseISO(dateString);
    return isValid(date) && /\d{4}-\d{2}-\d{2}/.test(dateString);
}

module.exports={isValidDate,compareStartEndDates};