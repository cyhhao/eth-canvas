var Migrations = artifacts.require("./Migrations.sol");
// var BuyControler = artifacts.require("./BuyControler.sol");
var Map = artifacts.require("./Map.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  // deployer.deploy(BuyControler);
  deployer.deploy(Map);
};
