pragma solidity =0.5.16;

contract Lottery {
    address payable public manager;
    address payable[] public players;
    uint256 public round;
    address payable public winner;
    
    constructor() public {
        manager = msg.sender;
    }
    
    modifier onlyManager {
        require(msg.sender == manager);
        _;
    }
    
    // draw lottery
    function drawLottery() onlyManager public {
        bytes memory v1 = abi.encodePacked(block.timestamp, block.difficulty, players.length);
        bytes32 v2 = keccak256(v1);
        uint256 v3 = uint256(v2);
        
        uint256 index = v3 % players.length;
        
        winner = players[index];
        
        uint256 money = address(this).balance * 90 / 100;
        uint256 balance = address(this).balance - money;
        
        winner.transfer(money);
        manager.transfer(balance);
        
        round++;
        delete players;
    }
    
    // repay all players 
    function repayLottery() onlyManager public {
        for(uint256 i = 0; i < players.length; i++) 
            players[i].transfer(1 ether);
            
        round++;
        delete players;
    }
    
    function play() payable public {
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }
    
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function getPlayersNumber() public view returns(uint256) {
        return players.length;
    }
}