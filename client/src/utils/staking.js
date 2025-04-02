import { Contract } from '@ethersproject/contracts';
import { BigNumber, ethers } from "ethers";
import { getCollectionContract, getContractInfo, getContractObj } from ".";

const getStakeName = function (name) {
    return "Stake" + name;
}
export async function getApy(stakeName, chainId, provider) {
    const stakeContract = getContractObj(getStakeName(stakeName), chainId, provider);
    const stakedSupply = await stakeContract.stakedSupply();
    if (stakedSupply.toString() === '0') return Infinity;
    return parseInt(parseFloat(BigNumber.from(365).mul(28800).div(stakedSupply * 1000).toString()) * 100);
}
export async function iApprovedForStaking(account, stakeName, collection, chainId, provider) {
    const stakeContract = getContractObj(getStakeName(stakeName), chainId, provider);
    const collectionContract = getCollectionContract(collection, chainId, provider);
    return await collectionContract.isApprovedForAll(account, stakeContract.address);
}
export async function setApprovedForStaking(stakeName, collection, chainId, provider) {
    const stakeContract = getContractObj(getStakeName(stakeName), chainId, provider);
    const collectionContract = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await collectionContract.setApprovalForAll(stakeContract.address, true);
        await tx.wait(1);
        return true;
    }catch(e) {
        console.log(e);
        return false;
    }
}
export async function getClaimable(account, stakeName, chainId, provider) {
    const stakeContract = getContractObj(getStakeName(stakeName), chainId, provider);
    const userInfo = await stakeContract.userInfo(account);
    if (userInfo) {
        return [userInfo.amount.toString(), userInfo.pending.toString()]
    } else return [0, 0]
}
export async function deposit(account, stakeName, collection, tokenIds, chainId, provider) {
    const stakeContract = getContractObj(getStakeName(stakeName), chainId, provider);
    try {
        let isApproved = await iApprovedForStaking(account, stakeName, collection, chainId, provider);
        if(!isApproved) {
            isApproved = await setApprovedForStaking(stakeName, collection, chainId, provider);
        }
        const tx = await stakeContract.deposit(tokenIds);
        await tx.wait(2);
        return true;
    } catch (err) {
        console.log("DepositError: ", err);
        return false;
    }
}
export async function claimRewards(stakeName, chainId, provider) {
    const stakeContract = getContractObj(getStakeName(stakeName), chainId, provider);
    try {
        const tx = await stakeContract.claimReward();
        await tx.wait(2);
        return true;
    } catch (err) {
        console.log("ClaimError: ", err);
        return false;
    }
}
export async function withdraw(stakeName, chainId, provider) {
    const stakeContract = getContractObj(getStakeName(stakeName), chainId, provider);
    try {
        const tx = await stakeContract.withdraw();
        await tx.wait(2);
        return true;
    } catch (err) {
        console.log("WithdrawError: ", err);
        return false;
    }
}