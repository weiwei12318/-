/*
 * @Author: your name
 * @Date: 2021-01-05 18:10:45
 * @LastEditTime: 2021-01-05 22:46:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigEvent - 副本\assets\js\user\user.js
 */
$(function () {
let form=layui.form;
let id;
function getUserInfo() {
    console.log(999);

    $.ajax({
        url:"/my/userinfo",
        success:function (res) {
    console.log(res.data)
    id=res.data.id

    // form.val("formTest", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
    //   "username": res.data.username,// "name": "value"
    //  "email": res.data.email,
    //  "nickname": res.data.nickname,
    // });
    form.val("formTest",res.data);
    // 控制昵称长度
    form.verify({
        nickname: function(value, item){ //value：表单的值、item：表单的DOM对象
         
        if(value.length>=6){ return "昵称长度必须在1-6字符之间"}
           }
            });
    }
    })
    
}

getUserInfo()


$(".layui-form").on("submit",function (e) {
    e.preventDefault();
    let data=$(this).serialize()+"&id="+id
       console.log(data);
 
    $.ajax({
        type:"POST",
        data,
        url:"/my/userinfo",
        success:function (res) {
            console.log(res)
            layer.msg(res.message)
            getUserInfo()
        }
    })
})

$("[type=reset]").on("click",(function (e) {
    console.log(555)
    e.preventDefault();
    getUserInfo();
  
})    )
} 
)


