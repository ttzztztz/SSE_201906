const { ipcRenderer } = require('electron')

const submitDOM = document.querySelector("#submit");
const titleDOM = document.querySelector("#title");
const descriptionDOM = document.querySelector("#description");

submitDOM.addEventListener("click", () => {
  const [title, description] = [
    titleDOM.getAttribute("value"),
    descriptionDOM.innerHTML.trim()
  ];


});
