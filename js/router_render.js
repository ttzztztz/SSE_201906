const handleRouterChange = () => {
  // document
  //   .querySelectorAll(`.nav-link`)
  //   .forEach(item => item.classList.remove('nav-active'));

  // const target = document.querySelector(
  //   `.nav-link[data-active='${window.location.hash || "#all"}']`
  // );
  // if (target) {
  //   target.classList.add('nav-active');
  // }

  const hash = window.location.hash || "#all";
  const hashReflection = {
    "#all": "全部列表",
    "#finished": "已完成",
    "#unfinished": "待完成"
  };
  document.title = hashReflection[hash] + " - 小目标";
};

window.addEventListener("load", () => handleRouterChange());
window.addEventListener("hashchange", () => handleRouterChange());
