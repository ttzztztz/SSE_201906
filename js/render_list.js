const { ipcRenderer } = require("electron");
const StatusConverter = require("./js/statusConverter.js");

const renderList = async args => {
  const target_container = document.querySelector("#to-do-list-container");

  const childCount = target_container.children.length;
  for (let i = 0; i < childCount; i++) {
    target_container.children[0].remove();
  }

  const to_do_list = args.map(item => ({
    ...item,
    status: StatusConverter.convertNumberToStatus(item.status)
  }));
  const content_wrapped = await fetch("./components/item.html");
  const content = await content_wrapped.text();

  to_do_list.forEach(item => {
    let newContent = content;
    Object.entries(item).forEach(([k, v]) => {
      const regExp = new RegExp(`\\\$${k}`, "g");
      newContent = newContent.replace(regExp, v);
    });
    target_container.innerHTML += newContent;
  });
};

ipcRenderer.on("list:response", async (_event, args) => {
  await renderList(args);
});
ipcRenderer.on("delete:response", async (_event, args) => {
  ipcRenderer.send("list");
});
ipcRenderer.on("update_status:response", async (_event, args) => {
  ipcRenderer.send("list");
});
window.addEventListener("load", () => ipcRenderer.send("list"));
