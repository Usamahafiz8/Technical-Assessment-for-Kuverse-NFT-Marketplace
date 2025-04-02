import React from "react";
import styled from "styled-components";
import { device } from "../../devices";

const PlayGame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  @media ${device.laptopL} {
    width: 450px;
  }
`;

const Play = () => {
  return (
    <div className="w-100">
      <PlayGame>
        <a>
          <img src="images/Play-Game.png" />
        </a>
      </PlayGame>
    </div>
  );
};

export default Play;
