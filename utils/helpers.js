module.exports = {
  format_date: (date) => {
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  },
};
