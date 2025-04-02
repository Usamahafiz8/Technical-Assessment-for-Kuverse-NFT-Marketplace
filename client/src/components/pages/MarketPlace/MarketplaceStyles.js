import styled from "styled-components";
import {device} from '../../../components/devices'

export const MarketPlaceMintContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const MarketPlaceMpHeaderDiv = styled.div`
    // padding: 48px 0;
`;
export const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    @media ${device.laptopS} {
        // display: grid;
    }
`
export const FilterItem = styled.div`
border-radius: 15px;
border: 1px solid var(--grey, #EEE);
background: var(--grey, #EEE);
width: 104.152px;
height: 19.651px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > span {
        color: #404040;
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.5px;
    }
    &.active {
        background: linear-gradient(180deg,#BDF1FE 0%,#73C7F5 100%);
    }
`
export const MarketPlaceCollectorItemGrid = styled.div`
    gap: 10px;
    border-radius: 5px;
    margin: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media ${device.laptopL} {
        // grid-template-columns: repeat(4, 1fr);
    }
    @media ${device.laptopS} {
        // grid-template-columns: repeat(2, 1fr);
    }
    @media ${device.mobile} {
        // grid-template-columns: repeat(1, 1fr);
    }
`;