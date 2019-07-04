const handleRouterChange = () => {
  const hash = window.location.hash || "#all";
  const hashReflection = {
    "#all": "ALL",
    "#finished": "DONE",
    "#unfinished": "UNDO"
  };
  document.title = "Goals - " + hashReflection[hash];
};

window.addEventListener("load", () => handleRouterChange());
window.addEventListener("hashchange", () => handleRouterChange());
