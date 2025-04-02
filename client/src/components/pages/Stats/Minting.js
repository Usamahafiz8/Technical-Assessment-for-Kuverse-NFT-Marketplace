import React from "react";
import styled from "styled-components";
import UserProfile from "../../UI_components/UserProfiles";

const MintingCardsData = [
  {
    imageSrc1: "images/KU.png",
    imageSrc: "images/KU.svg",
    title: "Mint a Random Ku",
    description:
      "Mint 1 Ku that is equipped to a Collector for your adventure.",
    cost: "SAMA 2000",
  },
  {
    imageSrc1: "images/COLLECTOR22.svg",
    imageSrc: "images/COLLECTOR.svg",
    title: "Mint a Random Collector",
    description:
      "Mint 1 Collector that is the equipable base for the kuverse team.",
    cost: "Coming Soon",
  },
  {
    imageSrc1: "images/bag2222.png",
    imageSrc: "images/ssa.svg",
    title: "Mint a Random Backpack",
    description:
      "Mint 1 Collector equipable backpack that increases total storage slots by 12.",
    cost: "Coming Soon",
  },
  {
    imageSrc1: "images/Iconpata.png",
    imageSrc: "images/rrr.svg",
    title: "Mint a Random Item",
    description:
      "Mint 1 item to equip to a KU or Collector that may increase rarity and overall game stats.",
    cost: "Coming Soon",
  },
  {
    imageSrc1: "images/light-bag.png",
    imageSrc: "images/rrrrww.svg",
    title: "Mint Your Own Items",
    description:
      "Leverage your kore to mint your own 3D object Items that can be traded in the marketplace, as well as battle tested in the kuverse.",
    cost: "1000 KORE",
  },
];

const KuMintingCards = () => {
  return (
    <div className="w-100">
      <div className="mobile-hidden">
        <UserProfile />
      </div>
      <KuMintingCardsContainer>
        <h5>Minting</h5>
        {MintingCardsData.map((item, index) => (
          <KuMintingCardBlock key={index}>
            <KuMintingCard>
              <KuMintingCardColumn1>
                <img
                  className="d-none-dark"
                  src={item.imageSrc}
                  alt={item.title}
                />
                <img
                  className="d-none-white"
                  src={item.imageSrc1}
                  alt={item.title}
                />
              </KuMintingCardColumn1>
              <KuMintingCardColumn2>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </KuMintingCardColumn2>
            </KuMintingCard>
            <KuMintingCardVertical className={index === 4 ? "custom-card" : ""}>
              <h2>{item.cost}</h2>
            </KuMintingCardVertical>
          </KuMintingCardBlock>
        ))}
      </KuMintingCardsContainer>
    </div>
  );
};

const KuMintingCardsContainer = styled.div`
  width: 357px;
  margin-bottom: 14px;
  margin: auto;
  overflow: hidden;
  & > h5 {
    margin-top: 31px;
    color: #00a8e2;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1px;
    margin-bottom: 19px;
  }
`;

const KuMintingCardBlock = styled.div`
  display: flex;
  margin-bottom: 14px;
`;

const KuMintingCard = styled.div`
  width: 314px;
  overflow: hidden;
  background: var(--grey, #eee);
  border-radius: 25px 0 0 25px;
  display: flex;
  align-items: center;
`;

const KuMintingCardColumn1 = styled.div`
  //   width: 45px;
  //   float: left;
  overflow: hidden;
  padding-left: 24px;

  img {
    width: 100%;
  }
`;

const KuMintingCardColumn2 = styled.div`
  width: 234px;
  float: left;
  overflow: hidden;
  padding-left: 21px;

  h3 {
    color: #404040;
    font-size: 12px;
    letter-spacing: 0.6px;
    margin: 0 0 10px 0;
  }

  p {
    color: #404040;
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.5px;
  }
`;

const KuMintingCardVertical = styled.div`
  background: #e437e8;
  width: 43px;
  float: left;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 0 25px 25px 0;
  height: 123px;
  &.custom-card {
    background: #00bbec;
  }
  h2 {
    color: #eee;
    text-align: center;
    font-size: 15px;
    font-weight: 900;
    letter-spacing: 0.75px;
    margin: 0;
    writing-mode: vertical-lr;
  }
`;

export default KuMintingCards;
