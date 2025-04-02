import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as A from "../styles/TopNavbar.styles";
import "../../components/styles/CustomCss/style.css";
import { ButtonDiv, ButtonStyle1 } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { shorter } from "../../utils";

import { test, useTheme } from "../../context/themeContext";

const CompanyLogo = "/images/MainLogo.png";

const navItems = [
  {
    src: "images/TopNav/nav2.png",
    alt: "Nav 2",
    customClass: "mobile-hidden",
    href: "#",
  },
  {
    src: "images/TopNav/nav4.png",
    alt: "Nav 4",
    customClass: "nav4-img",
    href: "/",
  },
  {
    src: "images/TopNav/download-2-xxl.png",
    alt: "Nav 1",
    customClass: "nav1-img",
    href: "/",
  },
  {
    src: "images/toggle-w.svg",
    alt: "Toggle",
    customClass: "toggle-img",
    href: "/toggle-link",
  },
];

const SectionItems = [
  {
    href: "/about",
    text: "ABOUT",
  },
  {
    href: "/kore",
    text: "Kore",
  },
  {
    href: "/hatch",
    text: "Hatch",
  },
  {
    href: "/profile",
    text: "Profile",
  },
  {
    href: "/play",
    text: "Play",
  },
];

const Header = (props) => {
  const [minimenuOpen, setMinimenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { account } = useWeb3React();
  const [showNavMenu, setShowNavMenu] = useState(true); // Always show the lower menu
  const [menuText, setMenuText] = useState("");
  const [showLowerMenu, setShowLowerMenu] = useState(true);

  let navigate = useNavigate();

  const handleConnectAccount = () => {
    if (account) {
      props.openLogoutModal();
    } else {
      props.connectAccount();
    }
  };

  const handleConnectKusama = () => {
    if (props.kuWallet) {
      props.openLogoutModal();
    } else {
      props.connectKusama();
    }
  };

  const LogoHandler = () => {
    setMenuText("");
    navigate("/home");
  };

  useEffect(() => {
    const closeMinimenu = () => {
      setMinimenuOpen(false);
    };

    if (minimenuOpen) {
      document.body.addEventListener("click", closeMinimenu);
    }

    return () => {
      document.body.removeEventListener("click", closeMinimenu);
    };
  }, [minimenuOpen]);

  const handleToggleClick = (e) => {
    e.stopPropagation();
    setMinimenuOpen(!minimenuOpen);
  };

  const handleWalletClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWalletOpen(!walletOpen);
  };
  const handleCloseWallet = () => {
    setWalletOpen(false);
  };

  return (
    <>
      <A.Header id="hvscCL" className={theme === "dark" ? "dark-mode" : ""}>
        <Link to="/">
          <A.CompanyLogoImg src={CompanyLogo} />
        </Link>
        <div>
          <A.link_Tag className="dark-mode-toggle" onClick={toggleTheme}>
            <img className="d-img-h"
              src={theme === "dark" ? "images/TopNav/1.svg" : "images/the sun.svg"}
              alt="Dark Mode"
            />
          </A.link_Tag>
          {navItems.map((item, index) => (
            <A.link_Tag
              key={index}
              href={item.href}
              onClick={index === 2 ? props.openLogoutModal : null}
              className={`link ${
                index === 1 || index === 2 ? "mobile-hidden" : ""
              } ${index === 3 ? "desktop-hidden mobile-hidden" : ""}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`img ${item.customClass}`}
              />
            </A.link_Tag>
          ))}

          <A.link_Tag
            className="toggle-img desktop-hidden"
            onClick={handleWalletClick}
          >
            <img src="images/TopNav/nav2.png" alt="Toggle" />
          </A.link_Tag>
          <A.link_Tag
            className="toggle-img desktop-hidden"
            onClick={handleToggleClick}
          >
            <img src="images/toggle-w.svg" alt="Toggle" />
          </A.link_Tag>
        </div>
      </A.Header>

      <section className={minimenuOpen ? "minimenu open" : "minimenu"}>
        <div className="ku-mbl-version-menu mini-nav" id="ku-mbl-version-menu">
          <div>
            <div>
              <a href="/">
                <img src="images/white-mbl-logo.png" alt="Logo" />
              </a>
              <a className="mbl-close-menu" onClick={handleCloseWallet}>
                <img src="images/close-xs 1.png" alt="Close Menu" />
              </a>
              <a href="/">
                <img src="images/setting.png" alt="Settings" />
              </a>
              <a href="/">
                <img src="images/radio.png" alt="Radio" />
              </a>
              <img
                className="nav-arrow d-none-dark"
                src="images/Polygon 3 (1).png"
                alt="Polygon"
              />
              <img
                className="nav-arrow d-none-white"
                src="images/Polygon3.png"
                alt="Polygon Logo"
              />
            </div>
            <div>
              <ul>
                {SectionItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <a href="/">
                <img src="images/discord.png" alt="Discord" />
              </a>
              <a href="/">
                <img src="images/twitter.png" alt="Twitter" />
              </a>
            </div>
            <div>
              <p>
                Made with <img src="images/heart.png" alt="Heart" /> for web3
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <div>
						{account ? (
							<ButtonDiv>
								<ButtonStyle1 onClick={props.openLogoutModal}>
									{shorter(account)}
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
					</div> */}

      <section className={`wallet ${walletOpen ? "open" : ""}`}>
        <div
          className="ku-mbl-version-connect mini-nav"
          id="ku-mbl-version-connect-main"
        >
          <img
            className="d-none-dark"
            src="images/Polygon 3 (3).png"
            alt="Polygon Logo"
          />
          <img
            className="d-none-white"
            src="images/Polygon3.png"
            alt="Polygon Logo"
          />
          <div>
            <div>
              <a
                href="#"
                className="mbl-close-menu"
                onClick={handleCloseWallet}
              >
                <img src="images/close-xs 1.png" alt="Close Menu" />
              </a>
            </div>
            <div>
              <div>
                <a href="#">
                  <img src="images/white-logo-bird 11.png" alt="Logo Bird" />
                </a>
              </div>
            </div>
            <div>
              <h4>Connect your wallet</h4>
            </div>
            <div>
              <ul>
                <li>
                  <a href="#">
                    METAMASK <img src="images/cat.png" alt="Metamask" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    COINBASE{" "}
                    <img src="images/coinbase.png" alt="Coinbase" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    TRUST WALLET{" "}
                    <img src="images/trust-logo 1.png" alt="Trust Wallet" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    EXODUS{" "}
                    <img
                      src="images/exodus.png"
                      alt="Exodus"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
