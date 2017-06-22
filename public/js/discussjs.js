
window.onload=function ()
{
    var oS=document.getElementById('share');
    oS.onmouseover=function(){
        share(10,0);
    }

    oS.onmouseout=function(){
        share(-10,-100);
    }


    var timer=null;

    function share(speed,iTarget){
        var oS=document.getElementById('share');
        clearInterval(timer);
        timer=setInterval(function(){
            if(oS.offsetLeft==iTarget){
                clearInterval(timer);
            }
            else{
                oS.style.left=oS.offsetLeft+speed+'px';

            }

        },30);
    }

    function CurentTime()
    {
        var now = new Date();

        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();

        var hh = now.getHours();
        var mm = now.getMinutes();
        var ss = now.getSeconds();

        var clock = year + "-";

        if(month < 10)
            clock += "0";

        clock += month + "-";

        if(day < 10)
            clock += "0";

        clock += day + " ";

        if(hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm + ":";

        if (ss < 10) clock += '0';
        clock += ss;
        return(clock);
    }

    var oBtn=document.getElementById('btn1');
    var oUl=document.getElementById('ul1');
    var oTxt=document.getElementById('txt1');

    oBtn.onclick=function ()
    {
        var oLi=document.createElement('li');

        oLi.innerHTML=CurentTime()+'<br>'+oTxt.value;
        oTxt.value=''

        if(oUl.children.length>0)
        {
            oUl.insertBefore(oLi, oUl.children[0]);
        }
        else
        {
            oUl.appendChild(oLi);
        }

        //运动
        var iHeight=oLi.offsetHeight;

        oLi.style.height='0';

        startMove(oLi, {height: iHeight}, function (){
            startMove(oLi, {opacity: 100});
        });
        //alert(iHeight);
    };

};












