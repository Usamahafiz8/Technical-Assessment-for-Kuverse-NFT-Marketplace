import styled from "styled-components";
import { device } from "../../devices";

export const HatchContainerBorder = styled.div`
    width: fit-content;
    padding: 10px;
    margin-bottom: 50px;
`;

export const HatchContainer = styled.div`
    // width: 75rem;
    // height: 33rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 20px;

    @media ${device.laptopS}{
        width: 100%;
    }
    @media ${device.tablet}{
        // width: 40rem;
        // height: 25rem;
    }
    @media ${device.mobile}{
        display: inline-block;
    }
`;

export const HatchPriceDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const HatchConnectDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem !important;

    @media ${device.tablet}{
        padding: 1rem !important;
    }
    @media ${device.mobile}{
        padding-top: 3px !important;
    }
`;

export const HatchImage = styled.div`

    text-align: center;
    padding: 4px 0;
    width: 313px;
    height: 311px;
    margin: 0 auto;
    border-radius: 25px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.laptopS}{
        width: 23rem;
        height: 23rem;
    }
    @media ${device.tablet}{
        width: 18rem;
        height: 18rem;
    }
    @media ${device.mobile}{
        width: 16rem;
        height: 16rem;
    }
`;
export const InventoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: flex-end;
    @media ${device.mobile}{
        flex-direction: row;
    }
`
export const InventoryWrap = styled.div`
    width: 120px;
    height: 100px;
    padding: 10px 20px;
`;
export const InventoryEggItem = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    // padding: 5px;
    background-color: #FFFFFF;
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-out;
    &:hover {
        transform: scale(2);
        transform-origin: left top;
        cursor: pointer;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
        1px 1px 4px 2px rgba(0, 0, 0, 0.25);
    }
`
export const InventoryEggImage = styled.div`
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 8px;
`