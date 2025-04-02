import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button2,
  ButtonStyle2,
  ButtonLink2,
} from "../../UI_components/Buttons";
import { MarketPlaceLogo1 } from "../../styles/Common";
import {
  HomeContainer,
  HomeMenu,
  HomeMenuContainer,
  SocialMediaIconDiv,
  SocialMediaIconDivSpan,
} from "./HomeStyles";
import { CollectorItems } from "../../UI_components/CollectorItem";
import { testOwnedItems, testSaleItems } from "../Profile/data";
import { MarketPlaceCollectorItemGrid } from "../MarketPlace/MarketplaceStyles";
import UserProfile from "../../UI_components/UserProfiles";
const TwitterLogo = "/assets/twitter-logo.png";
const DiscordLogo = "/assets/discord-logo.png";
const SubsocialLogo = "/assets/subsocial-logo.png";
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

export const Home = (props) => {
  const [items, setItems] = useState([...testOwnedItems, ...testSaleItems]);

  return (
    <>
      <HomeContainer>
        {/* <HomeMenu>
				<HomeMenuContainer>
					<Button2 name={"PLAY"} linkTo={""} account={true} />
					<ButtonStyle2 onClick={() => { alert("Coming soon ...") }}>
						<ButtonLink2 to={''}>PLAY</ButtonLink2>
					</ButtonStyle2>
					<Button2 name={"INVENTORY"} linkTo={"/profile"} account={true} />
					<Button2 name={"HATCH EGG"} linkTo={"/hatch"} account={true} />
					<Button2 name={"MARKETPLACE"} linkTo={"/marketplace"} account={true} />
				</HomeMenuContainer>
			</HomeMenu>
			<SocialMediaIconDiv>
				<SocialMediaIconDivSpan>
					<a href="https://twitter.com/collection_ku" target='_blank' rel="noreferrer">
						<img src={TwitterLogo} alt="twitter-logo" />
					</a>
				</SocialMediaIconDivSpan>
				<SocialMediaIconDivSpan>
					<a href="https://discord.gg/75DBJ48D8y" target='_blank' rel="noreferrer">
						<img src={DiscordLogo} alt="discord-logo" />
					</a>
				</SocialMediaIconDivSpan>
				<SocialMediaIconDivSpan>
					<a href="https://polkaverse.com/accounts/3qMPr9ttP6bjERP1Uk6iC8yEio51p7uWrvK66HUpwiYbCJzx" target='_blank' rel="noreferrer">
						<img src={SubsocialLogo} alt="polkaverse-logo" />
					</a>
				</SocialMediaIconDivSpan>
			</SocialMediaIconDiv> */}
        <UserProfile />
        <div className="d-none-dark">
          <MarketPlaceLogo1>
            {marketplaceImages.map((imageSrc, index) => (
              <a key={index}>
                <img src={imageSrc} alt="" />
              </a>
            ))}
          </MarketPlaceLogo1>
        </div>
        <div className="d-none-white">
          <MarketPlaceLogo1>
            {marketplaceImages2.map((imageSrc, index) => (
              <a key={index}>
                <img src={imageSrc} alt="" />
              </a>
            ))}
          </MarketPlaceLogo1>
        </div>

        <MarketPlaceCollectorItemGrid className="lAYkq  ">
          <CollectorItems items={items} {...props} />
        </MarketPlaceCollectorItemGrid>
      </HomeContainer>
    </>
  );
};
