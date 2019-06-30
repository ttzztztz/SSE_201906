class StatusConverter {
  constructor() {
    this.numberToStatus = {
      1: "primary",
      2: "success",
      3: "dangerous"
    };
    this.statusToNumber = Object.entries(this.numberToStatus).reduce(
      (p, [k, v]) => ({
        ...p,
        [v]: k
      }),
      {}
    );
  }
  convertNumberToStatus = id => {
    return this.numberToStatus[id];
  };
  convertStatusToNumber = status => {
    return this.statusToNumber[status];
  };
}

module.exports = StatusConverter;