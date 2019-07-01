const finishTask = title => {
  ipcRenderer.send("update_status", {
    title,
    status: 2
  });
};

const deleteTask = title => {
  ipcRenderer.send("delete", {
    title
  });
};

const abortTask = title => {
  ipcRenderer.send("update_status", {
    title,
    status: 3
  });
};
