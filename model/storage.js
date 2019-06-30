const sqlite = require("sqlite");
const SQL = require("sql-template-strings");

class Storage {
  static connectDB = async () => {
    const db = await sqlite.open("./database.sqlite");
    await db.all(
      SQL`CREATE TABLE IF NOT EXISTS list(time INT(10), title CHAR(50), description TEXT, status INT(10), due INT(10))`
    );
    return db;
  };

  static existListItem = async title => {
    const db = await this.connectDB();
    const resultArr =  await db.all(
      `SELECT * FROM list WHERE title = ?`,
      [title]
    );
    return resultArr && resultArr.length >= 1;
  };

  static addListItem = async (title, description, status = 1, due) => {
    const db = await this.connectDB();
    const nowTimestamp = (new Date().getTime() / 1000) | 0;
    return await db.all(
      `INSERT INTO list(time, title, description, status, due) VALUES (?, ?, ?, ?, ?)`,
      [nowTimestamp, title, description, status, due]
    );
  };

  static deleteListItem = async title => {
    const db = await this.connectDB();
    return await db.all(`DELETE FROM list WHERE title = ?`, [title]);
  };

  static updateListItem = async (title, status) => {
    const db = await this.connectDB();
    return await db.all(`UPDATE list SET (status = ?) WHERE (title = ?)`, [Number.parseInt(status), title]);
  };

  static allListItem = async () => {
    const db = await this.connectDB();
    const result = await db.all(`SELECT * FROM list ORDER BY due DESC`);
    return result;
  };
}

module.exports = Storage;
