import { expect } from "chai";
import { ethers } from "hardhat";

describe("RentalNFT", () => {
  it("mint & rental", async () => {
    const RentalNFT = await ethers.getContractFactory("RentalNFT");
    const rentalNFT = await RentalNFT.deploy("Super NFT", "SNFT");
    await rentalNFT.deployed();

    const [owner, account1] = await ethers.getSigners();

    const minted = await rentalNFT.mint(100, owner.address);
    await minted.wait();
    expect(await rentalNFT.balanceOf(owner.address)).to.equal(1);
    expect(await rentalNFT.ownerOf(100)).to.equal(owner.address);

    const expires = Math.floor(new Date().getTime() / 1000) + 10;
    const result = await rentalNFT.setUser(100, account1.address, expires);
    await result.wait();

    expect(await rentalNFT.userOf(owner.address)).to.not.equal(owner.address);
    expect(await rentalNFT.userOf(100)).to.equal(account1.address);
    expect(await rentalNFT.userExpires(100)).to.equal(expires);
  });
});
