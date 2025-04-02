import styled from "styled-components";
import { device } from "../../devices";

export const KoreContainerBorder = styled.div`
width: fit-content;
background: #ffffff;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 25px;
padding: 10px;
margin: 2rem 0 6rem;
@media ${device.tablet}{
    transform:scale(0.75);
}
@media ${device.mobile}{
    transform:scale(1);
}
`;
export const KoreContainer = styled.div`
width: 75rem;
height: 33rem;
background-color: #567ca9;
display: flex;
align-items: center;
justify-content: space-around;
border-radius: 20px;
@media ${device.laptopS}{
    width: 45rem;
    height: 25rem;
}
@media ${device.mobile}{
    transform:scale(1);
    width: 18rem;
    height: max-content;
    flex-direction: column;
}
`;
export const KorePriceDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
export const KorePriceDivP = styled.p`
background: #ffffff;
box-shadow: inset -4px -3px 4px #ffffff, inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 67px;
padding: 15px 30px;
margin: 2rem 0;
`;
export const KorePriceDivDiv = styled.div`
background: #f9f9f9;
box-shadow: inset 5px 4px 4px 3px rgba(0, 0, 0, 0.45);
border-radius: 38px;
padding: 10px;
margin-bottom: 2rem;
`;
export const KoreImage = styled.div`
width: 27rem;
height: 25rem;
background-color: #f9f9f9;
border-radius: 25px;
@media ${device.laptopS}{
    width: 23rem;
    height: 23rem;
}
@media ${device.mobile}{
    margin-top: 10px;
    width: 17rem;
    height: 17rem;
}
`;
export const KoreDiv = styled.div`
@media ${device.mobile}{
    order: 2;
}
`;
export const KoreSpan = styled.span``;
export const KoreCardDiv = styled.div`
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
export const KoreCardContent = styled.div`
    border: 2px solid #FFFFFF;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

`;
export const KoreCardImg = styled.div`
    width: 210px;
    height: auto;
`;
export const KoreText = styled.p`
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.25em;
    color: #FFFFFF;
    max-width: 200px;
    word-break: break-all;
`;
export const AirdropDiv = styled.div`
    padding: 5%;
    height: 100%;
`
export const AirdropHashArea = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    font-size: 24px;
    outline: none;
    padding: 5%;
`
export const KoreMintDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 5%;
    & > h3 {
        padding-bottom: 10px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        letter-spacing: 0.25em;
        color: #FFFFFF;
    }
    & > h1 {
        padding-bottom: 10px;
        font-weight: 500;
        text-align: center;
        letter-spacing: 0.25em;
        color: #FFFFFF;
    }
    & > input {
        width: 100%;
        height: 40px;
        text-align: center;
        border: 1px solid #FFFFFF;
        background: transparent;
        color: #FFFFFF;
    }
    & > input:focus {outline: none}
    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`
export const ChartContainer = styled.div`
    width: 700px;
    cursor: 'pointer';
    @media ${device.tablet} {
        width: 400px;
    }
    @media ${device.mobile} {
        width: 320px;
    }
`
export const KoreCardContainer = styled.div`
    margin: 16px auto;
    border: 1px solid #E2E2E2;
    border-radius: 25px;
    background-image: url(/assets/kore-background.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    padding: 100px;
    @media ${device.laptopS} {
        padding: 160px 220px 160px 100px;
    }
    @media ${device.tablet} {
        padding: 70px 90px 70px 50px;
    }
    @media ${device.mobile} {
        padding: 50px 50px;
    }
`