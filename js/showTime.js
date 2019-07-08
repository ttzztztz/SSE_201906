function show(){
    var myyear=document.getElementById("year").value;
    var mymonth=document.getElementById("month").value-1;
    var myday=document.getElementById("day").value;
    var myhour=document.getElementById("hour").value;
    var myminute=document.getElementById("minute").value;
    var mysecond=document.getElementById("second").value;
    var time=Number(new Date(myyear,mymonth,myday,myhour,myminute,mysecond));
    var nowTime=Date.now();
    var timediff=Math.round((time-nowTime)/1000);
    var day=parseInt(timediff/3600/24);
    var hour=parseInt(timediff/3600%24);
    var minute=parseInt(timediff/60%60); 
    var second=timediff%60;

    document.getElementById("1").innerHTML=day;
    document.getElementById("2").innerHTML=hour;
    document.getElementById("3").innerHTML=minute;
    document.getElementById("4").innerHTML=second;
    setTimeout(show,1000);
    if(timediff==0){return;}
}