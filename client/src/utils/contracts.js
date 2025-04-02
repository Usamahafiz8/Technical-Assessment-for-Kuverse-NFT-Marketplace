import { BigNumber, ethers } from "ethers";
import { getCollectionContract, getContractInfo, getContractObj } from ".";
import { koreNFTABI } from "./KoreNFT_abi";
const tokenDecimal = 18;

export function isAddress(address) {
    try {
        ethers.utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}

export function toEth(amount) {
    return ethers.utils.formatEther(String(amount), { commify: true });
}

export function toWei(amount) {
    return ethers.utils.parseEther(String(amount));
}
/**
 * Governance Token Contract Management
 */
export async function getNativeBalance(account, library) {
    const balance = await library.getBalance(account);
    return ethers.utils.formatEther(balance);
}
export async function getTokenBalance(account, chainId, provider) {
    const Token = getContractObj('KoreToken', chainId, provider);
    if (Token) {
        const balance = await Token.balanceOf(account);
        return ethers.utils.formatUnits(balance, tokenDecimal);
        // return balance;
    }
    return 0;
}
export async function addGovernanceToken(chainId, provider) {
    const Token = getContractObj('KoreToken', chainId, provider);
    const symbol = "KORE";
    const decimals = 18;
    try {
        // detect Metamask and get the provider
        const { ethereum } = window;
        if (!ethereum) {
            alert("Metamask is not installed");
            return;
        }
        // request access to the user's Metamask account
        await ethereum.request({ method: "eth_requestAccounts" });

        // add the token to Metamask
        await ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: Token.address,
                    symbol: symbol,
                    decimals: decimals,
                    image: "https://kuverse.ca/apple-touch-icon.png", // replace with the token image URL
                },
            },
        });
        alert(`${symbol} has been added to Metamask`);
    } catch (error) {
        console.error(error);
        alert("An error occurred");
    }
}
export async function c_airdropSupply(chainId, provider) {
    const contractObj = getContractObj('KoreToken', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.airdropSupply();
        return toEth(res).toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function c_mintSupply(chainId, provider) {
    const contractObj = getContractObj('KoreToken', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.mintSupply();
        return toEth(res).toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function c_mintPrice(chainId, provider) {
    const contractObj = getContractObj('KoreToken', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.price();
        return toEth(res).toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function c_mintKore(amount, fee, chainId, provider) {
    const contractObj = getContractObj('KoreToken', chainId, provider);
    if (!contractObj) return false;
    try {
        const tx = await contractObj.mint(amount, { value: fee });
        await tx.wait(1);
        return { code: true, message: '' };
    } catch (e) {
        console.log(e.message);
        return { code: false, message: e.message };
    }
}

// Collector  
export async function co_Supply(chainId, provider) {
    const contractObj = getContractObj('CollectorNFT', chainId, provider);
    if (!contractObj) return null;
    try {
        const res = await contractObj.maleStartIndex();
        const res1 = await contractObj.femaleStartIndex();
        return { maleCount: res.toString(), femaleCount: res1.toString() }
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function co_mintPrice(chainId, provider) {
    const contractObj = getContractObj('CollectorNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.price();
        return toEth(res).toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function co_mintToken(model, fee, chainId, provider) {
    const contractObj = getContractObj('CollectorNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const tx = await contractObj.mint(model, { value: fee });
        await tx.wait(1);
        return { code: true, message: '' };
    } catch (e) {
        console.log(e.message);
        return { code: false, message: e.message };
    }
}
// Backpack  
export async function ba_Supply(chainId, provider) {
    const contractObj = getContractObj('BackpackNFT', chainId, provider);
    if (!contractObj) return null;
    try {
        const res = await contractObj.classicStartIndex();
        const res1 = await contractObj.specialStartIndex();
        const res2 = await contractObj.founderStartIndex();
        return { classicCount: res.toString(), specialCount: res1.toString(), founderCount: res2.toString() }
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
export async function ba_mintPrice(chainId, provider) {
    const contractObj = getContractObj('BackpackNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.price();
        return toEth(res).toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function ba_mintToken(model, fee, chainId, provider) {
    const contractObj = getContractObj('BackpackNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const tx = await contractObj.mint(model, { value: fee });
        await tx.wait(1);
        return { code: true, message: '' };
    } catch (e) {
        console.log(e.message);
        return { code: false, message: e.message };
    }
}
// Ku  
export async function ku_Supply(chainId, provider) {
    const contractObj = getContractObj('KuNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.totalSupply();
        return res.toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function ku_mintPrice(chainId, provider) {
    const contractObj = getContractObj('KuNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.price();
        return toEth(res).toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function ku_mintToken(fee, chainId, provider) {
    const contractObj = getContractObj('KuNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const tx = await contractObj.mint({ value: fee });
        await tx.wait(1);
        return { code: true, message: '' };
    } catch (e) {
        console.log(e.message);
        return { code: false, message: e.message };
    }
}
// Item  
export async function it_Supply(chainId, provider) {
    const contractObj = getContractObj('ItemNFT', chainId, provider);
    if (!contractObj) return null;
    try {
        const res = await contractObj.kuberryStartIndex();
        const res1 = await contractObj.samanutStartIndex();
        const res2 = await contractObj.moonmelonStartIndex();
        const res3 = await contractObj.ironBeakStartIndex();
        return { kuberryCount: res.toString(), samanutCount: res1.toString(), moonmelonCount: res2.toString(), ironBeakCount: res3.toString() }
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
export async function it_mintPrice(chainId, provider) {
    const contractObj = getContractObj('ItemNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const res = await contractObj.price();
        return toEth(res).toString();
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function it_mintToken(model, fee, chainId, provider) {
    const contractObj = getContractObj('ItemNFT', chainId, provider);
    if (!contractObj) return false;
    try {
        const tx = await contractObj.mint(model, { value: fee });
        await tx.wait(1);
        return { code: true, message: '' };
    } catch (e) {
        console.log(e.message);
        return { code: false, message: e.message };
    }
}

// Marketplace
export async function isTokenApprovedForMarket(account, amount, chainId, provider) {
    const marketContract = getContractObj('KuverseMarket', chainId, provider);
    const tokenContract = getContractObj('KoreToken', chainId, provider);

    const allowance = await tokenContract.allowance(account, marketContract.address);
    if (BigNumber.from(toWei(amount)).gt(allowance)) {
        return false;
    }
    return true;
}
export async function approveTokenForMarket(chainId, signer) {
    const marketContract = getContractObj('KuverseMarket', chainId, signer);
    const tokenContract = getContractObj('KoreToken', chainId, signer);

    const approveAmount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
    try {
        const approve_tx = await tokenContract.approve(marketContract.address, approveAmount);
        await approve_tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
/**
 * NFT Contract Management
 */
export async function isNFTApprovedForMarket(collection, account, chainId, provider) {
    const marketContract = getContractObj('KuverseMarket', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, marketContract.address);
}
export async function setNFTApprovalForMarket(collection, approved, chainId, provider) {
    const marketContract = getContractObj('KuverseMarket', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.setApprovalForAll(marketContract.address, approved);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}
/**
 * Market Contract Management
 */
export async function listItem(collection, owner, token_id, price, chainId, provider) {
    console.log("Before Start listing...");
    const marketContract = getContractObj('KuverseMarket', chainId, provider);
    const marketContractInfo = getContractInfo('KuverseMarket', chainId);
    if (!marketContract || !marketContractInfo) return false;
    console.log("Start listing...");
    try {
        let isApproved = await isNFTApprovedForMarket(collection, owner, chainId, provider);
        if (!isApproved) {
            isApproved = await setNFTApprovalForMarket(collection, true, chainId, provider);
        }
        if (isApproved) {
            const tx = await marketContract.list(collection, token_id, ethers.utils.parseUnits(price, tokenDecimal));
            const receipt = await tx.wait(2);
            if (receipt.confirmations) {
                const interf = new ethers.utils.Interface(marketContractInfo.abi);
                const logs = receipt.logs;
                let pairId = 0;
                for (let index = 0; index < logs.length; index++) {
                    const log = logs[index];
                    if (marketContractInfo.address.toLowerCase() === log.address.toLowerCase()) {
                        pairId = interf.parseLog(log).args.id.toString();
                        return pairId;
                    }
                }
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function delistItem(id, chainId, provider) {
    const marketContract = getContractObj('KuverseMarket', chainId, provider);
    if (!marketContract) return false;
    try {
        const tx = await marketContract.delist(id);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function buy(account, id, price, chainId, provider) {
    const marketContract = getContractObj('KuverseMarket', chainId, provider);
    const Token = getContractObj('KoreToken', chainId, provider);
    if (!marketContract || !Token) return false;
    try {
        let isTokenApproved = await isTokenApprovedForMarket(account, price, chainId, provider);
        if (!isTokenApproved) {
            isTokenApproved = await approveTokenForMarket(chainId, provider);
        }
        if (isTokenApproved) {
            const tx = await marketContract.buy(id);
            await tx.wait(2);
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}
/**
 * PlayerCard Management
 */
export async function isCollectorApprovedForPlayer(account, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const collectorContract = getContractObj('CollectorNFT', chainId, provider);
    return await collectorContract.isApprovedForAll(account, playerContract.address);
}
export async function setCollectorApprovalForPlayer(chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const collectorContract = getContractObj('CollectorNFT', chainId, provider);
    try {
        const tx = await collectorContract.setApprovalForAll(playerContract.address, true);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function isBackpackApprovedForPlayer(account, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const backpackContract = getContractObj('BackpackNFT', chainId, provider);
    return await backpackContract.isApprovedForAll(account, playerContract.address);
}
export async function setBackpackApprovalForPlayer(chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const backpackContract = getContractObj('BackpackNFT', chainId, provider);
    try {
        const tx = await backpackContract.setApprovalForAll(playerContract.address, true);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function isKuApprovedForPlayer(account, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const kuContract = getContractObj('KuNFT', chainId, provider);
    return await kuContract.isApprovedForAll(account, playerContract.address);
}
export async function setKuApprovalForPlayer(chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const kuContract = getContractObj('KuNFT', chainId, provider);
    try {
        const tx = await kuContract.setApprovalForAll(playerContract.address, true);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function isItemApprovedForPlayer(account, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const itemContract = getContractObj('ItemNFT', chainId, provider);
    return await itemContract.isApprovedForAll(account, playerContract.address);
}
export async function setItemApprovalForPlayer(chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    const itemContract = getContractObj('ItemNFT', chainId, provider);
    try {
        const tx = await itemContract.setApprovalForAll(playerContract.address, true);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}

export async function equipCollector(account, token_id, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        let isApproved = await isCollectorApprovedForPlayer(account, chainId, provider);
        if (!isApproved) {
            isApproved = await setCollectorApprovalForPlayer(chainId, provider);
        }
        if (isApproved) {
            const tx = await playerContract.equip_collector(token_id);
            await tx.wait(2);
            return { code: true, msg: '' };
        }
        return false;
    } catch (e) {
        return { code: false, msg: e.message };
    }
}
export async function unequipCollector(token_id, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        const tx = await playerContract.unequip_collector(token_id);
        await tx.wait(2);
        return { code: true, msg: '' };
    } catch (e) {
        return { code: false, msg: e.message };
    }
}
export async function equipBackpack(account, token_id, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        let isApproved = await isBackpackApprovedForPlayer(account, chainId, provider);
        if (!isApproved) {
            isApproved = await setBackpackApprovalForPlayer(chainId, provider);
        }
        if (isApproved) {
            const tx = await playerContract.equip_backpack(token_id);
            await tx.wait(2);
            return { code: true, msg: '' };
        }
        return false;
    } catch (e) {
        return { code: false, msg: e.message };
    }
}
export async function unequipBackpack(token_id, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        const tx = await playerContract.unquip_backpack(token_id);
        await tx.wait(2);
        return { code: true, msg: '' };
    } catch (e) {
        return { code: false, msg: e.message };
    }
}
export async function equipKu(account, token_id, model, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        let isApproved = await isKuApprovedForPlayer(account, chainId, provider);
        if (!isApproved) {
            isApproved = await setKuApprovalForPlayer(chainId, provider);
        }
        if (isApproved) {
            const tx = await playerContract.equip_ku(token_id, model);
            await tx.wait(2);
            return { code: true, msg: '' };
        }
        return false;
    } catch (e) {
        return { code: false, msg: e.message };
    }
}
export async function unequipKu(token_id, model, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        const tx = await playerContract.unequip_ku(token_id, model);
        await tx.wait(2);
        return { code: true, msg: '' };
    } catch (e) {
        return { code: false, msg: e.message };
    }
}
export async function equipItem(account, token_id, model, kuId, chainId, provider) {
    console.log(token_id, model, kuId);
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        let isApproved = await isItemApprovedForPlayer(account, chainId, provider);
        if (!isApproved) {
            isApproved = await setItemApprovalForPlayer(chainId, provider);
        }
        if (isApproved) {
            const tx = await playerContract.equip_item(token_id, model, kuId);
            await tx.wait(2);
            return { code: true, msg: '' };
        }
        return false;
    } catch (e) {
        return { code: false, msg: e.message };
    }
}
export async function unequipItem(token_id, model, kuId, chainId, provider) {
    const playerContract = getContractObj('PlayerCard', chainId, provider);
    if (!playerContract) return false;
    try {
        const tx = await playerContract.unequip_item(token_id, model, kuId);
        await tx.wait(2);
        return { code: true, msg: '' };
    } catch (e) {
        return { code: false, msg: e.message };
    }
}



// Replace with your deployed KoreNFT contract address
const KORE_NFT_ADDRESS = "0xF3747F32b468d15362a9a2D61483FEc54C9538DE";

// Existing functions (assumed)
// export const toWei = (amount) => ethers.utils.parseEther(amount.toString());

// New functions for KoreNFT
export const c_mintKoreNFT = async (to, chainId, signer) => {
  try {
    const contract = new ethers.Contract(KORE_NFT_ADDRESS, koreNFTABI, signer);
    const tx = await contract.mintKore(to);
    const receipt = await tx.wait();
    const event = receipt.events.find((e) => e.event === "KoreMinted");
    return {
      code: 1,
      tokenId: event.args.tokenId.toNumber(),
      message: "NFT minted successfully"
    };
  } catch (e) {
    return { code: 0, message: e.message };
  }
};

export const c_transferKoreNFT = async (to, tokenId, chainId, signer) => {
  try {
    const contract = new ethers.Contract(KORE_NFT_ADDRESS, koreNFTABI, signer);
    const tx = await contract.transfer(to, tokenId);
    await tx.wait();
    return { code: 1, message: "NFT transferred successfully" };
  } catch (e) {
    return { code: 0, message: e.message };
  }
};

export const c_getKoreNFTSupply = async (chainId, signer) => {
  const contract = new ethers.Contract(KORE_NFT_ADDRESS, koreNFTABI, signer);
  const supply = await contract.totalSupply();
  return ethers.utils.formatUnits(supply, 0); // Assuming no decimals
};

export const c_getTokenURI = async (tokenId, chainId, signer) => {
  const contract = new ethers.Contract(KORE_NFT_ADDRESS, koreNFTABI, signer);
  return await contract.tokenURI(tokenId);
};

export const c_getOwnedKoreNFTs = async (owner, chainId, signer) => {
    try {
      const contract = new ethers.Contract(KORE_NFT_ADDRESS, koreNFTABI, signer);
      const totalSupply = await contract.totalSupply();
      const ownedNFTs = [];
  
      for (let i = 1; i <= totalSupply.toNumber(); i++) {
        try {
          const tokenOwner = await contract.ownerOf(i);
          if (tokenOwner.toLowerCase() === owner.toLowerCase()) {
            const tokenURI = await contract.tokenURI(i);
            // Parse the tokenURI if it's a data URI
            let metadata = { name: `Kore NFT #${i}`, description: "Unknown", image: "https://kuverse.app/kuLogo.JPG" };
            if (tokenURI.startsWith("data:application/json;utf8,")) {
              const json = tokenURI.replace("data:application/json;utf8,", "");
              metadata = JSON.parse(json);
            }
            ownedNFTs.push({ tokenId: i, tokenURI, ...metadata });
          }
        } catch (e) {
          continue;
        }
      }
      return { code: 1, nfts: ownedNFTs };
    } catch (e) {
      return { code: 0, message: e.message };
    }
  };