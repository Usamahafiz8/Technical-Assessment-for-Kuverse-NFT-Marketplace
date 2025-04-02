import styled from "styled-components";
import { device } from "../../devices";

export const Wrapper = styled.div`
  width: 100%;
  padding: 40px 20px;
  @media ${device.mobile} {
    max-width: 350px !important;
    margin: 0 auto;
    font-size: 25px !important;
  padding: 12px 1px !important;

    letter-spacing: 0.21em !important;
  }
  @media ${device.laptopL} {
    width: 450px;
    margin: 0 auto;
    font-size: 37px !imporatnt;
    letter-spacing: 0.41em !important;
  }
   @media ${device.tablet} {
    width: 390px;
    margin: 0 auto;
    font-size: 27px !important;
    letter-spacing: 0.21em !important;
  }
`;
export const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
`;
export const MissionBox = styled.div`
  background: #f9f9f9;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 31px 28px 23px 26px rgba(255, 255, 255, 0.44);
  border-radius: 20px;
  padding: 40px;
  margin-top: 40px;
   @media ${device.mobile} {
      padding: 20px;
  margin-top: 15px;
    }
`;
export const BirdBox = styled.div`
  box-shadow: 32px 80px 100px 15px rgba(0, 0, 0, 0.12),
    -1px -1px 19px 3px rgba(183, 183, 183, 0.38);
  border-radius: 20px;
  margin-top: 40px;
  & > img {
    border-radius: 20px;
  }
`;
export const EggBox = styled.div`
  background: #4b5158;
  box-shadow: 27px 36px 72px 15px rgba(0, 0, 0, 0.25),
    inset 6px 10px 20px rgba(255, 255, 255, 0.86),
    inset 5px 6px 71px 3px rgba(255, 255, 255, 0.67);
  border-radius: 98px;
  padding: 20%;
`;
export const WelcomeBox = styled.div`
  width: 100%;
  height: 1500px;
  position: relative;
  overflow: hidden;
  margin-top: -10%;
     @media ${device.mobile} {
      height: 600px;
  position: relative;
  overflow: hidden;
  margin-top: -6%;

  }
  & > .welcome-arrow {
    position: absolute;
    left: 40%;
    height: 50%;
     @media ${device.mobile} {
        position: absolute;
        left: 38%;
        height: 54%;

  }
  }
  & > .welcome-cloud-left {
    position: absolute;
    left: 0;
    top: 10%;
    height: 35%;
  }
  & > .welcome-cloud-right {
    position: absolute;
    right: 0;
    height: 40%;
    bottom: 5%;
    z-index: 10;
     @media ${device.mobile} {
  position: absolute;
    right: 0;
    height: 18%;
    bottom: 0%;
    z-index: 0;

  }
  }
  & > .welcome-export {
    position: absolute;
    right: -15%;
    top: 0;
    z-index: 9;
    height: 80%;
 @media ${device.mobile} {  
        position: absolute;
    right: -15%;
    top: 276px;
    z-index: 8;
    height: 187px
  }
  }
  .text-area {
    position: absolute;
    top: 60%;
    left: 40%;
    transform: translate(-50%, -50%);
  }
`;
export const ItemBox = styled.div`
  width: 100%;
  height: 700px;
  position: relative;
  transform: rotate(-180deg);
       @media ${device.mobile} {  
  height: 340px;

  }
  & > img {
    position: absolute;
    top: -70%;
    width: 50%;

     @media ${device.mobile} {  
    position: absolute;
    top: 18%;
    width: 50%;
  }
  }
  & > .text-area {
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);
  }
`;
export const HatchBox = styled.div`
  background: #f9f9f9;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 31px 28px 23px 26px rgba(255, 255, 255, 0.44);
  border-radius: 20px;
  padding: 5%;
  margin-top: 10%;
  & > .content {
    display: flex;
    justify-content: center;
    align-items: center;
    & > .text {
      flex: 1;
      & > .icons {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-top: 20px;
      }
    }
    & > .image {
      flex: 1;
      text-align: center;
      & > img {
        width: 60%;
      }
    }
  }
`;
export const ItemIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    margin: 0 2%;
    @media ${device.laptopS} {
    width: 80px;
    margin: 0;
   
  }
  }
`;
export const ProgressBox = styled.div`
  display: flex;
  padding: 10% 2%;
  align-items: center;
   @media ${device.laptopS} {
  padding: 0 1%;

  }
  & > .text {
    flex: 1;
    text-align: left;
  }
  & > .image {
    flex: 1;
    & > img {
      width: 100%;
    }
  }
`;
export const AboutButton = styled.a`
  background: linear-gradient(180deg, #00beee 0%, #0087d1 100%);
  box-shadow: -4px -3px 4px #ffffff, 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  letter-spacing: 0.45em;
  color: #fff;

  &:hover {
    cursor: pointer;
    background: linear-gradient(180deg, #bdf1fe 0%, #73c7f5 100%);
  }

  @media ${device.laptopS} {
    width: 15rem;
    font-size: 12px;
  }

  @media ${device.mobile} {
    width: 12rem;
    font-size: 12px;
  }
`;
