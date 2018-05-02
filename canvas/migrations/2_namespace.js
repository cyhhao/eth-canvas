var NamespaceProxy = artifacts.require("./NamespaceProxy.sol")
var BuyControler = artifacts.require("./BuyControler.sol")
var Map = artifacts.require("./Map.sol")

let npContract
module.exports = function (deployer) {
	deployer
		.then(() => {
			return NamespaceProxy.new()
		})
		.then((np) => {
			npContract = np
			npContract.setConstantUint("width", 1000)
			npContract.setConstantUint("height", 1000)
			npContract.setConstantUint("colorType", 32)

			// npContract.setContract("NamespaceProxy", npContract.address);
			// deployer.deploy(BuyControler, npContract.address)
			console.log("NamespaceProxy:",npContract.address);
			return BuyControler.new(npContract.address)
		})
		.then((bc) => {
			console.log("BuyControler:",bc.address);
			npContract.setContract("BuyControler", bc.address);
			// deployer.deploy(Map, npContract.address)

			return Map.new(npContract.address);
		})
		.then((map)=>{
			console.log("Map:",map.address);
			npContract.setContract("Map", map.address);
		})

}
