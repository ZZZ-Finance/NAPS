const YearnRewards = artifacts.require("YearnRewards");
// Stake ZZZ
const rewardToken = "0x9EBcF5928E1903f490707b24404beC32d85b5503";
const stakingToken = "0x9f5d2Da0D3CF4c710DC3EFE6e3a790fc363A4EC8"

module.exports = function (deployer) {
  deployer.deploy(YearnRewards,rewardToken,stakingToken);
};
