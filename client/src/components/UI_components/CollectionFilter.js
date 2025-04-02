import React from 'react'
import styled from 'styled-components';


const ItemsFilterDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row-reverse;
	margin-bottom: 1rem;
`;

const ItemsFilterDivP = styled.p`
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;
	text-align: center;
	letter-spacing: 0.15em;
`;

const ItemsFilterDivSpan = styled.span`
	font-weight: 700;
	font-size: 18px;
	line-height: 22px;
	text-align: center;
	letter-spacing: 0.1em;
	margin: 0 10px;

    &:hover{
        cursor: pointer;
        color: #A0CCFF;
    }

`;
export const CollectionFilter = () => {
  return (
    <ItemsFilterDiv>
        <ItemsFilterDivP>
            Sort by:
            <ItemsFilterDivSpan>Collection</ItemsFilterDivSpan>
            <ItemsFilterDivSpan>Price</ItemsFilterDivSpan>
            <ItemsFilterDivSpan>Rarity</ItemsFilterDivSpan>
        </ItemsFilterDivP>
    </ItemsFilterDiv>
  )
}
