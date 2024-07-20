  const getFormattedDate = function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const isTodaysDateGreatedThanDate  = function (dateString) {
    const today = new Date(getFormattedDate());
    const dateToCompare = new Date(dateString);
  
    return  today > dateToCompare;
  }

  module.exports = {
    getFormattedDate,
    isTodaysDateGreatedThanDate
  };