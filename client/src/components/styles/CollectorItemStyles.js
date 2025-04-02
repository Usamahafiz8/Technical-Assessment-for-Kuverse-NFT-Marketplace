import styled from "styled-components";
import { device } from "../devices";

export const CollectorItemContainer = styled.div`
	// width: 100%;
    // width: 12.5rem
`;
export const CollectorItemDiv = styled.div`
	width: 100%;
	background: #F9F9F9;
    border-radius: 12px;
	padding: 0 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	&:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
    @media ${device.mobileS}{
	width: 116px;

	}
    @media ${device.mobileL}{
        width: 123px;

	}
`;
export const CollectorItemH3 = styled.h3`
	font-size: 14px;
	line-height: 10px;
	text-align: center;
	letter-spacing: 0.1em;
	color: #00BEEE;
	margin: 1rem 0;
	@media ${device.mobile}{
	    font-size: 12px;
	}
`;
export const CollectorItemImage = styled.div`
	width: 106px;
	background-color: #fff;
    border-radius: 25px;
    height: 106px;
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
export const CollectorItemTag = styled.p`
	width: 75px;
    position: absolute;
    bottom: 0;
    left: 15px;
    font-size: 9px;
    line-height: 7px;
    text-align: center;
    letter-spacing: 1px;
	background: #E4E4E4;
	border-radius: 20px;
	padding: 5px 15px;
	color: #fff;
`;
export const CollectorP = styled.p`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.1em;
    padding: 10px;
    background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
`;
export const ModalOverlay = styled.div`
	position: fixed;
	z-index: 15;
	top: 0;
	left:0;
	width: 100vw;
	height: 100vh;
	background-color: #79797979;
	display: flex;
	flex-direction: row;
	align-items: center;

	@media (max-width: 900px){
        align-items: flex-start;
    }
`;
export const OverlayBG = styled.div`
	width: 100%;
	height: 100%;
	background-color: #79797979;
`;
export const OverlayConatiner = styled.div`
	position: absolute;
	z-index: 15;
	display: flex;
	flex-direction: row;
	align-items: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
	@media (max-width: 500px){
        flex-direction: column;
		justify-content: center;
    }
`;
export const OverlayWrapper = styled.div`
    width: fit-content;
    background: #F9F9F9;
    border-radius: 12px;
    display: flex;
    @media (max-width: 900px){
        margin: 0 1rem;
        transform: scale(0.5);
    }
`
export const CollectorOverlay = styled.div`
    max-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    position: relative;
`;
export const Upper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;
export const Header = styled.p`
    font-size: 30px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.1em;
    color: #5277A3;
    margin: 10px;
`;
export const CollectorOverlayImage = styled.div`
	width: 280px;
	height: 280px;
	background: #FFFFFF;
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
	border-radius: 25px;
    position: relative;

	&:hover {
		// cursor: pointer;
	}

    & > .o-download {
        position: absolute;
        cursor: pointer;
        bottom: 20px;
        right: 20px;
        width: 20px;
    }
`;
export const CloseLogo = styled.img`
    filter: invert(1);
    position: relative;
    bottom:20px;
    width: 25px;
	display: none;

	@media ${device.tablet}{
		display:inline-block
	}
`;
export const AttributeTag = styled.div`
    display: flex;
    flex-direction: row;
`
export const AttributeItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 4px 0px 4px;
    & > img {
        width: ${props => props.width ? props.width : "15px"};
        height: ${props => props.width ? props.width : "15px"};
        padding: ${props => props.padding ? props.padding : "2px"};
    }
    & > span {
        font-size: ${props => props.fontSize ? props.fontSize : "11px"};
        color: #C7CCD1;
    }
`
export const OverlayAction = styled.div`
    width: 100%;
    padding: 5px;
`
export const OverlayNav = styled.div`
    position: absolute;
    top: 20px;
    right: -20px;
    display: flex;
    flex-direction: column;
`;
export const OverlayNavButtonStyle = styled.div`
    height: 120px;
    width: 20px;
    margin: 3px 3px;
    background: #F9F9F9;
    border-radius: 8px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 11px;
	letter-spacing: 2px;
    cursor: pointer;
`;
export const OverlayText = styled.p`
	transform: rotate(270deg);
    color: #0087D1;
    &.active {
        color: #73C7F5;
    }
`;