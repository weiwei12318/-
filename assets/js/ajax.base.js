/*
 * @Author: your name
 * @Date: 2021-01-05 08:41:17
 * @LastEditTime: 2021-01-05 21:17:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigEvent - 副本\assets\js\ajax.base.js
 */
// 设置根路径,避免后续每次都要额外添加
$.ajaxPrefilter(function(option){

    option.url="http://api-breakingnews-web.itheima.net"+option.url

    if(option.url.indexOf('/my/')!==-1){
      option.headers={
        Authorization: localStorage.getItem("token"),
    };
    }
     })
  