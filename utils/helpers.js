module.exports = {
  formatDate: (data) => {
    const day = data.getDay();
    const month = data.getMonth() + 1;
    const year = data.getYear();

    return `${day}/${month}/${year}`;
  },
};
