import React, { useState, useEffect } from "react";
import {
  MintCardDiv,
  MintCardH1,
  MintCardH2,
  MintCardP,
  MintCardStyle,
  MintCardStyleL,
  MintCardStyleR,
  MintAvatar,
} from "../../UI_components/MintCard";
import {
  MintContainer,
  MintCardContainer,
  MintBackground,
  MintWraper,
  MintTitle,
} from "../Collector/CollectorStyles";
import { MintButtonStyle } from "../../UI_components/Buttons";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import {
  ba_mintPrice,
  ba_mintToken,
  ba_Supply,
  toWei,
} from "../../../utils/contracts";
import { MarketPlaceComponent } from "../MarketPlace/MarketPlaceComponent";
import { TextSapn3 } from "../../styles/Common";
import { getContractInfo } from "../../../utils/index";
import UserProfile from "../../UI_components/UserProfiles";
import { SuccessModal } from "../../UI_components/ModalSuccess";
import { ErrorModal } from "../../UI_components/ModalError";
import { testOwnedItems, testSaleItems } from "../Profile/data";
import { MarketPlaceCollectorItemGrid } from "../MarketPlace/MarketplaceStyles";
import { CollectorItems } from "../../UI_components/CollectorItem";

export const Backpack = (props) => {
  const [items, setItems] = useState([...testOwnedItems, ...testSaleItems]);
  const { account, chainId, library } = useWeb3React();
  const [baPrice, setBaPrice] = useState(0);
  const [baClassicSupply, setBaClassicSupply] = useState(0);
  const [baSpecialSupply, setBaSpecialSupply] = useState(0);
  const [baFounderSupply, setBaFounderSupply] = useState(0);
  const [isMinting1, setIsMinting1] = useState(false);
  const [isMinting2, setIsMinting2] = useState(false);
  const [isMinting3, setIsMinting3] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("Please check your wallet validation!");
  const onCloseSuccessModal = () => {
    setIsSuccess(false);
    window.location.href = "/profile";
  };
  const onCloseErrorModal = () => {
    setIsError(false);
  };

  const contractInfo = getContractInfo("BackpackNFT");
  const fetchData = async () => {
    if (chainId && library) {
      let _mintPrice = await ba_mintPrice(chainId, library.getSigner());
      if (_mintPrice) setBaPrice(parseFloat(_mintPrice));
      let baRes = await ba_Supply(chainId, library.getSigner());
      if (baRes != null) {
        setBaClassicSupply(parseInt(baRes.classicCount));
        setBaSpecialSupply(parseInt(baRes.specialCount) - 1000);
        setBaFounderSupply(parseInt(baRes.founderCount) - 2000);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [chainId]);
  const mintBackpack = async (model) => {
    if (account && chainId && library) {
      let _fee = toWei(baPrice);
      if (model === 1) setIsMinting1(true);
      else if (model === 2) setIsMinting2(true);
      else setIsMinting3(true);
      ba_mintToken(model, _fee, chainId, library.getSigner())
        .then((res) => {
          if (res.code) {
            setIsSuccess(true);
          } else {
            setErrMsg(res.message);
            setIsError(true);
          }
          if (model === 1) setIsMinting1(false);
          else if (model === 2) setIsMinting2(false);
          else setIsMinting3(false);
        })
        .catch((e) => {
          console.log(e);
          setErrMsg(e.message);
          setIsError(true);
          if (model === 1) setIsMinting1(false);
          else if (model === 2) setIsMinting2(false);
          else setIsMinting3(false);
        });
    }
  };

  return (
    <MintContainer className=" w-100">
      <SuccessModal
        isOpen={isSuccess}
        onClose={onCloseSuccessModal}
        title="Your Backpack has been delivered!"
        subtitle="Please check your inventor."
      />
      <ErrorModal
        isOpen={isError}
        onClose={onCloseErrorModal}
        title="Failed to mint!"
        subtitle={errMsg}
      />
      <UserProfile />
      <h1 className="team">Team</h1>
      <div className="content-bottom-team-card">
        <div className="content-bottom-team-card-row1">
          <div className="team-card-item frzzkZ">
            <img src="images/team-leaf.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-collector.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-bag.png" alt="" />
          </div>
        </div>
        <div className="content-bottom-team-card-row2">
          <div className="team-card-item frzzkZ">
            <img src="images/team-ku.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-ku.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-ku.png" alt="" />
          </div>
        </div>
        <div className="content-bottom-team-card-row3">
          <div className="team-card-item frzzkZ">
            <img src="images/team-leaf.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-leaf.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-leaf.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-leaf.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-leaf.png" alt="" />
          </div>
          <div className="team-card-item frzzkZ">
            <img src="images/team-leaf.png" alt="" />
          </div>
        </div>
      </div>
      <TextSapn3>BACKPACK</TextSapn3>

      <MintWraper>
        <MintBackground />

        {/* temporary display none */}
        <div className="mobile-hidden">
          <MintCardContainer>
            <MintCardStyleL>
              <MintCardDiv>
                <MintAvatar
                  style={{ backgroundImage: `url(/assets/m_classic.svg)` }}
                />
              </MintCardDiv>
              <MintCardH1>CLASSIC</MintCardH1>
              <MintCardH2>1 MOVR</MintCardH2>
              {isMinting1 ? (
                <MintButtonStyle>MINTING...</MintButtonStyle>
              ) : (
                <MintButtonStyle onClick={() => alert("Coming soon ...")}>
                  MINT
                </MintButtonStyle>
              )}
              {/* <MintButtonStyle onClick={() => mintBackpack(1)}>MINT</MintButtonStyle> */}
              <MintCardP>SUPPLY: {baClassicSupply} / 1000</MintCardP>
            </MintCardStyleL>
            <MintCardStyle>
              <MintCardDiv>
                <MintAvatar
                  style={{ backgroundImage: `url(/assets/m_special.svg)` }}
                />
              </MintCardDiv>
              <MintCardH1>SPECIAL</MintCardH1>
              <MintCardH2>1 MOVR</MintCardH2>
              {isMinting2 ? (
                <MintButtonStyle>MINTING...</MintButtonStyle>
              ) : (
                <MintButtonStyle onClick={() => alert("Coming soon ...")}>
                  MINT
                </MintButtonStyle>
              )}
              {/* <MintButtonStyle onClick={() => mintBackpack(2)}>MINT</MintButtonStyle> */}
              <MintCardP>SUPPLY: {baSpecialSupply} / 1000</MintCardP>
            </MintCardStyle>
            <MintCardStyleR>
              <MintCardDiv>
                <MintAvatar
                  style={{ backgroundImage: `url(/assets/m_founder.svg)` }}
                />
              </MintCardDiv>
              <MintCardH1>FOUNDER</MintCardH1>
              <MintCardH2>1 MOVR</MintCardH2>
              {isMinting3 ? (
                <MintButtonStyle>MINTING...</MintButtonStyle>
              ) : (
                <MintButtonStyle onClick={() => alert("Coming soon ...")}>
                  MINT
                </MintButtonStyle>
              )}
              {/* <MintButtonStyle onClick={() => mintBackpack(3)}>MINT</MintButtonStyle> */}
              <MintCardP>SUPPLY: {baFounderSupply} / 1000</MintCardP>
            </MintCardStyleR>
          </MintCardContainer>
        </div>
        {/* temporary display none */}

        <MintTitle>
          {/* <span className="c-inline">YOUR EXPANDED </span> */}
          {/* <span className="c-inline">KU VERSE INVENTORY.</span> */}
        </MintTitle>
      </MintWraper>

      <MarketPlaceCollectorItemGrid>
        <CollectorItems items={items} {...props} />
      </MarketPlaceCollectorItemGrid>
    </MintContainer>
  );
};
