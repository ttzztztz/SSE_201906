const fs = require("fs");

class Storage {
  defaultFileContent = {
    list: [
      {
        time: (new Date().getTime() / 1000) | 0,
        title: "吃饭",
        description: "该吃饭了",
        status: 1,
        importance: 1
      }
    ],
    credits: 0
  };
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
    }
  }
  init = () => {
    this.db = this.defaultFileContent;
    this.save();
  };
  save = () => {
    fs.writeFileSync("./database.json", JSON.stringify(this.db));
  };

  existListItem = title => {
    return this.db.list && this.db.list.some(item => item.title === title);
  };

  addListItem = (title, description, status = 1, importance) => {
    this.db.list.push({
      time: (new Date().getTime() / 1000) | 0,
      title,
      description,
      status,
      importance
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

  allListItem = type => {
    let result = [];
    const relationReflection = {
      finished: item => item.status === 2,
      unfinished: item => item.status === 1 || item.status === 3
    };
    if (type === "all") {
      result = this.db.list;
    } else {
      result = this.db.list.filter(relationReflection[type]);
    }
    const answer = result.sort(($1, $2) => $2.importance - $1.importance);
    return answer;
  };

  addCredits = num => {
    this.db.credits += num;
    this.save();
  };
  getCredits = () => {
    return this.db.credits;
  };
}

const storage = new Storage();
module.exports = storage;
