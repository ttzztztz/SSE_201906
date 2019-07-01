const SQLite = require("sql.js");
const fs = require("fs");

class Storage {
  constructor(){
    const buffer = fs.readFileSync("./database.sqlite");
    const db = new SQLite(buffer);
    db.exec(
      `CREATE TABLE IF NOT EXISTS list(time INT(10), title CHAR(50), description TEXT, status INT(10), due INT(10))`
    );
    this.db = db;
  };

  existListItem = title => {
    const resultArr =  this.db.exec(
      `SELECT * FROM list WHERE title = ?`,
      [title]
    );
    return resultArr && resultArr.length >= 1;
  };

  addListItem = (title, description, status = 1, due) => {
    const nowTimestamp = (new Date().getTime() / 1000) | 0;
    return this.db.exec(
      `INSERT INTO list(time, title, description, status, due) VALUES (?, ?, ?, ?, ?)`,
      [nowTimestamp, title, description, status, due]
    );
  };

   deleteListItem =  title => {
    return this.db.exec(`DELETE FROM list WHERE title = ?`, [title]);
  };

  updateListItem =  (title, status) => {
    return this.db.exec(`UPDATE list SET (status = ?) WHERE (title = ?)`, [Number.parseInt(status), title]);
  };

  allListItem = () => {
    const result = this.db.exec(`SELECT * FROM list ORDER BY due DESC`);
    return result;
  };
}

module.exports = Storage;
