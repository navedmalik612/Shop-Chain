require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
   networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/INFURA API KEY",
      accounts: ['Private Key']
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/INFURA API KEY",
      chainId: 11155111,
      accounts: ['Private Key']
    },
    ganache:{
      url: "http://127.0.0.1:7545",
    }

  },
  
};
