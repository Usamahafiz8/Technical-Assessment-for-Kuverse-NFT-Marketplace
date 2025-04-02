import React, { useState, useEffect } from "react";
import { MintCardDiv, MintCardH1, MintCardH2, MintCardP, MintCardStyle, MintAvatar } from "../../UI_components/MintCard";
import { MintContainer, MintCardContainer, MintBackground, MintWraper, MintTitle } from "../Collector/CollectorStyles";
import { MintButtonStyle } from "../../UI_components/Buttons";
import axios from "axios";
import { useWeb3React } from '@web3-react/core';
import { ku_mintPrice, ku_mintToken, ku_Supply, toWei } from '../../../utils/contracts';
import { MarketPlaceComponent } from "../MarketPlace/MarketPlaceComponent";
import { Title, TextSapn1 } from '../../styles/Common';
import { getContractInfo } from '../../../utils/index';
import { SuccessModal } from '../../UI_components/ModalSuccess';
import { ErrorModal } from '../../UI_components/ModalError';

export const Ku = (props) => {
	const { account, chainId, library } = useWeb3React();
	const [kuPrice, setKuPrice] = useState(0);
	const [kuSupply, setKuSupply] = useState(0);
	const [isMinting, setIsMinting] = useState(false);

	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errMsg, setErrMsg] = useState("Please check your wallet validation!");
	const onCloseSuccessModal = () => { setIsSuccess(false); window.location.href = '/profile'; }
	const onCloseErrorModal = () => { setIsError(false); }

	const contractInfo = getContractInfo("KuNFT");
	const fetchData = async () => {
		if (chainId && library) {
			let _mintPrice = await ku_mintPrice(chainId, library.getSigner());
			if (_mintPrice) setKuPrice(parseFloat(_mintPrice));
			let kuCount = await ku_Supply(chainId, library.getSigner());
			if (kuCount) setKuSupply(parseInt(kuCount));
		}
	}
	useEffect(() => {
		fetchData();
	}, [chainId]);
	const mintKu = () => {
		if (account && chainId && library) {
			let _fee = toWei(kuPrice);
			setIsMinting(true);
			ku_mintToken(_fee, chainId, library.getSigner()).then(res => {
				if (res.code) { setIsSuccess(true); }
				else { setErrMsg(res.message); setIsError(true); }
				setIsMinting(false);
			}).catch(e => {
				setIsError(true);
				setIsMinting(false);
			})
		}
	}
	return (
		<MintContainer>
			<SuccessModal
				isOpen={isSuccess}
				onClose={onCloseSuccessModal}
				title="Your KU has been delivered!"
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
				<TextSapn1>KU</TextSapn1>
			</Title>
			{/* <img src="/images/lock.png" alt="" /> */}
			<MintWraper>
				<MintBackground />
				<MintCardContainer>
					<MintCardStyle style={{ marginLeft: '50px', marginRight: '50px' }}>
						<MintCardDiv>
							<MintAvatar style={{ backgroundImage: `url(/assets/m_ku.svg)` }} />
						</MintCardDiv>
						<MintCardH1>KU</MintCardH1>
						<MintCardH2>1 MOVR</MintCardH2>
						{isMinting ?
							<MintButtonStyle>MINTING...</MintButtonStyle>
							: <MintButtonStyle onClick={() => alert("Coming soon ...")}>MINT</MintButtonStyle>}
							{/* <MintButtonStyle onClick={() => mintKu()}>MINT</MintButtonStyle> */}
						<MintCardP>SUPPLY: {kuSupply} / 6000</MintCardP>
					</MintCardStyle>
				</MintCardContainer>
				<MintTitle>
					<span className="c-block">YOUR BEST FRIEND &</span>
					<span className="c-block">TRUSTY WEAPON.</span>
				</MintTitle>
			</MintWraper>

			<MarketPlaceComponent collection={contractInfo.address} {...props} />

		</MintContainer>
	);
};
