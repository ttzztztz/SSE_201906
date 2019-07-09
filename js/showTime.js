const { ipcRenderer: timeIpcRender } = require("electron");

const myyearDOM = document.getElementById("year");
const mymonthDOM = document.getElementById("month");
const mydayDOM = document.getElementById("day");
const myhourDOM = document.getElementById("hour");
const myminuteDOM = document.getElementById("minute");
const mysecondDOM = document.getElementById("second");

function show() {
  const myyear = myyearDOM.value;
  const mymonth = mymonthDOM.value - 1;
  const myday = mydayDOM.value;
  const myhour = myhourDOM.value;
  const myminute = myminuteDOM.value;
  const mysecond = mysecondDOM.value;

  const time = Number(
    new Date(myyear, mymonth, myday, myhour, myminute, mysecond)
  );
  const nowTime = Date.now();
  const timediff = Math.round((time - nowTime) / 1000);
  const day = parseInt(timediff / 3600 / 24);
  const hour = parseInt((timediff / 3600) % 24);
  const minute = parseInt((timediff / 60) % 60);
  const second = timediff % 60;

  document.getElementById("1").innerHTML = day;
  document.getElementById("2").innerHTML = hour;
  document.getElementById("3").innerHTML = minute;
  document.getElementById("4").innerHTML = second;
  setTimeout(show, 1000);

  timeIpcRender.send(
    "set_time",
    Object.entries({
      y: myyear,
      m: mymonth,
      d: myday,
      h: myhour,
      i: myminute,
      s: mysecond
    }).reduce(
      (p, [k, v]) => ({
        ...p,
        [k]: Number.parseInt(v)
      }),
      {}
    )
  );

  if (timediff == 0) {
    return;
  }
}

window.addEventListener("load", () => {
  timeIpcRender.send("get_time");
});

timeIpcRender.on("get_time:response", (_event, args) => {
  const { y, m, d, h, i, s } = args;
  myyearDOM.value = y;
  mymonthDOM.value = m + 1;
  mydayDOM.value = d;
  myhourDOM.value = h;
  myminuteDOM.value = i;
  mysecondDOM.value = s;

  show();
});
