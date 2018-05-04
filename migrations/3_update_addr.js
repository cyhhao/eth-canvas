var NamespaceProxy = artifacts.require("./NamespaceProxy.sol")
var BuyControler = artifacts.require("./BuyControler.sol")


module.exports = function (deployer) {
	deployer
		.then(() => {
			return BuyControler.new("0xf8299435022075ee169f7da2daffc3642602e0d7")
		})
		.then((bc) => {
			NamespaceProxy.deployed().then((instance) => {
				instance.setContract("BuyControler", bc.address)
			})
		})
}
