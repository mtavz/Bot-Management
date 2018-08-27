    pragma solidity ^0.4.21;

contract Vehicles{
    
    function getStatus(string) public returns(int){}
    
    function getType(string) public view returns(string){}
    
    function  getLastOwner(string) public  view returns (address){}
}

contract DateTime{
    function getYear(uint256) constant returns (uint16) {}
    function getMonth(uint256) constant returns (uint16) {}
    function getDay(uint256) constant returns (uint16) {}
    function getHour(uint256) constant returns (uint16) {}
    function getMinute(uint256) constant returns (uint16) {}
    function getSecond(uint256) constant returns (uint16) {}
}



contract BotManagement{
    
    address botAddress;
    int completeSetup=0;
    
    struct Log{
        string plate_id;
        address[] botAddress;
        uint256[] timestamp;
        uint256 length;
    }
    
    mapping(string => Log) logs;
    
    function addLog(string plate_id, address bot_address, uint256 timestamp) public {
        if (logs[plate_id].length ==0){
            logs[plate_id].plate_id = plate_id;
             logs[plate_id].botAddress.push(bot_address) -1;
             logs[plate_id].timestamp.push(timestamp) -1;
             logs[plate_id].length++;
        }
        else{
             logs[plate_id].botAddress.push(bot_address) -1;
             logs[plate_id].timestamp.push(timestamp) -1;
             logs[plate_id].length++;
        }
    }
    
    function getLogs(string plate_id, uint256 index) public view returns(string, address, uint256){
        return (logs[plate_id].plate_id, logs[plate_id].botAddress[index], logs[plate_id].timestamp[index]);
    }
    
    function getLogsLength(string plate_id) public view returns(uint256){
        return logs[plate_id].length;
    }
    
    struct Prices{
            string vehicleType;
            int256 price;
    }
    
    mapping(string => Prices) priceList;
        
    function setPrice(string _type, int256 _price) public{
        priceList[_type].price = _price;
    }
        
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
    DateTime dateTimeContract;
    
    constructor(address _vaddress, address _address) public{
        vehiclesContractAddr = _vaddress;
        vehiclesContract = Vehicles(_vaddress);
        permissionList[_address].owner = _address;
        permissionList[_address].typePermis = 1;
        dateTimeContract = DateTime(address(0xe8660491d945560fecb719bdb96479bed17c577c));
    }
    
    function getDate(uint256 timestamp) public view returns(uint256, uint256, uint256, uint256, uint256, uint256){
        uint256 _year = dateTimeContract.getYear(timestamp);
        uint256 _month = dateTimeContract.getMonth(timestamp);
        uint256 _day = dateTimeContract.getDay(timestamp);
        uint256 _hour = dateTimeContract.getHour(timestamp);
        uint256 _minute = dateTimeContract.getMinute(timestamp);
        uint256 _second = dateTimeContract.getSecond(timestamp);
        return (_year, _month, _day, _hour, _minute, _second);
    }
    
    struct Account{
        address owner;
        int256 balance;
    }
    
    address[] public accountList;
    
    mapping (address => Account) accounts;
    
    struct Bot{
        address owner;
        string addressInfo;
        string Lat;
        string Long;
        int status; //0: deactive, 1: active;
    }
    
    address[] public botList;
    
    mapping( address => Bot) Bots;
    
    function getBotInfo(address _address) public view returns(address, string, string, string, int){
        return (Bots[_address].owner, Bots[_address].addressInfo, Bots[_address].Lat, Bots[_address].Long, Bots[_address].status);
    }
    
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
    
    
    function addBot(address _address, string _addressInfo, string _Lat, string _Long) public returns(bool){
        if (checkPermission()==1){
            Bot storage tmp_bot = Bots[_address];
            tmp_bot.owner=_address;
            tmp_bot.addressInfo=_addressInfo;
            tmp_bot.Lat=_Lat;
            tmp_bot.Long=_Long;
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
    
    function getNow() public view returns (uint256){
        return now;
    }
    
    
    function verifyVehicle(address _address, string _plate_id) public returns (bool){
        if (msg.sender==botAddress){
            if (Bots[_address].status ==1){
                if (vehiclesContract.getStatus(_plate_id) == 1)
                {
                    // address owner = vehiclesContract.getOwnerInfo(_plate_id);
                    accounts[vehiclesContract.getLastOwner(_plate_id)].balance =accounts[vehiclesContract.getLastOwner(_plate_id)].balance-priceList[vehiclesContract.getType(_plate_id)].price;
                    addLog(_plate_id, _address, now);
                    return true;
                }
            }
        }
       return false;
    }
}