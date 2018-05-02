var Web3 = require("web3")
// 创建web3对象
var web3 = new Web3()
// 连接到以太坊节点
web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"))

// web3.

// 合约ABI
var abi = [{
	"constant": false,
	"inputs": [{"name": "receiver", "type": "address"}, {"name": "amount", "type": "uint256"}],
	"name": "sendCoin",
	"outputs": [{"name": "sufficient", "type": "bool"}],
	"payable": false,
	"type": "function"
}, {
	"constant": false,
	"inputs": [{"name": "addr", "type": "address"}],
	"name": "getBalance",
	"outputs": [{"name": "", "type": "uint256"}],
	"payable": false,
	"type": "function"
}, {"inputs": [], "payable": false, "type": "constructor"}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
		"indexed": true,
		"name": "_to",
		"type": "address"
	}, {"indexed": false, "name": "_value", "type": "uint256"}],
	"name": "Transfer",
	"type": "event"
}]
// 合约地址
var address = "0x3eAa73d4925939B8eBC9FD49A8EcF67F8037EA7B"
// 通过ABI和地址获取已部署的合约对象

var metacoin = new web3.eth.Contract(abi, address)
console.log(metacoin)
console.log(metacoin.methods.getBalance)

web3.eth.getAccounts().then(function (t) {
	console.log(t)
	var A = t[0]
	var B = t[1]

	var txhash = metacoin.methods.sendCoin(B, 100).send({from: A})
	console.log(txhash)
	metacoin.methods.getBalance(A).call().then(function (ans) {
		console.log("account one balance: ", ans)
	})


})

