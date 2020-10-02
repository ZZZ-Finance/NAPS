const MintableV3 = artifacts.require('MintableV3')
const stakingToken = 'CHANGE_THIS'
const rewardToken = 'CHANGE_THIS'
const multiplierToken = 'CHANGE_THIS'
// THis below is fixed
const cycle = '0x3d3eb13738c72a81e93fcf13ce7a8b3aaabac654'
const multiplier = '0x64912352749E2BE98c374B93A57F301f95cF1bfF'
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(
    MintableV3,
    stakingToken,
    rewardToken,
    multiplierToken,
    cycle,
  )
  let Pool = new web3.eth.Contract(MintableV3.abi, MintableV3.address)
  let RewardCoin = new web3.eth.Contract(ERC20.abi, rewardToken)

  console.log('Setting distributor for pool')
  await Promise.all([
    Pool.methods
      .setRewardDistribution(accounts[0])
      .send({ from: accounts[0], gas: 100000, gasPrice: 140000000000 }),
  ])

  console.log('Set pool as minter')
  await Promise.all([
    RewardCoin.methods
      .addMinter(MintableV3.address)
      .send({ from: owner, gas: 100000, gasPrice: 140000000000 }),
  ])

  console.log('Setting pool rewards')
  await Promise.all([
    // 1 mil rewards set
    Pool.methods
      .notifyRewardAmount('210')
      .send({ from: accounts[0], gas: 100000, gasPrice: 140000000000 }),
  ])
}
