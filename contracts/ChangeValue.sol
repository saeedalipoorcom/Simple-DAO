// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ChangeValue is Ownable {

  uint256 private defaultValue;

  event valueGetChanged(uint256 newValue);

  function setNewValueTo(uint256 _newValue) public onlyOwner {
    defaultValue = _newValue;
    emit valueGetChanged(_newValue);
  }

  function getValue() public view returns (uint256) {
    return defaultValue;
  }
}