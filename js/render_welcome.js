const userNameInputDOM = document.querySelector("#username");
const startEntryInputDOM = document.querySelector("#start_entry");

startEntryInputDOM.addEventListener("click", () => {
  localStorage.setItem("username", userNameInputDOM.value);
  localStorage.setItem("state", JSON.stringify({
    filter: "all",
    group: "all"
  }));
  location = "./index.html";
});

window.addEventListener("load", () => {
  const savedUserName = localStorage.getItem("username");
  if (savedUserName) {
    userNameInputDOM.value = savedUserName;
  }
});
