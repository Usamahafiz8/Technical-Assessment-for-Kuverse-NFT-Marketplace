import React from "react";
import {
  Title,
  TextSapnM,
  MarketPlaceLogo,
  MarketPlaceMain,
  MarketPlaceContent,
  FootNav,
} from "../../styles/Common";
import { MarketPlaceComponent } from "./MarketPlaceComponent";

const marketplaceImages = [
  "/images/marketplace/Group 63e.svg",
  "/images/marketplace/Group 67ewe.svg",
  "/images/marketplace/35.svg",
  "/images/marketplace/34.svg",
];
const marketplaceImages2 = [
  "/images/dark/Group 63.svg",
  "/images/dark/Group 67.svg",
  "/images/dark/Group 68.svg",
  "/images/dark/Group 69.svg",
];
const footNavItems = [
  {
    src: "images/footnav/play-game.svg",
    alt: "Play Game",
    href: "/play",
  },
  {
    src: "images/footnav/21.svg",
    alt: "Item 21",
    href: "/minting",
  },
  {
    src: "images/footnav/22.svg",
    alt: "Item 22",
    href: "/alert",
  },
  {
    src: "images/footnav/23.svg",
    alt: "Item 23",
    href: "/collector",
  },
  {
    src: "images/footnav/white-logo-bird 11.svg",
    alt: "White Logo Bird",
    href: "/home",
  },
];

const footNavItems2 = [
  {
    src: "images/play-game (2).png",
    alt: "Play Game",
    href: "/play",
  },
  {
    src: "images/111.png",
    alt: "Item 21",
    href: "/minting",
  },
  {
    src: "images/bell-icon.png",
    alt: "Item 22",
    href: "/alert",
  },
  {
    src: "images/cup-icon.png",
    alt: "Item 23",
    href: "/collector",
  },
  {
    src: "images/footnav/white-logo-bird 11.svg",
    alt: "White Logo Bird",
    href: "/home",
  },
];

export const MarketPlace = (props) => {
  return (
    <>
      <MarketPlaceMain>
        <MarketPlaceContent className="responsive">
          <Title>
            <TextSapnM>MarketPlace</TextSapnM>
            <div className="d-none-dark">
              <MarketPlaceLogo>
                {marketplaceImages.map((imageSrc, index) => (
                  <a key={index}>
                    <img src={imageSrc} alt="" />
                  </a>
                ))}
              </MarketPlaceLogo>
            </div>
            <div className="d-none-white">
              <MarketPlaceLogo>
                {marketplaceImages2.map((imageSrc, index) => (
                  <a key={index}>
                    <img src={imageSrc} alt="" />
                  </a>
                ))}
              </MarketPlaceLogo>
            </div>
          </Title>
          <MarketPlaceComponent collection={"all"} {...props} />
        </MarketPlaceContent>
        <div className="d-none-dark mobile-hidden no-show">
          <FootNav className="frzzkZ">
            {footNavItems.map((item, index) => (
              <div key={index}>
                <a href={item.href}>
                  <img src={item.src} alt={item.alt} />
                </a>
              </div>
            ))}
          </FootNav>
        </div>
        <div className="d-none-white mobile-hidden no-show">
          <FootNav className="frzzkZ">
            {footNavItems2.map((item, index) => (
              <div key={index}>
                <a href={item.href}>
                  <img src={item.src} alt={item.alt} />
                </a>
              </div>
            ))}
          </FootNav>
        </div>
      </MarketPlaceMain>
    </>
  );
};
