# Deploying Pools

## Multiplier

Before deploying pools, take note of if there are global multipliers required for the pool. In general 'MintableV3.sol` assumes that there is a global multiplier
and 'NonMintableV3.sol' assumes no global multiplier.

## Deployment Setup

1. Clone the repo
2. Add a `password.js` file in the project directory

```
const mnemonic = 'YOUR_PRIVATE_KEY'
const kovan = 'https://kovan.infura.io/v3/1cc6414f2ea040efb5b04b0e850f0aa4'
const mainnet = 'https://mainnet.infura.io/v3/1cc6414f2ea040efb5b04b0e850f0aa4'
const mainnetfork = 'https://node.zzz.finance'
module.exports = {
  mnemonic,
  kovan,
  mainnet,
  mainnetfork,
}

```

3. Add required migrations (see migration scripts below)
4. Run `truffle migrate --network mainnet` to deploy Pools

## Migrations

Migration scripts in the `migrations` folder control the deployment process for the contracts.

### Deployment Process

Generally, pools that will go to pools.zzz.finance involve a global multiplier + non mintable reward tokens. Hence, we can deploy `NonMintableV3.sol`.
Pools that will go to pools.dreamswap.io normally does not involve a global multiplier + mintable reward. Hence, we use `MintableV3.sol`.

These are the constructors required to deploy a pool:

1. Staking Token Contract
2. Reward Token Contract
3. Multiplier Token COntract
4. Cycle Address (fixed at: `0x3d3eb13738c72a81e93fcf13ce7a8b3aaabac654`)
5. Multiplier Address (only for pools with global multiplier: `0x64912352749e2be98c374b93a57f301f95cf1bff`)

For both types of pools (mintable & non mintable) on deployment of the pool contract we :

1. Add deployer as `distributionAddress` via the function `setRewardDistribution` function:

```
Pool.methods
      .setRewardDistribution(owner)
      .send({ from: owner, gas: 100000, gasPrice: 140000000000 })
```

2. Set the amount of rewards to be distributed over the period of time via `notifyReward` function.This function accepts the amount of tokens to be dispensed in WEI.

```
// Pool will dispense 5000 reward tokens over the set duration
Pool.methods
      .notifyRewardAmount('5000000000000000000000')
      .send({ from: owner, gas: 100000, gasPrice: 140000000000 }),

```

Notifying rewards is exactly the same for both mintable and non-mintable pools.

Seeding rewards is slightly different for non-mintable rewards and mintable rewards.

### Mintable pools

For mintable pools, we simply set the deployed pool contract as the minter.

```
RewardToken.methods
      .addMinter(GROWETH.address)
      .send({ from: owner, gas: 100000, gasPrice: 140000000000 })
```

### Non mintable pools

For non-mintable pools, we send approxiamtely half the amount of tokens specified in `notifyReward` and transfer it directly to the pool.

```
// Send the amount of tokens specified in notifyRewards for the Pool
RewardToken.methods
      .transfer(GROWETH_FARMA.address, '99500000000000000000')
      .send({ from: owner, gas: 100000, gasPrice: 140000000000 })
```

### Examples

NON-Mintable pool example: `/migrations/v3/nonmintable_migration.js'
Mintable pool example: '/migrations/v3/mintable_migration.js'
