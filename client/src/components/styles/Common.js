import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../components/devices";

export const Container = styled.div`
  max-width: 1440px;
  margin: auto;
  @media ${device.mobile} {
    padding: 3px 0 !important;
  }
`;
export const TextSapnM = styled.span`
  color: #00a8e2;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
  margin: 74px 0 13px;

  @media ${device.mobile} {
    margin: 55px 0 5px;
  }
`;
export const Title = styled.div`
  margin: 16px 0 0 0;
  padding: 20px 23px;
  text-align: center;
  @media ${device.mobile} {
    margin: 5px 0 !important;
    padding: 0 17px !important;
    text-align: center;
  }
`;

export const MarketPlaceMain = styled.div`
  width: 100%;
`;
export const MarketPlaceContent = styled.div`
  //  margin: 16px 0;
`;
export const TextSapn = styled.span`
  font-weight: bolder;
  text-align: center;
  background: linear-gradient(180deg, #00beee 0%, #0087d1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
export const TextSapn1 = styled.span`
  color: #00a8e2;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
  @media ${device.mobile} {
    font-size: 24px !important;
    font-style: normal;
    font-weight: 900 !important;
    line-height: normal !important;
    letter-spacing: 12.84px !important;
  }
`;
export const TextSapn3 = styled.span`
  margin: 31px 0 0;
  padding: 0;
  color: #00a8e2;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
`;
export const MarketPlaceLogo = styled.div`
  display: flex;
  justify-content: center;
  gap: 41px;
  margin-top: 14px;
  & > a {
    cursor: pointer;
    & > img {
      width: 53px;
      height: 53px;
    }
  }
  @media ${device.mobile} {
    gap: 34px;
    margin: 11px 0 26px;
  }
`;
export const MarketPlaceLogo1 = styled.div`
  display: flex;
  justify-content: center;
  gap: 41px;
  margin: 54px 0 27px;
  & > a {
    cursor: pointer;
    & > img {
      width: 53px;
      height: 53px;
    }
  }
  @media ${device.mobile} {
    gap: 16px;
    margin: 19px 0 0;
  }
`;
export const TextSpan2 = styled.span`
  color: #b1b3b4;
  @media ${device.laptopL} {
    letter-spacing: 0.43em !important;
  }
  @media ${device.mobile} {
    color: #b1b3b4 !important;
    font-size: 16px !important;
    font-style: normal !important;
    font-weight: 900 !important;
    line-height: normal !important;
    letter-spacing: 8.56px !important;
  }
`;
export const TextSpanNoCss = styled.span`
  font-weight: bolder;
  text-align: center;
  @media ${device.laptopL} {
    font-size: 33px !important;
    letter-spacing: 0.41em;
  }
  @media ${device.mobile} {
    font-family: Inter;
    font-size: 16px !important;
    font-style: normal !important;
    font-weight: 900 !important;
    line-height: normal !important;
    letter-spacing: 8.56px !important;
  }
`;
export const LinkTag = styled(Link)`
  text-decoration: none;
`;
// Modal CSS
export const ModalWindow = styled.div`
  position: fixed;
  z-index: 29;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #79797979;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ModalBG = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #79797979;
`;
export const ModalContainer = styled.div`
  position: absolute;
  z-index: 19;
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`;
export const ModalWrap = styled.div`
  background: linear-gradient(180deg, #00beee 0%, #0087d1 100%);
  box-shadow: 15px 15px 40px rgba(0, 0, 0, 0.25),
    inset 8px 8px 8px rgba(255, 255, 255, 0.5);
  border-radius: 32px;
  padding: 10%;
  width: 500px;
  @media ${device.mobile} {
    width: 320px;
  }
`;
export const ModalBody = styled.div`
  & > .success-title {
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    text-align: center;
    letter-spacing: 0.15em;
    color: #ffffff;
  }
  & > .success-subtitle {
    padding-top: 10px;
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.15em;
    color: #ffffff;
  }
  & > .error-title {
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    text-align: center;
    letter-spacing: 0.15em;
    color: #ffff00;
  }
  & > .error-subtitle {
    padding-top: 10px;
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.15em;
    color: #ffff00;
  }
`;
export const ModalFooter = styled.div`
  text-align: center;
  & > img {
    width: 50px;
    heigh: 50px;
    margin-top: 24px;
  }
  & > button {
    position: absolute;
    bottom: 24px;
    right: 36px;
    cursor: pointer;
    background: linear-gradient(180deg, #00beee 0%, #0087d1 100%);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25),
      inset 2px 2px 14px rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    text-align: center;
    letter-spacing: 0.15em;
    color: #ffffff;
    border: none;
    padding: 5px 12px;
  }
`;
export const FootNav = styled.div`
 max-width: 483px;
 height: 73px;
 float:right;
     position: absolute;
    right: 0;
    bottom: 0;
 margin-top:30px; 
 border-radius: 45px 0px 0px 0px;
 background: var(--grey, #EEE);
 display:flex;
 justify-content: space-between;
 align-items: center;
    padding-left: 23px;
    gap: 30px;
 div:last-child{
    background: #EEE;
    position: relative;
    border-radius: 50%;
    top: -25px;
    right: 0;
    padding: 5px;
    & > a{
            background:linear-gradient(180deg, #00BBEC 0%, #008BD3 100%);
            border-radius: 50%;
            border-radius: 50%;
    display: block;
    padding: 0px 3px;
}
`;
