pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/payment/PullPayment.sol';
import './NamespaceProxy.sol';
import './Map.sol';

contract BuyControler is Ownable, PullPayment {
	using SafeMath for uint256;

	NamespaceProxy npContract;
	//200 Szabo
	uint basePrice = 200000000000000;

	function BuyControler(address NpAddr) public {
		npContract = NamespaceProxy(NpAddr);
	}

	function getPointPrice(uint x, uint y, uint color) public view returns (uint, uint) {
		Map map = Map(address(npContract.getContract("Map")));
		uint cnt = map.cntMap(x, y);
		//price= cnt*2*basePrice+basePrice
		uint payLast = SafeMath.mul(SafeMath.mul(cnt, 2), basePrice);
		uint price = SafeMath.add(payLast, basePrice);
		return (price, payLast);
	}



	modifier isAllow(uint x, uint y, uint color) {
		uint width = npContract.getConstantUint("width");
		uint height = npContract.getConstantUint("height");
		uint colorType = npContract.getConstantUint("colorType");
		require(x < width && y < height && color > 0 && color < colorType);
		_;
	}

	function paintPoint(uint x, uint y, uint color) internal returns (address) {
		Map map = Map(address(npContract.getContract("Map")));
		address buyer = msg.sender;
		map.setMap(x, y, color, buyer);
		return map.ownerMap(x, y);
	}


	function sendBuyPayment(address lastOwner, uint payLast) internal {
		if (lastOwner != address(0) || payLast == 0) {
			asyncSend(lastOwner, payLast);
			asyncSend(address(0xA020eDb9f8aBCc883aa8C8C1171455D6E0e95d42), basePrice);
		}
	}

	function buyPoint(uint x, uint y, uint color) public payable isAllow(x, y, color) returns (uint) {
		uint price;
		uint payLast;
		(price, payLast) = this.getPointPrice(x, y, color);
		require(msg.value >= price);
		//set
		address lastOwner = paintPoint(x, y, color);
		//sendPay

		sendBuyPayment(lastOwner, payLast);

		return price;
	}
}
