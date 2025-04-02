import React from 'react';
import styled from 'styled-components';
import { MintButton } from './Buttons';
import { device } from '../devices';

const KoreCardDiv = styled.div`
    width: 25rem;
	height: max-content;
    background: #F5F5F5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 8px 8px 10px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s ease-in-out;

    &:hover{
        transform: scale(1.1);
        transform-origin: top;
    }

    @media ${device.mobileS}{
       width: 18rem;
    }
`;

const KoreCardContent = styled.div`
    background: #FFFFFF;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 25px;
    padding: 10px;
     display: flex;
    flex-direction: column;
    align-items: center;

`;

const KoreCardImg = styled.div`
    width:20rem;
    height: 20rem;
    background: #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.5);
    border-radius: 25px;
    margin-bottom: 15px;
    @media ${device.mobileS}{
       width: 15rem;
       height: 15rem;
    }
`;

const KoreText = styled.p`
    font-weight: 900;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    letter-spacing: 0.1em;
    margin: 15px 0;
    color: #880606;


`;

export const KoreCard = () => {
  return (
      <KoreCardDiv>
          <KoreCardContent>
              <KoreCardImg></KoreCardImg>
              <MintButton name={ "MINT Kore" }></MintButton>
              <KoreText>0 000 000 000 / 1 000 000 000</KoreText>
          </KoreCardContent>
    </KoreCardDiv>
  )
}
