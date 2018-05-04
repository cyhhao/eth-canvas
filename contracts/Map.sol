pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './NamespaceProxy.sol';

contract Map is Ownable {

    NamespaceProxy npContract;
    //	address NpAddr0;
    uint8[50][50] public paintMap;
    address[50][50] public ownerMap;
    uint[50][50] public cntMap;


    function Map(address NpAddr) public {
        npContract = NamespaceProxy(NpAddr);
        //		NpAddr0 = NpAddr;
    }

    modifier fromTrust() {
        require(msg.sender == owner || msg.sender == address(npContract.getContract("BuyControler")));
        _;
    }


    function setMap(uint x, uint y, uint8 color, address buyer) public fromTrust {
        paintMap[x][y] = color;
        ownerMap[x][y] = buyer;
        cntMap[x][y] = cntMap[x][y] + 1;
    }

    function getPaintMap() public view returns (uint8[50][50]){
        return paintMap;
    }

    function getPaintMapRow(uint x) public view returns (uint8[50]){
        return paintMap[x];
    }


}
