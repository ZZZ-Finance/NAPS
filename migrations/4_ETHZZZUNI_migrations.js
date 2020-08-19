const TOKEN = artifacts.require("TOKEN");

module.exports = function (deployer) {
  deployer.deploy(TOKEN,"UNISWAP-V2","UNI",1000);
};
