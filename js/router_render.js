const { ipcRenderer: stateIpcRender } = require("electron");

const handleStateChange = () => {
  const { filter, group } = JSON.parse(localStorage.getItem("state"));
  const state = { filter, group };

  stateIpcRender.send("group_name", group);
  stateIpcRender.send("list", state);
};

stateIpcRender.on("group_name:response", async (_event, args) => {
  const { filter } = JSON.parse(localStorage.getItem("state"));

  const stateReflection = {
    all: "ALL",
    finished: "DONE",
    unfinished: "UNDO"
  };

  document.title = "Goals - " + args + " - " + stateReflection[filter];
});

window.addEventListener("load", () => handleStateChange());
