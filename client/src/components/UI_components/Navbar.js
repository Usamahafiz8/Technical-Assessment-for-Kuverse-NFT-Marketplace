import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { shorter } from "../../utils";
import { Button1, ButtonDiv, ButtonStyle1 } from "./Buttons";
import {
  BackpackOp,
  CollectorOp,
  CompanyLogoImg,
  ContainerNavbar,
  Hamburger,
  ItemsOp,
  KoreOp,
  KuOp,
  Line,
  FootContent,
  LowerNavbar,
  NavbarDiv,
  NavbarImg,
  NavbarItemDiv,
  NavbarItemDivC1,
  NavbarItemDivC6,
  ToggleMenu,
  ToggleMenuItem,
  UpperNavbar,
  UpperNavbarMenu,
  UpperNavbarRight,
  VerseOp,
  TwoIcons,
} from "../styles/NavbarStyles";
const CompanyLogo = "/	images/MainLogo.png";
const BirdLogo = "/assets/bird-logo.png";

export const Navbar = (props) => {
  // Removed redundant useWeb3React since account is passed via props
  let navigate = useNavigate();
  const [showNavMenu, setShowNavMenu] = useState(true); // Always show the lower menu
  const [menuText, setMenuText] = useState("");
  const [showLowerMenu, setShowLowerMenu] = useState(true);

  const BirdHandler = (e) => {
    e.preventDefault();
    navigate("/profile");
    setMenuText("bird");
  };

  const onClickNav = (navText) => {
    // e.preventDefault();
    navigate("/" + navText);
    setMenuText(navText);
  };

  const LogoHandler = (e) => {
    e.preventDefault();
    setMenuText("");
    navigate("/home");
  };

  useEffect(() => {
    setShowLowerMenu(true);
    let url = window.location.pathname;
    if (url.startsWith("/collector")) setMenuText("collector");
    else if (url.startsWith("/ku")) setMenuText("ku");
    else if (url.startsWith("/backpack")) setMenuText("backpack");
    else if (url.startsWith("/profile")) setMenuText("bird");
    else if (url.startsWith("/items")) setMenuText("items");
    else if (url.startsWith("/kore")) setMenuText("kore");
    else if (url.startsWith("/verse")) setMenuText("verse");
    else if (url.startsWith("/about")) {
      setMenuText("about");
      setShowNavMenu(true);
      setShowLowerMenu(false); // Always hide the lower menu for the "about" page
    } else if (url.startsWith("/marketstats")) {
      setMenuText("marketstats");
      setShowNavMenu(true);
    }
  }, [showLowerMenu, menuText]);

  return (
    <ContainerNavbar className="dfFjVq mobile-hidden">
      <UpperNavbar className="hOwhGO dfFjVq">
        <CompanyLogoImg src={CompanyLogo} onClick={LogoHandler} />
        <UpperNavbarRight>
          <UpperNavbarMenu>
            <TwoIcons>
              <a
                href="https://discord.gg/75DBJ48D8y"
                target="_blank"
                rel="noreferrer"
              >
                <img src="images/sidebar/discord-line 1.svg" alt="" srcset="" />
              </a>
              <a
                href="https://twitter.com/collection_ku"
                target="_blank"
                rel="noreferrer"
              >
                <img src="images/sidebar/twitter-line 1.svg" alt="" srcset="" />
              </a>
            </TwoIcons>
            {showNavMenu && (
              <ToggleMenu>
                <ToggleMenuItem className="dhsUg"
                  to="/about"
                  active={menuText === "about" ? 1 : 0}
                  onClick={() => onClickNav("about")}
                >
                  ABOUT
                </ToggleMenuItem>
                <ToggleMenuItem className="dhsUg"
                  to="/kore"
                  activeKore={menuText === "kore" ? true : false}
                  onClick={() => onClickNav("kore")}
                >
                  KORE
                </ToggleMenuItem>
                <ToggleMenuItem className="dhsUg"
                  to="/hatch"
                  active={menuText === "hatch" ? 1 : 0}
                  onClick={() => onClickNav("about")}
                >
                  HATCH
                </ToggleMenuItem>
                <ToggleMenuItem className="dhsUg"
                  to="/minting"
                  active={menuText === "profile" ? 1 : 0}
                  onClick={() => onClickNav("about")}
                >
                  STATS
                </ToggleMenuItem>
                <ToggleMenuItem className="dhsUg"
                  to="/profile"
                  active={menuText === "login" ? 1 : 0}
                  onClick={() => onClickNav("about")}
                >
                  LOGIN
                </ToggleMenuItem>
                <ToggleMenuItem className="dhsUg"
                  to={""}
                  active={menuText === "profile" ? 1 : 0}
                  onClick={() => {
                    alert("Coming soon ...");
                  }}
                >
                  PLAY
                </ToggleMenuItem>
              </ToggleMenu>
            )}
          </UpperNavbarMenu>
          <hr />
          <FootContent>
            <p>
              Made with{" "}
              <span>
                {" "}
                <img src="images/sidebar/heart 1.svg" alt="" srcset="" />{" "}
              </span>{" "}
              for web3
            </p>
          </FootContent>
          <div>
            {props.account ? (
              <ButtonDiv>
                <ButtonStyle1 onClick={props.openLogoutModal}>
                  {shorter(props.account)} {/* Display wallet address */}
                </ButtonStyle1>
              </ButtonDiv>
            ) : (
              <ButtonDiv onClick={props.connectAccount}>
                <ButtonStyle1>CONNECT METAMASK</ButtonStyle1>
              </ButtonDiv>
            )}
            {props?.kuWallet ? (
              <ButtonDiv>
                <ButtonStyle1 onClick={props.connectKusama}>
                  {shorter(props.kuWallet.address)}
                </ButtonStyle1>
              </ButtonDiv>
            ) : (
              <ButtonDiv onClick={props.connectKusama}>
                <ButtonStyle1>CONNECT KUSAMA</ButtonStyle1>
              </ButtonDiv>
            )}
          </div>
        </UpperNavbarRight>
      </UpperNavbar>

      {/* {showLowerMenu && (
        <LowerNavbar>
          <NavbarDiv>
            <NavbarItemDivC1 onClick={() => onClickNav("collector")}>
              <CollectorOp
                activeCollector={menuText === "collector" ? true : false}
              >
                COLLECTOR
              </CollectorOp>
            </NavbarItemDivC1>
            <NavbarItemDiv onClick={() => onClickNav("ku")}>
              <KuOp activeKu={menuText === "ku" ? true : false}>KU</KuOp>
            </NavbarItemDiv>
            <NavbarItemDiv onClick={() => onClickNav("backpack")}>
              <BackpackOp
                activeBackpack={menuText === "backpack" ? true : false}
              >
                BACKPACK
              </BackpackOp>
            </NavbarItemDiv>
            <NavbarImg
              src={BirdLogo}
              onClick={BirdHandler}
              activeBird={menuText === "bird" ? true : false}
            />
            <NavbarItemDiv onClick={() => onClickNav("items")}>
              <ItemsOp activeItems={menuText === "items" ? true : false}>
                ITEMS
              </ItemsOp>
            </NavbarItemDiv>
            <NavbarItemDiv onClick={() => onClickNav("kore")}>
              <KoreOp activeKore={menuText === "kore" ? true : false}>
                kORE
              </KoreOp>
            </NavbarItemDiv>
            <NavbarItemDivC6 onClick={() => onClickNav("verse")}>
              <VerseOp activeVerse={menuText === "verse" ? true : false}>
                VERSE
              </VerseOp>
            </NavbarItemDivC6>
          </NavbarDiv>
        </LowerNavbar>
      )} */}
    </ContainerNavbar>
  );
};