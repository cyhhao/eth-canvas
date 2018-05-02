pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './NamespaceProxy.sol';

contract Map is Ownable {

	NamespaceProxy npContract;
	//	address NpAddr0;
	uint[1000][1000] public paintMap;
	address[1000][1000] public ownerMap;
	uint[1000][1000] public cntMap;


	function Map(address NpAddr) public {
		npContract = NamespaceProxy(NpAddr);
		//		NpAddr0 = NpAddr;
	}

	modifier fromTrust() {
		require(msg.sender == owner || msg.sender == address(npContract.getContract("BuyControler")));
		_;
	}


	function setMap(uint x, uint y, uint color, address buyer) public fromTrust {
		paintMap[x][y] = color;
		ownerMap[x][y] = address(buyer);
		cntMap[x][y] = cntMap[x][y] + 1;
	}

}
