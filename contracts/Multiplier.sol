pragma solidity ^0.5.17;

import './ERC20.sol';

interface Pool {
  function balanceOf(address account) external view returns (uint256);
}

contract Multiplier {
  // List of all pools that involve ZZZ staked
  using SafeMath for uint;
  using SafeERC20 for IERC20;

  address[] public pools;
  address public owner;
  IERC20 public NAPS = IERC20(address(0));
  IERC20 public ZZZ = IERC20(address(0));
  mapping(address => uint256) public spentNAPS;
  mapping(address => uint256) public NAPSlevel;

  uint256 TenPercentBonus = 1 * 10 ** 17;
  uint256 TwentyPercentBonus = 2 * 10 ** 17;
  uint256 ThirtyPercentBonus = 3 * 10 ** 17;
  uint256 FourtyPercentBonus = 4 * 10 ** 17;
  uint256 FiftyPercentBonus = 5 * 10 ** 17;
  uint256 SixtyPercentBonus = 6 * 10 ** 17;
  uint256 SeventyPercentBonus = 7 * 10 ** 17;
  uint256 EightyPercentBonus = 8 * 10 ** 17;
  uint256 NinetyPercentBonus = 9 * 10 ** 17;
  uint256 OneHundredPercentBonus = 1 * 10 ** 18;

  constructor(address[] memory poolAddresses,address zzzAddress,address napsAddress) public{
    pools = poolAddresses;
    ZZZ = IERC20(zzzAddress);
    NAPS = IERC20(napsAddress);
    owner = msg.sender;
  }
  
  // Set the pool and zzz address if there are any errors.
  function configure(address[] calldata poolAddresses,address zzzAddress,address napsAddress) external {
    require(msg.sender == owner,"Only the owner can call this function");
    pools = poolAddresses;
    ZZZ = IERC20(zzzAddress);
    NAPS = IERC20(napsAddress);
  }

  // Returns the balance of the user's ZZZ accross all staking pools
  function balanceOf(address account) public view returns (uint256) {
    // Loop over the pools and add to total
    uint256 total = 0;
    for(uint i = 0;i<pools.length;i++){
      Pool pool = Pool(pools[i]);
      total = total.add(pool.balanceOf(account));
    }
    // Add zzz balance in wallet if any
    total = total.add(ZZZ.balanceOf(account));
    return total;
  }
  
  function getLevel(address account) external view returns (uint256) {
    if(NAPSlevel[account] == 0) {
      return 1;
    }
    return NAPSlevel[account];
  }

  function getSpent(address account) external view returns (uint256) {
    return spentNAPS[account];
  }

  // Purchase multiplier using naps
  function purchase(uint256 amount) external {
    // Send naps directly to dev wallet for funding
    NAPS.safeTransferFrom(msg.sender,owner,amount);
    spentNAPS[msg.sender] = spentNAPS[msg.sender].add(amount);
    // Update naps level based on the new spentNaps
    if(spentNAPS[msg.sender] < 100 * 10**18) {
      NAPSlevel[msg.sender] = 1;
    }else if(spentNAPS[msg.sender] >= 100 * 10*18 && spentNAPS[msg.sender] < 500 * 10 ** 18) {
      NAPSlevel[msg.sender] = 2;
    }else if(spentNAPS[msg.sender] >= 500 * 10 ** 18) {
      NAPSlevel[msg.sender] = 3;
    }
  }

  function getPermanentMultiplier(address account) public view returns (uint256) {
    uint256 permanentMultiplier = 1 * 10**18;
    uint256 zzzBalance = ZZZ.balanceOf(account);
    if(zzzBalance > 0 && zzzBalance < 10 * 10**18) {
      // More than 0 but less than 10. Additional 10% bonus
      permanentMultiplier = permanentMultiplier.add(TenPercentBonus);
    }else if(zzzBalance >= 10 * 10**18 && zzzBalance < 50 * 10**18) {
      // More than or equals to 10 but less than 50. Additional 30% bonus
      permanentMultiplier = permanentMultiplier.add(ThirtyPercentBonus);
    }else if(zzzBalance >= 50 * 10**18) {
      // More than 50, additional 60% bonus
      permanentMultiplier = permanentMultiplier.add(SixtyPercentBonus);
    }
    return permanentMultiplier;
  }

  function getPurchaseMultiplier(address account) public view returns (uint256) {
    uint256 purchasedMultiplier = 1 * 10**18;
    uint256 level = NAPSlevel[account];
    // Level 1. Add 10% bonus
    if(level == 1) {
      purchasedMultiplier = purchasedMultiplier.add(TenPercentBonus);
    }else if(level == 2) {
      purchasedMultiplier = purchasedMultiplier.add(TwentyPercentBonus);
    }else if(level == 3) {
      purchasedMultiplier = purchasedMultiplier.add(ThirtyPercentBonus);
    }
    return purchasedMultiplier;
  }

  function getTotalMultiplier(address account) public view returns (uint256) {
    return getPermanentMultiplier(account).mul(getPurchaseMultiplier(account)).div(1e18);
  }
}