const fs = require("fs");

class Storage {
  defaultFileContent = {
    list: [
      {
        time: (new Date().getTime() / 1000) | 0,
        title: "吃饭",
        description: "该吃饭了",
        status: 1,
        importance: 1,
        group: 0
      }
    ],
    group: [
      {
        id: 0,
        name: "Default"
      }
    ],
    credits: 0,
    group_auto_increment: 1,
    time: {
      y: 2019,
      m: 8,
      d: 1,
      h: 12,
      i: 0,
      s: 0
    }
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

  addListItem = (title, description, status = 1, importance, group) => {
    this.db.list.push({
      time: (new Date().getTime() / 1000) | 0,
      title,
      description,
      status,
      importance,
      group: Number.parseInt(group)
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

  allListItem = ({ filter = "all", group = "all" }) => {
    let result = [];
    const relationReflection = {
      finished: item => item.status === 2,
      unfinished: item => item.status === 1 || item.status === 3
    };

    if (filter === "all") {
      result = this.db.list;
    } else {
      result = this.db.list.filter(relationReflection[filter]);
    }

    if (group !== "all") {
      const compGroup = Number.parseInt(group);
      result = this.db.list.filter(item => item.group === compGroup);
    }
    const answer = result.sort(($1, $2) => {
      if ($1.status !== $2.status) {
        return $1.status - $2.status;
      } else {
        return $2.importance - $1.importance;
      }
    });
    return answer;
  };

  allGroup = () => {
    return this.db.group;
  };

  addGroup = title => {
    this.db.group.push({
      name: title,
      id: this.db.group_auto_increment++
    });
    this.save();
  };

  deleteGroup = id => {
    this.db.group = this.db.group.filter(
      item => item.id !== Number.parseInt(id)
    );
    this.db.list = this.db.list.filter(
      item => item.group !== Number.parseInt(id)
    );
    this.save();
  };

  groupName = id => {
    if (id === "all") {
      return "ALL";
    } else {
      const response = this.db.group[id].name || "Untitled";
      return response;
    }
  };

  addCredits = num => {
    this.db.credits += num;
    this.save();
  };
  getCredits = () => {
    return this.db.credits;
  };

  getTime = () => {
    return this.db.time;
  };
  setTime = ({ y, m, d, h, i, s }) => {
    this.db.time = {
      y,
      m,
      d,
      h,
      i,
      s
    };
    this.save();
  };
}

const storage = new Storage();
module.exports = storage;
