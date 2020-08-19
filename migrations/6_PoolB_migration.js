const YearnRewards = artifacts.require("YearnRewards");
// Stake UNI
const rewardToken = "0xc9E5c5E9d1EAb2a5095ceB1769648b91E0a2e332";
const stakingToken = "0x53Ac413ba4245e0BeE537dF04e9B34ee54EDDc49"

module.exports = function (deployer) {
  deployer.deploy(YearnRewards,rewardToken,stakingToken);
};
