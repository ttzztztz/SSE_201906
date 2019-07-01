const { ipcRenderer } = require("electron");
const submitDOM = document.querySelector("#submit");
const titleDOM = document.querySelector("#title");
const descriptionDOM = document.querySelector("#description");

submitDOM.addEventListener("click", () => {
  const [title, description] = [
    titleDOM.value.trim(),
    descriptionDOM.value.trim()
  ];
  ipcRenderer.send("add", {
    title,
    description,
    status: 1,
    due: (new Date().getTime() / 1000) | (0 + 10000)
  });
});

ipcRenderer.on("add:response", (_event, args) => {
  if (args === -1) {
    $("#err-model").modal("toggle");
  } else {
    window.location = "./index.html";
  }
});
