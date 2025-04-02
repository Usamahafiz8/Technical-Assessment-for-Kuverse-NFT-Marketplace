import React, { useState, useEffect } from "react";
import { MintCardDiv, MintCardH1, MintCardH2, MintCardP, MintCardStyle, MintCardStyleL, MintCardStyleR, MintAvatar } from "../../UI_components/MintCard";
import { MintButtonStyle } from "../../UI_components/Buttons";
import { MintCardContainer, MintContainer, MintBackground, MintWraper, MintTitle } from "./CollectorStyles";
import axios from "axios";
import { useWeb3React } from '@web3-react/core';
import { co_mintPrice, co_mintToken, co_Supply, toWei } from '../../../utils/contracts';
import { MarketPlaceComponent } from "../MarketPlace/MarketPlaceComponent";
import { Title, TextSapn1 } from '../../styles/Common';
import { getContractInfo } from '../../../utils/index';
import { SuccessModal } from '../../UI_components/ModalSuccess';
import { ErrorModal } from '../../UI_components/ModalError';

export const Collector = (props) => {
    const { account, chainId, library } = useWeb3React();
    const [coPrice, setCoPrice] = useState(0);
    const [coMaleSupply, setCoMaleSupply] = useState(0);
    const [coFemaleSupply, setCoFemaleSupply] = useState(0);
    const [isMinting1, setIsMinting1] = useState(false);
    const [isMinting2, setIsMinting2] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errMsg, setErrMsg] = useState("Please check your wallet validation!");
    const onCloseSuccessModal = () => { setIsSuccess(false); window.location.href = '/profile'; }
    const onCloseErrorModal = () => { setIsError(false); }

    const contractInfo = getContractInfo("CollectorNFT");
    const fetchData = async () => {
        if (chainId && library) {
            let _mintPrice = await co_mintPrice(chainId, library.getSigner());
            if (_mintPrice) setCoPrice(parseFloat(_mintPrice));
            let coRes = await co_Supply(chainId, library.getSigner());
            if (coRes != null) {
                setCoMaleSupply(parseInt(coRes.maleCount));
                if (coRes.femaleCount) setCoFemaleSupply(parseInt(coRes.femaleCount) - 1000);
            }
        }
    }
    useEffect(() => {
        fetchData();
    }, [chainId]);
    const mintCollector = async (model) => {
        if (account && chainId && library) {
            let _fee = toWei(coPrice);
            if (model === 1) setIsMinting1(true);
            else setIsMinting2(true);
            co_mintToken(model, _fee, chainId, library.getSigner()).then(res => {
                if (res.code) { setIsSuccess(true); }
                else { setErrMsg(res.message); setIsError(true); }
                if (model === 1) setIsMinting1(false);
                else setIsMinting2(false);
            }).catch(e => {
                setErrMsg(e.message); setIsError(true);
                if (model === 1) setIsMinting1(false);
                else setIsMinting2(false);
            })

        }
    }
    return (
        <MintContainer>
            <SuccessModal
                isOpen={isSuccess}
                onClose={onCloseSuccessModal}
                title="Your Collector has been delivered!"
                subtitle="Please check your inventor."
            />
            <ErrorModal
                isOpen={isError}
                onClose={onCloseErrorModal}
                title="Failed to mint!"
                subtitle={errMsg}
            />
            <hr style={{ maxWidth: 400, margin: 'auto', border: '1px solid #DCDCDC' }} />
            <Title>
                <TextSapn1>COLLECTOR</TextSapn1>
            </Title>
            {/* <img src="/images/lock.png" alt="" /> */}
            <MintWraper>
                <MintBackground />
                <MintCardContainer>
                    <MintCardStyleL>
                        <MintCardDiv>
                            <MintAvatar style={{ backgroundImage: `url(/assets/m_male.svg)` }} />
                        </MintCardDiv>
                        <MintCardH1>MALE</MintCardH1>
                        <MintCardH2>1 MOVR</MintCardH2>
                        {isMinting1 ?
                            <MintButtonStyle>MINTING...</MintButtonStyle>
                            : <MintButtonStyle onClick={() => alert("Coming soon ...")}>MINT</MintButtonStyle>}
                            {/* <MintButtonStyle onClick={() => mintCollector(1)}>MINT</MintButtonStyle> */}
                        <MintCardP>SUPPLY: {coMaleSupply} / 1000</MintCardP>
                    </MintCardStyleL>
                    <MintCardStyleR>
                        <MintCardDiv>
                            <MintAvatar style={{ backgroundImage: `url(/assets/m_female.png)` }} />
                        </MintCardDiv>
                        <MintCardH1>FEMALE</MintCardH1>
                        <MintCardH2>1 MOVR</MintCardH2>
                        {isMinting2 ?
                            <MintButtonStyle>MINTING...</MintButtonStyle>
                            : <MintButtonStyle onClick={() => alert("Coming soon ...")}>MINT</MintButtonStyle>}
                            {/* <MintButtonStyle onClick={() => mintCollector(2)}>MINT</MintButtonStyle> */}
                        <MintCardP>SUPPLY: {coFemaleSupply} / 1000</MintCardP>
                    </MintCardStyleR>
                </MintCardContainer>
                <MintTitle>
                    <span className="c-inline">YOUR KU VERSE GAME</span>
                    <span className="c-inline"> PASS.</span>
                </MintTitle>
            </MintWraper> 


            <MarketPlaceComponent collection={contractInfo.address} {...props} />
        </MintContainer>
    );
};
