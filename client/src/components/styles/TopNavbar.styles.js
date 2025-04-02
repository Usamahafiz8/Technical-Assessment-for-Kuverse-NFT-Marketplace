import styled from "styled-components";
import { device } from "../devices";

export const Header = styled.header`
  background: linear-gradient(180deg, #00bbec 34.9%, #008bd3 94.27%);
  width: 100%;
  height: 73px;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 64px;
  @media ${device.mobile} {
    padding: 11px 19px;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
    gap: 50px;
    @media ${device.mobile} {
    align-items: baseline;
     
    }
    & > a {
      & > img {
        @media ${device.mobile} {
          height: 30px;
          width: 30px;
        }
      }
    }
    @media ${device.mobile} {
      gap: 12px;
    }
  }
`;

export const link_Tag = styled.a`

 & > img {
    width: '100%',
    marginRight: '25px'
    cursor: "pointer";
     @media ${device.mobile}{
    width: '30px',
    cursor: pointer;
	}
 }
 `;
export const CompanyLogoImg = styled.img`
  width: 133px;
  height: 54px;
  &:hover {
    cursor: pointer;
  }
`;
