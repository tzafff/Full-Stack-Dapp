// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Upload {

    struct Access{
        address user;
        bool access;
    }

    mapping(address =>string[]) value; //to store the url of piniata
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList; // to give ownership
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, string calldata url) external {
        value[_user].push(url);
    }

    function allow(address _user) external {
        ownership[msg.sender][_user]=true;
        if(previousData[msg.sender][_user]==true){
            for(uint i=0; i<accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }
        else {
            accessList[msg.sender].push(Access(_user,true));
            previousData[msg.sender][_user]=true;
        }
        
    }

    function disallow(address _user) external {
        ownership[msg.sender][_user]=false;
        for(uint i=0; i<accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].access = false;
                }
        }
    }

    function display(address _user) external view returns(string[] memory){
        require(_user==msg.sender || ownership[_user][msg.sender], "You dont have access");
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory){
        return accessList[msg.sender];
    }

}


//0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0