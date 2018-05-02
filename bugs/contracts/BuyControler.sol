pragma solidity ^0.4.21;
import './Map.sol';
contract BuyControler {



	function buyPoint(uint x, uint y, uint color) public payable returns (address) {

		Map map = Map(address(0x4b144aaac82dbafec80d93431770bf7fad14bcc1));
		address buyer = msg.sender;
		address aaa = map.setMap.gas(90000)(x, y, color, buyer, 1);

		return aaa;
	}
}