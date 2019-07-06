const { ipcRenderer } = require("electron");
const submitDOM = document.querySelector("#submit");
const titleDOM = document.querySelector("#title");

submitDOM.addEventListener("click", () => {
  const [title] = [titleDOM.value.trim()];
  ipcRenderer.send("add_group", title);
});

ipcRenderer.on("add_group:response", (_event, args) => {
  setTimeout(() => alert("添加成功！"), 0);
  window.location = "./index.html";
});
