import React from "react";
import styled from "styled-components";
import UserProfile from "../../UI_components/UserProfiles";
import { device } from "../../devices";

const AlertMessage = styled.div`
  & > h3 {
    & > span {
      color: #ff4f4f;
    }
    color: #00a8e2;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1px;
    text-align: center;
    margin: 54px 0 25px;
    @media ${device.mobile} {
      margin: 39px 0 16px;
    }
  }
  width: 359px;
  margin: 0 auto;
`;
const AlertBox = styled.div`
  height: 45px;
  width: 100%;
  border-radius: 15px;
  background: #eee;
  margin-bottom: 10px;
  padding: 12px 13px;
  & > div {
    & > img {
      // padding-right:27px;
      padding-left: 13px;
    }
    display: flex;
    justify-content: space-between;

    & > div {
      & > h5 {
        color: #8c8a8a;
        text-align: right;
        font-family: Inter;
        font-size: 10px;
        font-style: italic;
        font-weight: 500;
        margin-top: -6px;
        line-height: normal;
        letter-spacing: 0.5px;
      }
      & > p {
        color: #bbb;
        font-family: Inter;
        font-size: 9px;
        font-style: italic;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.45px;
      }
    }
  }
`;

const SpanTag = styled.span`
  color: #008bd3;
  font-family: Inter;
  font-size: 9px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.45px;
`;
const SpanTag2 = styled.span`
  color: #fc0;
  font-family: Inter;
  font-size: 9px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: 0.45px;
`;

const Alert = () => {
  return (
    <div className="w-100">
      <UserProfile />
      <AlertMessage>
        <h3>
          System Messages <span>.</span>
        </h3>
        <AlertBox className="frzzkZ">
          <div>
            <img className="d-none-dark" src="images/Alert/5.svg" alt="" />
            <img className="d-none-white" src="images/case.png" alt="" />
            <div>
              <p>
                You sold: <SpanTag>item #2211</SpanTag>{" "}
              </p>
              <p>
                to: <SpanTag>w3n@code</SpanTag> for:{" "}
                <SpanTag>1000.00 kORE</SpanTag>{" "}
              </p>
            </div>
            <div>
              <h5>
                <img src="images/Alert/66.png" alt="" />2 days ago
              </h5>
            </div>
          </div>
        </AlertBox>
        <AlertBox className="frzzkZ">
          <div>
            <img className="d-none-dark" src="images/Alert/3.svg" alt="" />
            <img className="d-none-white" src="images/cart-icon.png" alt="" />
            <div>
              <p>
                You purchased: <SpanTag>item #0001</SpanTag>{" "}
              </p>
              <p>
                to: <SpanTag>w3n@code</SpanTag> for:{" "}
                <SpanTag>1000.00 kORE</SpanTag>{" "}
              </p>
            </div>
            <div>
              <h5>
                <img src="images/Alert/66.png" alt="" />7 days ago
              </h5>
            </div>
          </div>
        </AlertBox>
        <AlertBox className="frzzkZ">
          <div>
            <img className="d-none-dark" src="images/Alert/2.svg" alt="" />
            <img className="d-none-white" src="images/msgalert.png" alt="" />

            <div>
              <p>
                Congratulations on your team <br /> achieving{" "}
                <SpanTag2 className="yellow">MYSTICAL</SpanTag2> rarity!{" "}
              </p>
            </div>
            <div>
              <h5>
                <img src="images/Alert/66.png" alt="" /> 2 months ago
              </h5>
            </div>
          </div>
        </AlertBox>
        <AlertBox className="frzzkZ">
          <div>
            <img className="d-none-dark" src="images/Alert/1.svg" alt="" />
            <img className="d-none-white" src="images/cupalert.png" alt="" />
            <div>
              <p>
                System upgrades complete. <br />{" "}
                <SpanTag>New game mode added.**</SpanTag>
              </p>
            </div>
            <div>
              <h5>
                <img src="images/Alert/66.png" alt="" /> 3 months ago
              </h5>
            </div>
          </div>
        </AlertBox>
        <div className="desktop-hidden">
          <AlertBox className="frzzkZ">
            <div>
              <img src="images/gold.png" alt="" />
              <div>
                <p>
                  CONGRATULATIONS ON ACHIEVING THE <br />{" "}
                  <SpanTag2 className="yellow">
                    GOLD KU COLLECTOR TROPHY!!
                  </SpanTag2>
                </p>
              </div>
              <div>
                <h5>
                  <img src="images/Alert/66.png" alt="" /> 6 months ago
                </h5>
              </div>
            </div>
          </AlertBox>
        </div>
        <AlertBox className="gwEBWY mobile-hidden"></AlertBox>
        <AlertBox className="gwEBWY mobile-hidden"></AlertBox>
        <AlertBox className="gwEBWY mobile-hidden"></AlertBox>
        <AlertBox className="gwEBWY mobile-hidden"></AlertBox>
        <AlertBox className="gwEBWY mobile-hidden"></AlertBox>
        <AlertBox className="gwEBWY mobile-hidden"></AlertBox>
        <AlertBox className="gwEBWY mobile-hidden"></AlertBox>
      </AlertMessage>
    </div>
  );
};

export default Alert;
