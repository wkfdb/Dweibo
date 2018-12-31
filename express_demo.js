//express_demo.js 文件
var express = require('express');
var bodyParser = require('body-parser');
var urllib = require('url');
var path = require('path');
var app = express();

var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var abi = [{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"username","type":"string"}],"name":"cerateaccount","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"index","type":"uint256"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"time","type":"string"},{"indexed":false,"name":"niceNum","type":"uint256"}],"name":"adddongtai","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"friend","type":"address"},{"indexed":false,"name":"index","type":"uint256"}],"name":"addfriend","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"friend","type":"address"},{"indexed":false,"name":"index","type":"uint256"}],"name":"deletefriend","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"index","type":"uint256"}],"name":"deletedongtai","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"index","type":"uint256"},{"indexed":false,"name":"niceNum","type":"uint256"}],"name":"setnice","type":"event"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"password","type":"string"}],"name":"createAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPassword","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"setUsername","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAccountNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAccountID","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUsername","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDongtaiNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllDongtaiNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"getDongtaiNumByAddress","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFriendNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllFriendNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"getDongtai","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getFriendAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"content","type":"string"},{"name":"time","type":"string"}],"name":"addDongtai","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"friend","type":"address"}],"name":"addFriend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"deleteDongtai","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"deleteFriend","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getFollowedNum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"setNice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
var address = "0xf8c7aa78573994034afb8882bd6b7a71fa93d02d";
var Dweibo = web3.eth.contract(abi).at(address);
var num = 1;
//6721975

var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.use(express.static(path.join(__dirname, 'files')));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {

    
    console.log(Dweibo.getAccountNum.call());
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    res.sendFile( __dirname + "/files/html/" + "index.html" );

     //var temp = web3.eth.accounts;
     //console.log(temp);
     //console.log(abi);
     
     //console.log(temp[0]);

     //console.log(web3.eth.getBlock("pending").gasLimit);
     
     //console.log(Dweibo.getAccountNum.call());

     //var accountt = web3.personal.newAccount('123');
     //console.log(accountt);

     //web3.eth.sendTransaction({ gas: 3141592});//选择合适的Gas限制
     //console.log(Dweibo.createAccount.sendTransaction("First!",{from:web3.eth.accounts[0],gas:6721975}));
     //console.log(Dweibo.setUsername.sendTransaction("wk",{from:temp[0]}));
     //console.log("After add new user:\n");
     //console.log(Dweibo.getAccountNum.call());
     //console.log(Dweibo.getUsername.call({from:temp[0]}));
     
     //res.send(temp);
})

app.get('/regist',function(req,res) {
  res.sendFile( __dirname + "/files/html/" + "signup.html" );

})



app.post('/login',urlencodedParser, function(req,res) {
  var address = req.body.address;
  var password = req.body.password;
  var true_pass = Dweibo.getPassword.call({from:address},function(err,result){
    if(err)
      res.send(err);
    else{
      if(result.toString()==password.toString()){
        //res.send(Dweibo.getAccountNum.call());
        // var username = Dweibo.getUsername.call({from:address});
        // var dongtainum = Dweibo.getDongtaiNum.call({from:address});
        // var guanzhunum = Dweibo.getFriendNum.call({from:address});
        // var fensinum = Dweibo.getFollowedNum.call({from:address});
        // console.log(username);
        // console.log(dongtainum);
        // console.log(guanzhunum);
        // console.log(fensinum);
        //res.send(Dweibo.getAccountNum.call());
        //res.sendFile( __dirname + "/files/html/" + "mainpage.html" );
        //res.render("mainpage",{h5:address});
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write("<!DOCTYPE html>");
        res.write("<html>");
        res.write("<head>");
        res.write("<title>Dweibo</title><link rel='stylesheet' type='text/css' href='./css/mainpage.css'><script type='text/javascript' src='./js/jquery.js'></script><script type='text/javascript' src='./js/mainpage.js'></script><meta charset='utf-8'>");
        res.write("</head>");
        res.write("<body>");
        res.write("<div id='personal_address'>");
        res.write("<h5 id='address'>"+address+"</h5>");
        res.write("</div>");
        res.write("<div id='personal_message'><p id='username'>loading</p><div id='message_head'><p id='dongtai'>动态 : 0</p><p id='guanzhu'>关注 : 0</p><p id='fensi'>粉丝 : 0</p></div></div>");
        res.write("<button id='clear'>清空</button><br>");
        res.write("<button id='getmyself'>我的动态</button><br>");
        res.write("<button id='fresh'>刷新</button>");
        res.write("<div id='send_dongtai'><textarea name='content' id='content'></textarea>  <br><input type='submit' value='提交' id='sub'></div>");
        res.write("<div id='dongtaii'></div>");
        res.write("<button id='befans'>添加关注</button>");
        res.write("<button id='deldongtai'>删除动态</button>");
        res.write("<button id='delfriend'>取消关注</button>");
        res.write("<div id='addfriend'>");
        res.write("<input type='text' id='friendaddress'/>");
        res.write("<input type='submit' id='add' value='添加'/>");
        res.write("</div>");
        res.write("</body></html>");
        res.end();
      }
      else{
        res.send(result);
      }
    }
  })
})

app.get('/getdongtai',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var address = query.address;
	var num = Dweibo.getAllDongtaiNum.call({from:address});
	var all = new Array();
	for(var i=0;i<num;i++){
		var temp = Dweibo.getDongtai.call(address,i);
		if(temp[2]=="") continue;
		temp.push(i);
		//temp.push(address);
		//console.log(temp);
		all.push(temp);
	}

    var response = {
    	"result":all
    };
    res.send(JSON.stringify(response));
})

app.get('/getfrienddongtai',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var address = query.address;
	var num = Dweibo.getAllFriendNum.call({from:address});
	var all = new Array();
	//var all_address = new Array();
	console.log(num);
	//console.log(Dweibo.getFriendAddress.call(0,{from:address}));
	for(var i=0;i<num;i++){
		console.log(i);
		var temp_address = Dweibo.getFriendAddress.call(i,{from:address});
			console.log("i:"+temp_address);
			if(temp_address=="0x0000000000000000000000000000000000000000") continue;
			var dongtainum = Dweibo.getAllDongtaiNum.call({from:temp_address});
			for(var j=0;j<dongtainum;j++){
				var temp = Dweibo.getDongtai.call(temp_address,j);
				if(temp[2]=="") continue;
				temp.push(j);
				//temp.push(temp_address);
				all.push(temp);
			}
	}

    var response = {
    	"result":all
    };
    res.send(JSON.stringify(response));
})

app.get('/addfriend',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var acc0 = query.acc0;
	var acc1 = query.acc1;
	Dweibo.addFriend.sendTransaction(acc1,{from:acc0,gas:6721975},function(err){
		if(err){
			var response = {
		    	"result":"error"
		    };
		    res.send(JSON.stringify(response));
		} else{
			var num = Dweibo.getFriendNum.call({from:acc0});
			var response = {
		    	"result":num
		    };
		    res.send(JSON.stringify(response));
		}
	});
    
})

app.get('/delfriend',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var acc = query.acc;
	var index = query.index;
	Dweibo.deleteFriend.sendTransaction(index,{from:acc,gas:6721975},function(err){
		if(err){
			var response = {
		    	"result":"error"
		    };
		    res.send(JSON.stringify(response));
		} else{
			var num = Dweibo.getFriendNum.call({from:acc});
			var response = {
		    	"result":num
		    };
		    res.send(JSON.stringify(response));
		}
	});
    
})
app.get('/setnice',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var acc0 = query.acc0;
	var acc1 = query.acc1;
	var num = query.num;
	Dweibo.setNice.sendTransaction(acc1,num,{from:acc0,gas:6721975},function(err){
		if(err){
			var response = {
		    	"result":"error"
		    };
		    res.send(JSON.stringify(response));
		} else{
			var response = {
		    	"result":"successfully"
		    };
		    res.send(JSON.stringify(response));
		}
	});
    
})

app.get('/deletedongtai',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var acc = query.acc;
	var index = query.index;
	Dweibo.deleteDongtai.sendTransaction(index,{from:acc,gas:6721975},function(err){
		if(err){
			var response = {
		    	"result":"error"
		    };
		    res.send(JSON.stringify(response));
		} else{
			var n = Dweibo.getDongtaiNum.call({from:acc});
			var response = {
		    	"result":n
		    };
		    res.send(JSON.stringify(response));
		}
	});
    
})

// app.get('/adddongtai',function(req,res){
//   var params = urllib.parse(req.url, true);
//   var query2 = params.query;
  
//   var content = query2.content;
//   var time = query2.time;
//   Dweibo.addDongtai.sendTransaction()
// })

app.get('/usermessage',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var address = query.address;
	console.log(address);
	var username = Dweibo.getUsername.call({from:address});
    var dongtainum = Dweibo.getDongtaiNum.call({from:address});
    var guanzhunum = Dweibo.getFriendNum.call({from:address});
    var fensinum = Dweibo.getFollowedNum.call({from:address});
    var all = new Array();
    var num = Dweibo.getAllFriendNum.call({from:address});
    for(var i=0;i<num;i++){
		var temp_address = Dweibo.getFriendAddress.call(i,{from:address});
			console.log("i:"+temp_address);
			//if(temp_address=="0x0000000000000000000000000000000000000000") continue;
			all.push(temp_address);
	}
    var response = {
    	"username":username,
    	"dongtainum":dongtainum,
    	"guanzhunum":guanzhunum,
    	"fensinum":fensinum,
    	"all":all
    };
    res.send(JSON.stringify(response));
})

app.get('/adddongtai',function(req,res) {
	var params = urllib.parse(req.url,true);
	var query = params.query;
	var address = query.address;
	var content = query.content;
	var time = query.time;
	console.log(address);
	Dweibo.addDongtai.sendTransaction(content,time,{from:address,gas:6721975},function(err){
		var dongtainum = Dweibo.getDongtaiNum.call({from:address});
		var response = {
			"result":dongtainum
		};
		res.send(JSON.stringify(response));
	});
})

app.get('/test',function(req,res){
  console.log("get req!!");
  var params = urllib.parse(req.url, true);
  var query2 = params.query;
    // 打印get请求中的接口参数
  console.log(query2.content);
  console.log(query2.time);
  var response = {
       "result":"test fine!"
   };
   res.send(JSON.stringify(response));
   //res.send("hello!")
})

app.post('/signup',urlencodedParser,function(req,response) {
  var username = req.body.username;
  var password = req.body.password;
  var acc = req.body.address;
  //var acc = web3.personal.newAccount(password.toString());
  //num++;
  console.log(Dweibo.getAccountNum.call());
  Dweibo.createAccount.sendTransaction(username.toString(),password.toString(),{from:acc,gas:6721975},function(err){
    if(err)
      response.send(err);
    else {
      console.log(Dweibo.getAccountNum.call());
  
      response.writeHead(200,{'Content-Type':'text/html'});
      response.write("<!DOCTYPE html>");
      response.write("<html>");
      response.write("<head>");
      response.write("<meta charset='utf-8' />");
      response.write("<link rel='stylesheet' type='text/css' href='./css/signin.css'>")
      response.write("<title>User message</title>");
      response.write("</head>");
      response.write("<body>");
      response.write("<div id='panel'>");
      {
        response.write("<p id='first'>Sign up successfully!</p>");
      }
      response.write("<form id='back' method='get' action='http://localhost:8081/'>");
      response.write("<input type='submit' value='返回' id='sub'></input>");  
      response.write("</form>");
      response.write("</div>");
      response.write("</body>");
      response.write("</html>");
      response.end();
    }
  });
  
})
//0xfe4821113eeea096611c151c51daf0cec3e90ce5
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://localhost:%s", port)
 
})

// app.get("/register", function(req, res){
 
//     //获取输入的密码
//     var password = req.query.password;
//     //创建账户
//     var account = web3.personal.newAccount(password);
//     res.send(account);
 
// })
