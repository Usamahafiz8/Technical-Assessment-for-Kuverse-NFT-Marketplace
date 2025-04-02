import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import { shorter1 } from "../../utils";
import axios from "axios";
import { saveAs } from "file-saver";
import { BuyButton } from "./Buttons";
import {
  AttackGrey,
  DefenceGrey,
  HealthGrey,
  SpeedGrey,
  RangeGrey,
  collectionInfo,
} from "../constants";
import { TextSapn } from "../styles/Common";
import {
  getTokenBalance,
  listItem,
  delistItem,
  buy,
} from "../../utils/contracts";
import { SuccessModal } from "./ModalSuccess";
import { ErrorModal } from "./ModalError";
import { RARITY_KU } from "../constants";
import {
  CloseLogo,
  OverlayWrapper,
  CollectorOverlay,
  CollectorOverlayImage,
  ModalOverlay,
  OverlayBG,
  OverlayConatiner,
  Upper,
  AttributeItem,
  AttributeTag,
  OverlayAction,
  OverlayNav,
  OverlayNavButtonStyle,
  OverlayText,
} from "../styles/CollectorItemStyles";

const HBMBorder = styled.div`
  background: #f9f9f9;
  padding: 10px 10px 10px 30px;
  border-radius: 12px;
`;
const HBMContainer = styled.div`
  width: fit-content;
  background: #ffffff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Table = styled.table`
  padding: 5px;
`;
const TableHeader = styled.th`
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.1em;
  color: #0087d1;
  padding: 10px;
`;
const TableHead = styled.thead`
  display: block;
`;
const TableBody = styled.tbody`
  display: block;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
`;
const TableRow = styled.tr``;
const TableCol = styled.td`
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 0.1em;
  color: #000000;
  padding: 10px 15px;
`;
export const HistoryCard = (props) => {
  const events = props.item.events;
  return (
    <HBMBorder>
      <Upper>
        <TextSapn style={{ fontSize: 18 }}>HISTORY</TextSapn>
      </Upper>
      <HBMContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>BUYER</TableHeader>
              <TableHeader>SELLER</TableHeader>
              <TableHeader>PRICE</TableHeader>
              <TableHeader>TIMESTAMP</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((item, index) => (
              <TableRow key={`history-${index}`}>
                <TableCol>
                  {item.userTo
                    ? item.userTo.name === "NoName"
                      ? shorter1(item.userTo.address)
                      : shorter1(item.userTo.name)
                    : "--"}
                </TableCol>
                <TableCol>
                  {item.userFrom
                    ? item.userFrom.name === "NoName"
                      ? shorter1(item.userFrom.address)
                      : shorter1(item.userFrom.name)
                    : "--"}
                </TableCol>
                <TableCol>
                  {item.name === "Minted" ? "Minted" : item.price}
                </TableCol>
                {/* <TableCol>{new Date(parseInt(item.timestamp) * 1000).toISOString()}</TableCol> */}
                <TableCol>
                  {new Date(parseInt(item.timestamp) * 1000)
                    .toISOString()
                    .slice(5, 10)
                    .replace("-", "/") +
                    "/" +
                    new Date(parseInt(item.timestamp) * 1000)
                      .toISOString()
                      .slice(0, 4)}
                </TableCol>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </HBMContainer>
    </HBMBorder>
  );
};
const StatusContainer = styled.div`
  padding: 20px;
`;
const StatusUserItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > h3 {
    font-size: 14px;
    color: #0087d1;
    padding-right: 10px;
  }
  & > img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
  }
  & > span {
    font-size: 14px;
    color: #c7ccd1;
    padding-left: 10px;
  }
  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    & > img {
      width: 32px;
      height: 32px;
      border-radius: 16px;
      margin-right: 12px;
    }
  }
`;
const StatusButtonContainer = styled.div`
  padding-top: 20px;
`;
export const StatusButton = styled.div`
  z-index: 99;
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, #00bbec 0%, #008bd3 100%);
  border: 4px solid #b2b2b2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 251px;
  margin: 0 auto;
  height: 68px;
  color: #ffffff;
  cursor: pointer;
  :last-child {
    margin-top: 25px;
    border-radius: 20px;
    background: linear-gradient(180deg, #f4f4f4 0%, #8a8a8a 73.96%);
    // box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  }
  &.sell {
    background: #763636;
    box-shadow: -4px -3px 4px #ffffff, 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
  }
`;
const PriceTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  & > input::-webkit-outer-spin-button,
  & > input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  & > input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
  & > input {
    background: #f0f0f0;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: none;
    height: 40px;
    width: 180px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    outline: none;
  }
  & > span {
    padding-left: 5px;
  }
`;
export const StatusCard = (props) => {
  const { account, chainId, library } = useWeb3React();
  const [isConfirm, setIsConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [putPrice, setPutPrice] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [successTitle, setSuccessTitle] = useState(
    "Your NFT has been delivered!"
  );
  const [successSubTitle, setSuccessSubTitle] = useState(
    "Please check your inventory."
  );
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Failed Activation!");
  const [errorSubTitle, setErrorSubTitle] = useState(
    "Please check your wallet validation."
  );
  const nftInfo = collectionInfo(props.item.itemCollection);

  useEffect(() => {
    if (!!account && !!library) {
      getTokenBalance(account, chainId, library)
        .then((balance) => {
          setTokenBalance(parseFloat(balance));
        })
        .catch((e) => {
          console.log("get token balance error: ", e);
          setTokenBalance(0);
        });
    }
  }, [account, chainId, library]);
  function fetchItem() {
    if (!props.item) return null;
    axios
      .get(`/api/item/${props.item.itemCollection}/${props.item.tokenId}`)
      .then((res) => {
        setItem(res.data.item);
      })
      .catch((err) => {
        setItem(undefined);
      });
  }
  useEffect(() => {
    if (!item) {
      fetchItem();
    }
  }, [item]);
  function putFixed() {
    if (!account || !library) {
      setErrorSubTitle("Connect your wallet.");
      setIsErrorModal(true);
      return;
    }
    if (putPrice <= 0) {
      setErrorSubTitle("Please input price correctly!");
      setIsErrorModal(true);
      return;
    }
    setIsConfirm(true);
    listItem(
      item.itemCollection,
      account,
      item.tokenId,
      putPrice,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios
          .get(`/api/sync_block`)
          .then((res) => {
            setIsConfirm(false);
            setSuccessSubTitle("Please check Marketplace.");
            setIsSuccessModal(true);
            return;
          })
          .catch((error) => {
            setIsConfirm(false);
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
      } else {
        setIsConfirm(false);
        console.log("Failed Transaction");
      }
    });
  }
  function unlistItem() {
    setIsConfirm(true);
    delistItem(item.pair.id, chainId, library.getSigner()).then((result) => {
      if (result) {
        axios
          .get(`/api/sync_block`)
          .then((res) => {
            setIsConfirm(false);
            setIsSuccessModal(true);
            return;
          })
          .catch((error) => {
            setIsConfirm(false);
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
      } else {
        setIsConfirm(false);
        console.log("Failed Transaction");
      }
    });
  }
  function buyItem() {
    if (tokenBalance < item.pair.price) {
      setErrorSubTitle("Your available balance is less than the price!");
      setIsErrorModal(true);
      return;
    }
    setIsConfirm(true);
    buy(
      account,
      item.pair.id,
      item.pair.price,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios
          .get(`/api/sync_block`)
          .then((res) => {
            setIsConfirm(false);
            setIsSuccessModal(true);
            return true;
          })
          .catch((error) => {
            setIsConfirm(false);
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
      } else {
        setIsConfirm(false);
        console.log("Failed Transaction");
      }
    });
  }
  const closeSuccessModal = () => {
    setIsSuccessModal(false);
    window.location.reload();
  };
  const closeErrorModal = () => {
    setIsErrorModal(false);
  };
  return (
    <>
      <>
        <SuccessModal
          isOpen={isSuccessModal}
          onClose={closeSuccessModal}
          title={successTitle}
          subtitle={successSubTitle}
        />
        <ErrorModal
          isOpen={isErrorModal}
          onClose={closeErrorModal}
          title={errorTitle}
          subtitle={errorSubTitle}
        />
      </>
      <HBMBorder>
        <HBMContainer>
          <StatusContainer>
            <StatusUserItem>
              <TextSapn style={{ fontSize: 18 }}>NFT Information</TextSapn>
            </StatusUserItem>
            <StatusUserItem>
              <Link to={nftInfo.url} style={{ textDecoration: "none" }}>
                <img src={nftInfo.avatar} alt="User Avatar" />
                <span>{nftInfo.name}</span>
              </Link>
            </StatusUserItem>
            <StatusUserItem>
              <h3>Owned by: </h3>
              <img src={item?.ownerUser.profilePic} alt="User Avatar" />
              <span>{item?.ownerUser.name}</span>
            </StatusUserItem>
            <StatusButtonContainer>
              {item?.ownerUser.address.toLowerCase() ===
              account?.toLowerCase() ? (
                <>
                  {!item?.pair && (
                    <>
                      <PriceTag>
                        <input
                          type="number"
                          onChange={(event) => setPutPrice(event.target.value)}
                          value={putPrice}
                          placeholder={"Enter Price"}
                          onKeyPress={(event) => {
                            if (
                              !/^[0-9]*(\.[0-9]{0,2})?$/.test(
                                putPrice + event.key
                              )
                            ) {
                              event.preventDefault();
                            }
                          }}
                        />
                        <span>kORE</span>
                      </PriceTag>
                      {isConfirm ? (
                        <StatusButton>Confirming...</StatusButton>
                      ) : (
                        <StatusButton onClick={() => putFixed()}>
                          Put on marketplace
                        </StatusButton>
                      )}
                    </>
                  )}
                  {item?.pair && (
                    <>
                      <PriceTag>
                        <input type="number" value={item.pair.price} disabled />
                        <span>kORE</span>
                      </PriceTag>
                      {isConfirm ? (
                        <StatusButton>Confirming...</StatusButton>
                      ) : (
                        <StatusButton onClick={() => unlistItem()}>
                          Unlist on marketplace
                        </StatusButton>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {item?.pair && (
                    <>
                      <PriceTag>
                        <input type="number" value={item.pair.price} disabled />
                        <span>kORE</span>
                      </PriceTag>
                      {account ? (
                        <>
                          {isConfirm ? (
                            <StatusButton>Confirming...</StatusButton>
                          ) : (
                            <StatusButton onClick={() => buyItem()}>
                              Buy Now
                            </StatusButton>
                          )}
                        </>
                      ) : (
                        <>
                          <StatusButton onClick={() => props.connectAccount()}>
                            CONNECT METAMASK
                          </StatusButton>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </StatusButtonContainer>
          </StatusContainer>
        </HBMContainer>
      </HBMBorder>
    </>
  );
};

const Divider = styled.span`
  display: block;
  width: 90%;
  height: 1px;
  background-color: rgba(185, 188, 190, 0.49);
`;
const Section3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const IconsDiv = styled.div`
  background: #ffffff;
  box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  width: max-content;
  height: max-content;
  padding: 10px 5px;
  display: flex;
  flex-direction: row;
  margin: 20px 10px 10px;
`;
const IconBG = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  position: relative;
  &:hover {
    & > div {
      visibility: visible;
    }
    cursor: pointer;
  }
`;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
const TextDiv = styled.div`
  width: 2rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  margin: 0 5px;
  font-size: 14px;
`;
export const MetaCard = (props) => {
  const item = props.item;
  const calcRarity = (collection, type, value) => {
    if (collectionInfo(collection).name === "KuNFT") {
      return RARITY_KU[type].value[RARITY_KU[type].name.indexOf(value)];
    } else return 0;
  };
  const avgRarity = (collection, attributes) => {
    let totalRarity = 0;
    for (let i = 0; i < attributes.length; i++) {
      totalRarity += calcRarity(
        collection,
        attributes[i]["trait_type"],
        attributes[i]["value"]
      );
    }
    console.log(totalRarity);
    return (totalRarity / 7).toFixed(2);
  };
  return (
    <HBMBorder>
      <Upper>
        <TextSapn style={{ fontSize: 18 }}>METADATA</TextSapn>
      </Upper>
      <HBMContainer>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableHeader>TYPE</TableHeader>
              <TableHeader>VALUE</TableHeader>
              <TableHeader>RARITY(%)</TableHeader>
            </TableRow>
            {item?.attributes.map((attrData, index) => (
              <TableRow key={`metadata-${index}`}>
                <TableCol>{attrData["trait_type"]}</TableCol>
                <TableCol>{attrData["value"]}</TableCol>
                <TableCol>
                  {calcRarity(
                    item.itemCollection,
                    attrData["trait_type"],
                    attrData["value"]
                  )}
                </TableCol>
              </TableRow>
            ))}
            <TableRow>
              <TableCol>Average</TableCol>
              <TableCol></TableCol>
              <TableCol>
                {avgRarity(item?.itemCollection, item?.attributes)}
              </TableCol>
            </TableRow>
          </TableBody>
        </Table>
        <Divider></Divider>
        <Section3>
          <IconsDiv>
            <IconBG>
              <Icon src={AttackGrey} alt="ATTACK" />
              <TextDiv>{item?.gameStats["Attack"]}</TextDiv>
            </IconBG>
            <IconBG>
              <Icon src={DefenceGrey} alt="DEFENCE" />
              <TextDiv>{item?.gameStats["Defence"]}</TextDiv>
            </IconBG>
            <IconBG>
              <Icon
                src={HealthGrey}
                style={{ width: 35, height: 35 }}
                alt="HEALTH"
              />
              <TextDiv>{item?.gameStats["Health"]}</TextDiv>
            </IconBG>
            <IconBG>
              <Icon src={SpeedGrey} alt="SPEED" />
              <TextDiv>{item?.gameStats["Speed"]}</TextDiv>
            </IconBG>
            <IconBG>
              <Icon src={RangeGrey} alt="RANGE" />
              <TextDiv>{item?.gameStats["Range"]}</TextDiv>
            </IconBG>
          </IconsDiv>
        </Section3>
      </HBMContainer>
    </HBMBorder>
  );
};

const BuyBorder = styled.div`
  width: fit-content;
  background: #e4e4e4;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 10px;
  @media (max-width: 500px) {
    transform: scale(0.7) translateX(-60%) translateY(-120%);
  }
`;
const BuyContainer = styled.div`
  width: fit-content;
  padding: 20px;
  background: #f5f5f5;
  box-shadow: inset -4px -3px 4px #ffffff, inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BuyPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 3rem;
  background: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 0.5rem;
`;
const Owntext = styled.p`
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.1em;
  color: #000000;
  margin-bottom: 0.5rem;
`;
const Ownname = styled.p`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.1em;
  color: #567ca9;
  margin-bottom: 0.5rem;
`;
const Border = styled.span`
  display: block;
  width: 5rem;
  height: 1px;
  background-color: #567ca9;
`;
export const BuyCard = () => {
  return (
    <BuyBorder>
      <BuyContainer>
        <BuyPrice>1.000 {process.env.REACT_APP_COIN}</BuyPrice>
        <BuyButton buy={"BUY"} bid={"BID"}></BuyButton>
        <Owntext>OWNED BY:</Owntext>
        <Ownname>ownername</Ownname>
        <Border></Border>
      </BuyContainer>
    </BuyBorder>
  );
};
const RarityBar = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.1em;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 144px;
  color: white;
  border-radius: 20px;
  box-shadow: 1px 1px 1px rgb(0 0 0 / 40%);
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const OverlayModal = (props) => {
  const { account, chainId, library } = useWeb3React();
  const [isConfirm, setIsConfirm] = useState(false);
  const [item, setItem] = useState(null);
  const [putPrice, setPutPrice] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [successTitle, setSuccessTitle] = useState(
    "Your NFT has been delivered!"
  );
  const [successSubTitle, setSuccessSubTitle] = useState(
    "Please check your inventory."
  );
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("Failed Activation!");
  const [errorSubTitle, setErrorSubTitle] = useState(
    "Please check your wallet validation."
  );
  const [historyToggle, setHistoryToggle] = useState(false);
  const [metaToggle, setMetaToggle] = useState(false);
  const [vidoeLoading, setVideoLoading] = useState(false);
  const openHistoryCard = () => {
    if (!item) return;
    setHistoryToggle(!historyToggle);
    setMetaToggle(false);
  };
  const openMetaCard = () => {
    if (!item) return;
    setHistoryToggle(false);
    setMetaToggle(!metaToggle);
  };
  useEffect(() => {
    if (!!account && !!library) {
      getTokenBalance(account, chainId, library)
        .then((balance) => {
          setTokenBalance(parseFloat(balance));
        })
        .catch((e) => {
          console.log("get token balance error: ", e);
          setTokenBalance(0);
        });
    }
  }, [account, chainId, library]);
  function fetchItem() {
    setVideoLoading(true);
    let myVid = document.getElementById("source_video");
    axios
      .get(`/api/item/${props.item.itemCollection}/${props.item.tokenId}`)
      .then((res) => {
        setItem(res.data.item);
        setTimeout(() => {
          setVideoLoading(false);
          try {
            myVid.load();
          } catch (e) {}
        }, 100);
      })
      .catch((err) => {
        setItem(null);
      });
  }
  useEffect(() => {
    if (props?.item) {
      fetchItem();
    }
    setMetaToggle(false);
    setHistoryToggle(false);
  }, [props]);
  function putFixed() {
    if (!account || !library) {
      setErrorSubTitle("Connect your wallet.");
      setIsErrorModal(true);
      return;
    }
    if (putPrice <= 0) {
      setErrorSubTitle("Please input price correctly!");
      setIsErrorModal(true);
      return;
    }
    setIsConfirm(true);
    listItem(
      item.itemCollection,
      account,
      item.tokenId,
      putPrice,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios
          .get(`/api/sync_block`)
          .then((res) => {
            setIsConfirm(false);
            setSuccessSubTitle("Please check Marketplace.");
            setIsSuccessModal(true);
            return;
          })
          .catch((error) => {
            setIsConfirm(false);
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
      } else {
        setIsConfirm(false);
        console.log("Failed Transaction");
      }
    });
  }
  function unlistItem() {
    setIsConfirm(true);
    delistItem(item.pair.id, chainId, library.getSigner()).then((result) => {
      if (result) {
        axios
          .get(`/api/sync_block`)
          .then((res) => {
            setIsConfirm(false);
            setIsSuccessModal(true);
            return;
          })
          .catch((error) => {
            setIsConfirm(false);
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
      } else {
        setIsConfirm(false);
        console.log("Failed Transaction");
      }
    });
  }
  function buyItem() {
    if (tokenBalance < item.pair.price) {
      setErrorSubTitle("Your available balance is less than the price!");
      setIsErrorModal(true);
      return;
    }
    setIsConfirm(true);
    buy(
      account,
      item.pair.id,
      item.pair.price,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios
          .get(`/api/sync_block`)
          .then((res) => {
            setIsConfirm(false);
            setIsSuccessModal(true);
            return true;
          })
          .catch((error) => {
            setIsConfirm(false);
            if (error.response) {
              console.log(error.response.data.message);
            }
          });
      } else {
        setIsConfirm(false);
        console.log("Failed Transaction");
      }
    });
  }
  const closeSuccessModal = () => {
    setIsSuccessModal(false);
    window.location.reload();
  };
  const closeErrorModal = () => {
    setIsErrorModal(false);
  };
  const calcRarity = (collection, type, value) => {
    if (collectionInfo(collection).name === "KuNFT") {
      return RARITY_KU[type].value[RARITY_KU[type].name.indexOf(value)];
    } else return 0;
  };
  const avgRarity = (collection, attributes) => {
    let totalRarity = 0;
    for (let i = 0; i < attributes.length; i++) {
      totalRarity += calcRarity(
        collection,
        attributes[i]["trait_type"],
        attributes[i]["value"]
      );
    }
    return totalRarity / 7;
  };
  return (
    <>
      <>
        <SuccessModal
          isOpen={isSuccessModal}
          onClose={closeSuccessModal}
          title={successTitle}
          subtitle={successSubTitle}
        />
        <ErrorModal
          isOpen={isErrorModal}
          onClose={closeErrorModal}
          title={errorTitle}
          subtitle={errorSubTitle}
        />
      </>
      {props?.isOpen && (
        <ModalOverlay>
          <OverlayBG onClick={props.closeOverlay}></OverlayBG>
          <OverlayConatiner>
            <OverlayWrapper>
              <CollectorOverlay>
                <Upper>
                  <TextSapn style={{ fontSize: 28 }}>{item?.name}</TextSapn>
                  <CloseLogo
                    src="/assets/close.png"
                    onClick={props?.closeOverlay}
                  ></CloseLogo>
                </Upper>
                <CollectorOverlayImage style={{ position: "relative" }}>
                  {vidoeLoading ? (
                    <img
                      src="/images/loading.gif"
                      alt="Card"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        borderRadius: 25,
                      }}
                    />
                  ) : item?.assetType === "video" ? (
                    <video
                      id="source_video"
                      autoPlay="autoplay"
                      loop={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 25,
                      }}
                    >
                      <source src={item.mainData} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={item?.mainData}
                      alt="Card"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        borderRadius: 25,
                      }}
                    />
                  )}
                  {item?.mainData && (
                    <img
                      className="o-download"
                      src="/images/download-2-xxl.png"
                      alt=""
                      onClick={() => saveAs(item.mainData, item.name + ".mp4")}
                    />
                  )}
                </CollectorOverlayImage>

                {item ? (
                  avgRarity(item.itemCollection, item.attributes) < 5 ? (
                    <RarityBar style={{ background: "#FFC739" }}>
                      MYTHICAL
                    </RarityBar>
                  ) : avgRarity(item.itemCollection, item.attributes) < 10 ? (
                    <RarityBar style={{ background: "#D20000" }}>
                      SUPER RARE
                    </RarityBar>
                  ) : avgRarity(item.itemCollection, item.attributes) < 15 ? (
                    <RarityBar style={{ background: "#65ACFF" }}>
                      RARE
                    </RarityBar>
                  ) : avgRarity(item.itemCollection, item.attributes) < 21 ? (
                    <RarityBar style={{ background: "#66E32C" }}>
                      UNCOMMON
                    </RarityBar>
                  ) : (
                    <RarityBar style={{ background: "#E4E4E4" }}>
                      COMMON
                    </RarityBar>
                  )
                ) : (
                  <></>
                )}

                <OverlayAction>
                  {item?.ownerUser.address.toLowerCase() ===
                  account?.toLowerCase() ? (
                    <>
                      {!item?.pair && (
                        <>
                          {/* <PriceTag>
                        <input type='number' onChange={event => setPutPrice(event.target.value)}
                          value={putPrice} placeholder={"Enter Price"}
                          onKeyPress={(event) => {
                            if (!/^[0-9]*(\.[0-9]{0,2})?$/.test(putPrice + event.key)) {
                              event.preventDefault();
                            }
                          }} />
                      </PriceTag> */}
                          {isConfirm ? (
                            <StatusButton className="sell">
                              Confirming...
                            </StatusButton>
                          ) : (
                            <StatusButton
                              className="sell"
                              onClick={() => alert("Coming soon ...")}
                            >
                              SELL
                            </StatusButton>
                          )}
                          {/* : <StatusButton className='sell' onClick={() => putFixed()}>SELL</StatusButton>} */}
                        </>
                      )}
                      {item?.pair && (
                        <>
                          <div
                            style={{ textAlign: "center", paddingBottom: 5 }}
                          >
                            <TextSapn style={{ fontSize: 18 }}>
                              {item.pair.price} kORE
                            </TextSapn>
                          </div>
                          {isConfirm ? (
                            <StatusButton>Confirming...</StatusButton>
                          ) : (
                            <StatusButton onClick={() => unlistItem()}>
                              UNLIST
                            </StatusButton>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {item?.pair && (
                        <>
                          <div
                            style={{ textAlign: "center", paddingBottom: 5 }}
                          >
                            <TextSapn style={{ fontSize: 18 }}>
                              {item.pair.price} kORE
                            </TextSapn>
                          </div>
                          {account ? (
                            <>
                              {isConfirm ? (
                                <StatusButton>Confirming...</StatusButton>
                              ) : (
                                <StatusButton onClick={() => buyItem()}>
                                  BUY
                                </StatusButton>
                              )}
                            </>
                          ) : (
                            <>
                              <StatusButton
                                onClick={() => props.connectAccount()}
                              >
                                CONNECT METAMASK
                              </StatusButton>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </OverlayAction>
                <TextSapn
                  style={{ fontSize: 14, paddingTop: 10, paddingBottom: 20 }}
                >
                  Owner:{" "}
                  {item
                    ? item.ownerUser.name === "NoName"
                      ? shorter1(item.ownerUser.address)
                      : shorter1(item.ownerUser.name)
                    : ""}
                </TextSapn>
                <OverlayNav>
                  <OverlayNavButtonStyle onClick={openMetaCard}>
                    <OverlayText className={metaToggle ? "active" : ""}>
                      METADATA
                    </OverlayText>
                  </OverlayNavButtonStyle>
                  <OverlayNavButtonStyle onClick={openHistoryCard}>
                    <OverlayText className={historyToggle ? "active" : ""}>
                      HISTORY
                    </OverlayText>
                  </OverlayNavButtonStyle>
                </OverlayNav>
              </CollectorOverlay>
              {historyToggle && <HistoryCard item={item}></HistoryCard>}
              {metaToggle && <MetaCard item={item}></MetaCard>}
            </OverlayWrapper>
          </OverlayConatiner>
        </ModalOverlay>
      )}
    </>
  );
};
