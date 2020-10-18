const ZZZ = artifacts.require("NonMintableV3");
const { constructors, multipliers } = require("../helper");

module.exports = async function (deployer, network, accounts) {
  const constructor = constructors.ZZZ;
  const constructorArgs = Object.entries(constructor).map(
    ([key, value]) => value
  );
  await deployer.deploy(ZZZ, ...constructorArgs);
  let Pool = new web3.eth.Contract(ZZZ.abi, ZZZ.address);
  // let RewardCoin = new web3.eth.Contract(ERC20.abi, rewardToken);

  console.log("Setting distributor for pool");
  await Promise.all([
    Pool.methods
      .setRewardDistribution(accounts[0])
      .send({ from: accounts[0], gas: 100000, gasPrice: 140000000000 }),
  ]);

  // console.log("Seeding pool with rewards");
  // await Promise.all([
  //   RewardCoin.methods
  //     .transfer(NonMintableV3.address, web3.utils.toWei("500000"))
  //     .send({ from: accounts[0], gas: 100000, gasPrice: 140000000000 }),
  // ]);

  console.log("Setting pool rewards");
  const multis = multipliers.ZZZ;
  const multiArgs = Object.entries(multis).map(([key, value]) => value);
  const tx = await Pool.methods
    .changeNAPSlevels(...multiArgs)
    .send({ from: accounts[0], gas: 1000000, gasPrice: 140000000000 });
  console.log(tx);
};
