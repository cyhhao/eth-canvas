module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	networks: {
		dev: {
			host: "127.0.0.1",
			port: 7545,
			// provider: new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/"),
			network_id: "5777" // Match any network id
		},
		rinkeby:{
			host: "127.0.0.1",
			port: 8545,
			// provider: new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/"),
			network_id: "*"
		},
		dev2: {
			host: "127.0.0.1",
			port: 9545,
			// provider: new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/"),
			network_id: "5777" // Match any network id
		},

	}
};
