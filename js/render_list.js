const { ipcRenderer } = require("electron");
const StatusConverter = require("./js/statusConverter.js");

const abandonSubmitDOM = document.querySelector("#abandonSubmit");
let nowTitle = "";

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
    if (item.status === "success") {
      newContent = newContent.replace(new RegExp(`\\\$DONE`, "g"), "DONE");
    } else {
      newContent = newContent.replace(new RegExp(`\\\$DONE`, "g"), "");
    }
    target_container.innerHTML += newContent;
  });

  document
    .querySelectorAll('button[data-active="abandon-btn"]')
    .forEach(item =>
      item.addEventListener("click", () => (nowTitle = item.dataset.title))
    );
};

ipcRenderer.on("list:response", async (_event, args) => {
  await renderList(args);
});
ipcRenderer.on("delete:response", async (_event, args) =>
  ipcRenderer.send("list", JSON.parse(localStorage.getItem("state")))
);
ipcRenderer.on("update_status:response", async (_event, args) =>
  ipcRenderer.send("list", JSON.parse(localStorage.getItem("state")))
);
// window.addEventListener("load", () =>
//   ipcRenderer.send("list", JSON.parse(localStorage.getItem("state")))
// );
window.addEventListener("hashchange", () =>
  ipcRenderer.send("list", JSON.parse(localStorage.getItem("state")))
);

abandonSubmitDOM.addEventListener("click", () => abortTask(nowTitle));
