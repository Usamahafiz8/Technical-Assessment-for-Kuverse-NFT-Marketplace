import styled from "styled-components";
import { device } from "../../devices";

export const BackpackCollectorItemGrid = styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto auto auto;
	gap: 25px;
	padding: 25px;
	border: 1px dashed #9747ff;
	border-radius: 5px;
	margin-bottom: 4rem;
	@media (max-width:1300px){
	grid-template-columns: auto auto auto auto auto;

	}

	@media ${device.laptopS}{
	grid-template-columns: auto auto auto auto;

	}
	@media ${device.tablet}{
	grid-template-columns: auto auto auto ;

	}

	@media ${device.mobile}{
	grid-template-columns: auto auto;
	gap: 15px;
	padding: 15px;
		
	}
`;