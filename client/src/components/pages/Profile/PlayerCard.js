import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { shorter1 } from "../../../utils";
import { BridgeButton } from "../../UI_components/Buttons";
import {
    BackDiv, BigDash, CenterDiv, CollapseProfile, CommonDiv, CommonImg, CommonProfileDiv, CommonTag, DivBig, Icon, IconBG, IconsDiv,
    ProfileDiv, ProfileDivBorder, CollectorImage, Section1, Section2, Section3, SideProfileMenu, SideProfileMenuBorder, SmallDash, TextDiv,
    ThreeBox, ThreeBoxDiv, ThreeDiv, ThreeDivCard, TwoDiv, TwoDivImg, TwoDivs, TwoDivsImg, ModalOverlay, OverlayBG, CustomOverlayContainer,
    CustomOverlayWrap, CustomModalHeader, CustomNameTag, CustomNameInput, CustomAvatarTag, CustomAvatarImg, CustomModalButton, CustomCloseIcon,
    BodyWrapper, ModalFooterWrapper, BodyOne, OneHeader, OneImage, OneAttributes, OneAttributeItem, BodyArrow, BackpackSlotWrapper
} from "./ProfileStyles";
import { TextSapn } from '../../styles/Common';
import { AttackBlue, DefenceBlue, HealthBlue, SpeedBlue, RangeBlue, NON_VALUE, PLAYER_KU, PLAYER_ITEM, BACKPACK_KU, BACKPACK_ITEM, KU_ITEM } from '../../constants';
import { SuccessModal } from "../../UI_components/ModalSuccess";
import { ErrorModal } from "../../UI_components/ModalError";
import { equipCollector, unequipCollector, equipBackpack, unequipBackpack, equipKu, unequipKu, equipItem, unequipItem } from "../../../utils/contracts";

export const PlayerCard = (props) => {
    const { account, chainId, library } = useWeb3React();
    const [kuExtend, setKuExtend] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [username, setUsername] = useState('');
    const [newName, setNewName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [newProfilePic, setNewProfilePic] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const openEditProfileModal = () => {
        setIsEdit(!isEdit);
    }
    const closeEditProfileModal = () => {
        setIsEdit(false);
    }
    const openKuExtend = () => {
        setIsBModal(false);
        setKuExtend(true);
    }
    const closeKuExtend = () => {
        setKuExtend(false);
    }
    useEffect(() => {
        if (props.user) {
            setUsername(props.user.name);
            setNewName(props.user.name);
            setProfilePic(props.user.profilePic);
            setNewProfilePic(props.user.profilePic);
        }
    }, [props.user]);

    const handleNewName = (_newName) => {
        if (_newName.length > 20) _newName = _newName.slice(0, 20);
        setNewName(_newName);
    }
    const uploadFile = () => {
        document.getElementById('profile_input_file').click();
    }
    function handleProfilePic(event) {
        let reader = new FileReader();
        reader.onload = function (event) {
            setNewProfilePic(event.target.result);
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    function updateProfile() {
        setUpdating(true);
        let data = {
            address: account,
            name: newName || "NoName",
            profilePic: newProfilePic,
        };

        axios.post("/api/user/update", data)
            .then(res => {
                setUpdating(false);
                setUsername(res.data.name);
                setProfilePic(res.data.profilePic);
                closeEditProfileModal();
            })
            .catch(err => {
                setUpdating(false)
                console.log(err.response.data.message)
            })
    }
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [successTitle, setSuccessTitle] = useState("Your NFT has been equipped!");
    const [successSubTitle, setSuccessSubTitle] = useState("Please check your player card.");
    const [isErrorModal, setIsErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Please check your wallet for validation!");
    const [isEquipping, setIsEquipping] = useState(false);
    const [isUnequipping, setIsUnequipping] = useState(false);
    const [pCollectors, setPCollectors] = useState([]);
    const [oneColector, setOneCollector] = useState(null);
    const [pBackpacks, setPBackpacks] = useState([]);
    const [oneBackpack, setOneBackpack] = useState(null);
    const [pBackpackIndex, setPBackpackIndex] = useState(0);
    const [pKus, setPKus] = useState([]);
    const [oneKu, setOneKu] = useState(null);
    const [pKuIndex, setPKuIndex] = useState(0);
    const [pItems, setPItems] = useState([]);
    const [oneItem, setOneItem] = useState(null);
    const [pItemIndex, setPItemIndex] = useState(0);
    const [isCModal, setIsCModal] = useState(false);
    const [isBModal, setIsBModal] = useState(false);
    const [isKModal, setIsKModal] = useState(false);
    const [kuModel, setKuModel] = useState(NON_VALUE);
    const [isIModal, setIsIModal] = useState(false);
    const [itemModel, setItemModel] = useState(NON_VALUE);
    const [itemKuId, setItemKuId] = useState(NON_VALUE);
    const [player, setPlayer] = useState(null);
    const [playerAttributes, setPlayerAttributes] = useState([0, 0, 0, 0, 0])
    // show in modals
    const [playerCollector, setPlayerCollector] = useState(null);
    const [playerBackpack, setPlayerBackpack] = useState(null);
    const [playerKu, setPlayerKu] = useState(null);
    const [playerItem, setPlayerItem] = useState(null);

    const prevOne = (type) => {
        let kuVid = document.getElementById('ku-video-source');
        if (type === PLAYER_KU) {
            if (pKuIndex > 0) {
                let prevIndex = pKuIndex - 1;
                setOneKu(pKus[prevIndex]);
                setPKuIndex(prevIndex);
                kuVid.load();
            }
        }
        else if (type === PLAYER_ITEM) {
            if (pItemIndex > 0) {
                let prevIndex = pItemIndex - 1;
                setOneItem(pItems[prevIndex]);
                setPItemIndex(prevIndex);
            }
        }
        else if (type === 'backpack') {
            if (pBackpackIndex > 0) {
                let prevIndex = pBackpackIndex - 1;
                setOneBackpack(pBackpacks[prevIndex]);
                setPBackpackIndex(prevIndex);
            }
        }
    }
    const nextOne = (type) => {
        let kuVid = document.getElementById('ku-video-source');
        if (type === PLAYER_KU) {
            if (pKus.length - 1 > pKuIndex) {
                let nextIndex = pKuIndex + 1;
                setOneKu(pKus[nextIndex]);
                setPKuIndex(nextIndex);
                kuVid.load();
            }
        }
        else if (type === PLAYER_ITEM) {
            if (pItems.length - 1 > pItemIndex) {
                let nextIndex = pItemIndex + 1;
                setOneItem(pItems[nextIndex]);
                setPItemIndex(nextIndex);
            }
        }
        else {
            if (pBackpacks.length - 1 > pBackpackIndex) {
                let nextIndex = pBackpackIndex + 1;
                setOneBackpack(pBackpacks[nextIndex]);
                setPBackpackIndex(nextIndex);
            }
        }
    }
    const onCloseSuccessModal = () => {
        setIsSuccessModal(false);
        window.location.reload();
    }
    const onCloseErrorModal = () => {
        setIsErrorModal(false);
    }
    const openCollectorModal = () => {
        if (player && player.collector) setPlayerCollector(player.collector);
        setIsCModal(true);
    }
    const closeCollectorModal = () => {
        setIsCModal(false);
    }
    const openBackpackModal = () => {
        if (player && player.backpack) setPlayerBackpack(player.backpack);
        setIsBModal(true);
    }
    const closeBackpackModal = () => {
        setIsBModal(false);
    }
    const openKuModal = (type, index) => {
        if (type === PLAYER_KU) {
            if (index === 1 && (player && player.ku1)) setPlayerKu(player.ku1);
            else if (index === 2 && (player && player.ku2)) setPlayerKu(player.ku2);
            else if (index === 3 && (player && player.ku3)) setPlayerKu(player.ku3);
            else setPlayerKu(null);
            setKuModel(PLAYER_KU);
            setIsKModal(true);
        } else if (type === BACKPACK_KU) {
            const { isExist, ku } = isExistKuInBackpack(index);
            if (isExist) setPlayerKu(ku);
            else setPlayerKu(null);
            setKuModel(BACKPACK_KU);
            setIsKModal(true);
        }
    }
    const closeKuModal = (type) => {
        setIsKModal(false);
    }
    const openItemModal = (type, ku_id, index = NON_VALUE) => {
        if (type === PLAYER_ITEM) {
            if (player && player.item) setPlayerItem(player.item);
            else setPlayerItem(null);
            setItemModel(PLAYER_ITEM);
            setItemKuId(ku_id)
            setIsIModal(true);
        } else if (type === BACKPACK_ITEM) {
            console.log(index);
            const { isExist, item } = isExistItemInBackpack(index);
            console.log(isExist, item);
            if (isExist) setPlayerItem(item);
            else setPlayerItem(null);
            setItemModel(BACKPACK_ITEM);
            setItemKuId(NON_VALUE);
            setIsIModal(true);
        } else if (type === KU_ITEM) {
            const { isExist, item } = isExistKuItem(ku_id, index);
            if (isExist) setPlayerItem(item);
            else setPlayerItem(null);
            setItemModel(KU_ITEM);
            setItemKuId(ku_id)
            setIsIModal(true);
        }
    }
    const isExistKuInBackpack = (ku_id) => {
        let res = { isExist: false, ku: null };
        if (ku_id === NON_VALUE) return res;
        if (!player.backpack || !player.backpack.slots.length) return res;
        for (let k = 0; k < player.backpack.slots.length; k++) {
            let backpackSlotOne = player.backpack.slots[k];
            if (backpackSlotOne.slot_model === BACKPACK_KU && backpackSlotOne.tokenId === ku_id) {
                res.isExist = true; res.ku = backpackSlotOne;
                return res;
            }
        }
        return res;
    }
    const isExistItemInBackpack = (item_id) => {
        let res = { isExist: false, item: null };
        if (item_id === NON_VALUE) return res;
        if (!player.backpack || !player.backpack.slots.length) return res;
        for (let k = 0; k < player.backpack.slots.length; k++) {
            let backpackSlotOne = player.backpack.slots[k];
            if (backpackSlotOne.slot_model === BACKPACK_ITEM && backpackSlotOne.tokenId === item_id) {
                res.isExist = true; res.item = backpackSlotOne;
                return res;
            }
        }
        return res;
    }
    const isExistKuItem = (ku_id, index) => {
        let res = { isExist: false, item: null };
        if (ku_id === NON_VALUE) return res;
        if (ku_id === player.kuId1 && player.ku1 && player.ku1.slots.length > index) {
            res.isExist = true; res.item = player.ku1.slots[index];
            return res;
        } else if (ku_id === player.kuId2 && player.ku2 && player.ku2.slots.length > index) {
            res.isExist = true; res.item = player.ku2.slots[index];
            return res;
        } else if (ku_id === player.kuId3 && player.ku3 && player.ku3.slots.length > index) {
            res.isExist = true; res.item = player.ku3.slots[index];
            return res;
        } else {
            if (!player.backpack || !player.backpack.slots.length) return res;
            for (let k = 0; k < player.backpack.slots.length; k++) {
                let backpackSlotOne = player.backpack.slots[k];
                if (backpackSlotOne.slot_model === BACKPACK_KU && backpackSlotOne.tokenId === ku_id && backpackSlotOne.slots.length > index) {
                    res.isExist = true; res.item = backpackSlotOne.slots[index];
                    return res;
                }
            }
        }
        return res;
    }
    const closeItemModal = (type) => {
        setIsIModal(false);
    }
    const getPlayerGig = (address) => {
        axios.get(`/api/player-gig/${address}`)
            .then(res => {
                let c_items = res.data.collectors.map((item => {
                    return {
                        ...item,
                        mainData: item.mainData.replace("gateway.pinata.cloud", "kuverse.mypinata.cloud")
                    }
                }));
                setPCollectors(c_items);
                if (c_items.length) setOneCollector(c_items[0]);
                let b_items = res.data.backpacks.map((item => {
                    return {
                        ...item,
                        mainData: item.mainData.replace("gateway.pinata.cloud", "kuverse.mypinata.cloud")
                    }
                }));
                setPBackpacks(b_items);
                if (b_items.length) setOneBackpack(b_items[0]);
                let k_items = res.data.kus.map((item => {
                    return {
                        ...item,
                        mainData: item.mainData.replace("gateway.pinata.cloud", "kuverse.mypinata.cloud")
                    }
                }));
                setPKus(k_items);
                if (k_items.length) setOneKu(k_items[0]);
                let i_items = res.data.items.map((item => {
                    return {
                        ...item,
                        mainData: item.mainData.replace("gateway.pinata.cloud", "kuverse.mypinata.cloud")
                    }
                }));
                setPItems(i_items);
                if (i_items.length) setOneItem(i_items[0]);
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }
    const getPlayerCard = (address) => {
        axios.get(`/api/player-card/${address}`)
            .then(res => {
                let playerData = res.data.player;
                setPlayer(playerData);
                setPlayerPower(playerData);
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }
    const setPlayerPower = (pData) => {
        let attributes = [0, 0, 0, 0, 0];
        if (pData.collector) {
            attributes[0] += pData.collector.attack;
            attributes[1] += pData.collector.defence;
            attributes[2] += pData.collector.health;
            attributes[3] += pData.collector.speed;
            attributes[4] += pData.collector.range;
        }
        if (pData.item) {
            attributes[0] += pData.item.attack;
            attributes[1] += pData.item.defence;
            attributes[2] += pData.item.health;
            attributes[3] += pData.item.speed;
            attributes[4] += pData.item.range;
        }
        if (pData.backpack) {
            attributes[0] += pData.backpack.attack;
            attributes[1] += pData.backpack.defence;
            attributes[2] += pData.backpack.health;
            attributes[3] += pData.backpack.speed;
            attributes[4] += pData.backpack.range;
            for (let i = 0; i < pData.backpack.slots.length; i++) {
                attributes[0] += pData.backpack.slots[i].attack;
                attributes[1] += pData.backpack.slots[i].defence;
                attributes[2] += pData.backpack.slots[i].health;
                attributes[3] += pData.backpack.slots[i].speed;
                attributes[4] += pData.backpack.slots[i].range;
                if (pData.backpack.slots[i].slot_model === BACKPACK_KU) {
                    for (let j = 0; j < pData.backpack.slots[i].slots.length; j++) {
                        attributes[0] += pData.backpack.slots[i].slots[j].attack;
                        attributes[1] += pData.backpack.slots[i].slots[j].defence;
                        attributes[2] += pData.backpack.slots[i].slots[j].health;
                        attributes[3] += pData.backpack.slots[i].slots[j].speed;
                        attributes[4] += pData.backpack.slots[i].slots[j].range;
                    }
                }
            }
        }
        if (pData.ku1) {
            attributes[0] += pData.ku1.attack;
            attributes[1] += pData.ku1.defence;
            attributes[2] += pData.ku1.health;
            attributes[3] += pData.ku1.speed;
            attributes[4] += pData.ku1.range;
            for (let i = 0; i < pData.ku1.slots.length; i++) {
                attributes[0] += pData.ku1.slots[i].attack;
                attributes[1] += pData.ku1.slots[i].defence;
                attributes[2] += pData.ku1.slots[i].health;
                attributes[3] += pData.ku1.slots[i].speed;
                attributes[4] += pData.ku1.slots[i].range;
            }
        }
        if (pData.ku2) {
            attributes[0] += pData.ku2.attack;
            attributes[1] += pData.ku2.defence;
            attributes[2] += pData.ku2.health;
            attributes[3] += pData.ku2.speed;
            attributes[4] += pData.ku2.range;
            for (let i = 0; i < pData.ku2.slots.length; i++) {
                attributes[0] += pData.ku2.slots[i].attack;
                attributes[1] += pData.ku2.slots[i].defence;
                attributes[2] += pData.ku2.slots[i].health;
                attributes[3] += pData.ku2.slots[i].speed;
                attributes[4] += pData.ku2.slots[i].range;
            }
        }
        if (pData.ku3) {
            attributes[0] += pData.ku3.attack;
            attributes[1] += pData.ku3.defence;
            attributes[2] += pData.ku3.health;
            attributes[3] += pData.ku3.speed;
            attributes[4] += pData.ku3.range;
            for (let i = 0; i < pData.ku3.slots.length; i++) {
                attributes[0] += pData.ku3.slots[i].attack;
                attributes[1] += pData.ku3.slots[i].defence;
                attributes[2] += pData.ku3.slots[i].health;
                attributes[3] += pData.ku3.slots[i].speed;
                attributes[4] += pData.ku3.slots[i].range;
            }
        }
        setPlayerAttributes(attributes);
    }
    useEffect(() => {
        if (!account) return;
        getPlayerGig(account);
        getPlayerCard(account);
    }, [account]);

    const func_equipCollector = () => {
        if (!oneColector || !account || !chainId || !library) return;
        setIsEquipping(true);
        equipCollector(account, oneColector.tokenId, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been equipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsEquipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsEquipping(false); })
    }
    const func_unequipCollector = () => {
        if (!playerCollector || !account || !chainId || !library) return;
        setIsUnequipping(true);
        unequipCollector(playerCollector.tokenId, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been unequipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsUnequipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsUnequipping(false); })
    }
    const func_equipBackpack = () => {
        if (!oneBackpack || !account || !chainId || !library) return;
        setIsEquipping(true);
        equipBackpack(account, oneBackpack.tokenId, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been equipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsEquipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsEquipping(false); })
    }
    const func_unequipBackpack = () => {
        if (!playerBackpack || !account || !chainId || !library) return;
        setIsUnequipping(true);
        unequipBackpack(playerBackpack.tokenId, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been unequipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsUnequipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsUnequipping(false); })
    }
    const func_equipKu = () => {
        if (!oneKu || !account || !chainId || !library) return;
        setIsEquipping(true);
        equipKu(account, oneKu.tokenId, kuModel, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been equipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsEquipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsEquipping(false); })
    }
    const func_unequipKu = () => {
        if (!playerKu || !account || !chainId || !library) return;
        setIsUnequipping(true);
        unequipKu(playerKu.tokenId, kuModel, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been unequipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsUnequipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsUnequipping(false); })
    }
    const func_equipItem = () => {
        if (!oneItem || !account || !chainId || !library) return;
        setIsEquipping(true);
        equipItem(account, oneItem.tokenId, itemModel, itemKuId, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been equipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsEquipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsEquipping(false); })
    }
    const func_unequipItem = () => {
        if (!playerItem || !account || !chainId || !library) return;
        setIsUnequipping(true);
        console.log(playerItem.tokenId, itemModel, chainId);
        unequipItem(playerItem.tokenId, itemModel, itemKuId, chainId, library.getSigner()).then(res => {
            if (res.code) { setSuccessTitle("Your NFT has been unequipped!"); setIsSuccessModal(true); }
            else { setErrorMsg(res.msg); setIsErrorModal(true); }
            setIsUnequipping(false);
        }).catch(e => { console.log("Error: ", e.message); setIsUnequipping(false); })
    }
    return (
        <>
            <>
                <SuccessModal
                    isOpen={isSuccessModal}
                    onClose={onCloseSuccessModal}
                    title={successTitle}
                    subtitle={successSubTitle}
                />
                <ErrorModal
                    isOpen={isErrorModal}
                    onClose={onCloseErrorModal}
                    title={'Failed Activation'}
                    subtitle={errorMsg}
                />
            </>
            {/* Profile Modal */}
            {isEdit && <ModalOverlay>
                <OverlayBG onClick={closeEditProfileModal}></OverlayBG>
                <CustomOverlayContainer>
                    <CustomOverlayWrap>
                        <CustomCloseIcon src="/assets/close-icon.svg" alt="Close" onClick={closeEditProfileModal} />
                        <CustomModalHeader>Edit Profile</CustomModalHeader>
                        <CustomNameTag>
                            <CustomNameInput value={newName} onChange={e => handleNewName(e.target.value)} />
                        </CustomNameTag>
                        <CustomAvatarTag>
                            <CustomAvatarImg src={newProfilePic} alt='Profile Avatar' />
                            {isUploading ? <button>UPLOADING...</button> : <button onClick={() => uploadFile()}>UPLOAD FILE</button>}
                            <input type='file' id='profile_input_file' accept="image/*" multiple={false} onChange={handleProfilePic} />
                        </CustomAvatarTag>
                        {updating ? <CustomModalButton>UPDATING...</CustomModalButton>
                            : <CustomModalButton onClick={() => updateProfile()}>SUBMIT CHANGES</CustomModalButton>}
                    </CustomOverlayWrap>
                </CustomOverlayContainer>
            </ModalOverlay>}
            {/* Collector Modal */}
            {isCModal && <ModalOverlay>
                <OverlayBG onClick={closeCollectorModal}></OverlayBG>
                <CustomOverlayContainer>
                    <CustomOverlayWrap>
                        <CustomCloseIcon src="/assets/close-icon.svg" alt="Close" onClick={closeCollectorModal} />
                        <CustomModalHeader>COLLECTOR</CustomModalHeader>
                        <BodyWrapper>
                            {playerCollector ? <>
                                <BodyOne>
                                    <OneHeader><TextSapn>{playerCollector.name}</TextSapn></OneHeader>
                                    <OneImage>
                                        {playerCollector.assetType === "video" ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                            <source src={playerCollector.mainData} type="video/mp4" />
                                        </video> : <img src={playerCollector.mainData} alt="PlayerCollector" />}
                                    </OneImage>
                                    <OneAttributes>
                                        <OneAttributeItem>
                                            <img src={AttackBlue} alt="attack" />
                                            <span>{playerCollector.attack}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={DefenceBlue} alt="defence" />
                                            <span>{playerCollector.defence}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                            <span>{playerCollector.health}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={SpeedBlue} alt="speed" />
                                            <span>{playerCollector.speed}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={RangeBlue} alt="range" />
                                            <span>{playerCollector.range}</span>
                                        </OneAttributeItem>
                                    </OneAttributes>
                                </BodyOne>
                            </>
                                : <>
                                    {oneColector ? <>
                                        <BodyOne>
                                            <OneHeader><TextSapn>{oneColector.name}</TextSapn></OneHeader>
                                            <OneImage>
                                                {oneColector.assetType === "video" ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                    <source src={oneColector.mainData} type="video/mp4" />
                                                </video> : <img src={oneColector.mainData} alt="PlayerCollector" />}
                                            </OneImage>
                                            <OneAttributes>
                                                <OneAttributeItem>
                                                    <img src={AttackBlue} alt="attack" />
                                                    <span>{oneColector.attack}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={DefenceBlue} alt="defence" />
                                                    <span>{oneColector.defence}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                                    <span>{oneColector.health}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={SpeedBlue} alt="speed" />
                                                    <span>{oneColector.speed}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={RangeBlue} alt="range" />
                                                    <span>{oneColector.range}</span>
                                                </OneAttributeItem>
                                            </OneAttributes>
                                        </BodyOne>
                                    </>
                                        : <><div style={{ textAlign: 'center' }}><TextSapn>Please purchase One Collector</TextSapn></div></>}
                                </>}
                        </BodyWrapper>
                        <ModalFooterWrapper>
                            {playerCollector ? ((isUnequipping ? <CustomModalButton>UNEQUIPPING...</CustomModalButton>
                                : <CustomModalButton onClick={() => func_unequipCollector()}>UNEQUIP</CustomModalButton>))
                                : <>
                                    {oneColector ?
                                        (isEquipping ? <CustomModalButton>EQUIPPING...</CustomModalButton>
                                            : <CustomModalButton onClick={() => func_equipCollector()}>EQUIP</CustomModalButton>)
                                        : <CustomModalButton onClick={closeCollectorModal}>CLOSE</CustomModalButton>}
                                </>}

                        </ModalFooterWrapper>
                    </CustomOverlayWrap>
                </CustomOverlayContainer>
            </ModalOverlay>}
            {/* Backpack Modal */}
            {isBModal && <ModalOverlay>
                <OverlayBG onClick={closeBackpackModal}></OverlayBG>
                <CustomOverlayContainer>
                    <CustomOverlayWrap>
                        <CustomCloseIcon src="/assets/close-icon.svg" alt="Close" onClick={closeBackpackModal} />
                        <CustomModalHeader>BACKPACK</CustomModalHeader>
                        <BodyWrapper>
                            {playerBackpack ? <>
                                <BodyOne>
                                    <OneHeader><TextSapn>{playerBackpack.name}</TextSapn></OneHeader>
                                    <OneImage>
                                        {playerBackpack.assetType === "video" ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                            <source src={playerBackpack.mainData} type="video/mp4" />
                                        </video> : <img src={playerBackpack.mainData} alt="PlayerBackpack" />}
                                    </OneImage>
                                    <OneAttributes>
                                        <OneAttributeItem>
                                            <img src={AttackBlue} alt="attack" />
                                            <span>{playerBackpack.attack}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={DefenceBlue} alt="defence" />
                                            <span>{playerBackpack.defence}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                            <span>{playerBackpack.health}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={SpeedBlue} alt="speed" />
                                            <span>{playerBackpack.speed}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={RangeBlue} alt="range" />
                                            <span>{playerBackpack.range}</span>
                                        </OneAttributeItem>
                                    </OneAttributes>
                                </BodyOne>
                            </>
                                : <>
                                    {oneBackpack ? <>
                                        <BodyOne>
                                            <OneHeader><TextSapn>{oneBackpack.name}</TextSapn></OneHeader>
                                            <OneImage>
                                                {oneBackpack.assetType === "video" ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                    <source src={oneBackpack.mainData} type="video/mp4" />
                                                </video> : <img src={oneBackpack.mainData} alt="PlayerBackpack" />}
                                            </OneImage>
                                            <OneAttributes>
                                                <OneAttributeItem>
                                                    <img src={AttackBlue} alt="attack" />
                                                    <span>{oneBackpack.attack}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={DefenceBlue} alt="defence" />
                                                    <span>{oneBackpack.defence}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                                    <span>{oneBackpack.health}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={SpeedBlue} alt="speed" />
                                                    <span>{oneBackpack.speed}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={RangeBlue} alt="range" />
                                                    <span>{oneBackpack.range}</span>
                                                </OneAttributeItem>
                                            </OneAttributes>
                                        </BodyOne>
                                        {pBackpacks.length > 1 && <BodyArrow>
                                            <span className="prev" onClick={() => prevOne('backpack')}>&lArr;</span>
                                            <span className="dot">&middot;&middot;&middot;</span>
                                            <span className="next" onClick={() => nextOne('backpack')}>&rArr;</span>
                                        </BodyArrow>}
                                    </>
                                        : <><div style={{ textAlign: 'center' }}><TextSapn>Please purchase One Backpack</TextSapn></div></>}
                                </>}

                        </BodyWrapper>
                        <ModalFooterWrapper>
                            {playerBackpack ? ((isUnequipping ? <CustomModalButton>UNEQUIPPING...</CustomModalButton>
                                : <>
                                    <CustomModalButton onClick={() => func_unequipBackpack()}>UNEQUIP</CustomModalButton>
                                    <CustomModalButton onClick={() => openKuExtend()} style={{ marginTop: 10 }}>OPEN SLOT</CustomModalButton>
                                </>))
                                : <>
                                    {oneBackpack ?
                                        (isEquipping ? <CustomModalButton>EQUIPPING...</CustomModalButton>
                                            : <CustomModalButton onClick={() => func_equipBackpack()}>EQUIP</CustomModalButton>)
                                        : <CustomModalButton onClick={closeBackpackModal}>CLOSE</CustomModalButton>}
                                </>}
                        </ModalFooterWrapper>
                    </CustomOverlayWrap>
                </CustomOverlayContainer>
            </ModalOverlay>}
            {/* Ku Modal */}
            {isKModal && <ModalOverlay>
                <OverlayBG onClick={closeKuModal}></OverlayBG>
                <CustomOverlayContainer>
                    <CustomOverlayWrap>
                        <CustomCloseIcon src="/assets/close-icon.svg" alt="Close" onClick={closeKuModal} />
                        <CustomModalHeader>KU</CustomModalHeader>
                        <BodyWrapper>
                            {playerKu ?
                                <>
                                    <BodyOne>
                                        <OneHeader><TextSapn>{playerKu.name}</TextSapn></OneHeader>
                                        <OneImage>
                                            {playerKu.assetType === "video" ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={playerKu.mainData} type="video/mp4" />
                                            </video> : <img src={playerKu.mainData} alt="PlayerKu" />}
                                        </OneImage>
                                        <OneAttributes>
                                            <OneAttributeItem>
                                                <img src={AttackBlue} alt="attack" />
                                                <span>{playerKu.attack}</span>
                                            </OneAttributeItem>
                                            <OneAttributeItem>
                                                <img src={DefenceBlue} alt="defence" />
                                                <span>{playerKu.defence}</span>
                                            </OneAttributeItem>
                                            <OneAttributeItem>
                                                <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                                <span>{playerKu.health}</span>
                                            </OneAttributeItem>
                                            <OneAttributeItem>
                                                <img src={SpeedBlue} alt="speed" />
                                                <span>{playerKu.speed}</span>
                                            </OneAttributeItem>
                                            <OneAttributeItem>
                                                <img src={RangeBlue} alt="range" />
                                                <span>{playerKu.range}</span>
                                            </OneAttributeItem>
                                        </OneAttributes>
                                    </BodyOne>
                                </>
                                : <>
                                    {oneKu ? <>
                                        <BodyOne>
                                            <OneHeader><TextSapn>{oneKu.name}</TextSapn></OneHeader>
                                            <OneImage>
                                                {oneKu.assetType === "video" ? <video id="ku-video-source" autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                    <source src={oneKu.mainData} type="video/mp4" />
                                                </video> : <img src={oneKu.mainData} alt="PlayerKu" />}
                                            </OneImage>
                                            <OneAttributes>
                                                <OneAttributeItem>
                                                    <img src={AttackBlue} alt="attack" />
                                                    <span>{oneKu.attack}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={DefenceBlue} alt="defence" />
                                                    <span>{oneKu.defence}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                                    <span>{oneKu.health}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={SpeedBlue} alt="speed" />
                                                    <span>{oneKu.speed}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={RangeBlue} alt="range" />
                                                    <span>{oneKu.range}</span>
                                                </OneAttributeItem>
                                            </OneAttributes>
                                        </BodyOne>
                                        {pKus.length > 1 && <BodyArrow>
                                            <span className="prev" onClick={() => prevOne(PLAYER_KU)}>&lArr;</span>
                                            <span className="dot">&middot;&middot;&middot;</span>
                                            <span className="next" onClick={() => nextOne(PLAYER_KU)}>&rArr;</span>
                                        </BodyArrow>}
                                    </>
                                        : <><div style={{ textAlign: 'center' }}><TextSapn>Please purchase One Ku</TextSapn></div></>}
                                </>}
                        </BodyWrapper>
                        <ModalFooterWrapper>
                            {playerKu ? (isUnequipping ? <CustomModalButton>UNEQUIPPING...</CustomModalButton>
                                : <CustomModalButton onClick={() => func_unequipKu()}>UNEQUIP</CustomModalButton>)
                                : <>
                                    {oneKu ?
                                        (isEquipping ? <CustomModalButton>EQUIPPING...</CustomModalButton>
                                            : <CustomModalButton onClick={() => func_equipKu()}>EQUIP</CustomModalButton>)
                                        : <CustomModalButton onClick={closeKuModal}>CLOSE</CustomModalButton>}
                                </>}
                        </ModalFooterWrapper>
                    </CustomOverlayWrap>
                </CustomOverlayContainer>
            </ModalOverlay>}
            {/* Item Modal */}
            {isIModal && <ModalOverlay>
                <OverlayBG onClick={closeItemModal}></OverlayBG>
                <CustomOverlayContainer>
                    <CustomOverlayWrap>
                        <CustomCloseIcon src="/assets/close-icon.svg" alt="Close" onClick={closeItemModal} />
                        <CustomModalHeader>ITEM</CustomModalHeader>
                        <BodyWrapper>
                            {playerItem ? <>
                                <BodyOne>
                                    <OneHeader><TextSapn>{playerItem.name}</TextSapn></OneHeader>
                                    <OneImage>
                                        {playerItem.assetType === "video" ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                            <source src={playerItem.mainData} type="video/mp4" />
                                        </video> : <img src={playerItem.mainData} alt="PlayerItem" />}
                                    </OneImage>
                                    <OneAttributes>
                                        <OneAttributeItem>
                                            <img src={AttackBlue} alt="attack" />
                                            <span>{playerItem.attack}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={DefenceBlue} alt="defence" />
                                            <span>{playerItem.defence}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                            <span>{playerItem.health}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={SpeedBlue} alt="speed" />
                                            <span>{playerItem.speed}</span>
                                        </OneAttributeItem>
                                        <OneAttributeItem>
                                            <img src={RangeBlue} alt="range" />
                                            <span>{playerItem.range}</span>
                                        </OneAttributeItem>
                                    </OneAttributes>
                                </BodyOne>
                            </>
                                : <>
                                    {oneItem ? <>
                                        <BodyOne>
                                            <OneHeader><TextSapn>{oneItem.name}</TextSapn></OneHeader>
                                            <OneImage>
                                                {oneItem.assetType === "video" ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                    <source src={oneItem.mainData} type="video/mp4" />
                                                </video> : <img src={oneItem.mainData} alt="PlayerItem" />}
                                            </OneImage>
                                            <OneAttributes>
                                                <OneAttributeItem>
                                                    <img src={AttackBlue} alt="attack" />
                                                    <span>{oneItem.attack}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={DefenceBlue} alt="defence" />
                                                    <span>{oneItem.defence}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={HealthBlue} alt="health" style={{ padding: 0 }} />
                                                    <span>{oneItem.health}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={SpeedBlue} alt="speed" />
                                                    <span>{oneItem.speed}</span>
                                                </OneAttributeItem>
                                                <OneAttributeItem>
                                                    <img src={RangeBlue} alt="range" />
                                                    <span>{oneItem.range}</span>
                                                </OneAttributeItem>
                                            </OneAttributes>
                                        </BodyOne>
                                        {pItems.length > 1 && <BodyArrow>
                                            <span className="prev" onClick={() => prevOne(PLAYER_ITEM)}>&lArr;</span>
                                            <span className="dot">&middot;&middot;&middot;</span>
                                            <span className="next" onClick={() => nextOne(PLAYER_ITEM)}>&rArr;</span>
                                        </BodyArrow>}
                                    </>
                                        : <><div style={{ textAlign: 'center' }}><TextSapn>Please purchase One Item</TextSapn></div></>}
                                </>}

                        </BodyWrapper>
                        <ModalFooterWrapper>
                            {playerItem ? (isUnequipping ? <CustomModalButton>UNEQUIPPING...</CustomModalButton>
                                : <CustomModalButton onClick={() => func_unequipItem()}>UNEQUIP</CustomModalButton>)
                                : <>
                                    {oneItem ?
                                        (isEquipping ? <CustomModalButton>EQUIPPING...</CustomModalButton>
                                            : <CustomModalButton onClick={() => func_equipItem()}>EQUIP</CustomModalButton>)
                                        : <CustomModalButton onClick={closeItemModal}>CLOSE</CustomModalButton>}
                                </>}
                        </ModalFooterWrapper>
                    </CustomOverlayWrap>
                </CustomOverlayContainer>
            </ModalOverlay>}

            {/* <BridgeButton name={"BRIDGE"}></BridgeButton> */}
            <div style={{ height: 70 }}></div>
            <CollapseProfile>
                <ProfileDivBorder>
                    <ThreeBoxDiv><ThreeBox></ThreeBox><ThreeBox></ThreeBox><ThreeBox></ThreeBox></ThreeBoxDiv>
                    {!kuExtend && <BackDiv></BackDiv>}
                    <ProfileDiv>
                        <Section1>
                            <DivBig>
                                <BigDash></BigDash>
                                <CollectorImage onClick={openCollectorModal}>
                                    {player && player.collector && (player.collector.assetType === "video"
                                        ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                            <source src={player.collector.mainData} type="video/mp4" />
                                        </video>
                                        : <img src={player.collector.mainData} alt="" />)}
                                </CollectorImage>
                            </DivBig>
                            <CommonDiv>
                                <div style={{ textAlign: 'center' }}><TextSapn style={{ fontSize: 12, fontWeight: 'bold', wordBreak: 'break-all' }}>
                                    {shorter1(username)}
                                </TextSapn></div>
                                <CommonProfileDiv>
                                    <CommonImg style={{ backgroundImage: `url(${profilePic})` }} />
                                    <CommonTag onClick={() => openEditProfileModal()}>EDIT</CommonTag>
                                </CommonProfileDiv>
                                <TwoDiv>
                                    <TwoDivImg onClick={() => openItemModal(PLAYER_ITEM, NON_VALUE)}>
                                        {player && player.item && (player.item.assetType === "video"
                                            ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={player.item.mainData} type="video/mp4" />
                                            </video>
                                            : <img src={player.item.mainData} alt="" />)}
                                    </TwoDivImg>
                                    <TwoDivImg onClick={() => openBackpackModal()}>
                                        {player && player.backpack && (player.backpack.assetType === "video"
                                            ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={player.backpack.mainData} type="video/mp4" />
                                            </video>
                                            : <img src={player.backpack.mainData} alt="" />)}
                                    </TwoDivImg>
                                </TwoDiv>
                            </CommonDiv>
                        </Section1>
                        <Section2>
                            <ThreeDiv>
                                <ThreeDivCard style={{ margin: '0 10px' }}>
                                    <SmallDash></SmallDash>
                                    <CenterDiv onClick={() => openKuModal(PLAYER_KU, 1)}>
                                        {player && player.ku1 && (player.ku1.assetType === "video"
                                            ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={player.ku1.mainData} type="video/mp4" />
                                            </video>
                                            : <img src={player.ku1.mainData} alt="" />)}
                                    </CenterDiv>
                                    <TwoDivs>
                                        {(player && player.ku1) ? <>
                                            <TwoDivsImg onClick={() => openItemModal(KU_ITEM, player.ku1.tokenId, 0)}>
                                                {player.ku1.slots.length > 0 && (player.ku1.slots[0].assetType === "video"
                                                    ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                        <source src={player.ku1.slots[0].mainData} type="video/mp4" />
                                                    </video>
                                                    : <img src={player.ku1.slots[0].mainData} alt="" />)}
                                            </TwoDivsImg>
                                            <TwoDivsImg onClick={() => openItemModal(KU_ITEM, player.ku1.tokenId, 1)}>
                                                {player.ku1.slots.length > 1 && (player.ku1.slots[1].assetType === "video"
                                                    ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                        <source src={player.ku1.slots[1].mainData} type="video/mp4" />
                                                    </video>
                                                    : <img src={player.ku1.slots[1].mainData} alt="" />)}
                                            </TwoDivsImg>
                                        </> : <>
                                            <TwoDivsImg></TwoDivsImg>
                                            <TwoDivsImg></TwoDivsImg>
                                        </>}
                                    </TwoDivs>
                                </ThreeDivCard>
                                <ThreeDivCard style={{ margin: '0 10px' }}>
                                    <SmallDash></SmallDash>
                                    <CenterDiv onClick={() => openKuModal(PLAYER_KU, 2)}>
                                        {player && player.ku2 && (player.ku2.assetType === "video"
                                            ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={player.ku2.mainData} type="video/mp4" />
                                            </video>
                                            : <img src={player.ku2.mainData} alt="" />)}
                                    </CenterDiv>
                                    <TwoDivs>
                                        {(player && player.ku2) ? <>
                                            <TwoDivsImg onClick={() => openItemModal(KU_ITEM, player.ku2.tokenId, 0)}>
                                                {player.ku2.slots.length > 0 && (player.ku2.slots[0].assetType === "video"
                                                    ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                        <source src={player.ku2.slots[0].mainData} type="video/mp4" />
                                                    </video>
                                                    : <img src={player.ku2.slots[0].mainData} alt="" />)}
                                            </TwoDivsImg>
                                            <TwoDivsImg onClick={() => openItemModal(KU_ITEM, player.ku2.tokenId, 1)}>
                                                {player.ku2.slots.length > 1 && (player.ku2.slots[1].assetType === "video"
                                                    ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                        <source src={player.ku2.slots[1].mainData} type="video/mp4" />
                                                    </video>
                                                    : <img src={player.ku2.slots[1].mainData} alt="" />)}
                                            </TwoDivsImg>
                                        </> : <>
                                            <TwoDivsImg></TwoDivsImg>
                                            <TwoDivsImg></TwoDivsImg>
                                        </>}
                                    </TwoDivs>
                                </ThreeDivCard>
                                <ThreeDivCard style={{ margin: '0 10px' }}>
                                    <SmallDash></SmallDash>
                                    <CenterDiv onClick={() => openKuModal(PLAYER_KU, 3)}>
                                        {player && player.ku3 && (player.ku3.assetType === "video"
                                            ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={player.ku3.mainData} type="video/mp4" />
                                            </video>
                                            : <img src={player.ku3.mainData} alt="" />)}
                                    </CenterDiv>
                                    <TwoDivs>
                                        {(player && player.ku3) ? <>
                                            <TwoDivsImg onClick={() => openItemModal(KU_ITEM, player.ku3.tokenId, 0)}>
                                                {player.ku3.slots.length > 0 && (player.ku3.slots[0].assetType === "video"
                                                    ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                        <source src={player.ku3.slots[0].mainData} type="video/mp4" />
                                                    </video>
                                                    : <img src={player.ku3.slots[0].mainData} alt="" />)}
                                            </TwoDivsImg>
                                            <TwoDivsImg onClick={() => openItemModal(KU_ITEM, player.ku3.tokenId, 1)}>
                                                {player.ku3.slots.length > 1 && (player.ku3.slots[1].assetType === "video"
                                                    ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                        <source src={player.ku3.slots[1].mainData} type="video/mp4" />
                                                    </video>
                                                    : <img src={player.ku3.slots[1].mainData} alt="" />)}
                                            </TwoDivsImg>
                                        </> : <>
                                            <TwoDivsImg></TwoDivsImg>
                                            <TwoDivsImg></TwoDivsImg>
                                        </>}
                                    </TwoDivs>
                                </ThreeDivCard>
                            </ThreeDiv>
                        </Section2>
                        <Section3>
                            <IconsDiv>
                                <IconBG><Icon src='/assets/attack-grey.svg' alt="ATTACK" /><TextDiv>{playerAttributes[0]}</TextDiv></IconBG>
                                <IconBG><Icon src='/assets/defence-grey.svg' alt="DEFENCE" /><TextDiv>{playerAttributes[1]}</TextDiv></IconBG>
                                <IconBG><Icon src='assets/health-grey.svg' style={{ width: 35, height: 35 }} alt="HEALTH" /><TextDiv>{playerAttributes[2]}</TextDiv></IconBG>
                                <IconBG><Icon src='/assets/speed-grey.svg' alt="SPEED" /><TextDiv>{playerAttributes[3]}</TextDiv></IconBG>
                                <IconBG><Icon src='/assets/range-grey.svg' alt="RANGE" /><TextDiv>{playerAttributes[4]}</TextDiv></IconBG>
                            </IconsDiv>
                        </Section3>
                    </ProfileDiv>
                </ProfileDivBorder>
                {kuExtend && <SideProfileMenu>
                    <SideProfileMenuBorder>
                        <BackpackSlotWrapper>
                            {player?.backpack?.slots.map((slotOne, index) => ((slotOne.slot_model === BACKPACK_KU) ?
                                <ThreeDivCard key={index}>
                                    <CenterDiv onClick={() => openKuModal(BACKPACK_KU, slotOne.tokenId)}>
                                        {slotOne.assetType === "video"
                                            ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={slotOne.mainData} type="video/mp4" />
                                            </video>
                                            : <img src={slotOne.mainData} alt="" />}
                                    </CenterDiv>
                                    <TwoDivs>
                                        <TwoDivsImg onClick={() => openItemModal(KU_ITEM, slotOne.tokenId, 0)}>
                                            {slotOne.slots.length > 0 && (slotOne.slots[0].assetType === "video"
                                                ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                    <source src={slotOne.slots[0].mainData} type="video/mp4" />
                                                </video>
                                                : <img src={slotOne.slots[0].mainData} alt="" />)}
                                        </TwoDivsImg>
                                        <TwoDivsImg onClick={() => openItemModal(KU_ITEM, slotOne.tokenId, 1)}>
                                            {slotOne.slots.length > 1 && (slotOne.slots[1].assetType === "video"
                                                ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                    <source src={slotOne.slots[1].mainData} type="video/mp4" />
                                                </video>
                                                : <img src={slotOne.slots[1].mainData} alt="" />)}
                                        </TwoDivsImg>
                                    </TwoDivs>
                                </ThreeDivCard>
                                : (slotOne.slot_model === BACKPACK_ITEM ?
                                    <TwoDivImg onClick={() => openItemModal(BACKPACK_ITEM, NON_VALUE, slotOne.tokenId)} key={index}>
                                        {slotOne.assetType === "video"
                                            ? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
                                                <source src={slotOne.mainData} type="video/mp4" />
                                            </video>
                                            : <img src={slotOne.mainData} alt="" />}
                                    </TwoDivImg>
                                    : null)))}

                            {player?.backpack?.slots.length >= 12 ? null : <>
                                <TwoDivImg style={{ display: 'flex', flexDirection: 'column' }} onClick={() => openKuModal(BACKPACK_KU, NON_VALUE)}>
                                    <img src="/assets/plus-icon.svg" style={{ width: '60%', height: '60%', padding: '10%' }} alt="" />
                                    <TextSapn>KU</TextSapn>
                                </TwoDivImg>
                                <TwoDivImg style={{ display: 'flex', flexDirection: 'column' }} onClick={() => openItemModal(BACKPACK_ITEM, NON_VALUE, NON_VALUE)}>
                                    <img src="/assets/plus-icon.svg" style={{ width: '60%', height: '60%', padding: '10%' }} alt="" />
                                    <TextSapn>ITEM</TextSapn>
                                </TwoDivImg>
                            </>}
                        </BackpackSlotWrapper>
                        <div style={{ width: '100%', paddingTop: 10 }}>
                            <CustomModalButton onClick={() => closeKuExtend()}>CLOSE SLOT</CustomModalButton>
                        </div>
                    </SideProfileMenuBorder>
                </SideProfileMenu>}
            </CollapseProfile>
        </>
    )
}