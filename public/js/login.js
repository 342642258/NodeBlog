
function realName(){
    var name=document.getElementById("userName").value;
    var nullname=document.getElementById("nullname");
    if(name==null||name==""){
        nullname.innerHTML="用户名不能为空！";
        return false;
    }else  if(name.length<2||name.length>=20){
        nullname.innerHTML="用户名长度为2-20个字符长度！";
        return false;
    }else{
        nullname.innerHTML="";
        return true;
    }

}

function studentNumber(){
    var stu=document.getElementById("sn").value;
    var nullstu=document.getElementById("nullstu");
    if(stu==null||stu==""){
        nullstu.innerHTML="学号不能为空！";
        return false;
    }else  if(stu.length!=10){
        nullstu.innerHTML="学号长度为10个数字！";
    }else{
        nullstu.innerHTML="";
        return true;
    }
}



function emailCheck(){
    var eamil=document.getElementById("email").value;
    var nullemail=document.getElementById("nullemail");
    var reg=/^([\.a-zA-z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;68
    if(eamil==null||eamil==""){
        nullemail.innerHTML="Email地址不能为空！";
        return false;
    }else if(!reg.test(eamil)){
        nullemail.innerHTML="请输入正确的Email地址！";
        return false;
    }else{
        nullemail.innerHTML="";
        return true;
    }
}



function ppwd(){
    var pwd=document.getElementById("password").value;
    var nullpwd=document.getElementById("nullpwd");
    if(pwd==null||pwd==""){
        nullpwd.innerHTML="密码不能为空！";
        return false; }
    else  if(pwd.length<6||pwd.length>=10){
        nullpwd.innerHTML="密码只能是6-10个数字或英文字母！";
        return false;
    }else{
        nullpwd.innerHTML="";
        return true;
    }
}

function ttpwd(){
    var pwd=document.getElementById("password").value;
    var tpwd=document.getElementById("tpwd").value;
    var nulltpwd=document.getElementById("nulltpwd");
//       alert(pwd);
//       alert(tpwd);
    if(tpwd==null||tpwd==""){
        nulltpwd.innerHTML="确认密码不能为空！";
        return false;
    }else if(tpwd!=pwd){
        nulltpwd.innerHTML="两次密码输入不一致！";
        return false;
    }else{
        nulltpwd.innerHTML="";
        return true;
    }
}

window.onload=function(){
    var num1 = parseInt(10*Math.random());
    var num2 = parseInt(10*Math.random());
    var mark = document.getElementById('mark');
    var total=document.getElementById('total');
    var oBtn = document.getElementById('sure');


    mark.innerHTML=num1+"+"+num2+"=";

    oBtn.onclick=function ()
    {
        if((num1+num2)==total.value){
            alert("恭喜，登录成功！");
        }
        else{
            alert("验证码错误！")
        }
    };
}


