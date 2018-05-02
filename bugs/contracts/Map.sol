pragma solidity ^0.4.21;
contract Map {
	uint[1000][1000] public paintMap;
	address[1000][1000] public ownerMap;
	uint[1000][1000] public cntMap;
	address public last;

	function setMap(uint x, uint y, uint color, address buyer, uint buyCnt) public returns (address) {
		paintMap[x][y] = color;
		last = buyer;
		cntMap[x][y] = buyCnt;
		return buyer;
	}

}