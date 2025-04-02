import React, { useEffect, useState } from "react";
import UserProfile from "../../UI_components/UserProfiles";
import KoreReplacePage from "../../pages/KoreReplacePage/Korerepalce";
import { ButtonStyle3, MintButtonStyle } from "../../UI_components/Buttons";
import { MintContainer, MintBackground1, MintWraper, MintTitle } from "../Collector/CollectorStyles";
import { KoreCardContent, KoreCardImg, KoreText, KoreMintDiv, ChartContainer, KoreCardContainer } from "./KoreStyles";
import { useWeb3React } from '@web3-react/core';
import { c_mintPrice, c_mintKore, c_mintSupply, c_airdropSupply, toWei, addGovernanceToken, c_mintKoreNFT, c_transferKoreNFT, c_getKoreNFTSupply, c_getOwnedKoreNFTs } from "../../../utils/contracts";
import Chart from "react-apexcharts";
import { Title, TextSapn1 } from '../../styles/Common';
import { SuccessModal } from '../../UI_components/ModalSuccess';
import { ErrorModal } from '../../UI_components/ModalError';

export const Kore = (props) => {
  const [korePrice, setKorePrice] = useState(0);
  const [koreSupply, setKoreSupply] = useState(0);
  const [airdropSupply, setAirdropSupply] = useState(0);
  const [koreAmount, setKoreAmount] = useState(0);
  const [nftSupply, setNftSupply] = useState(0);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [isMinting, setIsMinting] = useState(false);
  const [isMintingNFT, setIsMintingNFT] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isChart, setIsChart] = useState(false);
  const { account, chainId, library } = useWeb3React();

  const [isSuccess, setIsSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState('KORE Tokens are minted successfully!');
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("Please check your wallet validation!");
  const [transferTo, setTransferTo] = useState(""); // Recipient address
  const [selectedTokenId, setSelectedTokenId] = useState(""); // Selected NFT tokenId

  const onCloseSuccessModal = () => { setIsSuccess(false); window.location.href = '/kore'; }
  const onCloseErrorModal = () => { setIsError(false); }

  const fetchData = async () => {
    if (chainId && library) {
      let _mintPrice = await c_mintPrice(chainId, library.getSigner());
      let _mintSupply = await c_mintSupply(chainId, library.getSigner());
      let _airdropSupply = await c_airdropSupply(chainId, library.getSigner());
      let _nftSupply = await c_getKoreNFTSupply(chainId, library.getSigner());
      if (_mintPrice) setKorePrice(parseFloat(_mintPrice));
      if (_mintSupply) setKoreSupply(parseInt(parseFloat(_mintSupply).toFixed(2)));
      if (_airdropSupply) setAirdropSupply(parseInt(parseFloat(_airdropSupply).toFixed(2)));
      if (_nftSupply) setNftSupply(parseInt(_nftSupply));
    }
  };

  const fetchOwnedNFTs = async () => {
    if (account && chainId && library) {
      const result = await c_getOwnedKoreNFTs(account, chainId, library.getSigner());
      if (result.code) {
        setOwnedNFTs(result.nfts);
        // Set the first NFT as default selection if available
        if (result.nfts.length > 0 && !selectedTokenId) {
          setSelectedTokenId(result.nfts[0].tokenId.toString());
        }
      } else {
        console.error("Failed to fetch owned NFTs:", result.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchOwnedNFTs();
  }, [chainId, account]);

  const setKoreAmountEvent = (e) => {
    setKoreAmount(parseInt(e.target.value));
  };

  const mintKore = async () => {
    if (account && chainId && library) {
      if (koreAmount <= 0) { setErrMsg("Enter amount of KORE to mint!"); setIsError(true); return; }
      let _fee = toWei(korePrice * koreAmount);
      let _amount = toWei(koreAmount);
      setIsMinting(true);
      c_mintKore(_amount, _fee, chainId, library.getSigner()).then(res => {
        if (res.code) { setSuccessTitle("KORE Tokens are minted successfully!"); setIsSuccess(true); }
        else { setErrMsg(res.message); setIsError(true); }
        setIsMinting(false);
      }).catch(e => {
        setErrMsg(e.message); setIsError(true);
        setIsMinting(false);
      });
    }
  };

  const mintKoreNFT = async () => {
    if (account && chainId && library) {
      setIsMintingNFT(true);
      c_mintKoreNFT(account, chainId, library.getSigner()).then(res => {
        if (res.code) {
          setSuccessTitle(`Kore NFT #${res.tokenId} minted successfully!`);
          setIsSuccess(true);
          fetchData();
          fetchOwnedNFTs();
        } else {
          setErrMsg(res.message);
          setIsError(true);
        }
        setIsMintingNFT(false);
      }).catch(e => {
        setErrMsg(e.message);
        setIsError(true);
        setIsMintingNFT(false);
      });
    }
  };

  const transferKoreNFT = async () => {
    if (account && chainId && library) {
      if (!transferTo || !selectedTokenId) {
        setErrMsg("Please enter a recipient address and select an NFT!");
        setIsError(true);
        return;
      }
      setIsTransferring(true);
      c_transferKoreNFT(transferTo, selectedTokenId, chainId, library.getSigner()).then(res => {
        if (res.code) {
          setSuccessTitle(`Kore NFT #${selectedTokenId} transferred successfully!`);
          setIsSuccess(true);
          fetchOwnedNFTs(); // Refresh owned NFTs after transfer
          setSelectedTokenId(""); // Reset selection
        } else {
          setErrMsg(res.message);
          setIsError(true);
        }
        setIsTransferring(false);
      }).catch(e => {
        setErrMsg(e.message);
        setIsError(true);
        setIsTransferring(false);
      });
    }
  };

  const addKoreToken = async () => {
    if (chainId && library) {
      await addGovernanceToken(chainId, library.getSigner());
    }
  };

  const viewChart = () => {
    setIsChart(!isChart);
  };

  var chartOptions = {
    series: [10, 10, 10, 40, 10, 20],
    options: {
      labels: ['Unlock 3 months', 'Unlock 6 months', 'Unlock 1 year', 'Rewards Reserve', 'Airdrop', 'Initial Minting'],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '18px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          cursor: 'pointer',
          colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']
        },
        textAnchor: 'middle',
        formatter: (value, opts) => {
          return [value + "%", opts.w.globals.labels[opts.seriesIndex]];
        },
      },
      legend: { show: false },
      fill: {
        type: 'solid',
        colors: ['#55E2CE', '#57AEE0', '#5667E2', '#D3D3D3', '#CAFF64', '#67FE8B']
      },
      tooltip: { enabled: false },
      states: { hover: { filter: { type: 'darken' } } },
      plotOptions: {
        pie: {
          startAngle: 0,
          donut: {
            size: '30%',
          }
        }
      }
    },
  };

  return (
    <>
      <div className="desktop-hidden">
        <KoreReplacePage />
      </div>
      <MintContainer className="mobile-hidden d-none-sm">
        <SuccessModal
          isOpen={isSuccess}
          onClose={onCloseSuccessModal}
          title={successTitle}
          subtitle="Please check your wallet."
        />
        <ErrorModal
          isOpen={isError}
          onClose={onCloseErrorModal}
          title="Failed to mint/transfer!"
          subtitle={errMsg}
        />
        <UserProfile />
        <Title>
          <TextSapn1>kORE</TextSapn1>
        </Title>
        <MintWraper>
          <MintBackground1>
            <MintTitle style={{ padding: 10 }}>
              <span>KU CORP. RELEASES KORE PARTICLES IN SCHEDULED BATCHES THROUGHOUT THE YEAR.</span>
            </MintTitle>
          </MintBackground1>
        </MintWraper>
        {isChart && (
          <ChartContainer>
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="donut"
              width={'100%'}
            />
          </ChartContainer>
        )}
        <MintButtonStyle style={{ marginTop: 16 }} onClick={viewChart}>
          {isChart ? 'HIDE CHART' : 'VIEW CHART'}
        </MintButtonStyle>
        <ButtonStyle3 style={{ marginTop: '20px' }} onClick={() => addKoreToken()}>
          Add KORE to METAMASK
        </ButtonStyle3>
        <KoreCardContainer>
          <KoreCardContent>
            {/* <KoreCardImg>
              <KoreMintDiv>
                <h3>CIRCULATING SUPPLY</h3>
                <h3>{koreSupply + airdropSupply} / 300000000</h3>
                <h1>KORE</h1>
                <h3 style={{ letterSpacing: 10 }}>1 {process.env.REACT_APP_COIN} /</h3>
                <h3 style={{ letterSpacing: 10 }}>{Math.floor(1 / korePrice)} KORE</h3>
                <input type="number" value={koreAmount} onChange={setKoreAmountEvent} />
              </KoreMintDiv>
            </KoreCardImg> */}
            {/* {isMinting ? (
              <MintButtonStyle toggle={true} style={{ height: 40, fontSize: 14, boxShadow: 'none' }}>
                Minting ...
              </MintButtonStyle>
            ) : (
              <MintButtonStyle onClick={() => mintKore()} style={{ height: 40, fontSize: 14, boxShadow: 'none' }}>
                MINT Kore
              </MintButtonStyle>
            )}
            <KoreText>Total Cost: {parseFloat((korePrice * koreAmount).toFixed(4))} {process.env.REACT_APP_COIN}</KoreText> */}

            {/* NFT Minting Section */}
            <KoreMintDiv style={{ marginTop: 20 }}>
              <h3>NFT SUPPLY</h3>
              <h3>{nftSupply} Kore NFTs minted</h3>
            </KoreMintDiv>
            {isMintingNFT ? (
              <MintButtonStyle toggle={true} style={{ height: 40, fontSize: 14, boxShadow: 'none' }}>
                Minting NFT ...
              </MintButtonStyle>
            ) : (
              <MintButtonStyle onClick={() => mintKoreNFT()} style={{ height: 40, fontSize: 14, boxShadow: 'none' }}>
                MINT Kore NFT
              </MintButtonStyle>
            )}

            {/* NFT Transfer Section */}
            <KoreMintDiv style={{ marginTop: 20 }}>
              <h3>TRANSFER NFT</h3>
              <input
                type="text"
                placeholder="Recipient Address"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                style={{ marginBottom: 10, width: "100%" }}
              />
              <select
                value={selectedTokenId}
                onChange={(e) => setSelectedTokenId(e.target.value)}
                style={{ marginBottom: 10, width: "100%", padding: "5px" }}
              >
                <option value="">Select an NFT</option>
                {ownedNFTs.map((nft) => (
                  <option key={nft.tokenId} value={nft.tokenId}>
                    Kore NFT #{nft.tokenId}
                  </option>
                ))}
              </select>
            </KoreMintDiv>
            {isTransferring ? (
              <MintButtonStyle toggle={true} style={{ height: 40, fontSize: 14, boxShadow: 'none' }}>
                Transferring ...
              </MintButtonStyle>
            ) : (
              <MintButtonStyle onClick={() => transferKoreNFT()} style={{ height: 40, fontSize: 14, boxShadow: 'none' }}>
                TRANSFER Kore NFT
              </MintButtonStyle>
            )}

            {/* Owned NFTs Section */}
            <KoreMintDiv style={{ marginTop: 20 }}>
              <h3>YOUR KORE NFTs</h3>
              {ownedNFTs.length > 0 ? (
                ownedNFTs.map((nft) => (
                  <div key={nft.tokenId} style={{ marginTop: 10 }}>
                    <p>Token ID: {nft.tokenId}</p>
                    <p>Meta Name: {nft.name}</p>
                    <p>Meta Description: {nft.description}</p>
                    {/* <p>Metadata: <a href={nft.tokenURI} target="_blank" rel="noopener noreferrer">{nft.tokenURI}</a></p> */}
                    <img
                      src={nft.image}
                      alt={nft.name}
                      style={{ width: 100, height: 100 }}
                    />
                  </div>
                ))
              ) : (
                <p>No Kore NFTs owned yet.</p>
              )}
            </KoreMintDiv>
          </KoreCardContent>
        </KoreCardContainer>
      </MintContainer>
    </>
  );
};