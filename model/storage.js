const fs = require("fs");

class Storage {
  defaultFileContent = {
    list: [
      {
        time: (new Date().getTime() / 1000) | 0,
        title: "吃饭",
        description: "该吃饭了",
        status: 1,
        due: (new Date().getTime() / 1000 + 1000) | 0
      }
    ]
  };

  constructor() {
    try {
      const buffer = fs.readFileSync("./database.json", {
        encoding: "utf8"
      });
      this.db = JSON.parse(buffer.toString());
    } catch (e) {
      this.db = this.defaultFileContent;
      this.save();
    }
  }

  save = () => {
    fs.writeFileSync("./database.json", JSON.stringify(this.db));
  };

  existListItem = title => {
    const resultArr = this.db.list.filter(item => item.title === title);
    return resultArr && resultArr.length >= 1;
  };

  addListItem = (title, description, status = 1, due) => {
    this.db.list.push({
      time: (new Date().getTime() / 1000) | 0,
      title,
      description,
      status,
      due
    });
    this.save();
  };

  deleteListItem = title => {
    this.db.list = this.db.list.filter(item => item.title !== title);
    this.save();
  };

  updateListItem = (title, status) => {
    this.db.list.forEach(item => {
      if (item.title === title) {
        item.status = status;
      }
    });
    this.save();
  };

  allListItem = () => {
    const result = this.db.list.sort(($1, $2) => $1.due > $2.due);
    return result;
  };
}

const storage = new Storage();
module.exports = storage;
