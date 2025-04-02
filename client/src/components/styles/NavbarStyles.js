import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../devices";

export const Line1Open = keyframes`
    0% {transform: rotate(0deg)  translate3d(0, 0, 0);}
    40% {transform: rotate(90deg)  translate3d(13px, -13px, 0);}
    90% {transform: rotate(90deg)  translate3d(13px, -13px, 0);}
    100% {transform: rotate(98deg) translate3d(11px, -15px, 0);}
`;

export const Line1Close = keyframes`
    0% {transform: rotate(98deg) translate3d(11px, -15px, 0);}
    100% {transform: rotate(0deg) translate3d(0);}
`;

export const Line2Open = keyframes`
    0% {transform: rotate(0deg);}
    100% {transform: rotate(90deg);}
`;

export const Line2Close = keyframes`
    0% {transform: rotate(90deg);}
    100% {transform: rotate(0deg);}
`;

export const Line3Open = keyframes`
    0% {transform: rotate(0deg)  translate3d(0, 0, 0);}
    45% {transform: rotate(90deg) translate3d(-13px, 15px, 0);}
    60% {transform: rotate(150deg) translate3d(8px, 10px, 0);}
    75% {transform: rotate(210deg) translate3d(18px, 15px, 0);}
    90% {transform: rotate(270deg) translate3d(13px, -15px, 0);  }
    100% {transform: rotate(262deg) translate3d(15px, -12px, 0);  }
`;

export const Line3Close = keyframes`
    0% {transform: rotate(262deg) translate3d(15px, -12px, 0);  }
    100% {transform: rotate(360deg) translate3d(0,0,0);}
`;

export const ContainerNavbar = styled.div`
  // width: 100%;
  display: flex;
  flex-direction: column;
`;

export const UpperNavbar = styled.div`
  margin-top: -73px;
  text-align: center;
  width: 495px;
  height: -webkit-fill-available;
  border-radius: 0px 0px 25px 25px;
  z-index: 99;
  background: linear-gradient(180deg, #00bbec 0%, #0087d1 78.12%);
  padding: 0 4rem;
  @media ${device.mobile} {
    display: none !important  ;
  }
  @media ${device.laptopS} {
    padding: 0 1rem;
    width: 300px;
  }
  @media ${device.laptopL} {
    padding: 0 2.3rem;
    width: 420px;
  }
  @media ${device.tablet} {
    display: none !important  ;
  }
`;

export const CompanyLogoImg = styled.img`
  width: 303px;
  height: 123px;
  &:hover {
    cursor: pointer;
  }
  @media ${device.laptopS} {
    margin-top: 15px;
    width: 210px;
  }
  @media ${device.tablet} {
    height: 83px;
    width: 200px;
    margin-top: 37px;
  }
`;

export const UpperNavbarMenu = styled.div`
  @media ${device.tablet} {
    padding-bottom: 1rem;
    width: 18rem;
  }
`;

export const UpperNavbarRight = styled.div`
  & > hr {
    width: 266px;
    border: 0.5px solid #eee;
    stroke: var(--grey, #eee);
    margin: 46px auto 38px;
  }

  @media ${device.mobile} {
    flex-direction: column;
    justify-content: center;
  }
`;
export const TwoIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 23px auto;
  @media ${device.tablet} {
    margin: 24px auto;
  }
  & > a {
    cursor: pointer;
    & > img {
      width: 32px;
      height: 34px;
    }
  }
`;
export const FootContent = styled.div`
  margin: 210px 0 81px;
  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.8px;
  }
`;
export const LowerNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #ffffff;
  margin: 4rem 0;
  @media ${device.tablet} {
    margin: 2rem 0;
  }
  @media ${device.mobile} {
    margin: 0;
  }
`;

export const NavbarDiv = styled.div`
  width: min-content;
  height: 9rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: hidden;
  overflow-x: visible;
  border-radius: 9rem;
  box-shadow: inset 2px 2px 13px #b9bcbe;
  @media (max-width: 1300px) {
    transform: scale(0.9);
  }
  @media (max-width: 1200px) {
    transform: scale(0.8);
  }
  @media ${device.laptopS} {
    transform: scale(1);
    height: 7rem;
    padding: 0 10px;
  }
  @media ${device.tablet} {
    height: 5rem;
    padding: 0 5px;
  }
  @media (max-width: 751px) {
    transform: scale(0.8);
  }
  @media (max-width: 651px) {
    transform: scale(0.7);
  }
  @media ${device.mobile} {
    height: max-content;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
    border-radius: 0;
    box-shadow: none;
  }
  @media ${device.mobileS} {
    gap: 5px;
  }
`;

export const ToggleMenu = styled.div`
  width: 100%;
`;

export const ToggleMenuItem = styled(Link)`
  font-size: 13px;
  line-height: 12px;
  margin: 0 0 34px;
  cursor: pointer;
  display: inline-block;
  padding: 22px;
  width: 100%;
  height: 55px;
  border-radius: 27px;
  background: linear-gradient(180deg, #00beee 0%, #008bd3 100%);
  box-shadow: 2px 2px 14px 0px rgba(255, 255, 255, 0.25) inset,
    2px 2px 5px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  color: #fff !important;
  letter-spacing: 0.25em;
  // color: #00BEEE;
  color: ${({ active }) => (active ? css`lightblue` : css`#00BEEE`)};
  text-decoration: none;
  vertical-align: middle;
  @media ${device.laptopS} {
    margin: 10px auto;
    width: 310px;
  }
  @media ${device.tablet} {
    width: 100%;
    margin: 15px auto;
  }
`;

export const NavbarItemDiv = styled.div`
  box-shadow: 4px 4px 6px #2b496c, -2px -2px 2px -1px #ffffff;
  width: 11rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  overflow: hidden;
  cursor: pointer;
  @media ${device.laptopS} {
    height: 5rem;
    width: 9rem;
  }
  @media ${device.tablet} {
    width: 8rem;
    height: 4.5rem;
    margin: 0 2px;
  }
  @media ${device.mobile} {
    width: 6rem;
    margin: 0;
  }
`;

export const NavbarItemDivC1 = styled(NavbarItemDiv)`
  border-top-left-radius: 139.5px;
  border-bottom-left-radius: 139.5px;
  cursor: pointer;
  @media ${device.mobile} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const NavbarItemDivC6 = styled(NavbarItemDiv)`
  border-top-right-radius: 139.5px;
  border-bottom-right-radius: 139.5px;
  @media ${device.mobile} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const NavbarImg = styled.img`
  margin-left: 5px;
  height: 180px;
  width: 180px;
  &:hover {
    cursor: pointer;
  }
  @media ${device.laptopS} {
    height: 100px;
    width: 100px;
    margin-left: 0;
  }
  @media ${device.mobile} {
    display: none;
  }
`;

export const NavBarMenuItems = styled.p`
  background: linear-gradient(180deg, #00beee 0%, #0087d1 100%);
  width: 100%;
  padding: 3rem 0;
  color: black;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.15em;
  text-align: center;
  color: #fff;
  &:active {
    background: linear-gradient(180deg, #bdf1fe 0%, #73c7f5 100%) !important;
    // box-shadow: inset 4px 4px 6px #2b496c, inset -2px -2px 2px -1px #ffffff;
  }
  @media ${device.laptopS} {
    font-size: 14px;
  }
  @media ${device.tablet} {
    font-size: 12px;
    letter-spacing: 0.1em;
  }
`;

export const CollectorOp = styled(NavBarMenuItems)`
  background: ${({ activeCollector }) =>
    activeCollector
      ? css`
			linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%)
			`
      : null};
  box-shadow: ${({ activeCollector }) =>
    activeCollector
      ? css`
			inset 4px 4px 10px rgba(0, 2, 52, 0.3) !important
			`
      : null};
`;

export const KuOp = styled(NavBarMenuItems)`
  background: ${({ activeKu }) =>
    activeKu
      ? css`
			linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%)
			`
      : css`
			linear-gradient(180deg, #00BEEE 0%, #0087D1 100%)
			`};
  box-shadow: ${({ activeKu }) =>
    activeKu
      ? css`
			inset 4px 4px 10px rgba(0, 2, 52, 0.3) !important
			`
      : null};
`;

export const BackpackOp = styled(NavBarMenuItems)`
  background: ${({ activeBackpack }) =>
    activeBackpack
      ? css`
			linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%)
			`
      : css`
			linear-gradient(180deg, #00BEEE 0%, #0087D1 100%)
			`};
  box-shadow: ${({ activeBackpack }) =>
    activeBackpack
      ? css`
			inset 4px 4px 10px rgba(0, 2, 52, 0.3) !important
			`
      : null};
`;

export const ItemsOp = styled(NavBarMenuItems)`
  background: ${({ activeItems }) =>
    activeItems
      ? css`
			linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%)
			`
      : css`
			linear-gradient(180deg, #00BEEE 0%, #0087D1 100%)
			`};
  box-shadow: ${({ activeItems }) =>
    activeItems
      ? css`
			inset 4px 4px 10px rgba(0, 2, 52, 0.3) !important
			`
      : null};
`;

export const KoreOp = styled(NavBarMenuItems)`
  background: ${({ activeKore }) =>
    activeKore
      ? css`
			linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%)
			`
      : css`
			linear-gradient(180deg, #00BEEE 0%, #0087D1 100%)
			`};
  box-shadow: ${({ activeKore }) =>
    activeKore
      ? css`
			inset 4px 4px 10px rgba(0, 2, 52, 0.3) !important
			`
      : null};
`;

export const VerseOp = styled(NavBarMenuItems)`
  background: ${({ activeVerse }) =>
    activeVerse
      ? css`
			linear-gradient(180deg, #BDF1FE 0%, #73C7F5 100%)
			`
      : css`
			linear-gradient(180deg, #00BEEE 0%, #0087D1 100%)
			`};
  box-shadow: ${({ activeVerse }) =>
    activeVerse
      ? css`
			inset 4px 4px 10px rgba(0, 2, 52, 0.3) !important
			`
      : null};
`;

export const Hamburger = styled.div`
  margin-left: 2rem;
  &:hover {
    cursor: pointer;
  }
  @media ${device.laptopS} {
    margin-left: 0;
  }
  @media ${device.mobile} {
    margin-left: 0;
    transform: scale(0.65);
  }
`;

export const Line = styled.div`
  width: 50px;
  height: 5px;
  background: linear-gradient(180deg, #00beee 0%, #0087d1 100%);
  margin: 8px auto;
  border-radius: 20px;
  &:nth-child(1) {
    animation: ${({ showNavMenu }) =>
      showNavMenu
        ? css`
            ${Line1Open} 0.8s linear forwards
          `
        : css`
            ${Line1Close} 0.5s linear forwards
          `};
  }
  &:nth-child(2) {
    animation: ${({ showNavMenu }) =>
      showNavMenu
        ? css`
            ${Line2Open} 0.5s linear forwards
          `
        : css`
            ${Line2Close} 0.5s linear forwards
          `};
  }
  &:nth-child(3) {
    animation: ${({ showNavMenu }) =>
      showNavMenu
        ? css`
            ${Line3Open} 0.8s linear forwards
          `
        : css`
            ${Line3Close} 0.5s linear forwards
          `};
  }
`;
