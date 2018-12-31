pragma solidity ^0.4.17;

contract Dweibo {
  

  
  
  struct Dongtai {
    address owner;
    string username;
    string content;
    string time;
    uint niceNum;
  }

  struct Account {
    address owner;
    string username;
    string password;
    uint dongtaiNum;
    uint friendNum;
    uint kongDongtai;
    uint kongFriend;
    uint followedNum;

    
    mapping (uint => uint) dongtaiValid;
    mapping (uint => uint) friendValid;
    mapping (uint => Dongtai) dongtais;
    mapping (uint => address) friends;
  }

  event cerateaccount(address owner,string username);
  event adddongtai(uint index,string content,string time,uint niceNum);
  event addfriend(address friend,uint index);
  event deletefriend(address friend,uint index);
  event deletedongtai(uint index);
  event setnice(address owner,uint index,uint niceNum);

  uint internal accountNum = 1;
  
  
  mapping (address => string) internal theName;
  mapping (address => uint) internal accountID;
  mapping (uint => Account) internal accs; 

  
  function createAccount(string name,string password) public {
    require(accountID[msg.sender] == 0);
    
    accountID[msg.sender] = accountNum;
    accs[accountNum] = Account(msg.sender,name,password,0,0,0,0,0);
    theName[msg.sender] = name;
    accountNum++;
  }

  function getPassword() public view returns(string) {
    require(accountID[msg.sender] != 0);
    return accs[accountID[msg.sender]].password;
  }

  function setUsername(string name) public {
    require(accountID[msg.sender] != 0);
    theName[msg.sender] = name;
    accs[accountID[msg.sender]].username = name;
    emit cerateaccount(msg.sender,name);
  }


  function getAccountNum() public view returns(uint) {
    return accountNum - 1;
  }

  function getAccountID() public view returns(uint) {
    require(accountID[msg.sender] != 0);
    return accountID[msg.sender];
  }

  /*function getAccountAddress(uint index) public view returns(address) {
  	require(index<accountNum);
    return accs[index].owner;
  }*/

  function getUsername() public view returns(string) {
  	require(accountID[msg.sender] != 0);
  	return theName[msg.sender];
  }

  function getDongtaiNum() public view returns(uint) {
  	require(accountID[msg.sender]!=0);
  	return accs[accountID[msg.sender]].dongtaiNum-accs[accountID[msg.sender]].kongDongtai;
  }

  function getAllDongtaiNum() public view returns(uint) {
    require(accountID[msg.sender]!=0);
    return accs[accountID[msg.sender]].dongtaiNum;
  }

  function getDongtaiNumByAddress(address owner) public view returns(uint) {
  	require(accountID[owner]!=0);
  	return accs[accountID[owner]].dongtaiNum-accs[accountID[owner]].kongDongtai;
  }

  function getFriendNum() public view returns(uint) {
  	require(accountID[msg.sender]!=0);
  	return accs[accountID[msg.sender]].friendNum-accs[accountID[msg.sender]].kongFriend;
  }

  function getAllFriendNum() public view returns(uint) {
    require(accountID[msg.sender]!=0);
    return accs[accountID[msg.sender]].friendNum;
  }

  function getDongtai(address owner,uint index) public view returns(address,string,string,string,uint) {
  	require(accountID[owner]!=0);
  	if(accs[accountID[owner]].dongtaiValid[index]==1){
     Dongtai memory temp = accs[accountID[owner]].dongtais[index];
     return(temp.owner,temp.username,temp.content,temp.time,temp.niceNum);
   }
  	else return (address(0),"","","",0);
  }

  function getFriendAddress(uint index) public view returns(address) {
  	require(accountID[msg.sender]!=0);
  	if(accs[accountID[msg.sender]].friendValid[index]==1) return accs[accountID[msg.sender]].friends[index];
  	else return address(0);
  }

  function addDongtai(string content,string time) public {
  	address owner = msg.sender;
  	require(accountID[owner]!=0);
    uint dongtaiNum = accs[accountID[owner]].dongtaiNum;
  	accs[accountID[owner]].dongtais[dongtaiNum] = Dongtai(owner,accs[accountID[owner]].username,content,time,0);
  	accs[accountID[owner]].dongtaiValid[dongtaiNum] = 1;
  	accs[accountID[owner]].dongtaiNum++;
  	emit adddongtai(dongtaiNum,content,time,0);
  }

  function addFriend(address friend) public {
  	address owner = msg.sender;
  	require(accountID[owner]!=0 && accountID[friend]!=0);
    uint friendNum = accs[accountID[owner]].friendNum;
  	accs[accountID[owner]].friends[friendNum] = friend;
  	accs[accountID[owner]].friendValid[friendNum] = 1;
  	accs[accountID[owner]].friendNum++;
  	accs[accountID[friend]].followedNum++;
  	emit addfriend(friend,friendNum);
  }

  function deleteDongtai(uint index) public {
  	address owner = msg.sender;
  	require(accountID[owner]!=0);
  	if(accs[accountID[owner]].dongtaiValid[index]==1) {
  		accs[accountID[owner]].dongtais[index]=Dongtai(address(0),"","","",0);
  		accs[accountID[owner]].dongtaiValid[index]=0;
  		accs[accountID[owner]].kongDongtai++;
  		emit deletedongtai(index);
  	}
  }

  function deleteFriend(uint index) public {
  	address owner = msg.sender;
  	require(accountID[owner]!=0);
  	if(accs[accountID[owner]].friendValid[index]==1) {
  		address friend = accs[accountID[owner]].friends[index];
  		accs[accountID[friend]].followedNum--;
  		accs[accountID[owner]].friends[index]=address(0);
  		accs[accountID[owner]].friendValid[index]=0;
  		accs[accountID[owner]].kongFriend++;
  		emit deletefriend(friend,index);
  	}
  }
  
  function getFollowedNum() public view returns(uint) {
  	address owner = msg.sender;
  	require(accountID[owner]!=0);
  	return accs[accountID[owner]].followedNum;
  }

  function setNice(address owner,uint index) public {
  	require(accountID[msg.sender]!=0 && accountID[owner]!=0);
  	if(accs[accountID[owner]].dongtaiValid[index]==1){
  		uint re=accs[accountID[owner]].dongtais[index].niceNum++;
  		emit setnice(owner,index,re);
  	}
  }
  
}