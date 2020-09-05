const YearnRewards = artifacts.require("YearnRewards");
// Stake UNI
const rewardToken = "0x9EBcF5928E1903f490707b24404beC32d85b5503";
const stakingToken = "0xf63cF54f83932bf900838F8C4eb4A2DB6Dc23c96";
const cycle = "0x66B3037aa8Dd64c3eF1AEE13a4D1F2509F672D1C";
const multiplier = "0x05d0c213386e25BFB3f3872FCE6c7c7998A3E54C";

module.exports = function (deployer) {
  deployer.deploy(YearnRewards,rewardToken,stakingToken,cycle,multiplier);
};
