import styled from "styled-components";
import { device } from "../../devices";

export const MintContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${device.mobile} {
        padding: 0 5px;
        margin-bottom:30px;
    }
`;
export const MintWraper = styled.div`
    position: relative;
`
export const MintTitle = styled.div`
text-align: center;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 900;
line-height: normal;
letter-spacing: 10.7px;
background: var(--BLUE, linear-gradient(180deg, #00BEEE 0%, #0087D1 100%));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
export const MintCardContainer = styled.div`
    margin-bottom: 1rem;
    // display: flex;
    //    temporary comment
    display: none;
     flex-direction: row;

    @media ${device.mobile}{
        display: block;
        text-align: center;
        text-align: -moz-center;
        text-align: -webkit-center;
    }
`;

export const MintBackground = styled.div`

`
export const MintBackground1 = styled.div`

`