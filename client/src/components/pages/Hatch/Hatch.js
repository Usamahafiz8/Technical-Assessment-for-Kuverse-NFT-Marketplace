import React, { useEffect, useState } from "react";
import UserProfile from "../../UI_components/UserProfiles";
import axios from "axios";
import { useWeb3React } from '@web3-react/core';
import { stringToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { web3FromSource, web3FromAddress } from '@polkadot/extension-dapp';
import { useApiProvider } from '@substra-hooks/core';
import styled from "styled-components";
import { device } from "../../devices";
import { ButtonStyle3 } from "../../UI_components/Buttons";
import { HatchConnectDiv, HatchContainer, HatchContainerBorder, HatchImage, HatchPriceDiv, InventoryContainer, InventoryWrap, InventoryEggItem } from "./HatchStyles";
import { MintBackground1, MintWraper, MintTitle } from "../Collector/CollectorStyles";
import { ModalOverlay, OverlayBG, CollectorOverlay, Upper, Header, CloseLogo, Lower, CollectorOverlayImage, OverlayConatiner } from "../Profile/ProfileStyles";
import { Title, TextSapn1, TextSapn, ModalWindow, ModalContainer, ModalWrap, ModalBody, ModalFooter } from '../../styles/Common';
import { ErrorModal } from "../../UI_components/ModalError";
const Close = "/assets/close.png";
const hatch_wallet = "GAcwWJ8TxL2AePtFsUPefuwChEq1EkTLMwBNsEtMNdMYePB";

const HatchModalContainer = styled(ModalContainer)`
	@media ${device.tablet} {
		zoom: 0.6;
		-moz-transform: scale(0.6);
	}
	@media ${device.mobileS} {
		zoom: 0.45;
		-moz-transform: scale(0.45);
	}
`
const HatchModalDiv = styled.div`
	display: flex;
	@media ${device.tablet} {
        display: block;
    }
`
const HatchModalWrap = styled(ModalWrap)`
	width: auto;
	background: transparent;
	box-shadow: none;
	border-radius: 0;
	padding: 0;
`
const HatchModalBody = styled(ModalBody)`
	background: linear-gradient(180deg,#00BEEE 0%,#0087D1 100%);
	box-shadow: 15px 15px 40px rgb(0 0 0 / 25%), inset 8px 8px 8px rgb(255 255 255 / 50%);
	padding: 10px;
	border-radius: 32px;
	margin: 10px;
`;
const ConfirmFooter = styled(ModalFooter)`
	padding-bottom: 24px;
	& > button.btn-1 {
		right: 170px;
	}
`
export const Hatch = (props) => {
	const { account } = useWeb3React();
	const apiProvider = useApiProvider();
	const [eggs, setEggs] = useState([]);
	const [isCall, setIsCall] = useState(false);
	const [toggle, setToggle] = useState(false);
	const [modalEgg, setModalEgg] = useState(null);
	const [isSuccessModal, setIsSuccessModal] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [isErrorModal, setIsErrorModal] = useState(false);
	const [errorMsg, setErrorMsg] = useState("Please check your wallet for validation!");
	const [hatchCount, setHatchCount] = useState(0);

	console.log("account", account);

	const get_hatchCount = async () => {
		let apiRes = await axios.get("/api/get-hatch-count");
		if (apiRes.data.status === "success") setHatchCount(apiRes.data.count);
		else setHatchCount(0);
	}
	useEffect(() => {
		get_hatchCount();
	}, []);
	const get_eggs = async () => {
		if (!props?.kuWallet || isCall) return;
		setIsCall(true);
		let apiRes = await axios.get("/api/get-ku-eggs/" + props.kuWallet.address);
		setIsCall(false);
		if (apiRes.data.status === "success") setEggs(apiRes.data.eggs);
	}
	useEffect(() => {
		get_eggs();
	}, [props?.kuWallet]);
	function openOverlay(egg) {
		setModalEgg(egg);
		setToggle(true);
	}
	function closeOverlay() {
		setModalEgg(null);
		setToggle(false);
	}
	const onCloseSuccessModal = () => {
		setIsSuccessModal(false);
		window.location.href = '/profile';
	}
	const onCloseErrorModal = () => {
		setIsErrorModal(false);
	}
	const [hatchEgg, setHatchEgg] = useState(null);
	const [hatchKuWallet, setHatchKuWallet] = useState("");
	const [hatchEvmWallet, setHatchEvmWallet] = useState("");
	const [isConfirmHatch, setIsConfirmHatch] = useState(false);
	const [isHatching, setIsHatching] = useState(false);
	const [koreHatchTx, setKoreHatchTx] = useState('');
	const [kuHatchTx, setKuHatchTx] = useState('');
	const [kuHatchNode, setKuHatchNode] = useState(null);
	let isSigning = false;
	const signing = async () => {
		if (!props?.kuWallet || !account || isSigning) return;
		isSigning = true;
		await cryptoWaitReady();
		const injector = await web3FromSource(props.kuWallet.meta.source);
		const message = 'Please sign to verify your kuverse account. ' + account.toLowerCase();
		const signRaw = injector?.signer?.signRaw;
		if (!!signRaw) {
			try {
				const { signature } = await signRaw({
					address: props.kuWallet.address,
					data: stringToHex(message),
					type: 'bytes'
				});
				const result = await axios.post("/api/verify-hatch-sig", {
					signature: signature,
					mb_address: account,
					ku_address: props.kuWallet.address,
				}, {});
				if (result.data.status === "success") {
					setHatchKuWallet(result.data.kusama_wallet);
					setHatchEvmWallet(result.data.evm_wallet);
				} else {
					setHatchKuWallet("");
					setHatchEvmWallet("");
					if (result.data.message) {
						setErrorMsg(result.data.message);
						setIsErrorModal(true);
					}
				}
			} catch (e) {
				setHatchKuWallet("");
				setHatchEvmWallet("");
				setErrorMsg(e.message);
				setIsErrorModal(true);
			}
		}
		isSigning = false;
	};
	useEffect(() => {
		signing();
	}, [props.kuWallet, account]);
	const hatching = async () => {
		if (!account) { setErrorMsg("Connect your EVN Wallet"); setIsErrorModal(true); return; }
		const accountAddress = props.kuWallet.address;
		const acc = await web3FromAddress(accountAddress);
		if (!hatchKuWallet || !hatchEvmWallet) { setErrorMsg("Connect your wallet and sign!"); setIsErrorModal(true); return; }
		if (!hatchEgg) { setErrorMsg("Please sellect an egg to hatch!"); setIsErrorModal(true); return; }
		if (!apiProvider) { setErrorMsg("Api is not ready!"); setIsErrorModal(true); return; }
		setIsHatching(true);
		setTimeout(() => {
			let hatchVideo = document.getElementById('hatch_video');
			try {
				hatchVideo.load();
				setTimeout(() => {
					setIsPending(true);
				}, 12000);
			} catch (e) { }
		}, 200);
		const sendData = [hatchEgg];
		try {
			const remarks = sendData.map((sendDataItem) => {
				return apiProvider.tx.system.remark(
					`RMRK::SEND::2.0.0::${sendDataItem.id}::${hatch_wallet}`,
				);
			});
			const tx = apiProvider.tx.utility.batchAll(remarks);
			await tx.signAndSend(accountAddress, { signer: acc.signer }, async (result) => {
				if (result.status.isInBlock) {
				} else if (result.status.isFinalized) {
					setIsPending(true);
					console.log("Finalized...");
					axios.post('/api/submit-hatch', { ku_address: accountAddress, egg_id: hatchEgg.id }, { timeout: 180000 }).then(apiRes => {
						setIsPending(false);
						if (apiRes.data.status === "success") {
							setKoreHatchTx(apiRes.data.koreHash);
							setKuHatchTx(apiRes.data.kuHash);
							setKuHatchNode(apiRes.data.kuNode);
							setIsSuccessModal(true);
							setIsHatching(false);
						} else {
							setErrorMsg("Failed to hatch, please contact support");
							setIsErrorModal(true);
							setIsHatching(false);
						}
					}).catch(err => {
						setIsPending(false);
						setErrorMsg(err.message);
						setIsErrorModal(true);
						setIsHatching(false);
					})
				}
			});
		} catch (err) {
			setIsPending(false);
			setErrorMsg(err.message);
			setIsErrorModal(true);
			setIsHatching(false);
		}
	}
	const selectHatchEgg = () => {
		if (!modalEgg) return;
		setHatchEgg(modalEgg);
		closeOverlay();
	}

	return (
		<div className="hatchpage w-100">
			<>
				<ErrorModal
					isOpen={isErrorModal}
					onClose={onCloseErrorModal}
					title={'Failed Activation'}
					subtitle={errorMsg}
				/>
				{isPending && <ModalWindow className="modal-window">
					<ModalContainer>
						<ModalWrap className="modal-wrap">
							<ModalBody>
								<h3 className="success-title">Hatching your KU EGG...</h3>
								<h5 className="success-subtitle">Please wait while the hatching completes!</h5>
							</ModalBody>
							<ModalFooter>
								<img src="/assets/bird-white.svg" alt="" />
							</ModalFooter>
						</ModalWrap>
					</ModalContainer>
				</ModalWindow>}
				{isConfirmHatch && <ModalWindow className="modal-window">
					<ModalContainer>
						<ModalWrap className="modal-wrap">
							<ModalBody>
								<h3 className="success-title">Confirm Hatch</h3>
								<h5 className="success-subtitle">{hatchEgg?.name}</h5>
							</ModalBody>
							<ConfirmFooter>
								<img src="/assets/bird-white.svg" alt="" />
								<button className="btn-1" onClick={() => setIsConfirmHatch(false)}>REJECT</button>
								<button className="btn-2" onClick={() => { hatching(); setIsConfirmHatch(false) }}>CONFIRM</button>
							</ConfirmFooter>
						</ModalWrap>
					</ModalContainer>
				</ModalWindow>}
				{isSuccessModal && <ModalWindow className="modal-window">
					<HatchModalContainer>
						<HatchModalWrap className="modal-wrap">
							<HatchModalDiv>
								<HatchModalBody>
									<Upper>
										<Header style={{ color: 'white' }}>
											<small style={{ fontSize: 16 }}>You received</small>
											<br /><strong style={{ fontWeight: 'bolder' }}>200,000 KORE!</strong>
										</Header>
									</Upper>
									<Lower style={{ paddingRight: 10, paddingLeft: 10 }}>
										<CollectorOverlayImage style={{ textAlign: 'center', width: '18rem', height: '18rem' }}>
											<video autoPlay="autoplay" loop={true} style={{ width: '18rem', height: '18rem', borderRadius: 25 }}>
												<source src="/videos/kore-animation.mp4" type="video/mp4" />
											</video>
										</CollectorOverlayImage>
									</Lower>
									<Lower style={{ flexDirection: 'column', paddingBottom: 10 }}>
										<div style={{ paddingTop: 10 }}>
											<a href={`${process.env.REACT_APP_BLOCK_EXPLORER}/tx/${koreHatchTx}`} target='_blank' style={{ color: 'white' }} rel="noreferrer">VIEW TRANSACTION</a>
										</div>
										<div style={{ color: 'white' }}>Please check your WALLET.</div>

									</Lower>
								</HatchModalBody>
								<HatchModalBody>
									<Upper>
										<Header style={{ color: 'white' }}>
											<small style={{ fontSize: 16 }}>YOUR KU HAS BEEN</small>
											<br /><strong style={{ fontWeight: 'bolder' }}>HATCHED!</strong>
										</Header>
									</Upper>
									{kuHatchNode ? <>
										<Lower><div style={{ paddingBottom: 10, color: 'white' }}>{kuHatchNode.name}</div></Lower>
										<Lower style={{ paddingRight: 10, paddingLeft: 10 }}>
											<CollectorOverlayImage style={{ textAlign: 'center', width: '16rem', height: '16rem' }}>
												{kuHatchNode.assetType === "video"
													? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
														<source src={kuHatchNode.mainData} type="video/mp4" />
													</video>
													: <img src={kuHatchNode?.mainData} alt="Card" style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 25 }} />}
											</CollectorOverlayImage>
										</Lower>
									</> : <Lower style={{ paddingRight: 10, paddingLeft: 10 }}>
										<CollectorOverlayImage style={{ textAlign: 'center', width: '18rem', height: '18rem' }}>
											<video autoPlay="autoplay" loop={true} style={{ width: '18rem', height: '18rem', borderRadius: 25 }}>
												<source src="/assets/bird-animation.mp4" type="video/mp4" />
											</video>
										</CollectorOverlayImage>
									</Lower>}
									<Lower style={{ flexDirection: 'column', paddingBottom: 10 }}>
										<div style={{ paddingTop: 10 }}>
											<a href={`${process.env.REACT_APP_BLOCK_EXPLORER}/tx/${kuHatchTx}`} target='_blank' style={{ color: 'white' }} rel="noreferrer">VIEW TRANSACTION</a>
										</div>
										<div style={{ color: 'white' }}>Please check your INVENTORY.</div>
									</Lower>
								</HatchModalBody>
							</HatchModalDiv>
							<ModalFooter style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<div style={{ paddingTop: 10 }}><ButtonStyle3 onClick={onCloseSuccessModal}>OK</ButtonStyle3></div>
							</ModalFooter>
						</HatchModalWrap>
					</HatchModalContainer>
				</ModalWindow>}
			</>
			{toggle && <ModalOverlay >
				<OverlayBG onClick={closeOverlay}></OverlayBG>
				<OverlayConatiner>
					<CollectorOverlay>
						<Upper>
							<Header><TextSapn>{modalEgg?.name}</TextSapn></Header>
							<CloseLogo src={Close} onClick={closeOverlay}></CloseLogo>
						</Upper>
						<Lower>
							<CollectorOverlayImage style={{ textAlign: 'center', width: '20rem', height: '20rem' }}>
								<video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: '25px' }}>
									<source src={modalEgg?.image} type="video/mp4" />
								</video>
							</CollectorOverlayImage>
						</Lower>
						<div style={{ paddingTop: 10 }}><ButtonStyle3 onClick={selectHatchEgg}>SELECT TO HATCH</ButtonStyle3></div>
					</CollectorOverlay>
				</OverlayConatiner>
			</ModalOverlay>}
			{/* --- */}
			<div className="mobile-hidden">
			<UserProfile/>
			</div>
			{/* <hr style={{ width: 400, margin: 'auto', border: '1px solid #DCDCDC' }} /> */}
			<div style={{ marginTop: '20px' }}>
				<TextSapn></TextSapn></div>
			<Title>
				<TextSapn1></TextSapn1>
			</Title>
			<MintWraper style={{ paddingBottom: 20 }}>
				<MintBackground1>
					<MintTitle style={{ padding: 10 }}>
					KU CORP. <br />
							INKUBATOR
					</MintTitle>
				</MintBackground1>
			</MintWraper>
			<HatchContainerBorder>
				<HatchContainer>
					<InventoryContainer style={{ flex: 1 }}>
						{[eggs].slice(0, eggs.length / 2).map((egg, index) => (
							<InventoryWrap key={index} onClick={() => openOverlay(egg)}>
								<InventoryEggItem>
									<video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: '8px' }}>
										<source src={egg.image} type="video/mp4" />
									</video>
								</InventoryEggItem>
							</InventoryWrap>
						))}
					</InventoryContainer>
					<HatchImage style={{ textAlign: 'center' }}>
						{isHatching
							? (isPending ? <img src='/images/loading.gif' style={{ height: '100%', borderRadius: 25 }} alt="" />
								: <video id="hatch_video" autoPlay="autoplay" loop={false} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
									<source src="/assets/HatchAnimation.mp4" type="video/mp4" />
								</video>) : (<>
									{hatchEgg ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: '25px' }}>
										<source src={hatchEgg.image} type="video/mp4" />
									</video>
										: <img src='/assets/HatchPrev.jpg' style={{ height: '100%', borderRadius: 25 }} alt="" />}
								</>)}
					</HatchImage>
					<InventoryContainer style={{ flex: 1 }}>
						{eggs.slice(eggs.length / 2, eggs.length).map((egg, index) => (
							<InventoryWrap key={index} onClick={() => openOverlay(egg)}>
								<InventoryEggItem>
									<video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: '8px' }}>
										<source src={egg.image} type="video/mp4" />
									</video>
								</InventoryEggItem>
							</InventoryWrap>
						))}
					</InventoryContainer>
				</HatchContainer>
				<HatchPriceDiv>
					<HatchConnectDiv>
						{!account || !props.kuWallet ? (
							<div class="hatch-container">
							<div class="hatch-image-bottom-box">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
							<button>HATCH KU EGG</button>
							 <p>CONNECT TO KUSAMA AND POLKADOT PARACHAIN IN ORDER TO BRIDGE YOUR KU EGG AND HATCH INTO THE POLKADOT ECOSYSTEM.</p>
						</div>
						) : (null)}
					</HatchConnectDiv>
					{account && <div className="kore-button-div">
						{isHatching ?
							<ButtonStyle3>HATCHING ...</ButtonStyle3>
							: <ButtonStyle3 onClick={() => {
								if (!hatchEgg) {
									setErrorMsg("Please sellect an egg to hatch!"); setIsErrorModal(true); return;
								} setIsConfirmHatch(true)
							}}>HATCH KU EGG</ButtonStyle3>}
					</div>}
				</HatchPriceDiv>
			</HatchContainerBorder>
		</div>

	);
};
