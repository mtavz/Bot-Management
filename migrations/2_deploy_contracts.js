var BotManagement = artifacts.require("./BotManagement.sol");

module.exports = function(deployer) {
  deployer.deploy(BotManagement,"0x547c37304946da1c5f3e88f6f1f2cd77277e5f13", "0x14cce38d6e09016d328acb13d2710b9fbd2f7ec2");
};
