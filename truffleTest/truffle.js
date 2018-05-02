module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
	networks: {
		"live": {
			network_id: 1, // Ethereum public network
			// optional config values
			// host - defaults to "localhost"
			// port - defaults to 8545
			// gas
			// gasPrice
			// from - default address to use for any transaction Truffle makes during migrations
		},
		"morden": {
			network_id: 2,        // Official Ethereum test network
			host: "178.25.19.88", // Random IP for example purposes (do not use)
			port: 80
		},
		"local":{
			network_id: 5777,
			host: "127.0.0.1",
			port: 7545,
			from:"0xdf377176fdD26b2c79A74d4B41F84781AD80D290"
		},
		"staging": {
			network_id: 1337 // custom private network
			// use default rpc settings
		},
		"development": {
			network_id: "default"
		}
	}

};
