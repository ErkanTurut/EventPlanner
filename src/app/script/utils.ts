//function that creates all dates between two dates
export function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate.getTime();
  while (currentDate <= stopDate.getTime()) {
    dateArray.push(new Date(currentDate));
    currentDate = startDate.setTime(currentDate + 1 * 60 * 60 * 1000);
  }
  return dateArray;
}

export function timeInterval(date1: Date, date2: Date) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// create a function who extract the date from array of object
