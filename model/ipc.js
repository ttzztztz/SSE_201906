const { ipcMain } = require("electron");
const storage = require("./storage");

ipcMain.on("list", (event, args) => {
  const response = storage.allListItem(args);
  event.reply("list:response", response);
});

ipcMain.on("add", (event, args) => {
  const checkExistence = storage.existListItem(args.title);
  if (!checkExistence) {
    storage.addListItem(
      args.title,
      args.description,
      args.status,
      args.importance,
      args.group
    );
    event.reply("add:response", 1);
  } else {
    event.reply("add:response", -1);
  }
});

ipcMain.on("delete", async (event, args) => {
  storage.deleteListItem(args.title);
  event.reply("delete:response", 1);
});

ipcMain.on("update_status", async (event, args) => {
  storage.updateListItem(args.title, args.status);
  event.reply("update_status:response", 1);
});

ipcMain.on("get_credits", async (event, _args) => {
  const response = storage.getCredits();
  event.reply("get_credits:response", response);
});

ipcMain.on("update_credits", async (event, args) => {
  storage.addCredits(args);
  event.reply("update_credits:response", 1);
});

ipcMain.on("all_group", async (event, _args) => {
  const response = storage.allGroup();
  event.reply("all_group:response", response);
});

ipcMain.on("add_group", async (event, args) => {
  storage.addGroup(args);
  event.reply("add_group:response", 1);
});

ipcMain.on("del_group", async (event, args) => {
  storage.deleteGroup(args);
  event.reply("del_group:response", 1);
});

ipcMain.on("group_name", async (event, args) => {
  const response = storage.groupName(args);
  event.reply("group_name:response", response);
});

ipcMain.on("get_time", async (event, _args) => {
  const response = storage.getTime()
  event.reply("get_time:response", response);
});
ipcMain.on("set_time", async (event, args) => {
  const response = storage.setTime(args);
  event.reply("set_time:response", response);
});