pragma solidity ^0.4.19;

contract ENS {
    mapping(string => address) owners;
    mapping(string => uint256) biddingVal;
    mapping(string => address) highestBidders;
    
    modifier isNameExists(string _name) {
        require(owners[_name] == 0);
        _;
    }
    
    modifier isOwner(string _name) {
        require(owners[_name] == msg.sender);
        _;
    }
    
    modifier isHighestBidder(string _name) {
        require(highestBidders[_name] == msg.sender);
        _;
    }
    
    
    function ENS() public {
    }
    
    function reserveName(string _name) public payable isNameExists(_name) returns (bool) {
        if (msg.value > biddingVal[_name]) {
            highestBidders[_name] = msg.sender;
            biddingVal[_name] = msg.value;
            return true;
        }
        
        return false;
    }
    
    function releaseName(string _name) public isOwner(_name) returns (bool) {
        owners[_name] = 0;
        biddingVal[_name] = 0;
        return true;
    }
    
    function claimOwnership(string _name) public isHighestBidder(_name) returns (bool) {
        owners[_name] = msg.sender;
        highestBidders[_name] = 0;
    }
    
    function sendEther(string _name, uint256 _amount) public payable returns (bool) {
        if (msg.value >= _amount && owners[_name] != 0x0000000000000000000000000000000000000000) {
            address owner = owners[_name];
            owner.transfer(_amount);
        } else {
            msg.sender.transfer(_amount);
        }
    }
    
    function getOwner(string _name) public constant returns (address) {
        return owners[_name];
    }
    
    function getHighestBidder(string _name) public constant returns (address) {
        return highestBidders[_name];
    }
    
    function getBiddingVal(string _name) public constant returns (uint256) {
        return biddingVal[_name];
    }
}