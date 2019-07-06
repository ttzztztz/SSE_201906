const { ipcRenderer } = require("electron");
const submitDOM = document.querySelector("#submit");
const titleDOM = document.querySelector("#title");
const importanceDOM = document.querySelector("#importance");
const descriptionDOM = document.querySelector("#description");
const groupDOM = document.querySelector("#group");

submitDOM.addEventListener("click", () => {
  const [title, description, importance, group] = [
    titleDOM.value.trim(),
    descriptionDOM.value.trim(),
    importanceDOM.value.trim(),
    groupDOM.value.trim()
  ];
  ipcRenderer.send("add", {
    title,
    description,
    status: 1,
    importance: Number.parseInt(importance),
    group: Number.parseInt(group)
  });
});

ipcRenderer.on("add:response", (_event, args) => {
  if (args === -1) {
    $("#err-model").modal("toggle");
  } else {
    setTimeout(() => alert("添加成功！"), 0);
    window.location = "./index.html";
  }
});

window.addEventListener('load', ()=>{
  ipcRenderer.send("all_group");
});

ipcRenderer.on("all_group:response", async (_event, args) => {
  const content_wrapped = await fetch("./components/group_item_add.html");
  const content = await content_wrapped.text();
  const DOM = document.querySelector("#group");
  const renderedHTML = args.reduce((prev, curr) => {
    const str = content.replace("$groupName", curr.name).replace("$groupId", curr.id);
    prev += str;
    return prev;
  }, "");
  DOM.innerHTML = renderedHTML;
});
