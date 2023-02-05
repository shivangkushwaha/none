

const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name) ? describe.skip : describe("Deployment", async () => {
    let none, deployer
    beforeEach(async () => {
        console.log("********************** Running Staging Test *****************************")
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        none = await ethers.getContract("none", deployer)
        consoa.log("none", none)
    })

    // Describing 
})