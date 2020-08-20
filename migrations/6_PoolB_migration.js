const YearnRewards = artifacts.require("YearnRewards");
// Stake UNI
const rewardToken = "0x9EBcF5928E1903f490707b24404beC32d85b5503";
const stakingToken = "0xf63cF54f83932bf900838F8C4eb4A2DB6Dc23c96";

module.exports = function (deployer) {
  deployer.deploy(YearnRewards,rewardToken,stakingToken);
};
