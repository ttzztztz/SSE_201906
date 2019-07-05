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
  var str=["人生的光荣，不在永不失败，而在于能够屡败屡战。。",
  "忍耐和坚持虽是痛苦的事情，但却能渐渐地为你带来好处。",
  "一个人只要强烈地坚持不懈地追求，他就能达到目的。",
  "我们最大的弱点在于放弃。成功的必然之路就是不断的重来一次。",
  "我可以接受失败，但我不能接受放弃!",
  "百折不挠，屡仆屡起",
  "别忘了答应自己的事，别忘记了想去的地方。",
  "一个人如果遇事不放弃,那可能不会成功.如果放弃那就是真的是失败。"];
  
  var ran=Math.floor(Math.random()*8);
  const DOM = document.querySelector("#encourageWords");
  DOM.innerHTML=str[ran];
}