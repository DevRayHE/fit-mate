
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
  },

  fromat_date_today_YMD: () => {
    return new Date().toLocaleDateString('en-CA');
  }
};