const TOKEN = artifacts.require("TOKEN");

module.exports = function (deployer) {
  deployer.deploy(TOKEN,"zzz.finance","ZZZ",20000);
};
