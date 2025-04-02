import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { device } from "../../devices";
import { TextSapn1, LinkTag } from "../../styles/Common";
import { MintButtonStyle } from "../../UI_components/Buttons";

const VerseContainer = styled.div`
	width: 100%
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	position: relative;
	padding: 0 2rem;

	@media ${device.laptopS} {
		margin:5rem 0;
	}
	@media ${device.tablet} {
		margin:2rem 0;
	}
	@media ${device.mobile} {
		margin:2rem 0;
	}
`;
const VerseDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4rem 8rem;
	background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
	box-shadow: inset 8px 8px 8px rgba(255, 255, 255, 0.5);
	border-radius: 60px;

	@media ${device.tablet} {
		padding: 2rem;
	}
	@media ${device.mobile} {
		padding: 2rem 2rem 1rem;
	}
`;
const VerseDivH1 = styled.div`
	font-size: 40px;
	line-height: 60px;
	text-align: center;
	letter-spacing: 0.15em;
	color: #ffffff;
	@media ${device.mobile}{
		font-size: 30px;
		line-height: 40px;
	}
`;
const VerseDivP = styled.div`
	font-size: 20px;
	line-height: 24px;
	text-align: center;
	letter-spacing: 0.15em;
	color: #ffffff;
	@media ${device.mobile}{
		font-size: 15px;
	}
`;
const banner = keyframes`
    0%{
        transform: rotate(0);
        color: #D00303;
    }
    40% {
        transform: rotate(-8.84deg);
        color: #890606;
        font-size: 20px;
        line-height: 24px;
    }
    50% {
        transform: rotate(-8.84deg);
        color: #890606;
        font-size: 20px;
        line-height: 24px;
    }
    90%{
        transform: rotate(0);
        color: #D00303;
    }
    100%{
        transform: rotate(0);
        color: #D00303;
    }
`;
const ComingSoonBanner = styled.h3`
	font-style: italic;
	font-weight: 800;
	font-size: 25px;
	line-height: 30px;
	text-align: center;
	letter-spacing: 0.15em;
	color: #d00303;
	position: absolute;
	bottom: 2rem;
	right: 4rem;
	animation-name: ${banner};
	animation-iteration-count: infinite;
	animation-duration: 3s;

	@media ${device.mobile}{
		font-size: 15px;
		bottom: 2rem;
		right: 4rem;
	}
`;
const Title = styled.div`
	padding: 2rem 0 1rem  0;
	text-align: center;
`;

export const Verse = () => {
	return (
		<VerseContainer>
			<hr style={{ width: 400, margin: 'auto', border: '1px solid #DCDCDC' }} />
			<Title>
				<TextSapn1>KU VERSE</TextSapn1>
			</Title>
			<img src="/images/lock.png" alt="" />
			{/* <VerseDiv>
				<VerseDivH1>KU VERSE LAND PLOTS</VerseDivH1>
				<VerseDivP>Save your kORE.</VerseDivP>
				<div style={{ paddingTop: '2rem' }}>
					<LinkTag to={'/about'}>
						<MintButtonStyle style={{ boxShadow: 'none' }}>ABOUT</MintButtonStyle>
					</LinkTag>
				</div>
			</VerseDiv>
			<ComingSoonBanner>COMING SOON</ComingSoonBanner> */}
		</VerseContainer>
	);
};
