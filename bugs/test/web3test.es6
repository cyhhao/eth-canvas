var Web3 = require('web3')

var rf = require("fs")
// var npdata = rf.readFileSync("../build/contracts/NamespaceProxy.json", "utf-8")
// npdata = JSON.parse(npdata)

var bcdata = rf.readFileSync("../build/contracts/BuyControler.json", "utf-8")
bcdata = JSON.parse(bcdata)

var mapdata = rf.readFileSync("../build/contracts/Map.json", "utf-8")
mapdata = JSON.parse(mapdata)


// console.log(data.abi)
~(async () => {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
	let accounts = await web3.eth.getAccounts()

	// var npContract = new web3.eth.Contract(npdata.abi, '0x345ca3e014aaf5dca488057592ee47305d9b3e10', {
	// 	from: accounts[3], // default from address
	// 	gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
	// })

	var bcContract = new web3.eth.Contract(bcdata.abi, '0xe548569d9d98edc8f606ec7c1a284588671a07b4', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
	})

	var mapContract = new web3.eth.Contract(mapdata.abi, '0x4b144aaac82dbafec80d93431770bf7fad14bcc1', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
	})
	let res
	// let res = await npContract.methods.setConstantUint("width", 3000)
	// 	.send({from: accounts[0]})
	// console.log(res)

	// res = await npContract.methods.getContract("BuyControler").call()
	// console.log(res)

	// res = await bcContract.methods.getPointPrice(10, 20)
	// 	.send({from: accounts[7], value: Math.pow(10, 18)})//, value: Math.pow(10, 17)
	// console.log(res)

	// res = await web3.eth.getBalance("0xe548569d9d98edc8f606ec7c1a284588671a07b4")
	// console.log(res)

	res = await bcContract.methods.buyPoint(10, 20, 14)
		.send({from: accounts[0], value: Math.pow(10, 16)})//, value: Math.pow(10, 17)
		.catch((e) => {
			console.error(e)
		})
	console.log(res)

	// res = await mapContract.methods.setMap(10, 20, 11, "0xa791b67904e499eb17569c6608ad3197dcad07df", 10)
	// 	.send({from: accounts[0]})//, value: Math.pow(10, 17)
	// console.log(res)
	//
	res = await mapContract.methods.last().call()
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






