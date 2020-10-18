const TOKEN = artifacts.require("TOKEN");

module.exports = function (deployer) {
  deployer.deploy(TOKEN,"zzz.finance","ZZZ2","20000000000000000000000");
};
