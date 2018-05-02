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
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
	let accounts = await web3.eth.getAccounts()

	var npContract = new web3.eth.Contract(npdata.abi, '0xf75bac9de724f8f009a5875199a564920fbff3d9', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
		, gas: 1000000
	})

	var bcContract = new web3.eth.Contract(bcdata.abi, '0x4bb7ae12e439e010a00e60bc9eb2337eba677dd1', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
		, gas: 1000000
	})

	var mapContract = new web3.eth.Contract(mapdata.abi, '0xe18ded8a92aaa78a663eef0621bdef8c1d0174f0', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
		, gas: 1000000
	})
	let res

	res = await web3.eth.getBalance("0x4bb7ae12e439e010a00e60bc9eb2337eba677dd1")
	console.log(res)

	// let price = await bcContract.methods.getPointPrice(10, 20, 14)
	// 	.call({from: accounts[3]})//, value: Math.pow(10, 17)
	// 	.catch((e) => {
	// 		console.error(e)
	// 	})
	// console.log(price[0])
	// let p =  new BigNumber(price[0])
	// // p.mul(1000000000000)
	//
	// res = await bcContract.methods.buyPoint(10, 20, 14)
	// 	.send({from: accounts[2], value: p })//, value: Math.pow(10, 17)
	// 	.catch((e) => {
	// 		console.error(e)
	// 	})
	// console.log(res)


	res = await bcContract.methods.withdrawPayments()
		.send({from: accounts[4]})
	console.log(res)
	//
	res = await bcContract.methods.payments("0xA020eDb9f8aBCc883aa8C8C1171455D6E0e95d42")
		.call({from: accounts[0]})
	console.log(res)

	res = await mapContract.methods.ownerMap(10, 20).call()
	console.log(res)



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






