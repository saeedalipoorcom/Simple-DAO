const GovernanceToken = artifacts.require("GovernanceToken");
const TimeLock = artifacts.require("TimeLock");
const GovernanceContract = artifacts.require("GovernanceContract");
const ChangeValue = artifacts.require("ChangeValue");

module.exports = async function (deployer) {

  //get accounts
  const accounts = await web3.eth.getAccounts();

  //deploy Governance Token
  await deployer.deploy(GovernanceToken);
  const GovernanceTokenContract = await GovernanceToken.deployed();

  //deploy TimeLock
  await deployer.deploy(TimeLock, 3600, [], []);
  const TimeLockContract = await TimeLock.deployed();

  //deploy GovernanceContractC
  await deployer.deploy(GovernanceContract, GovernanceTokenContract.address, TimeLockContract.address, 1, 5, 4);
  const GovernanceContractC = await GovernanceContract.deployed();

  console.log('GovernanceContract Deployed @ address : ', GovernanceContractC.address);

  //deploy ChangeValue
  await deployer.deploy(ChangeValue); 
  const ChangeValueContract = await ChangeValue.deployed();

  //ChangeValue transfer ownership
  ChangeValueContract.transferOwnership(TimeLockContract.address);

  console.log('ChangeValueContract Deployed @ address : ', ChangeValueContract.address);

};
