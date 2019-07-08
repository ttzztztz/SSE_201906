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

const handleMouseDown = e => {
  if (e.button === 2) {
    const group = e.target.dataset.group;
    if (group !== undefined && confirm("确定要删除这个组吗？这个组内的目标都将会被删除！")) {
      stateIpcRender.send("del_group", group);
    }
  }
};

window.addEventListener("load", async () => {
  const content_wrapped = await fetch("./components/nav_bar.html");
  const content = await content_wrapped.text();
  document.querySelector("#nav-bar-container").innerHTML = content;
  navIpcRender.send("all_group");
  const navUlDOM = document.querySelector("#nav_ul");
  navUlDOM.addEventListener("click", handleNavBarClick);
  navUlDOM.addEventListener("mousedown", handleMouseDown);
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

navIpcRender.on("del_group:response", async (_event, args) => {
  setTimeout(() => alert("删除成功！"), 0);
  location.reload();
});
