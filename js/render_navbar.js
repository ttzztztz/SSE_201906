const { ipcRenderer: navIpcRender } = require("electron");

const handleNavBarClick = e => {
  const state = JSON.parse(localStorage.getItem("state"));
  if (e.target.dataset.filter) {
    state.filter = e.target.dataset.filter;
    localStorage.setItem("state", JSON.stringify(state));
    ipcRenderer.send("list", JSON.parse(localStorage.getItem("state")));
    stateIpcRender.send("group_name", state.group);
  } else if (e.target.dataset.group) {
    state.group = e.target.dataset.group;
    localStorage.setItem("state", JSON.stringify(state));
    ipcRenderer.send("list", JSON.parse(localStorage.getItem("state")));
    stateIpcRender.send("group_name", state.group);
  }
};

window.addEventListener("load", async () => {
  const content_wrapped = await fetch("./components/nav_bar.html");
  const content = await content_wrapped.text();
  document.querySelector("#nav-bar-container").innerHTML = content;
  navIpcRender.send("all_group");
  const navUlDOM = document.querySelector("#nav_ul");
  navUlDOM.addEventListener("click", handleNavBarClick);
});

navIpcRender.on("group_name:response", async (_event, args) => {
  const { filter } = JSON.parse(localStorage.getItem("state"));

  const stateReflection = {
    all: "ALL",
    finished: "DONE",
    unfinished: "UNDO"
  };

  document.title = "Goals - " + args + " - " + stateReflection[filter];
});

navIpcRender.on("all_group:response", async (_event, args) => {
  const content_wrapped = await fetch("./components/group_item.html");
  const content = await content_wrapped.text();
  const DOM = document.querySelector("#group_list_container");
  const renderedHTML = args.reduce((prev, curr) => {
    const str = content
      .replace("$groupName", curr.name)
      .replace("$groupId", curr.id);
    prev += str;
    return prev;
  }, "");
  DOM.innerHTML = renderedHTML;
});
