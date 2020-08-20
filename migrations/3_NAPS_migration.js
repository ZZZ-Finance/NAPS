const TOKEN = artifacts.require("TOKEN");

module.exports = function (deployer) {
  deployer.deploy(TOKEN,"NAPS","NAPS2","20000000000000000000000000");
};
