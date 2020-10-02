pragma solidity 0.6.0;

import './ERC20.sol';

interface Pool {
  function balanceOf(address account) external view returns (uint256);
}

contract Multiplier is Ownable {
  // List of all pools that involve ZZZ staked
  using SafeMath for uint;
  using SafeERC20 for IERC20;

  address[] public pools;
  address public owner;
  IERC20 public ZZZ = IERC20(address(0));
  
  uint256 public constant TwoPercentBonus = 2 * 10 ** 16;
  uint256 public constant TenPercentBonus = 1 * 10 ** 17;
  uint256 public constant TwentyPercentBonus = 2 * 10 ** 17;
  uint256 public constant SixtyPercentBonus = 6 * 10 ** 17;

  constructor(address[] memory poolAddresses,address zzzAddress) public{
    pools = poolAddresses;
    ZZZ = IERC20(zzzAddress);
    owner = msg.sender;
  }
  
  // Set the pool and zzz address if there are any errors.
  function configure(address[] calldata poolAddresses,address zzzAddress) external onlyOwner {
    pools = poolAddresses;
    ZZZ = IERC20(zzzAddress);
  }

  // Returns the balance of the user's ZZZ accross all staking pools
  function balanceOf(address account) public view returns (uint256) {
    // Loop over the pools and add to total
    uint256 total;
    for(uint i = 0;i<pools.length;i++){
      Pool pool = Pool(pools[i]);
      total = total.add(pool.balanceOf(account));
    }
    // Add zzz balance in wallet if any
    total = total.add(ZZZ.balanceOf(account));
    return total;
  }
  function getPermanentMultiplier(address account) public view returns (uint256) {
    uint256 zzzBalance = balanceOf(account);
    if (zzzBalance >= 0 && zzzBalance < 1 * 10**18) {
      // Below 1, 0 percent bonus
      return 0;
    }else if (zzzBalance >= 1 * 10**18 && zzzBalance < 5*10**18) {
      // Between 1 to 5, 2 percent bonus
      return TwoPercentBonus;
    }else if (zzzBalance >= 5 * 10**18 && zzzBalance < 10 * 10**18) {
      // Between 5 to 10, 10 percent bonus
      return TenPercentBonus;
    }else if (zzzBalance >= 10 * 10**18 && zzzBalance < 20 * 10 ** 18) {
      // Between 10 and 20, 20 percent bonus
      return TwentyPercentBonus;
    }else {
      // More than 20, 60 percent bonus
      return SixtyPercentBonus;
    }
  }
}
