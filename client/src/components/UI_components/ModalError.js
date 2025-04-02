import React from "react";
import { ModalWindow, ModalBG, ModalContainer, ModalWrap, ModalBody, ModalFooter } from '../styles/Common'

export const ErrorModal = (props) => {
	return (
		<>
			{props.isOpen && <ModalWindow className="modal-window">
				<ModalBG onClick={props.onClose}></ModalBG>
				<ModalContainer>
					<ModalWrap className="modal-wrap">
						<ModalBody>
							<h3 className="error-title">{props.title}</h3>
							<h5 className="error-subtitle">{props.subtitle}</h5>
						</ModalBody>
						<ModalFooter>
                            <img src="/assets/bird-white.svg" alt="" />
                            <button onClick={props.onClose}>CLOSE</button>
                        </ModalFooter>
					</ModalWrap>
				</ModalContainer>
			</ModalWindow>}
		</>
	)
}