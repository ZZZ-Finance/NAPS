const Snoozer = artifacts.require("Snoozer");
// Stake ZZZ
const rewardToken = "0x9EBcF5928E1903f490707b24404beC32d85b5503";
const stakingToken = "0xDa7D8C06bb60d3E8A3582518CA060c4E97FB1c33";
const cycle = "0xB3135CD228b4233a73d3B42c105092DC8286C71E";
const multiplier = "0x05d0c213386e25BFB3f3872FCE6c7c7998A3E54C";
const multiplierAdr = "0x05d0c213386e25BFB3f3872FCE6c7c7998A3E54C";

module.exports = function (deployer) {
  deployer.deploy(Snoozer, stakingToken, rewardToken, cycle, multiplier, multiplierAdr);
};
