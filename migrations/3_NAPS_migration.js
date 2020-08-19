const TOKEN = artifacts.require("TOKEN");

module.exports = function (deployer) {
  deployer.deploy(TOKEN,"NAPS","NAPS",20000000);
};
