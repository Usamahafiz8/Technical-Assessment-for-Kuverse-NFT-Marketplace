import React from "react";
import styled from "styled-components";
import { device } from "../../devices";

const ProfilePicture = "/assets/bird.png"
const Graph = "/assets/marketstats-graph.png";

const MarketstatsContainer = styled.div`
	// display: flex;
	// flex-direction: row;
	justify-content: space-around;
	margin: 0 3rem 3rem;

	@media ${device.tablet}{
		flex-direction: column;
		justify-content: center;
	
	}
`;

const MarketStatsLeft = styled.div`
	display: flex;
	flex-direction: row;

	@media ${device.mobile}{
		flex-direction: column;
	}
`;

const MarketStatsHeader = styled.p`
	font-size: 25px;
	line-height: 30px;
	letter-spacing: 0.1em;
	margin-bottom: 1rem;
	color: #00BEEE;

	@media ${device.tablet}{
		font-size: 20px;
	}

	@media ${device.mobile}{
		font-size: 18px;
	
	}
`;

const MarketStatsCol = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 2rem;

	& > div {
		border: 1px dashed #9747ff;
		border-radius: 5px;
	}

	@media ${device.tablet}{
		margin: 0 1.5rem;
	
	}

	@media ${device.mobile}{
		margin: 2rem 10px;
	
	}
`;

const MarketStatsNormalDiv = styled.div``;

const MarketStatsRight = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const TopColList = styled.div`
	width: 20rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 15px;
	line-height: 18px;
	letter-spacing: 0.1em;
	color: #00BEEE;
	padding: 0.5rem 1rem;

	@media ${device.tablet}{
		width: 15rem;
	}
`;

const ProfileImage = styled.div`
	background-color: #f4f4f4;
	width: 4rem;
	height: 4rem;
	display: inline-block;
	border-radius: 50%;
	margin-right: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media ${device.tablet}{
		width: 3rem;
		height: 3rem;
	
	}
`;

const MarketStatsGraph = styled.img`
	margin: 5rem 0;
	@media ${device.tablet}{
		width: 95%;
	}

	@media ${device.mobile}{
		width: 100%;
	}
`;

const ProfilePictureImg = styled.img`
	width: 3rem;
	height: 3rem;

	@media ${device.tablet}{
		width: 2rem;
		height: 2rem;
	
	}
`;


export const MarketStats = () => {
	return (
		<MarketstatsContainer>
			<img src="/images/lock.png" alt="" />
			{/* <MarketStatsRight>
				<MarketStatsGraph src={Graph} />
			</MarketStatsRight>
			<MarketStatsLeft>
				<MarketStatsCol>
					<MarketStatsHeader>TOP COLLECTORS</MarketStatsHeader>
					<MarketStatsNormalDiv>
						{getProfileUsingForLoop(5)}
					</MarketStatsNormalDiv>
				</MarketStatsCol>
				<MarketStatsCol>
					<MarketStatsHeader>TOP COLLECTIONS</MarketStatsHeader>
					<MarketStatsNormalDiv>
						{getProfileUsingForLoop(5)}
					</MarketStatsNormalDiv>
				</MarketStatsCol>
			</MarketStatsLeft> */}
		</MarketstatsContainer>
	);
};

const getProfileUsingForLoop = (num) => {
	const array = [];

	for (var i = 1; i <= num; i++) {
		array.push(
			<TopColList key={i}>
				<ProfileImage><ProfilePictureImg src={ProfilePicture} /></ProfileImage> w3n: username
			</TopColList>
		);
	}

	return array;
};
