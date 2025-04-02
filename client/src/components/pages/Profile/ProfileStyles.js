import styled from "styled-components";
import { device } from "../../devices";
import { CollectorItemTag } from "../../styles/CollectorItemStyles";

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
    overflow-y: auto;

	@media (max-width: 900px){
        align-items: flex-start;
    }
`;
export const OverlayBG = styled.div`
	width: 100vw;
	height: 100%;
	background-color: #79797979;
`;
export const OverlayConatiner = styled.div`
	position: absolute;
	z-index: 15;
	display: flex;
	flex-direction: row;
	align-items: center;
    @media (max-width: 500px){
        flex-direction: column;
		justify-content: center;
    }
`;
export const CollectorOverlay = styled.div`
	width: 30rem;
	height: 30rem;
	background: #F5F5F5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 10px 10px 20px rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 4rem;

    @media (max-width: 900px){
       margin: 0 1rem;
	   transform: scale(0.5) translateX(-50%) translateY(-40%);
    }
`;
export const Upper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
export const Header = styled.p`
		font-size: 30px;
		line-height: 36px;
		text-align: center;
		letter-spacing: 0.1em;
		color: #5277A3;
		margin: 10px;
`;
export const CollectorOverlayItemTag = styled(CollectorItemTag)`
	position: relative;
	top: 0;
	left: 0;
	margin: 10px;
`;
export const Lower = styled.div`
	display:flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
export const CollectorOverlayImage = styled.div`
	width: 22rem;
	height: 22rem;
	background: #FFFFFF;
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
	border-radius: 25px;

	&:hover {
		cursor: pointer;
	}
`;
export const CollectorOverlayImage1 = styled.div`
	width: 18rem;
	height: 18rem;
	background: #FFFFFF;
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
	border-radius: 25px;

	&:hover {
		cursor: pointer;
	}
`;
export const OverlayNav = styled.div`
	display: flex;
	flex-direction: column;
	background: rgba(199, 204, 209, 0.75);
	border: 1px solid #FFFFFF;
	box-shadow: inset 0px 3px 2px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	margin-left: 20px;
`;
export const OverlayNavButtonStyle = styled.div`
	height: 7rem;
	width: 3rem;
	margin: 3px 3px;
    background: linear-gradient(180deg, #00BEEE 0%, #0087D1 100%);
    box-shadow: -1px -1px 1px #FFFFFF, 2px 2px 2px rgba(141, 145, 151, 0.8);
    border-radius: 8px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 15px;
	line-height: 22px;
	letter-spacing: 0.1em;
	color: #fff;

	&:hover {
		cursor: pointer;
	}
	&:active {
		background: linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%);
        box-shadow: inset -1px -1px 1px #FFFFFF, inset 2px 2px 2px rgba(141, 145, 151, 0.8);
	}
    &.active {
        background: linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%);
        box-shadow: inset -1px -1px 1px #FFFFFF, inset 2px 2px 2px rgba(141, 145, 151, 0.8);
    }
`;
export const OverlayText = styled.p`
	transform: rotate(270deg);
`;
export const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0 4rem;
    overflow-x: hidden;
    // @media ${device.mobile}{
    //     transform: scale(0.7) translateY(-350px);
    //     height: min-content;
    // }
`;
export const Inventory = styled.div`
`;
export const InventoryItems = styled.div`
    width: 5rem;
    height: 5rem;
    background: #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    margin: 0 5px;
    transition: all 0.2s ease-out;

    @media (max-width: 1200px){
        margin: 5px;
    }
    @media ${device.laptopS}{
        margin: 0;
    }
    &:hover {
        transform: scale(2);
        transform-origin: left top;
        cursor: pointer;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
            1px 1px 4px 2px rgba(0, 0, 0, 0.25);
        }
`;
export const InventoryItemsDiv = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    padding: 10px 5px;
    display: grid;
    gap: 5px 0;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto;

    @media (max-width: 1200px){
        grid-template-columns: auto auto auto auto auto auto auto;
    }
    @media ${device.laptopS}{
        grid-template-columns: auto auto auto auto auto;
    }
    @media ${device.mobile}{
        grid-template-columns: auto auto auto auto;
    }
    @media ${device.mobileS}{
        grid-template-columns: auto auto auto ;
    }
`;
export const InvetP = styled.div`
    font-size: 12px;
    line-height: 15px;
    text-align: left;
    letter-spacing: 0.25em;
    color: #B9BCBE;
    margin: 10px 0;
`;
export const ProfileDivBorder = styled.div`
    width: 37rem;
    height: 47rem;
    background: #FFFFFF;
    box-shadow: 4px 3px 8px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    padding: 30px;
    margin: 0 2rem;
    margin-bottom: 4rem;
    position: relative;

    @media ${device.mobile}{
        transform: scale(0.75);
    }
    @media ${device.mobileS}{
        transform: scale(0.68);
    }
`;
export const ThreeBoxDiv = styled.div`
    position: absolute;
    top: -5px;
    z-index: -1;
    left:-1rem;
`;
export const ThreeBox = styled.div`
    width: 7rem;
    height: 7rem;
    margin:7px 0;
    border-radius: 10px;
    box-shadow: 4px 3px 8px rgba(0, 0, 0, 0.25);
`;
export const BackDiv = styled.div`
    width:80%;
    height: 80%;
    position: absolute;
    background: #FFFFFF;
    box-shadow: 4px 3px 8px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    right:-8px;
    bottom: -8px;
    z-index: 1;
`;
export const ProfileDiv = styled.div`
    width: 95%;
    height: 96%;
    background: #FFFFFF;
    border: 1px solid #00BEEE;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right:1rem;
    bottom: 1rem;
    z-index: 5;
`;
export const Section1 = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;
export const DivBig = styled.div`
    width: 18rem;
    height: fit-content;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`;
export const BigDash = styled.div`
    width: 80%;
    height: 10px;
    background: #F5F5F5;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 22.5px;
    margin: 20px 0 0;
`;
export const CollectorImage = styled.div`
    width: 16rem;
    height: 17rem;
    background: #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    margin: 20px 10px 10px 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
        max-width: 100%;
        max-heigh: 100%;
        padding: 10px;
        border-radius: 15px;
    }
`;
export const CommonDiv = styled.div`
    width: 7rem;
`;
export const UserName = styled.p`
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    letter-spacing: 0.1em;
    color: #00FFD1;
    margin-bottom: 10px;
`;
export const CommonProfileDiv = styled.div`
    background: #FFFFFF;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const CommonTag = styled(CollectorItemTag)`
    position: static;
    top: 10rem;
    left: 6rem;
    background: linear-gradient(180deg,#00BEEE 0%,#0087D1 100%) !important;
    cursor: pointer;
    &:active {
        background: linear-gradient(180deg,#BDF1FE 0%,#73C7F5 100%);
    }
`;
export const CommonImg = styled.div`
    width: 100%;
    height: 92px;
    border: 1px solid #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 46px;
    // margin: 10px 0 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
export const TwoDiv = styled.div`
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px 15px 10px 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
`;
export const TwoDivImg = styled.div`
    width: 6rem;
    height: 6rem;
    background: #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    margin: 5px 0;
    transition: all 0.2s ease-out;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    & > img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
    }
`;
export const ClickableDiv = styled.div`
    width:100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    &:hover{
        cursor: pointer;
    }
`;
export const Section2 = styled.div`
    display: flex;
    flex-direction: row;
`;
export const ThreeDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
export const ThreeDivCard = styled(TwoDivImg)`
    width: 8rem;
    height: fit-content;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const SmallDash = styled(BigDash)`
    margin: 10px 0;
    width: 95%;
`;
export const CenterDiv = styled(TwoDivImg)`
    width: 95%;
`;
export const TwoDivs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;
export const TwoDivsImg = styled(TwoDivImg)`
        width: 45%;
        height: 3rem;
`;
export const Section3 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const IconsDiv = styled(CollectorImage)`
    width: max-content;
    height: max-content;
    padding: 10px 5px;
    display: flex;
    flex-direction: row;
    margin: 20px 0 00px;
`;
export const IconBG = styled.div`
    width: 3.5rem;
    height: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    position:relative;
    &:hover{
        & > div{
        visibility: visible;
        }
        cursor: pointer
    }
`;
export const Alt = styled.div`
    width: 100%;
    height: 100%;
    font-size: 8px;
    line-height: 12px;
    text-align: center;
    letter-spacing: 0.1em;
    color: #000000;
    position: absolute;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    visibility: hidden;
`;
export const Icon = styled.img`
    width: 1.5rem;
    height: 1.5rem;    
`;
export const Iconstext = styled(CollectorImage)`
    width: max-content;
    height: max-content;
    padding: 10px 5px;
    display: flex;
    flex-direction: row;
`;
export const TextDiv = styled.div`
    width: 40px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    font-size: 14px;
    color: #5B5B5B;
    padding-top: 5px;
`;
export const LastDiv = styled.div`
    // width: 3rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    font-size: 14px;
    color: #5277A3;
`;
export const Lasttext = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
`;
export const Seperater = styled.div`
    width: 2px;
    height: 1rem;
    margin: 0 5px;
    background-color: #5B5B5B;
`;
export const CollapseProfile = styled.div`
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 900px){
        flex-direction: column;
    }
`;
export const SideProfileMenu = styled.div`
    width: max-content;
    height: max-content;
    box-shadow: 4px 3px 8px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    padding: 10px;
    
    @media (max-width: 900px){
        margin-bottom: 1rem;
    }
    @media ${device.mobile}{
        // transform: translateY(-100px);
        transform: scale(0.75) translateY(-200px);
    }
`;
export const SideProfileMenuBorder = styled.div`
    border: 1px solid #00FFD1;
    box-shadow: 4px 3px 8px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    padding: 10px;
`;
export const BackpackSlotWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
`
export const CloseLogo = styled.img`
    filter: invert(1);
    position: absolute;
    top:20px;
    right: 25px;
    width: 25px;
	display: none;
    @media ${device.tablet}{
		display: inline-block
	}
`;
// Edit Modal
export const CustomOverlayContainer = styled(OverlayConatiner)`
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
export const CustomOverlayWrap = styled.div`
    width: auto;
    height: auto;
    margin: 0;
	background: #F5F5F5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 10px 10px 20px rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    padding: 20px;
    position: relative;
`
export const CustomCloseIcon = styled.img`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 16px;
    height: 16px;
    z-index: 9;
    cursor: pointer;
`
export const CustomModalHeader = styled.h2`
    padding: 10px;
    text-align: center;
    color: #0087D1;
`
export const CustomNameTag = styled.div`
    padding: 10px 0;
`
export const CustomNameInput = styled.input`
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-shadow: inset 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 10px;
    height: 40px;
    width: 200px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
`
export const CustomAvatarTag = styled.div`
    padding: 10px;
    text-align: center;
    & > button {
        width: 100px;
        height: 28px;
        background: linear-gradient(180deg,#00BEEE 0%,#0087D1 100%);
        border-radius: 7px;
        border: none;
        font-size: 12px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
    }
    & > input[type=file] {
        display: none;
    }
`
export const CustomAvatarImg = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    cursor: pointer;
`
export const CustomModalButton = styled.button`
    width: 100%;
    height: 32px;
    background: linear-gradient(180deg,#00BEEE 0%,#0087D1 100%);
    box-shadow: -2px -3px 4px #ffffff, 4px 7px 12px 8px rgb(0 0 0 / 20%);
    border-radius: 25px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    line-height: 34px;
    text-align: center;
    letter-spacing: 0.2em;
    color: #FFFFFF;
    cursor: pointer;
`
// Collector Modal
export const BodyWrapper = styled.div`
    width: 240px;
`
export const BodyOne = styled.div`
    // padding-left: 20px;
    // padding-right: 20px;
    border: 1px dotted #0087D1;
    border-radius: 10px;
`
export const OneHeader = styled.div`
    width: 100%;
    text-align: center;
    padding: 5px 0;
`
export const OneImage = styled.div`
    padding: 0 10px;
    width: 100%;
    & > img {
        width: 100%;
        border-radius: 10px;
    }
`
export const OneAttributes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const OneAttributeItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
    & > img {
        width: 20px;
        height: 20px;
        padding: 2px;
    }
    & > span {
        font-size: 12px;
        color: #C7CCD1;
    }
`
export const BodyArrow = styled.div`
    text-align: center;
    & > .prev {
        padding-right: 10px;
        cursor: pointer;
    }
    & > .next {
        padding-left: 10px;
        cursor: pointer;
    }
    & > .dot {}
`

export const ModalFooterWrapper = styled.div`
    width: 100%;
    padding-top: 20px;
`