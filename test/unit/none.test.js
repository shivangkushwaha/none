
const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name) ? describe.skip : describe("Deployment", async () => {

    let none, deployer, ram, shyam, totalSupply = 100000000, blockReward = 50;

    beforeEach(async () => {
        console.log("********************** Running Unit Test *****************************")
        let accounts = await getNamedAccounts()
        deployer = accounts.owner
        ram = accounts.ram
        shyam = accounts.shyam
        await deployments.fixture(["all"])
        none = await ethers.getContract("none", deployer)
    })
    // Describing test Cases
    describe("Test cases", async () => {
        it("Check For Owner", async () => {
            expect(await none.owner()).to.equal(deployer);
        })
        it("Check  Total supply is assigned to owner ", async () => {
            const ownerBalance = await none.balanceOf(deployer)
            expect(await none.totalSupply()).to.equal(ownerBalance);
        })
        it("Check For total Token Cap", async () => {
            let cap = await none.cap()
            expect(Number(ethers.utils.formatEther(cap.toString()))).to.equal(Number(totalSupply.toString()));
        })
        it("Check For block Reward to the argument ", async () => {
            let reward = await none.blockReward()
            expect(Number(ethers.utils.formatEther(reward.toString()))).to.equal(blockReward);
        })
    })
})