import React from "react";

const KoreReplace = () => {
  return (
    <div className="korereplace w-100 position-relative">
      <h3>
        WELCOME <br /> TO KU CORP
      </h3>
      <div className="background-house d-none-dark"></div>
      <div className="background-house d-none-white"></div>
      <div className="text-center">
        <h5 className="jzfKWc">
          ENTER <br /> QUATITY
        </h5>
      </div>
      <div className="kore-card-container">
        <div className="kore-card-row-black">
          <img src="images/Moonsama_token.png" />
          <span>
            <p>Swap From</p>
            <h2 className="jzfKWc">Sama</h2>
          </span>
          <h1 className="jzfKWc">0.00</h1>
        </div>
        <div className="kore-card-row">
          <img src="images/Frame 3.png" />
          <img src="images/Frame 4.png" />
          <h1>KU CORP SWAP</h1>
        </div>
        <div className="kore-card-row-black">
          <img src="images/white-logo-bird 12.png" />
          <span>
            <p>Swap From</p>
            <h2 className="jzfKWc">Kore</h2>
          </span>
          <h1 className="jzfKWc">0.00</h1>
        </div>
        <h6>CIRCULATING SUPPLY 1000000/200000000</h6>
        <button>
          <a href="/kore">SWAP</a>
        </button>
      </div>
    </div>
  );
};

export default KoreReplace;
