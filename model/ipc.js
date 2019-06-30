const { ipcMain } = require("electron");
const Storage = require("./storage");

ipcMain.on("list", async (event, _args) => {
  const response = await Storage.allListItem();
  event.reply("list:response", response);
});

ipcMain.on("add", async (event, args) => {
  const checkExistence = await Storage.existListItem("title");
  if (checkExistence) {
    await Storage.addListItem(
      args.title,
      args.description,
      args.status,
      args.due
    );
    event.reply("add:response", 1);
  } else {
    event.reply("add:response", "Already Exists!");
  }
});

ipcMain.on("delete", async (event, args) => {
  await Storage.deleteListItem(args.title);
  event.reply("delete:response", 1);
});

ipcMain.on("update_status", async (event, args) => {
  await Storage.updateListItem(args.title, args.status);
  event.reply("update_status:response", 1);
});
