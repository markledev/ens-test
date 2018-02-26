var Migrations = artifacts.require("./Migrations.sol");
var ENS = artifacts.require("./ENS.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ENS);
};
