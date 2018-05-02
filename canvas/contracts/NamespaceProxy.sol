pragma solidity ^0.4.21;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract NamespaceProxy is Ownable {
	mapping(string => address) allContracts;
	mapping(string => uint) constantUint;

	modifier nameNotEmpty(string name) {
		require(bytes(name).length != 0);
		_;
	}

	function setContract(string name, address addr) public onlyOwner nameNotEmpty(name) returns (bool) {
		require(addr != address(0));

		if (allContracts[name] != address(0)) {
			allContracts[name] = addr;
			return true;
		}
		else {
			allContracts[name] = addr;
			return false;
		}
	}


	function getContract(string name) public view returns (address addr){
		return allContracts[name];
	}

	function getContractd(string name) public view returns (address){
		return allContracts[name];
	}

	function setConstantUint(string name, uint value) public onlyOwner nameNotEmpty(name) {
		constantUint[name] = value;
	}

	function getConstantUint(string name) public view returns (uint) {
		return constantUint[name];
	}


}
