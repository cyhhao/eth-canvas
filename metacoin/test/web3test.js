var Web3 = require('web3')

var rf = require("fs")
var data = rf.readFileSync("../build/contracts/MetaCoin.json", "utf-8")
data = JSON.parse(data)


var mig_data = rf.readFileSync("../build/contracts/Migrations.json", "utf-8")
mig_data = JSON.parse(mig_data)
// console.log(data.abi)

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))

web3.eth.getAccounts().then((accounts) => {
	var myContract = new web3.eth.Contract(data.abi, '0xd6a07cbbdb93e1ddf6f0d376c3f32d9a0f6a089a', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
	})

	var migrant = new web3.eth.Contract(mig_data.abi, '0xa953eF7d773D5ecfDC112067b6a6755432FdF0a4', {
		from: accounts[3], // default from address
		gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
	})

	// console.log(accounts[1])

	migrant.methods.last_completed_migration().call().then(console.log)
	migrant.methods.owner().call().then(console.log)
	console.log(migrant.methods)

	// myContract.methods.addCoin(accounts[2], 1)
	// 	.send({from: accounts[1]})
	// 	.then(console.log)


	myContract.methods.getBalance(accounts[0])
		.call({from: accounts[3]})
		.then((n) => {
			console.log(n, 0)
		})

	myContract.methods.getBalance(accounts[1])
		.call({from: accounts[3]})
		.then((n) => {
			console.log(n, 1)
		})

	myContract.methods.getBalance(accounts[2])
		.call({from: accounts[3]})
		.then((n) => {
			console.log(n, 2)
		})


})


// console.log(myContract)
// console.log(myContract.options.address)

// myContract.methods.getBalance("0xdf377176fdD26b2c79A74d4B41F84781AD80D290")
// 	.call({from:"0xA0C4Bd976243D0c8CaBD96f54f79Fd5C2EFb8CD2"})
// 	.then(console.log)

//3->2
// myContract.methods.sendCoin("0xdf377176fdD26b2c79A74d4B41F84781AD80D290",10)
// 	.send({from:"0xA0C4Bd976243D0c8CaBD96f54f79Fd5C2EFb8CD2"})
// 	.then(console.log)






