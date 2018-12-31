
var deleteornice = 0;
//0->nice
//1->delete
var friends;
var ref = 0;
function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
function getNumber(v){
  s="" 
 
  for(i=0;i<v.length;i++) 
   
  { 
   
    if("0123456789".indexOf(v.substr(i,1))>-1) 
     
    s+=v.substr(i,1) 
   
  } 
   
  return s; 
}

function getIndex(acc){
  var t = -1;
  for(var i=0;i<friends.length;i++){
    if(friends[i]==acc){
      t = i;
      break;
    }
  }
  return t;
}



$(document).ready(function(){

  var acc = $("#address").text();
  
  $.ajax({
    type:"get",
    url:"/usermessage",
    contentType:"application/json; charset=utf-8",
    data:{"address":acc},
    dataType:"json",
    success: function(data){
      var username = data.username;
      var dongtainum = data.dongtainum;
      var guanzhunum = data.guanzhunum;
      var fensinum = data.fensinum;
      friends = data.all;
      $("#username").html(username);
      $("#dongtai").html("动态："+dongtainum);
      $("#guanzhu").html("关注："+guanzhunum);
      $("#fensi").html("粉丝："+fensinum);
      
    },
    error:function(message){
      alert("error!");
    }
  });

  $("#sub").click(function(){
    
    var con = $("#content").val();
    if(con==""){
      alert("动态内容不能为空");
    }
    else{

      var acc = $("#address").text();
      //alert(acc);
      $.ajax({ 
        type:"get",
        url: "/adddongtai", 
        contentType: "application/json; charset=utf-8",
        data: {"content":$("#content").val(),"time":getNowFormatDate(),"address":acc},
        dataType: "json",

        success: function(data){
            //alert(data.result);
            var user = $("#username").text();
            var neirong = $("#content").val();
            var time = getNowFormatDate();
            var index = getNumber($("#dongtai").text());
            var addre = acc;
            var newdongtai = $("<div class='dt'><div class='del'></div><p class = 'name'>"+user+"</p><p class='neirong'>"+neirong+"</p><div class='nic_pic'></div><p class='nic_num'>0</p><p class='time'>"+time+"</p><p class='index'>"+index+"</p><p class='addre'>"+addre+"</p></div>");
            $("#dongtaii").prepend(newdongtai);
            $("#dongtai").html("动态："+data.result);
          },
          error:function(message){
            alert("Error!");
          }
      });

      // var user = $("#username").text();
      //       var neirong = $("#content").val();
      //       var time = getNowFormatDate();
      //       var newdongtai = $("<div class='dt'><div class='del'></div><p class = 'name'>"+user+"</p><p class='neirong'>"+neirong+"</p><div class='nic_pic'></div><p class='nic_num'>0</p><p class='time'>"+time+"</p><p class='index'>1</p><p class='addre'>0x952f50ee26a1359ee119eb33f100130109413516</p></div>");
      //       $("#dongtaii").prepend(newdongtai);
      
  }
  });

  $("#clear").click(function(){
    $("#dongtaii").html("");
    ref = 0;
  });

  $("#getmyself").click(function(){
    ref = 1;
    $("#dongtaii").html("");
    var acc = $("#address").text();
    var dongtainum = $("#dongtai").text();
    var num = getNumber(dongtainum);
    $.ajax({ 
        type:"get",
        url: "/getdongtai", 
        contentType: "application/json; charset=utf-8",
        data: {"num":num,"address":acc},
        dataType: "json",

        success: function(data){
            var all = data.result;
            for(var i=0;i<all.length;i++){
              //alert(all[i]);
              var user = all[i][1];
              var neirong = all[i][2];
              var time = all[i][3];
              var nice_num = all[i][4];
              var index = all[i][5];
              var addre = all[i][0];
              var newdongtai = $("<div class='dt'><div class='del'></div><p class = 'name'>"+user+"</p><p class='neirong'>"+neirong+"</p><div class='nic_pic'></div><p class='nic_num'>"+nice_num+"</p><p class='time'>"+time+"</p><p class='index'>"+index+"</p><p class='addre'>"+addre+"</p></div>");
              $("#dongtaii").prepend(newdongtai);
            }
          },
          error:function(message){
            alert("Error!");
          }
      });
  });
  $("#befans").click(function(){
    //alert("ck");
    $("#addfriend").css('visibility','visible');
    $("#add").val("添加关注");
  });

  $("#add").click(function(){
    var acc1 = $("#friendaddress").val();
    var acc0 = $("#address").text();
    if($("#add").val()=="添加关注"){
      $.ajax({ 
          type:"get",
          url: "/addfriend", 
          contentType: "application/json; charset=utf-8",
          data: {"acc0":acc0,"acc1":acc1},
          dataType: "json",

          success: function(data){
              var guanzhunum = data.result;
              if(guanzhunum=="error"){
                alert("地址非法或该用户不存在");
              }else{
                //alert(guanzhunum);
                $("#guanzhu").html("关注："+guanzhunum);
                friends.push(acc1);
              }
              $("#addfriend").css('visibility','hidden');
              
            },
            error:function(message){
              alert("地址非法或你没有关注该用户");
              $("#addfriend").css('visibility','hidden');
            }
        });
    } else {
      var index = getIndex(acc1);
      if(index==-1){
        alert("地址非法或你没有关注该用户");
        $("#addfriend").css('visibility','hidden');
      }else{
        $.ajax({ 
            type:"get",
            url: "/delfriend", 
            contentType: "application/json; charset=utf-8",
            data: {"acc":acc,"index":index},
            dataType: "json",

            success: function(data){
                var guanzhunum = data.result;
                if(guanzhunum=="error"){
                  alert("地址非法或该用户不存在");
                }else{
                  //alert(guanzhunum);
                  $("#guanzhu").html("关注："+guanzhunum);
                  friends[index] = "0x0000000000000000000000000000000000000000";
                }
                $("#addfriend").css('visibility','hidden');
                
              },
              error:function(message){
                alert("Error!");
                
              }
          });
      }
    }
    
  });

  $("#delfriend").click(function(){
    $("#addfriend").css('visibility','visible');
    $("#add").val("取消关注");
  })


  $("#fresh").click(function(){
    ref = 2;
    $("#dongtaii").html("");
    var acc = $("#address").text();
    //alert(acc);
    var guanzhunum = $("#guanzhu").text();
    var num = getNumber(guanzhunum);
    $.ajax({ 
        type:"get",
        url: "/getfrienddongtai", 
        contentType: "application/json; charset=utf-8",
        data: {"num":num,"address":acc},
        dataType: "json",

        success: function(data){
            var all = data.result;
            //alert(all.length);
            for(var i=0;i<all.length;i++){
              //alert(all[i]);
              var user = all[i][1];
              var neirong = all[i][2];
              var time = all[i][3];
              var nice_num = all[i][4];
              var index = all[i][5];
              var addre = all[i][0];
              var newdongtai = $("<div class='dt'><div class='del'></div><p class = 'name'>"+user+"</p><p class='neirong'>"+neirong+"</p><div class='nic_pic'></div><p class='nic_num'>"+nice_num+"</p><p class='time'>"+time+"</p><p class='index'>"+index+"</p><p class='addre'>"+addre+"</p></div>");
              $("#dongtaii").prepend(newdongtai);
            }
          },
          error:function(message){
            alert("Error!");
          }
      });
  });


  $("#dongtaii").on("click", '.dt', function (e) {
    // alert($(this).find(".index").text());
    // if($(this).find(".name").text()==$("#username").text())
    //   $(this).find(".del").css('visibility','visible');
      if(deleteornice==0){
        var acc0 = $("#address").text();
        var acc1 = $(this).find(".addre").text();
        //alert(acc1);
        var nnum = $(this).find(".index").text();  
        //alert(nnum);
        var n = $(this).find(".nic_num").text();
        n = parseInt(n);
        n = n+1;
        if(acc0==acc1) return;
          $.ajax({ 
            type:"get",
            url: "/setnice", 
            contentType: "application/json; charset=utf-8",
            data: {"num":nnum,"acc0":acc0,"acc1":acc1},
            dataType: "json",

            success: function(data){
                var all = data.result;
                alert(all);
                $(this).find(".nic_num").html(n.toString());
                if(ref==1) $("#getmyself").click();
                if(ref==2) $("#fresh").click();
              },
              error:function(message){
                alert("Error!");
              }
          });
      }
      else{
        deleteornice=0;
        var acc = $("#address").text();
        var index = $(this).find(".index").text(); 
        var address = $(this).find(".addre").text();
        if(address!=acc){
          alert("不能删除别人的动态！");
        }
        else{
          $.ajax({ 
            type:"get",
            url: "/deletedongtai", 
            contentType: "application/json; charset=utf-8",
            data: {"index":index,"acc":acc},
            dataType: "json",

            success: function(data){
                var all = data.result;
                alert(all);
                $(this).remove();
                $("#dongtai").html("动态："+all);
                if(ref==1) $("#getmyself").click();
                if(ref==2) $("#fresh").click();
                //$(this).find(".nic_num").html(n.toString());
              },
              error:function(message){
                alert("Error!");
              }
          });
        }
        $(".del").css('visibility','hidden');
      }
  });

  $("#deldongtai").click(function() {
    if(deleteornice==0){
      deleteornice=1;
      $(".del").css('visibility','visible');
    } else {
      deleteornice=0;
      $(".del").css('visibility','hidden');
    }
  })


});