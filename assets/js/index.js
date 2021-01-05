/*
 * @Author: your name
 * @Date: 2021-01-05 12:22:37
 * @LastEditTime: 2021-01-05 22:03:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigEvent - 副本\assets\js\index.js
 */
let layer=layui.layer;
function getavatar() {
    // 发送ajax获取数据,调整头像 
    $.ajax({
        url:'/my/userinfo',
        // beforeSend:function (xhr) {
        //     console.log(888)
        //     console.log(xhr)
        //     console.log(xhr.responseJSON)
        //     console.log(xhr.status)
        // },
       
        success:function (res) {
            if(res.status!==0){
                return layer.msg("获取用户信息失败")
            }
            // console.log(res);
            // console.log(res.data);
            renderUserInfo(res.data)
        },
        complete:function (xhr) {
        //    console.log(xhr)
        //    console.log(xhr.responseJSON)
           if(xhr.responseJSON.status===1&&xhr.responseJSON.message==="身份认证失败！"){
               console.log(888);
               localStorage.removeItem("token");
               location.href="/home/login.html"
           }
        }
    }
    )
 }
 getavatar() 

 function  renderUserInfo(item) {
     let name=item.nickname||item.username;
     let first=name[0].toUpperCase();
     $(".welcome").text(`欢迎 ${name}`)
    //  console.log(first)
     if(item.user_pic){
        $(".layui-nav-img").prop("src",item.user_pic)
         $(".layui-nav-img").show();
         $(".text-avatar").hide();
     }
     else{
        $(".layui-nav-img").hide();
        $(".text-avatar").show();
        $(".text-avatar").text(first);
 }
 }

$("#quit").on("click",function () {
    layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        
        layer.close(index);
        localStorage.removeItem('token');
        location.href='/home/login.html'
      }); 
     
     
 })