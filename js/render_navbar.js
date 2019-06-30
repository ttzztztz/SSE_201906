window.addEventListener("load", async () => {
  const content_wrapped = await fetch("./components/nav_bar.html");
  const content = await content_wrapped.text();
  document.querySelector("#nav-bar-container").innerHTML = content;
});