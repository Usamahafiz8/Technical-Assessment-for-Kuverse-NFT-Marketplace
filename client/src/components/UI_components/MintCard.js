import React from "react";
import { MintButton } from "../UI_components/Buttons";
import styled from "styled-components";
import { device } from "../devices";

export const MintCardStyle = styled.div`
	width: fit-content;
	padding: 10px;
	background: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
`;
export const MintCardDiv = styled.div`
	width: 180px;
	height: 180px;
	background: #C7CCD1;
	display: flex;
	border-radius: 20px;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
`;
export const MintAvatar= styled.div`
	width: 100%;
	height: 100%;
	background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 20px;
`;
export const MintCardP = styled.p`
	font-style: normal;
	font-weight: 700;
	font-size: 8px;
	line-height: 10px;
	text-align: center;
	letter-spacing: 0.39em;
	background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
	padding-top: 5px;
`;
export const MintCardH1 = styled.h1`
	font-style: normal;
	font-weight: 700;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	letter-spacing: 0.535em;
	background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`;
export const MintCardH2 = styled.h2`
	font-style: normal;
	font-weight: 700;
	font-size: 15px;
	line-height: 18px;
	text-align: center;
	letter-spacing: 0.39em;
	background: linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`
export const MintCardStyleL = styled(MintCardStyle)`
	margin-left: 50px;
	transform: rotate(-2deg) translateY(10px) !important;
	@media ${device.mobile}{
		margin-left: 10px;
	  transform: rotate(0) translateY(0) !important;
  }
`;
export const MintCardStyleR = styled(MintCardStyle)`
  margin-right: 50px;
  transform: rotate(2deg) translateY(10px) !important;
  @media ${device.mobile}{
	margin-right: 10px;
	transform: rotate(0) translateY(0) !important;
  }
`;

export const MintCard = (props) => {
	return (
		<MintCardStyle>
			<MintCardDiv>
				<MintCardH1>{props.cardName}</MintCardH1>
			</MintCardDiv>
			<MintCardP>1 / 1000</MintCardP>
			<MintButton name={"MINT"}  />
		</MintCardStyle>
	);
};
export const MintCardL = (props) => {
	return (
		<MintCardStyleL>
			<MintCardDiv>
				<MintCardH1>{props.cardName}</MintCardH1>
			</MintCardDiv>
			<MintCardP>1 / 1000</MintCardP>
			<MintButton name={"MINT"}  />
		</MintCardStyleL>
	);
};
export const MintCardR = (props) => {
	return (
		<MintCardStyleR>
			<MintCardDiv>
				<MintCardH1>{props.cardName}</MintCardH1>
			</MintCardDiv>
			<MintCardP>1 / 1000</MintCardP>
			<MintButton name={"MINT"}  />
		</MintCardStyleR>
	);
};
