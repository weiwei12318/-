/*
 * @Author: your name
 * @Date: 2021-01-04 10:03:00
 * @LastEditTime: 2021-01-05 14:41:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigEvent - 副本\assets\js\login.js
 */
// 点击切换注册和登录
$(".gotoRegi").on("click",function(){
  $("#loginForm").hide();
  $("#regiForm").show();
})
$(".gotoLogin").on("click",function(){
  $("#regiForm").hide();
  $("#loginForm").show();
})

// // 设置根路径,避免后续每次都要额外添加
// $.ajaxPrefilter(function(option){
//   option.url="http://api-breakingnews-web.itheima.net"+option.url
// })


// 注册表单提交
$("#regiForm").on("submit",function(e){
  e.preventDefault();
  let data=$(this).serialize();
  if(!data){return alert("请填写注册信息")}
  $.ajax({
    type:"POST",
    url:"/api/reguser",

    data,
    success:function(res){
      console.log(res)
         if(res.status!==0){ document.querySelector("#regiForm").reset(); return layer.msg(res.message);}
         else{layer.msg('注册成功,请准备登录', {
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
       }, function(){
         $(".gotoLogin").click();
       });}
   
    }
  })
})

// 登录
$("#loginForm").on("submit",function(e){
  e.preventDefault();
  let data=$(this).serialize();
   $.ajax({
    type:"POST",
    url:"/api/login",
  
    data,
    success:function(res){
      console.log(res)
      localStorage.setItem("token",res.token)
         if(res.status!==0){ document.querySelector("#loginForm").reset(); return layer.msg(res.message);}
         else{layer.msg('登录成功,准备即将跳转', {
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
       }, function(){
        location.href="index.html"
       });}
   
    }
  })
})


// 表单验证
let form=layui.form;
 form.verify({
  repwd: function(value, item){ //value：表单的值、item：表单的DOM对象}
    if($("#regiForm [name=password]").val()!==value){
      return '两次输入的密码不一致';
    }}

  
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  ,pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] 
});      