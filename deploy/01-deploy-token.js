const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utills/verify");
const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("2")
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [100000000, 50];
    const token = await deploy("none", {
        from: deployer,
        args,
        log: true,
        waitconfirmations: network.config.blockconfirmations
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying contract On chain wait a minute...")

        await verify(token.address, args)
    }
    log("************************ Script Ended *************************")
}

module.exports.tags = ["all", "NoneToken"]