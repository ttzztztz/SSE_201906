class StatusConverter {
  static numberToStatus = {
    "1": "secondary",
    "2": "success",
    "3": "secondary"
  };
  static statusToNumber = Object.entries(this.numberToStatus).reduce(
    (p, [k, v]) => ({
      ...p,
      [v]: k
    }),
    {}
  );
  static convertNumberToStatus = id => {
    return this.numberToStatus[id];
  };
  static convertStatusToNumber = status => {
    return this.statusToNumber[status];
  };
}

module.exports = StatusConverter;
