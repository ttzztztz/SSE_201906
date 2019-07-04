const { ipcMain } = require("electron");
const storage = require("./storage");

ipcMain.on("list", (event, args) => {
  const requestType = (args || "#all").replace("#", "");

  const response = storage.allListItem(requestType);
  event.reply("list:response", response);
});

ipcMain.on("add", (event, args) => {
  const checkExistence = storage.existListItem(args.title);
  if (!checkExistence) {
    storage.addListItem(args.title, args.description, args.status, args.importance);
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
