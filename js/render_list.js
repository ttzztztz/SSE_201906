const renderList = async () => {
  const target_container = document.querySelector("#to-do-list-container");
  target_container.childNodes.forEach(item => item.remove());
  const to_do_list = [
    {
      id: 1,
      title: "摸鱼",
      description: "宜 摸鱼",
      status: "primary"
    },
    {
      id: 2,
      title: "吃饭",
      description: "摸鱼结束去吃饭",
      status: "success"
    },
    {
      id: 3,
      title: "写作业",
      description: "写作业是不可能写作业的这辈子都不可能的。",
      status: "danger"
    }
  ];

  const content_wrapped = await fetch("./components/item.html");
  const content = await content_wrapped.text();

  to_do_list.forEach(item => {
    let newContent = content;
    Object.entries(item).forEach(([k, v]) => {
      newContent = newContent.replace("$" + k, v);
    });
    target_container.innerHTML += newContent;
  });
};

