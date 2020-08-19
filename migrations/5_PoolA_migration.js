const YearnRewards = artifacts.require("YearnRewards");
// Stake ZZZ
const rewardToken = "0xc9E5c5E9d1EAb2a5095ceB1769648b91E0a2e332";
const stakingToken = "0xD794F7c87712cbf2349776fF618BE1231c6c9162"

module.exports = function (deployer) {
  deployer.deploy(YearnRewards,rewardToken,stakingToken);
};
