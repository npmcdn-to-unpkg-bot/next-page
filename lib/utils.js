export default function getInputFormatDate(date){
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();

    let yyyy = year.toString();
    let mm = month < 9? '0'+(month+1).toString():month.toString();
    let dd = day < 10? '0'+day.toString():day.toString();

    return yyyy+'-'+mm+'-'+dd;
}