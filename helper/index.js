const web3 = require("Web3");

const tokens = {
  ZZZ: "0xc75F15AdA581219c95485c578E124df3985e4CE0",
  ZZZETH: "0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
  ZZZNAP: "0x0DE0322D3ac0d5002e2bc9c3a188728728D90799",
  NAP: "0x66b3037aa8dd64c3ef1aee13a4d1f2509f672d1c",
};

const contracts = {
  cycle: "0x3d3eb13738c72a81e93fcf13ce7a8b3aaabac654",
  multiplier: "0x64912352749E2BE98c374B93A57F301f95cF1bfF",
};

const times = {
  minute: 60,
  hour: 60 * 60,
  day: 86400,
  week: 86400 * 7,
  month: 604800 * 28,
};
const multipliers = {
  ZZZETH: {
    napsLevelOneCost: web3.utils.toWei("1875"),
    napsLevelTwoCost: web3.utils.toWei("3750"),
    napsLevelThreeCost: web3.utils.toWei("5625"),
    napsLevelFourCost: web3.utils.toWei("12500"),
    napsLevelFiveCost: web3.utils.toWei("15000"),
    napsLevelSixCost: web3.utils.toWei("20000"),
    napsLevelOneBonus: web3.utils.toWei("0.05"),
    napsLevelTwoBonus: web3.utils.toWei("0.10"),
    napsLevelThreeBonus: web3.utils.toWei("0.15"),
    napsLevelFourBonus: web3.utils.toWei("0.25"),
    napsLevelFiveBonus: web3.utils.toWei("0.3"),
    napsLevelSixBonus: web3.utils.toWei("0.4"),
  },
  ZZZNAP: {
    napsLevelOneCost: web3.utils.toWei("1641"),
    napsLevelTwoCost: web3.utils.toWei("3281"),
    napsLevelThreeCost: web3.utils.toWei("4922"),
    napsLevelFourCost: web3.utils.toWei("10938"),
    napsLevelFiveCost: web3.utils.toWei("13125"),
    napsLevelSixCost: web3.utils.toWei("17500"),
    napsLevelOneBonus: web3.utils.toWei("0.05"),
    napsLevelTwoBonus: web3.utils.toWei("0.10"),
    napsLevelThreeBonus: web3.utils.toWei("0.15"),
    napsLevelFourBonus: web3.utils.toWei("0.25"),
    napsLevelFiveBonus: web3.utils.toWei("0.3"),
    napsLevelSixBonus: web3.utils.toWei("0.4"),
  },
  ZZZ: {
    napsLevelOneCost: web3.utils.toWei("438"),
    napsLevelTwoCost: web3.utils.toWei("875"),
    napsLevelThreeCost: web3.utils.toWei("1313"),
    napsLevelFourCost: web3.utils.toWei("3281"),
    napsLevelFiveCost: web3.utils.toWei("3938"),
    napsLevelSixCost: web3.utils.toWei("5250"),
    napsLevelOneBonus: web3.utils.toWei("0.05"),
    napsLevelTwoBonus: web3.utils.toWei("0.10"),
    napsLevelThreeBonus: web3.utils.toWei("0.15"),
    napsLevelFourBonus: web3.utils.toWei("0.25"),
    napsLevelFiveBonus: web3.utils.toWei("0.3"),
    napsLevelSixBonus: web3.utils.toWei("0.4"),
  },
};
const constructors = {
  ZZZETH: {
    duration: times.day * 12,
    napsDiscountRange: times.hour * 12,
    stakingToken: tokens.ZZZETH,
    rewardToken: tokens.NAP,
    multiplierToken: tokens.NAP,
    cycle: contracts.cycle,
    multiplier: contracts.multiplier,
  },
  ZZZNAP: {
    duration: times.day * 15,
    napsDiscountRange: times.hour * 17,
    stakingToken: tokens.ZZZNAP,
    rewardToken: tokens.NAP,
    multiplierToken: tokens.NAP,
    cycle: contracts.cycle,
    multiplier: contracts.multiplier,
  },
  ZZZ: {
    duration: times.day * 7,
    napsDiscountRange: times.hour * 8,
    stakingToken: tokens.ZZZ,
    rewardToken: tokens.NAP,
    multiplierToken: tokens.NAP,
    cycle: contracts.cycle,
    multiplier: contracts.multiplier,
  },
};

module.exports = {
  constructors,
  multipliers,
};
