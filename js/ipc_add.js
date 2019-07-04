const { ipcRenderer } = require("electron");
const submitDOM = document.querySelector("#submit");
const titleDOM = document.querySelector("#title");
const importanceDOM = document.querySelector("#importance");
const descriptionDOM = document.querySelector("#description");

submitDOM.addEventListener("click", () => {
  const [title, description, importance] = [
    titleDOM.value.trim(),
    descriptionDOM.value.trim(),
    importanceDOM.value.trim()
  ];
  ipcRenderer.send("add", {
    title,
    description,
    status: 1,
    importance: Number.parseInt(importance)
  });
});

ipcRenderer.on("add:response", (_event, args) => {
  if (args === -1) {
    $("#err-model").modal("toggle");
  } else {
    window.location = "./index.html";
  }
});
