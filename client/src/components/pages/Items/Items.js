import React, { useState, useEffect } from "react";
import { MintCardDiv, MintCardH1, MintCardH2, MintCardP, MintCardStyle, MintCardStyleL, MintCardStyleR, MintAvatar } from "../../UI_components/MintCard";
import { MintContainer, MintCardContainer, MintBackground, MintWraper, MintTitle } from "../Collector/CollectorStyles";
import { MintButtonStyle } from "../../UI_components/Buttons";
import axios from "axios";
import { useWeb3React } from '@web3-react/core';
import { it_mintPrice, it_mintToken, it_Supply, toWei } from '../../../utils/contracts';
import { MarketPlaceComponent } from "../MarketPlace/MarketPlaceComponent";
import { Title, TextSapn1 } from '../../styles/Common';
import { getContractInfo } from '../../../utils/index';
import { SuccessModal } from '../../UI_components/ModalSuccess';
import { ErrorModal } from '../../UI_components/ModalError';

export const Items = (props) => {
	const { account, chainId, library } = useWeb3React();
	const [itPrice, setItPrice] = useState(0);
	const [itKuberrySupply, setItKuberrySupply] = useState(0);
	const [itSamanutSupply, setItSamanutSupply] = useState(0);
	const [itMoonmelonSupply, setItMoonmelonSupply] = useState(0);
	const [itIronBeakSupply, setItIronBeakSupply] = useState(0);
	const [isMinting1, setIsMinting1] = useState(false);
	const [isMinting2, setIsMinting2] = useState(false);
	const [isMinting3, setIsMinting3] = useState(false);
	const [isMinting4, setIsMinting4] = useState(false);

	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errMsg, setErrMsg] = useState("Please check your wallet validation!");
	const onCloseSuccessModal = () => { setIsSuccess(false); window.location.href = '/profile'; }
	const onCloseErrorModal = () => { setIsError(false); }

	const contractInfo = getContractInfo("ItemNFT");
	const fetchData = async () => {
		if (chainId && library) {
			let _mintPrice = await it_mintPrice(chainId, library.getSigner());
			if (_mintPrice) setItPrice(parseFloat(_mintPrice));
			let itRes = await it_Supply(chainId, library.getSigner());
			if (itRes != null) {
				if (itRes.kuberryCount) setItKuberrySupply(parseInt(itRes.kuberryCount));
				if (itRes.samanutCount) setItSamanutSupply(parseInt(itRes.samanutCount) - 10000);
				if (itRes.moonmelonCount) setItMoonmelonSupply(parseInt(itRes.moonmelonCount) - 20000);
				if (itRes.ironBeakCount) setItIronBeakSupply(parseInt(itRes.ironBeakCount) - 25000);
			}
		}
	}
	useEffect(() => {
		fetchData();
	}, [chainId]);
	const mintItem = async (model) => {
		if (account && chainId && library) {
			let _fee = toWei(itPrice);
			if (model === 1) setIsMinting1(true);
			else if (model === 2) setIsMinting2(true);
			else if (model === 3) setIsMinting3(true);
			else setIsMinting4(true);
			it_mintToken(model, _fee, chainId, library.getSigner()).then(res => {
				if (res.code) { setIsSuccess(true); }
				else { setErrMsg(res.message); setIsError(true); }
				if (model === 1) setIsMinting1(false);
				else if (model === 2) setIsMinting2(false);
				else if (model === 3) setIsMinting3(false);
				else setIsMinting4(false);
			}).catch(e => {
				setErrMsg(e.message); setIsError(true);
				if (model === 1) setIsMinting1(false);
				else if (model === 2) setIsMinting2(false);
				else if (model === 3) setIsMinting3(false);
				else setIsMinting4(false);
			})
		}
	}
	return (
		<MintContainer>
			<SuccessModal
				isOpen={isSuccess}
				onClose={onCloseSuccessModal}
				title="Your Item has been delivered!"
				subtitle="Please check your inventor."
			/>
			<ErrorModal
				isOpen={isError}
				onClose={onCloseErrorModal}
				title="Failed to mint!"
				subtitle={errMsg}
			/>
			<hr style={{ width: 400, margin: 'auto', border: '1px solid #DCDCDC' }} />
			<Title>
				<TextSapn1>ITEMS</TextSapn1>
			</Title>
			{/* <img src="/images/lock.png" alt="" /> */}
			<MintWraper>
				<MintBackground />
				<MintCardContainer>
					<MintCardStyleL>
						<MintCardDiv>
							<MintAvatar style={{ backgroundImage: `url(/assets/m_kuberry.svg)` }} />
						</MintCardDiv>
						<MintCardH1>KU BERRY</MintCardH1>
						<MintCardH2>1 MOVR</MintCardH2>
						{isMinting1 ?
							<MintButtonStyle>MINTING...</MintButtonStyle>
							: <MintButtonStyle onClick={() => alert("Coming soon ...")}>MINT</MintButtonStyle>}
						{/* // : <MintButtonStyle onClick={() => mintItem(1)}>MINT</MintButtonStyle> */}
						<MintCardP>SUPPLY: {itKuberrySupply} / 10000</MintCardP>
					</MintCardStyleL>

					<MintCardStyle>
						<MintCardDiv>
							<MintAvatar style={{ backgroundImage: `url(/assets/m_samanut.svg)` }} />
						</MintCardDiv>
						<MintCardH1>SAMANUT</MintCardH1>
						<MintCardH2>1 MOVR</MintCardH2>
						{isMinting2 ?
							<MintButtonStyle>MINTING...</MintButtonStyle>
							: <MintButtonStyle onClick={() => alert("Coming soon ...")}>MINT</MintButtonStyle>}
						{/* // : <MintButtonStyle onClick={() => mintItem(2)}>MINT</MintButtonStyle> */}
						<MintCardP>SUPPLY: {itSamanutSupply} / 10000</MintCardP>
					</MintCardStyle>

					<MintCardStyle>
						<MintCardDiv>
							<MintAvatar style={{ backgroundImage: `url(/assets/m_moonmelon.svg)` }} />
						</MintCardDiv>
						<MintCardH1>MOONMELON</MintCardH1>
						<MintCardH2>1 MOVR</MintCardH2>
						{isMinting3 ?
							<MintButtonStyle>MINTING...</MintButtonStyle>
							: <MintButtonStyle onClick={() => alert("Coming soon ...")}>MINT</MintButtonStyle>}
						{/* // : <MintButtonStyle onClick={() => mintItem(3)}>MINT</MintButtonStyle> */}
						<MintCardP>SUPPLY: {itMoonmelonSupply} / 5000</MintCardP>
					</MintCardStyle>

					<MintCardStyleR>
						<MintCardDiv>
							<MintAvatar style={{ backgroundImage: `url(/assets/m_ironbeak.svg)` }} />
						</MintCardDiv>
						<MintCardH1>IRON BEAK</MintCardH1>
						<MintCardH2>1 MOVR</MintCardH2>
						{isMinting4 ?
							<MintButtonStyle>MINTING...</MintButtonStyle>
							: <MintButtonStyle onClick={() => alert("Coming soon ...")}>MINT</MintButtonStyle>}
						{/* // : <MintButtonStyle onClick={() => mintItem(4)}>MINT</MintButtonStyle> */}
						<MintCardP>SUPPLY: {itIronBeakSupply} / 1000</MintCardP>
					</MintCardStyleR>
				</MintCardContainer>
				<MintTitle>
					<span className="c-inline">DELICIOUS POWERUPS </span>
					<span className="c-inline">FOR YOUR KU</span>
				</MintTitle>
			</MintWraper>

			<MarketPlaceComponent collection={contractInfo.address} {...props} />
		</MintContainer>
	);
};
