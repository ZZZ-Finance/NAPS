const DreamUSDTLP = artifacts.require('DreamUSDTLP')
// Stake ZZZ
const stakingToken = '0x9ebcf5928e1903f490707b24404bec32d85b5503'
const rewardToken = '0x53ac1824d39351bc2d7ccd7d84adf92591937de1'
const multiplierToken = '0x9ebcf5928e1903f490707b24404bec32d85b5503'
const calculateCycle = '0x3d3eb13738c72a81e93fcf13ce7a8b3aaabac654'
module.exports = function (deployer) {
  deployer.deploy(
    NapDream,
    stakingToken,
    rewardToken,
    multiplierToken,
    calculateCycle,
  )
}
