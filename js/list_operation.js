const finishTask = title => {
  ipcRenderer.send("update_status", {
    title,
    status: 2
  });
  ipcRenderer.send("update_credits", 10);
};

const deleteTask = title => {
  ipcRenderer.send("delete", {
    title
  });
  ipcRenderer.send("update_credits", -10);
};

const abortTask = title => {
  ipcRenderer.send("update_status", {
    title,
    status: 3
  });
  ipcRenderer.send("update_credits", -20);
};
