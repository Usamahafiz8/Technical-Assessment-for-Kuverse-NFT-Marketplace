import React from "react";
import * as S from "./AboutStyles";
import {
  Title,
  TextSapn1,
  TextSpan2,
  Container,
  TextSpanNoCss,
} from "../../styles/Common";

export const About = () => {
  return (
    <>
      <div className="aboutpage">
        <S.Wrapper>
          <div style={{ position: "relative" }}>
            <video
              autoPlay
              muted
              loop
              style={{ width: "100%", height: "100%", borderRadius: 25 }}
            >
              <source src="/videos/about/Hero-shot.mp4" type="video/mp4" />
            </video>
            <Title
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <TextSpanNoCss
                style={{
                  color: "white",
                  fontSize: "48px",
                  letterSpacing: "0.45em",
                }}
              >
                A WEB3 ADVENTURE
              </TextSpanNoCss>
            </Title>
          </div>
          <Container>
            <S.SectionContainer>
              <Title>
                <TextSapn1 style={{ lineHeight: "3rem" }}>
                  DYNAMIC EQUIPABLE RARITY AND EVOLVING GAME MECHANICS
                </TextSapn1>
              </Title>
              <Title>
                <TextSpan2 style={{ fontSize: "18px", letterSpacing: "0.3em" }}>
                  SECURED WITH BLOCKCHAIN
                </TextSpan2>
              </Title>
              <S.MissionBox className="mobile-hidden">
                <Title style={{ paddingTop: 0 }}>
                  <TextSpan2
                    style={{ fontSize: "28px", letterSpacing: "0.535em" }}
                  >
                    OUR MISSION
                  </TextSpan2>
                </Title>
                <div style={{ textAlign: "center" }}>
                  <TextSpan2
                    style={{
                      fontSize: "18px",
                      letterSpacing: "0.535em",
                      lineHeight: "39px",
                    }}
                  >
                    Our mission is to create a web3 project that not only
                    entertains, but also serves as a gateway to mass adoption of
                    blockchain technology.
                  </TextSpan2>
                </div>
                <div style={{ paddingTop: "20px", textAlign: "center" }}>
                  <TextSpan2
                    style={{
                      fontSize: "18px",
                      letterSpacing: "0.535em",
                      lineHeight: "39px",
                    }}
                  >
                    We believe that by creating immersive and engaging games
                    with real-world value, we can achieve our mission.
                  </TextSpan2>
                </div>
              </S.MissionBox>
            </S.SectionContainer>
          </Container>
        </S.Wrapper>
        <S.Wrapper
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 190, 238, 0) 0%, rgba(0, 190, 238, 0.61) 100%)",
            padding: 0,
          }}
        >
          <Container style={{ padding: "40px" }}>
            <S.SectionContainer>
              <Title className="mobile-hidden" style={{ display: "flex", justifyContent: "center" }}>
                <TextSapn1 style={{ lineHeight: "58px" }}>
                  KU COLLECTION
                </TextSapn1>
                <TextSapn1
                  style={{
                    lineHeight: "12px",
                    fontSize: "11px",
                    paddingTop: "12px",
                  }}
                >
                  TM
                </TextSapn1>
              </Title>
              <div style={{ textAlign: "center" }}>
                <TextSpan2
                  style={{
                    fontSize: "18px",
                    letterSpacing: "0.535em",
                    lineHeight: "39px",
                  }}
                >
                  ‘The Governance KUs’
                </TextSpan2>
              </div>
              <div style={{ textAlign: "center" }}>
                <TextSpan2
                  style={{
                    fontSize: "18px",
                    letterSpacing: "0.535em",
                    lineHeight: "39px",
                  }}
                >
                  Supply: 50
                </TextSpan2>
              </div>
              <div style={{ textAlign: "center" }}>
                <TextSpan2
                  style={{
                    fontSize: "18px",
                    letterSpacing: "0.535em",
                    lineHeight: "39px",
                  }}
                >
                  Available on{" "}
                  <a
                    href="https://singular.app/collectibles/kusama/66241b171becfd500e-KU?isVerified=false&sortBy=nfts:minted_at_block:desc"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#00BEEE", textDecoration: "none" }}
                  >
                    Singular 2.0
                  </a>
                </TextSpan2>
              </div>
              <S.BirdBox>
                <img
                  src="/images/about/kukuku-4.png"
                  alt=""
                  style={{ width: "100%" }}
                />
              </S.BirdBox>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 2 }}>
                  <Title>
                    <TextSpanNoCss style={{ color: "white", fontSize: "48px" }}>
                      Then They
                    </TextSpanNoCss>
                  </Title>
                  <Title>
                    <TextSpanNoCss style={{ color: "white", fontSize: "48px" }}>
                      laid eggs ...
                    </TextSpanNoCss>
                  </Title>
                </div>
                <div style={{ flex: 1 }}>
                  <img
                    src="/images/about/arrow1.png"
                    alt=""
                    style={{ height: "500px", position: "relative", zIndex: 9 }}
                  />
                </div>
              </div>
              <S.EggBox style={{ marginTop: "-270px" }}>
                <div>
                  <video
                    id="hero_shot_video"
                    autoPlay
                    muted
                    loop
                    style={{ width: "100%", height: "100%", borderRadius: 25 }}
                  >
                    <source src="/videos/about/EGG_50.mp4" type="video/mp4" />
                  </video>
                </div>
                <Title>
                  <TextSpanNoCss
                    style={{
                      color: "#D9D9D9",
                      fontSize: "60px",
                      lineHeight: "116px",
                      letterSpacing: "0.45em",
                    }}
                  >
                    KU EGGS
                  </TextSpanNoCss>
                </Title>
                <div style={{ textAlign: "center" }}>
                  <TextSpan2
                    style={{
                      fontSize: "32px",
                      letterSpacing: "0.535em",
                      lineHeight: "64px",
                    }}
                  >
                    ‘Ku Verse Airdrops’
                  </TextSpan2>
                </div>
                <div style={{ textAlign: "center" }}>
                  <TextSpan2
                    style={{
                      fontSize: "32px",
                      letterSpacing: "0.535em",
                      lineHeight: "64px",
                    }}
                  >
                    Supply: 500
                  </TextSpan2>
                </div>
                <div style={{ textAlign: "center", paddingTop: "40px" }}>
                  <TextSpan2
                    style={{
                      fontSize: "32px",
                      letterSpacing: "0.535em",
                      lineHeight: "64px",
                    }}
                  >
                    A collection of unique animated 3D eggs laid by the original
                    KUs.
                  </TextSpan2>
                </div>
              </S.EggBox>
            </S.SectionContainer>
          </Container>
          <S.WelcomeBox>
            <img
              className="welcome-arrow"
              src="/images/about/arrow1.png"
              alt=""
            />
            <img
              className="welcome-cloud-left"
              src="/images/about/cloud-left.png"
              alt=""
            />
            <img
              className="welcome-cloud-right"
              src="/images/about/cloud-right.png"
              alt=""
            />
            <img
              className="welcome-export"
              src="/images/about/kucorpExport.png"
              alt=""
            />
            <div className="text-area">
              <div>
                <TextSpanNoCss
                  style={{
                    color: "#B8EDFA",
                    fontSize: "48px",
                    letterSpacing: "0.45em",
                  }}
                >
                  WELCOME
                </TextSpanNoCss>
              </div>
              <div>
                <TextSpanNoCss
                  style={{
                    color: "#B8EDFA",
                    fontSize: "48px",
                    letterSpacing: "0.45em",
                  }}
                >
                  TO THE
                </TextSpanNoCss>
              </div>
              <div>
                <TextSpanNoCss
                  style={{
                    color: "white",
                    fontSize: "48px",
                    letterSpacing: "0.45em",
                  }}
                >
                  KU VERSE
                </TextSpanNoCss>
              </div>
            </div>
          </S.WelcomeBox>
        </S.Wrapper>
        <S.Wrapper
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 190, 238, 0) 0%, rgba(0, 190, 238, 0.61) 100%)",
            transform: "rotate(-180deg)",
          }}
        >
          <S.ItemBox>
            <img src="/images/about/5.png" alt="" />
            <div className="text-area">
              <div>
                <TextSpanNoCss
                  style={{
                    color: "white",
                    fontSize: "48px",
                    letterSpacing: "0.45em",
                  }}
                >
                  ITS
                </TextSpanNoCss>
              </div>
              <div>
                <TextSpanNoCss
                  style={{
                    color: "white",
                    fontSize: "48px",
                    letterSpacing: "0.45em",
                  }}
                >
                  TIME
                </TextSpanNoCss>
              </div>
              <div>
                <TextSpanNoCss
                  style={{
                    color: "white",
                    fontSize: "48px",
                    letterSpacing: "0.45em",
                  }}
                >
                  TO
                </TextSpanNoCss>
              </div>
              <div>
                <TextSpanNoCss
                  style={{
                    color: "#A7E8F9",
                    fontSize: "48px",
                    letterSpacing: "0.45em",
                  }}
                >
                  HATCH
                </TextSpanNoCss>
              </div>
            </div>
          </S.ItemBox>
        </S.Wrapper>
        <S.Wrapper>
          <Container>
            <S.SectionContainer>
              <hr
                style={{
                  maxWidth: 400,
                  margin: "auto",
                  border: "1px solid #DCDCDC",
                }}
              />
              <Title>
                <TextSapn1 style={{ fontSize: "48px" }}>
                  What is kORE?
                </TextSapn1>
              </Title>
              <div style={{ textAlign: "center", paddingTop: "40px" }}>
                <TextSpan2
                  style={{
                    fontSize: "32px",
                    letterSpacing: "0.535em",
                    lineHeight: "64px",
                  }}
                >
                  Ku Ore a.k.a (kORE) <br />
                  Particles A KU Verse <br />
                  Resource Harnessed with inKUbators
                </TextSpan2>
              </div>
              <div style={{ textAlign: "center", padding: "5% 20%" }}>
                <img
                  src="/images/about/koreParticles.png"
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <TextSpan2
                  style={{
                    fontSize: "32px",
                    letterSpacing: "0.535em",
                    lineHeight: "64px",
                  }}
                >
                  10% Airdropped to KU EGGs <br />
                  that are hatched with <br />
                  an KU CORP. inkubator.
                </TextSpan2>
              </div>
            </S.SectionContainer>
          </Container>
        </S.Wrapper>
        <S.Wrapper>
          <Container>
            <S.SectionContainer>
              <hr
                style={{
                  maxWidth: 400,
                  margin: "auto",
                  border: "1px solid #DCDCDC",
                }}
              />
              <S.HatchBox>
                <div className="content">
                  <div className="text">
                    <Title>
                      <TextSapn1
                        style={{
                          fontSize: "48px",
                          lineHeight: "64px",
                          letterSpacing: "0.455em",
                        }}
                      >
                        HATCH <br />
                        YOUR <br />
                        KU EGG
                      </TextSapn1>
                    </Title>
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                      <TextSpan2
                        style={{
                          fontSize: "18px",
                          letterSpacing: "0.2em",
                          lineHeight: "32px",
                        }}
                      >
                        Connect both wallets to bridge your KU EGG from Kusama
                        to Exosama. <br />
                        <br />
                        Turn on thee inKUbator, and let it go brz’ buzz.
                      </TextSpan2>
                    </div>
                    <div className="icons">
                      <img
                        src="/images/about/bird.png"
                        alt=""
                        style={{ width: "75px" }}
                      />
                      <img
                        src="/images/about/arrow-black-right.png"
                        alt=""
                        style={{ width: "75px" }}
                      />
                      <img
                        src="/images/about/kusama.png"
                        alt=""
                        style={{ width: "65px" }}
                      />
                      <img
                        src="/images/about/moonsama.png"
                        alt=""
                        style={{ width: "75px" }}
                      />
                    </div>
                  </div>
                  <div className="image">
                    <img
                      src="/images/about/incubator-transparent1.png"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingTop: "10%",
                  }}
                >
                  <S.AboutButton
                    href="/hatch"
                    style={{ textDecoration: "none" }}
                  >
                    INKUBATOR
                  </S.AboutButton>
                </div>
              </S.HatchBox>
            </S.SectionContainer>
          </Container>
        </S.Wrapper>
        <S.Wrapper>
          <Container>
            <S.SectionContainer>
              <hr
                style={{
                  maxWidth: 400,
                  margin: "auto",
                  border: "1px solid #DCDCDC",
                }}
              />
              <Title>
                <TextSapn1
                  style={{
                    fontSize: "48px",
                    lineHeight: "64px",
                    letterSpacing: "0.455em",
                  }}
                >
                  The KU <br />
                  Extinction
                </TextSapn1>
                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                  <TextSpan2
                    style={{
                      fontSize: "18px",
                      letterSpacing: "0.2em",
                      lineHeight: "32px",
                    }}
                  >
                    A KU is a rare canary. <br />
                    Total Supply: 6000
                  </TextSpan2>
                </div>
              </Title>
            </S.SectionContainer>
          </Container>
          <video
            autoPlay
            muted
            loop
            style={{ width: "100%", height: "100%", borderRadius: 25 }}
          >
            <source src="/videos/about/Hero-lower.mp4" type="video/mp4" />
          </video>
        </S.Wrapper>
        <S.Wrapper
          style={{
            background: "#F9F9F9",
            boxShadow: "inset 31px 28px 23px 26px rgba(255, 255, 255, 0.44)",
          }}
        >
          <Container>
            <S.SectionContainer>
              <S.ItemIcons>
                <img src="/images/about/1.png" alt="" />
                <img src="/images/about/2.png" alt="" />
                <img src="/images/about/3.png" alt="" />
                <img src="/images/about/4.png" alt="" />
              </S.ItemIcons>
            </S.SectionContainer>
          </Container>
        </S.Wrapper>
        <S.Wrapper>
          <Container>
            <S.SectionContainer>
              <S.ProgressBox>
                <Title className="text">
                  <TextSapn1
                    style={{
                      fontSize: "48px",
                      lineHeight: "64px",
                      letterSpacing: "0.455em",
                    }}
                  >
                    UNLOCK THE MYSTERIES OF THE
                  </TextSapn1>
                  <br />
                  <TextSpan2
                    style={{
                      fontSize: "48px",
                      lineHeight: "64px",
                      letterSpacing: "0.455em",
                      color: "#BDF1FE",
                    }}
                  >
                    KU VERSE
                  </TextSpan2>
                  <br />
                  <TextSapn1
                    style={{
                      fontSize: "48px",
                      lineHeight: "64px",
                      letterSpacing: "0.455em",
                    }}
                  >
                    AND TRULY OWN YOUR PROGRESS
                  </TextSapn1>
                </Title>
                <div className="image">
                  <img src="/images/about/korp-conveniences1.png" alt="" />
                </div>
              </S.ProgressBox>
            </S.SectionContainer>
          </Container>
        </S.Wrapper>
        <S.Wrapper
          style={{
            background: "#F9F9F9",
            boxShadow: "inset 31px 28px 23px 26px rgba(255, 255, 255, 0.44)",
          }}
        >
          <Container>
            <S.SectionContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <S.AboutButton href="/home" style={{ textDecoration: "none" }}>
                  HOME
                </S.AboutButton>
              </div>
            </S.SectionContainer>
          </Container>
        </S.Wrapper>
        <S.Wrapper style={{ paddingBottom: 0 }}>
          <Container>
            <S.SectionContainer style={{ marginBottom: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  href="https://twitter.com/collection_ku"
                  target="_blank"
                  rel="noreferrer"
                  style={{ padding: "2%" }}
                >
                  <img src="/assets/twitter-logo.png" alt="" />
                </a>
                <a
                  href="https://discord.gg/75DBJ48D8y"
                  target="_blank"
                  rel="noreferrer"
                  style={{ padding: "2%" }}
                >
                  <img src="/assets/discord-logo.png" alt="" />
                </a>
              </div>
              <Title>
                <TextSapn1
                  style={{
                    fontSize: "48px",
                    lineHeight: "64px",
                    letterSpacing: "0.455em",
                  }}
                >
                  Join the Ku Collectors
                </TextSapn1>
              </Title>
            </S.SectionContainer>
          </Container>
        </S.Wrapper>
        <S.Wrapper
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 190, 238, 0) 0%, #01A5E1 100%)",
          }}
        >
          <Container>
            <div>
              <S.SectionContainer>
                <div style={{ textAlign: "center", paddingBottom: "10%" }}>
                  <TextSpanNoCss
                    style={{
                      fontSize: "24px",
                      lineHeight: "32px",
                      letterSpacing: "0.4em",
                      color: "white",
                    }}
                  >
                    Made with Love for Web3
                  </TextSpanNoCss>
                </div>
              </S.SectionContainer>
            </div>
          </Container>
        </S.Wrapper>
      </div>
    </>
  );
};
