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

const generateWords = ()=>{
  var str=["我们最大的弱点在于放弃。成功的必然之路就是不断的重来一次。",
  "忍耐和坚持虽是痛苦的事情，但却能渐渐地为你带来好处。",
  "一个人只要强烈地坚持不懈地追求，他就能达到目的。",
  "我们最大的弱点在于放弃。成功的必然之路就是不断的重来一次。",
  "我可以接受失败，但我不能接受放弃!"];
  
  var ran=Math.floor(Math.random()*5);
  const DOM = document.querySelector("#encourageWords");
  DOM.innerHTML=str[ran];
}