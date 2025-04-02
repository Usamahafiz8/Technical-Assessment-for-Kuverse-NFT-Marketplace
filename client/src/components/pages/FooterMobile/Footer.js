import React from "react";
import styled from "styled-components";
import { device } from "../../devices";

const FooterContainer = styled.footer`
  display: none;

  @media ${device.mobile} {
    width: 100%;
    display: block;
    background: #eee;
    bottom: 0;
    position: fixed;
    padding: 0;
  }
`;

const FooterWrapper = styled.div`
  @media ${device.mobile} {
    max-width: 385px;
    margin: auto;
    display: flex;
    justify-content: center;
    gap: 29px;
  }
`;

const FooterItem = styled.div`
  @media ${device.mobile} {
    border-radius: 50%;
    height: 57px;
  }
`;

const SpecialFooterItem = styled(FooterItem)`
  @media ${device.mobile} {
    width: 64px;
    background: #eee;
    position: relative;
    top: -15px;
    border-radius: 50%;
  }
`;

const SpecialFooterLink = styled.a`
  @media ${device.mobile} {
    background: linear-gradient(180deg, #00beee 0%, #008bd3 100%);
    border-radius: 50%;
    width: 61px;
    height: 61px;
    border: 2px solid white;
    display: flex;
    margin: 0 auto;
    margin-top: 8px;
    justify-content: center;
    align-items: center;
    & > img {
      width: 55px !important;
    }
  }
`;

const FooterImage = styled.img`
  @media ${device.mobile} {
    width: 38px;
    padding: 13px 6px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer className="ku-mbl-footer">
      <FooterWrapper>
        <FooterItem>
          <a href="/buyer">
            <FooterImage
              className="d-none-dark"
              src="images/footermobile/market.svg"
              alt="Link 2"
            />
            <FooterImage
              className="d-none-white"
              src="images/market.png"
              alt="Link 2"
            />
          </a>
        </FooterItem>
        <FooterItem>
          <a href="/collector">
            <FooterImage
              className="d-none-dark"
              src="images/footermobile/42.svg"
              alt="Link 5"
            />
            <FooterImage
              className="d-none-white"
              src="images/footermobile/1-1.png"
              alt="Link 5"
            />
          </a>
        </FooterItem>
        <SpecialFooterItem className="gTmTzY">
          <SpecialFooterLink href="/">
            <FooterImage
              className="d-none-white"
              src="images/white-logo-bird 11.png"
              alt="Link 3"
            />
            <FooterImage
              className="d-none-dark"
              src="images/white-logo-bird 11.png"
              alt="Link 3"
            />
          </SpecialFooterLink>
        </SpecialFooterItem>
        <FooterItem>
          <a href="/alert">
            <FooterImage
              className="d-none-white"
              src="/images/footermobile/Alerts-1.png"
              alt="Link 1"
            />
            <FooterImage
              className="d-none-dark"
              src="images/footermobile/alert.svg"
              alt="Link 1"
            />
          </a>
        </FooterItem>
        <FooterItem>
          <a href="/alert">
            <FooterImage
              className="d-none-white"
              src="images/footermobile/mint-1.png"
              alt="Link 4"
            />
            <FooterImage
              className="d-none-dark"
              src="images/footermobile/mint.svg"
              alt="Link 4"
            />
          </a>
        </FooterItem>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
