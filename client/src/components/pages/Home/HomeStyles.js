import styled from "styled-components";
import { device } from "../../devices";

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.laptopl} {
    width: 450px;
  }
 @media ${device.tablet} {
    width: 389px;
  }
`;

export const HomeMenu = styled.div`
  margin: 4rem 0;
  box-shadow: inset 2px 2px 13px #b9bcbe;
  padding: 1rem;
  border-radius: 3rem;

  @media ${device.tablet} {
    margin: 2rem 0;
  }
`;

export const HomeMenuContainer = styled.div`
  background: linear-gradient(180deg, #00beee 0%, #0087d1 100%);
  box-shadow: -4px -3px 4px #ffffff, 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  padding: 3rem 4rem;
  @media ${device.tablet} {
    padding: 3rem 2rem;
  }

  @media ${device.mobile} {
    padding: 2rem 2.5rem;
  }
`;

export const SocialMediaIconDiv = styled.div`
  margin: 0 0 4rem;
  @media ${device.tablet} {
    margin: 2rem 0 4rem;
  }
`;

export const SocialMediaIconDivSpan = styled.span`
  padding: 3rem 1rem 1rem;
  & > img {
    cursor: pointer;
  }
`;
