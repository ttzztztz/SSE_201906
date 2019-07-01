const fs = require("fs");
const Immutable = require("immutable");

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
  listMap = {};
  constructor() {
    try {
      if (fs.existsSync("./database.json")) {
        const buffer = fs.readFileSync("./database.json", {
          encoding: "utf8"
        });
        this.db = JSON.parse(buffer.toString());
      } else {
        this.init();
      }
    } catch (e) {
      this.init();
    } finally {
      this.cacheList();
    }
  }
  cacheList = () => {
    this.listMap = this.db.list.reduce(
      (p, obj) => ({
        ...p,
        [obj.title]: obj
      }),
      {}
    );
  };
  init = () => {
    this.db = this.defaultFileContent;
    this.save();
  };
  save = () => {
    fs.writeFileSync("./database.json", JSON.stringify(this.db));
  };

  existListItem = title => {
    // O(1) optimization
    return this.listMap && this.listMap[title];
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
