const { ipcRenderer } = require("electron");

const creditsShowDOM = document.querySelector("#credits_show");
ipcRenderer.on("get_credits:response", async (_event, args) => {
  creditsShowDOM.innerHTML = args;
});
window.addEventListener("load", () => ipcRenderer.send("get_credits"));
