import React, { useState } from "react";

const TechSellerCard = () => {
  const [activePopup, setActivePopup] = useState(null);

  const popups = [
    {
      id: 1,
      content: (
        <div className="tech-sellecr-card-popup">
          <table>
            <thead>
              <tr>
                <th>TYPE</th>
                <th>VALUE</th>
                <th>PARITY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BASE TYPE</td>
                <td>NORMAL PURPLE</td>
                <td>2.45</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td>23.01</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="tech-sellecr-card-popup">
          <table>
            <thead>
              <tr>
                <th>BUYER</th>
                <th>SELLER</th>
                <th>PRICE</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0x01294js</td>
                <td>0x87114xa</td>
                <td>1000 KORE</td>
                <td>01/01/2023</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 3,
      content: <div className="tech-sellecr-card-popup">Popup 3</div>,
    },
  ];

  const showPopup = (popupId) => {
    setActivePopup(popupId);
  };

  return (
    <div className="tech-seller-card-main">
      <div className="tech-seller-card-top">
        <div className="tech-seller-card-top-title">
          <h2>COLLECTOR #1000</h2>
        </div>
        <div>
          {[1, 2, 3].map((popupId) => (
            <img
              key={popupId}
              src={`images/${
                popupId === 1 ? "copy" : popupId === 2 ? "print" : "download"
              }.png`}
              id={`tech-seller-popup-btn-${popupId}`}
              onClick={() => showPopup(popupId)}
            />
          ))}
        </div>
      </div>

      {popups.map((popup) => (
        <div
          key={popup.id}
          id={`tech-seller-popup${popup.id}-container`}
          style={{ display: activePopup === popup.id ? "block" : "none" }}
        >
          {popup.content}
        </div>
      ))}

      <div className="tech-seller-card-main-inner">
        <div className="tech-seller-card-main-inner-bg"></div>
        <div className="tech-seller-card-main-inner-btn">
          <a href="#">MYSTICAL</a>
        </div>
        {/* Icons area */}
        <div className="tech-seller-card-icons">
          <span>
            <img src="images/Attack.png" /> 000
          </span>
          <span>
            <img src="images/Defence.png" /> 000
          </span>
          <span>
            <img src="images/Health.png" /> 000
          </span>
          <span>
            <img src="images/Speed.png" /> 000
          </span>
          <span>
            <img src="images/Range.png" /> 000
          </span>
        </div>
        <div className="tech-seller-card-button-main">
          <div className="tech-seller-card-button">
            <button>LIST ON MARKET</button>
          </div>
        </div>
        <div className="tech-seller-card-email">
          <a href="#">
            <img src="images/email-icon.png" /> w3n@username{" "}
            <img src="images/ok.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TechSellerCard;
