var Web3 = require('web3')
var BigNumber = require('bignumber.js')
var rf = require("fs")
var npdata = rf.readFileSync("../build/contracts/NamespaceProxy.json", "utf-8")
npdata = JSON.parse(npdata)

var bcdata = rf.readFileSync("../build/contracts/BuyControler.json", "utf-8")
bcdata = JSON.parse(bcdata)

var mapdata = rf.readFileSync("../build/contracts/Map.json", "utf-8")
mapdata = JSON.parse(mapdata)


// console.log(data.abi)
~(async () => {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
	let accounts = await web3.eth.getAccounts()

	var npContract = new web3.eth.Contract(npdata.abi, '0xf8299435022075ee169f7da2daffc3642602e0d7', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
		, gas: 1000000
	})

	var bcContract = new web3.eth.Contract(bcdata.abi, '0x4bb7ae12e439e010a00e60bc9eb2337eba677dd1', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
		, gas: 1000000
	})

	var mapContract = new web3.eth.Contract(mapdata.abi, '0xe638250b6b5a122b2d3220a556e2318a4367f048', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
		, gas: 6721975000
	})
	let res


	// res = await bcContract.methods.buyPoint(10, 20, 14)
	// 	.send({from: accounts[2], value: p })//, value: Math.pow(10, 17)
	// 	.catch((e) => {
	// 		console.error(e)
	// 	})
	// console.log(res)

	res = await npContract.methods.setContract("BuyControler", "0xC5A795860B5F25b16618d1832B2b0217f3Fc42ba")
		.send({from: accounts[0]})


})()


// console.log(myContract)
// console.log(myContract.options.address)

// myContract.methods.getBalance("0xdf377176fdD26b2c79A74d4B41F84781AD80D290")
// 	.call({from:"0xA0C4Bd976243D0c8CaBD96f54f79Fd5C2EFb8CD2"})
// 	.then(console.log)

//3->2
// myContract.methods.sendCoin("0xdf377176fdD26b2c79A74d4B41F84781AD80D290",10)
// 	.send({from:"0xA0C4Bd976243D0c8CaBD96f54f79Fd5C2EFb8CD2"})
// 	.then(console.log)






