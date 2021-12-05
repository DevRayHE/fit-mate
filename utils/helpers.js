
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
  },

  fromat_date_today_YMD: () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    
    const today_YMD = yyyy + '-' + mm + '-' + dd;
    return today_YMD;
  }
};