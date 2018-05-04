var NamespaceProxy = artifacts.require("./NamespaceProxy.sol")
var BuyControler = artifacts.require("./BuyControler.sol")
var Map = artifacts.require("./Map.sol")
var rf = require("fs")
let npContract

let configs = {
	NamespaceProxy: {},
	BuyControler: {},
	Map: {},
}
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
			console.log("NamespaceProxy:", npContract.address)
			configs.NamespaceProxy["address"] = npContract.address
			configs.NamespaceProxy["abi"] = npContract.abi
			return BuyControler.new(npContract.address)
		})
		.then((bc) => {
			console.log("BuyControler:", bc.address)
			configs.BuyControler["address"] = bc.address
			configs.BuyControler["abi"] = bc.abi

			npContract.setContract("BuyControler", bc.address)
			// deployer.deploy(Map, npContract.address)

			return Map.new(npContract.address)
		})
		.then((map) => {
			console.log("Map:", map.address)
			configs.Map["address"] = map.address
			configs.Map["abi"] = map.abi
			npContract.setContract("Map", map.address)
		})
		.then(() => {
			rf.writeFileSync('./UI/static/contracts_config.json', JSON.stringify(configs), 'utf-8')
		})

}
