
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
  },

  fromat_date_today_YMD: () => {
    // Format today's date as YYYY-MM-DD
    return new Date().toLocaleDateString('en-CA');
  }
};