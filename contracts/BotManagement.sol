    pragma solidity ^0.4.21;

contract Vehicles{
    
    function getStatus(string) public returns(int){}
    
    function  getLastOwner(string) public  view returns (address){}
}

contract BotManagement{
    
    address botAddress;
    int completeSetup=0;
    
    
    function setBotAddr(address _address) public returns (bool){
        if (completeSetup ==0){
            botAddress = _address;
            // completeSetup =1;    
            return true;
        }
        return false;
    }
    
    function getAccountLenght() public constant returns(uint count) {
        return accountList.length;
    }
    
    
    function getBotLenght() public constant returns(uint count) {
        return botList.length;
    }
    
    Vehicles vehiclesContract;
    address vehiclesContractAddr;
    constructor(address _vaddress, address _address) public{
        vehiclesContractAddr = _vaddress;
        vehiclesContract = Vehicles(_vaddress);
        permissionList[_address].owner = _address;
        permissionList[_address].typePermis = 1;
    }
    
    struct Price{
        string typeofVehicle;
        uint256 priceforVehicle;
    }
    
    mapping (string => Price) pricelist;
    
    
    struct Account{
        address owner;
        int256 balance;
    }
    
    address[] public accountList;
    
    mapping (address => Account) accounts;
    
    struct Bot{
        address owner;
        int status; //0: deactive, 1: active;
    }
    
    address[] public botList;
    
    mapping( address => Bot) Bots;
    
    
    struct Permission{
        address owner;
        int256 typePermis;
        //0. Bị thu hồi các quyền.
        //1. Cấp quyền cho các account khác và các quyền còn lại.
        //2. Chỉ có quyền đăng ký phương tiện, ko có quyền cấp quyền cho account khác.
    }
    
    mapping (address => Permission) permissionList;
    
    function checkPermission() public view returns(int256){
            return permissionList[msg.sender].typePermis;
    }
    
    function addPermission(address _address, int256 _type) public returns(bool){
    if (checkPermission() == 1) {
        permissionList[_address].owner = _address;
        permissionList[_address].typePermis = _type;
        return true;
    }
    return false;
    }
    
    
    function addBot(address _address) public returns(bool){
        if (checkPermission()==1){
            Bot storage tmp_bot = Bots[_address];
            tmp_bot.owner=_address;
            tmp_bot.status= 1;
            botList.push(_address) -1;
            return true;
        }
        return false;
    }
    
    function addAccount(address _address) public returns(bool){
        if (checkPermission()==1 || msg.sender == vehiclesContractAddr){
            Account storage tmp_account = accounts[_address];
            tmp_account.owner = _address;
            accountList.push(_address) -1;
            return true;
        }
        return false;
    }
    
   
    
    function checkAccount(address _address) public view returns(bool){
        if (accounts[_address].owner!=_address){
            return false;
        }
        return true;
    }
    
    function getAccount(uint256 index) public view returns (address, int256){
        return (accounts[accountList[index]].owner, accounts[accountList[index]].balance);
    }
    
    function addCoin(address _address) public payable returns (bool){
        if (checkAccount(_address)){
            accounts[_address].balance=accounts[_address].balance+ (int256)(msg.value);
        }
    }
    

    function addCoin() public payable returns(bool){
        if (accounts[msg.sender].owner==msg.sender){
            accounts[msg.sender].balance=accounts[msg.sender].balance+ (int256)(msg.value);
            return true;
        }
        return false;
    }

    function getBalance(address _address) public view returns(int256){
        return accounts[_address].balance;
    }
    
    function verifyVehicle(address _address, string _plate_id) public returns (bool){
        if (msg.sender==botAddress){
            if (Bots[_address].status ==1){
                if (vehiclesContract.getStatus(_plate_id) == 1)
                {
                    // address owner = vehiclesContract.getOwnerInfo(_plate_id);
                    accounts[vehiclesContract.getLastOwner(_plate_id)].balance =accounts[vehiclesContract.getLastOwner(_plate_id)].balance-100;
                    return true;
                }
            }
        }
       return false;
    }
}