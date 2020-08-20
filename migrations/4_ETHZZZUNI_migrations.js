const TOKEN = artifacts.require("TOKEN");

module.exports = function (deployer) {
  deployer.deploy(TOKEN,"UNISWAP-V2","UNI2","500000000000000000000");
};
