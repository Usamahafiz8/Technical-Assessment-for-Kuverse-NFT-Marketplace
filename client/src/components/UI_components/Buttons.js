import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { device } from "../devices";

const updateButton2 = keyframes`
  0% {background-color: #567ca9;}
  50% {background-color: #A0CCFF;}
  100% {background-color: #567ca9;}
`;

const updateMintButton = keyframes`
  0% {background-color: #567ca9;}
  50% {background: #A0CCFF;}
  100% {background-color: #567ca9;}
`;

const updateHatchButton = keyframes`
  0% {background-color: #567ca9;}
  50% {background-color: #4FB320;}
  100% {background-color: #567ca9;}
`;

const updateBuy = keyframes`
  0% {background-color: #890606;}
  50% {background-color: #FF9494;}
  100% {background-color: #890606;}
`;

const updateBid = keyframes`
  0% {background-color: #F5F5F5;  color: #000;}
  50% {background-color: #5277A3; color: #FFF;}
  100% {background-color: #F5F5F5;  color: #000;}
`;

export const ButtonStyle2 = styled.div`
	background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
	box-shadow: -1px -1px 4px #FFFFFF, 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 50px;
	width: 30rem;
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0;
	border-radius: 9rem;
	font-size: 15px;
	line-height: 18px;
	letter-spacing: 0.1em;
	animation: ${({ toggle }) =>
		toggle
			? css`
          ${updateButton2} 1s linear forwards
        `
			: null};

	&:hover {
		cursor: pointer;
		background: linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%);
		box-shadow: inset 4px 4px 10px rgba(0, 2, 52, 0.3);
	}



	@media ${device.tablet}{
		width: 20rem;
	}

	@media ${device.mobile}{
		width: 12rem;
		height: 3rem;
	}

`;

export const ButtonLink2 = styled(Link)`
	width: 100%;
	padding: 2rem 0;
	color: #fff;
	text-decoration: none;
	font-size: 18px;
	line-height: 22px;
	letter-spacing: 0.15em;
	text-align: center;
	&:hover {
		cursor: pointer;
	}

	@media ${device.mobile}{
		font-size: 12px;
		padding: 0;
		margin:  auto 0;
	}
`;

export const ButtonDiv = styled.div`
	width: fit-content;
	height: fit-content;
	position: relative;
`;

export const ButtonStyle1 = styled.button`
	height: 3rem;
	width: 20rem;
	background: #ffffff;
	box-shadow: inset 0px 0px 4px #FFFFFF, inset 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 50px;
	border: none;
	font-family: Inter;
	font-size: 15px;
	font-weight: 700;
	line-height: 18px;
	letter-spacing: 0.5em;
	text-align: center;
	color: #00BEEE;
	&:hover {
		cursor: pointer;
	}
	
	@media (max-width:1200px) {
		width: 16rem;
  	}

	@media (max-width:1100px) {
		width: 14rem;
  	}
	
	@media ${device.laptopS} {
		width: 16rem;
  	}

	@media ${device.tablet} {
		width: 14rem;
  	}

`;

const Connecting = styled(ButtonStyle1)`
	background: #00FFD1;
	color: #fff;
	letter-spacing: 01em;
	font-size: 25px;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

const Connected = styled(ButtonStyle1)`
	color: #7BFFE7;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

export const ButtonStyle3 = styled.button`
	background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
	box-shadow: -4px -3px 4px #FFFFFF, 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 50px;
	border: none;
	width: 18rem;
	height: 3rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 15px;
	line-height: 22px;
	letter-spacing: 0.1em;
	color: #fff;

	animation: ${({ toggleHatch }) =>
		toggleHatch
			? css`
          ${updateHatchButton} 1s linear forwards
        `
			: null};

	&:hover {
		cursor: pointer;
		background: linear-gradient(180deg,#BDF1FE 0%,#73C7F5 100%);
	}

  	@media ${device.laptopS}{
		width: 15rem;
		font-size: 12px;
	}

	@media ${device.mobile}{
		width: 12rem;
		font-size: 12px;
	}
`;

const ButtonStyle4 = styled.button`
	background: #f5f5f5;
	box-shadow: -1px 0px 4px rgba(0, 0, 0, 0.25);
	border: none;
	border-radius: 25px;
	width: 18rem;
	height: 3rem;
	font-weight: 700;
	font-size: 25px;
	line-height: 30px;
	letter-spacing: 0.15em;
	margin: 1rem 2rem 4rem;

	&:hover {
		cursor: pointer;
	}
`;

const HatchButtonStyle = styled(ButtonStyle1)`
	margin: 5px 0 !important;
	color: #567ca9;
	

	&:hover {
		cursor: pointer;
	}
	@media ${device.tablet}{
		width: 14rem;
	}
	@media ${device.mobile}{
		width: 16rem;

	}
`;

const ConnectingH = styled(HatchButtonStyle)`
	background: #00FFD1;
	color: #fff;
	letter-spacing: 01em;
	font-size: 25px;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

const ConnectedH = styled(HatchButtonStyle)`
	color: #7BFFE7;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

export const MintButtonStyle = styled(ButtonStyle3)`
	width: 10rem !important;
	animation: ${({ toggle }) =>
		toggle
			? css`
          ${updateMintButton} 1s linear forwards
        `
			: null};
	@media ${device.tablet}{
		width: 7rem !important;
		height: 2.5rem !important;
		font-size: 12px;
	}
`;

const BridgeButtonDiv = styled.div`
	width: fit-content;
	height: fit-content;
	position: relative;
`;

const BridgeButtonStyle = styled.button`
	width: 18rem;
	height: 5rem;
	background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
	box-shadow: -2px -3px 4px #FFFFFF, 4px 7px 12px 8px rgba(0, 0, 0, 0.2);
	border-radius: 25px;
	border: none;
	font-size: 28px;
	font-weight: 700;
	line-height: 34px;
	text-align: center;
	letter-spacing: 0.2em;
	color: #FFFFFF;
	margin: 3rem 0;
	transition: all 0.5s ease-in-out;
	&:hover {
		cursor: pointer;
		background-color: #95F2FF;
	}

	@media ${device.mobile}{
		margin: 1rem 0;
    }
`;

const SingleDot = styled(BridgeButtonStyle)`
	background: #00DFFD;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

const MultipleDot = styled(BridgeButtonStyle)`
	background: #7BFFE7;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

const Success = styled(BridgeButtonStyle)`
	background: #00FFD1;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

const Export = styled(BridgeButtonStyle)`
	background: #D20000;
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
`;

export const Button1 = (props) => {
	const [toggle, setToggle] = useState(false);
	const [toggleConnected, setToggleConnected] = useState(false);
	const showButtons = () => {
		setToggle(true);
		setTimeout(function () {
			setToggle(false)
			setToggleConnected(true);
			setTimeout(function () {
				setToggleConnected(false)
			}, 1000);
		}, 1000);
		if (!props.account) props.connectAccount();
	}

	return (<ButtonDiv><ButtonStyle1 onClick={showButtons}>{props.name}</ButtonStyle1>
		{toggle && <Connecting>...</Connecting>}
		{toggleConnected && <Connected>CONNECTED</Connected>}
	</ButtonDiv>
	);
};

export const HatchButton = (props) => {
	const [toggle, setToggle] = useState(false);
	const [toggleConnected, setToggleConnected] = useState(false);
	const showButtons = () => {
		setToggle(true);
		if (!props.account) props.connectAccount();
		setTimeout(function () {
			setToggle(false)
			setToggleConnected(true);
			setTimeout(function () {
				setToggleConnected(false)
			}, 1000);
		}, 1000);
	}
	return (
		<ButtonDiv>
			<HatchButtonStyle onClick={showButtons}>{props.name}</HatchButtonStyle>
			{toggle && <ConnectingH>...</ConnectingH>}
			{toggleConnected && <ConnectedH>CONNECTED</ConnectedH>}
		</ButtonDiv>
	)
};

export const HatchKusamaButton = (props) => {
	const [toggle, setToggle] = useState(false);
	const [toggleConnected, setToggleConnected] = useState(false);
	const showButtons = () => {
		setToggle(true);
		props.connectKusama();
		setTimeout(function () {
			setToggle(false)
			setToggleConnected(true);
			setTimeout(function () {
				setToggleConnected(false)
			}, 1000);
		}, 1000);
	}
	return (
		<ButtonDiv>
			<HatchButtonStyle onClick={showButtons}>{props.name}</HatchButtonStyle>
			{toggle && <ConnectingH>...</ConnectingH>}
			{toggleConnected && <ConnectedH>CONNECTED</ConnectedH>}
		</ButtonDiv>
	)
};

export const Button2 = (props) => {
	const [toggle, setToggle] = useState(false);
	return (
		<ButtonStyle2 onClick={() => {
			setToggle(!toggle);
			if (!props.account) props.connectAccount();
		}} toggle={toggle}>
			<ButtonLink2 to={props.linkTo}>{props.name}</ButtonLink2>
		</ButtonStyle2>
	);
};

export const ButtonKusama = (props) => {
	const [toggle, setToggle] = useState(false);
	return (
		<ButtonStyle2 onClick={() => {
			setToggle(!toggle);
			props.connectKusama();
		}} toggle={toggle}>
			<ButtonLink2 to={""}>{props.name}</ButtonLink2>
		</ButtonStyle2>
	);
};

export const Button3 = (props) => {
	const [toggleHatch, setToggle] = useState(false);
	return <ButtonStyle3 onClick={() => {
		setToggle(!toggleHatch);
	}} toggleHatch={toggleHatch}>{props.name}</ButtonStyle3>;
};

export const AirdropButton = (props) => {
	const [toggleHatch, setToggle] = useState(false);
	return <ButtonStyle3 onClick={() => {
		setToggle(!toggleHatch);
		props.onAirdrop();
	}} toggleHatch={toggleHatch}>{props.name}</ButtonStyle3>;
};

export const MintButton = (props) => {
	const [toggle, setToggle] = useState(false);
	return <MintButtonStyle onClick={() => {
		setToggle(!toggle);
	}} toggle={toggle} >{props.name}</MintButtonStyle>;
};

export const Button4 = (props) => {
	return <ButtonStyle4 className={props.class}>{props.name}</ButtonStyle4>;
};

export const BridgeButton = (props) => {
	const [toggle1, setToggle1] = useState(false);
	const [toggle2, setToggle2] = useState(false);
	const [toggle3, setToggle3] = useState(false);
	const [toggle4, setToggle4] = useState(false);
	const showButtons = () => {
		setToggle1(true);
		setTimeout(function () {
			setToggle1(false);
			setToggle2(true);
			setTimeout(function () {
				setToggle2(false);
				setToggle3(true);
				setTimeout(function () {
					setToggle3(false);
					setToggle4(true);
					setTimeout(function () {
						setToggle4(false);
					}, 2000);
				}, 1500);
			}, 1000);
		}, 1000);
	}


	return (
		<BridgeButtonDiv>
			<BridgeButtonStyle onClick={showButtons} >{props.name}</BridgeButtonStyle>
			{toggle1 && <SingleDot>.</SingleDot>}
			{toggle2 && <MultipleDot>...</MultipleDot>}
			{toggle3 && <Success>SUCCESSFUL</Success>}
			{toggle4 && <Export>EXPORT</Export>}

		</BridgeButtonDiv>
	);

};

const BuyButtonStyle = styled(MintButtonStyle)`
	border-radius: 20px;
	background: #890606;
	box-shadow: -4px -3px 4px #FFFFFF, 0px 4px 4px rgba(0, 0, 0, 0.25);
	font-size: 22px;
	line-height: 27px;
	text-align: center;
	letter-spacing: 0.1em;
	color: #FFF;
	margin: 0.5rem 0;
	animation: ${({ toggleBuy }) =>
		toggleBuy
			? css`
          ${updateBuy} 1s linear forwards
        `
			: null};
`;

const BidButtonStyle = styled(MintButtonStyle)`
	border-radius: 20px;
	background: #F5F5F5;
	box-shadow: -4px -3px 4px #FFFFFF, 0px 4px 4px rgba(0, 0, 0, 0.25);
	font-size: 22px;
	line-height: 27px;
	text-align: center;
	letter-spacing: 0.1em;
	color: #000;
	margin: 1rem 0;
	animation: ${({ toggleBid }) =>
		toggleBid
			? css`
          ${updateBid} 1s linear forwards
        `
			: null};

`;

export const BuyButton = (props) => {
	const [toggleBuy, setToggleBuy] = useState(false);
	const [toggleBid, setToggleBid] = useState(false);
	return (
		<>
			<BuyButtonStyle onClick={() => {
				setToggleBuy(!toggleBuy);
			}} toggleBuy={toggleBuy}>{props.buy}</BuyButtonStyle>
			<BidButtonStyle onClick={() => {
				setToggleBid(!toggleBid);
			}} toggleBid={toggleBid}>{props.bid}</BidButtonStyle>
		</>
	);
};