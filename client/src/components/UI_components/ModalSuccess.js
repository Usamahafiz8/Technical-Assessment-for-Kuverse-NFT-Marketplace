import React from "react";
import { ModalWindow, ModalBG, ModalContainer, ModalWrap, ModalBody, ModalFooter } from '../styles/Common'

export const SuccessModal = (props) => {
	return (
		<>
			{props.isOpen && <ModalWindow className="modal-window">
				<ModalBG onClick={props.onClose}></ModalBG>
				<ModalContainer>
					<ModalWrap className="modal-wrap">
						<ModalBody>
							<h3 className="success-title">{props.title}</h3>
							<h5 className="success-subtitle">{props.subtitle}</h5>
						</ModalBody>
						<ModalFooter>
                            <img src="/assets/bird-white.svg" />
                            <button onClick={props.onClose}>OK</button>
                        </ModalFooter>
					</ModalWrap>
				</ModalContainer>
			</ModalWindow>}
		</>
	)
}