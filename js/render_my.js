const { ipcRenderer } = require("electron");

const creditsShowDOM = document.querySelector("#credits_show");
const userNameShowDOM = document.querySelector("#username");

ipcRenderer.on("get_credits:response", async (_event, args) => {
  creditsShowDOM.innerHTML = args;
});
window.addEventListener("load", () => {
  const userName = localStorage.getItem("username") || "未命名";
  userNameShowDOM.innerHTML = userName;
  ipcRenderer.send("get_credits");
});
