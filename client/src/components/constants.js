import { getContractInfo } from '../utils/index';

export const collectorAvatar = "/assets/m_male.svg";
export const kuAvatar = "/assets/m_ku.svg";
export const backpackAvatar = "/assets/m_classic.svg";
export const itemAvatar = "/assets/m_kuberry.svg";
export const RangeGrey = "/assets/range-grey.svg";
export const AttackGrey = "/assets/attack-grey.svg";
export const DefenceGrey = "/assets/defence-grey.svg";
export const SpeedGrey = "/assets/speed-grey.svg";
export const HealthGrey = "/assets/health-grey.svg";
export const RangeBlue = "/assets/range-blue.svg";
export const AttackBlue = "/assets/attack-blue.svg";
export const DefenceBlue = "/assets/defence-blue.svg";
export const SpeedBlue = "/assets/speed-blue.svg";
export const HealthBlue = "/assets/health-blue.svg";
export function collectionInfo(address) {
    const collectorNFT = getContractInfo("CollectorNFT");
    const kuNFT = getContractInfo("KuNFT");
    const backpackNFT = getContractInfo("BackpackNFT");
    const itemNFT = getContractInfo("ItemNFT");
    if (address.toLowerCase() === collectorNFT.address.toLowerCase())
        return {
            address: address.toLowerCase(),
            name: "CollectorNFT",
            avatar: collectorAvatar,
            url: '/collector'
        }
    else if (address.toLowerCase() === kuNFT.address.toLowerCase())
        return {
            address: address.toLowerCase(),
            name: "KuNFT",
            avatar: kuAvatar,
            url: '/ku'
        }
    else if (address.toLowerCase() === backpackNFT.address.toLowerCase())
        return {
            address: address.toLowerCase(),
            name: "BackpackNFT",
            avatar: backpackAvatar,
            url: '/backpack'
        }
    else if (address.toLowerCase() === itemNFT.address.toLowerCase())
        return {
            address: address.toLowerCase(),
            name: "ItemNFT",
            avatar: itemAvatar,
            url: '/items'
        }
}

export const NON_VALUE = 1000000000; // undefined token id
export const PLAYER_KU = 1;
export const BACKPACK_KU = 2;
export const PLAYER_ITEM = 3;
export const BACKPACK_ITEM = 4;
export const KU_ITEM = 5;
// Ku Rarities
export const RARITY_KU = {
    'BaseType': {
        name: ['Normal Black', 'Glass Orange', 'Normal Pink', 'Normal Blue', 'Glass Blue', 'Shiny Purple', 'Metal Red', 'Metal Green',
            'Glass Clear', 'Normal Grey', 'Normal Brown', 'Wood', 'Metal Blue', 'Normal Light Grey', 'Shiny Red', 'Snake', 'Normal Red',
            'Real Orange', 'Normal Purple', 'Shiny White', 'Shiny Green', 'Shiny Black', 'Glass Red', 'Normal Green', 'Shiny Blue', 'Bronze',
            'Metal Black', 'Metal Pink', 'Glass Yellow', 'Normal Yellow', 'Shiny Pink', 'Metal Camo', 'Glass Green', 'Rock White', 'Shiny Brown',
            'Camo', 'Gold', 'Glass Black', 'Silver', 'Shiny Yellow', 'Dragon', 'Normal White', 'Dino', 'Rock Pink', 'Glass Purple', 'Ultra Rare',
            'Rock Black', 'Rock Green', 'Linux', 'Rock Yellow', 'Metal Purple', 'Magma', 'Metal Rare', 'Hologram', 'Normal Dark Grey'],
        value: [4.62, 1.62, 2.47, 1.25, 2.05, 1.88, 2.17, 1.95, 1.43, 3.2, 3.17, 2.0, 1.7, 2.62, 2.17, 0.82, 2.72, 2.82, 2.45, 1.88, 2.38, 0.73,
            2.2, 2.57, 2.65, 1.52, 3.18, 1.77, 2.28, 2.25, 1.88, 1.35, 1.53, 1.45, 1.1, 1.28, 1.22, 3.05, 1.97, 2.3, 0.67, 1.13, 0.85, 1.03, 1.55,
            0.58, 1.75, 1.53, 1.2, 1.37, 2.22, 1.13, 0.55, 0.78, 0.02]
    },
    'EyeColor': {
        name: ['Red', 'Yellow', 'Dark', 'Green', 'Blue', 'Light', 'Brown', 'Pink', 'Rare', 'Purple'],
        value: [9.58, 9.12, 6.4, 13.02, 18.78, 6.1, 27.7, 6.37, 2.92, 0.02]
    },
    'BodyWear': {
        name: ['No BodyWear', 'Ku Verse Hoodie', 'Moonbeam Hoodie', 'Kilt Hoodie', 'Polkadot Hoodie', 'Lucky Bib', 'Ancient Shirt', 'Baby Ku Bib',
            'Ghostbusters Backpack', 'Toga', 'Tank Top', 'Red Turtle Shell', 'Lion Mane', 'Lucky Ku Bib'],
        value: [41.97, 5.45, 15.0, 7.82, 11.7, 1.33, 3.45, 3.38, 2.18, 2.22, 2.45, 2.57, 0.47, 0.02]
    },
    'HeadWear': {
        name: ['Touque Brown', 'Bear ears', 'No HeadWear', 'Rice Hat', 'Halo White', 'Polkadot Music Player Blue', 'Polkadot Music Player Black',
            'Camo Headband', 'Yarmulkes', 'Polkadot Music Player Pink', 'Space Helmet', 'Bull Horns', 'Polkadot Music Player White', 'Touque  Black',
            'Kilt Baseball Cap', 'Fedora', 'Crown', 'Top Hat', 'Halo Antimatter', 'Raresama Baseball Cap', 'GM Baseball Cap', 'Pikachu', 'Touque Blue',
            'Polkadot Baseball Cap', 'Dealers Visor', 'Touque White', 'Down Under Hat', 'Santas Hat', 'Party Hat', 'Touque Black', 'No headWear', 'Halo Rainbow'],
        value: [4.47, 1.05, 25.73, 2.07, 1.78, 6.93, 2.52, 2.35, 1.27, 9.42, 2.28, 0.78, 8.97, 3.32, 2.47, 1.28, 1.6, 1.17, 1.43, 2.88, 5.73, 1.1, 0.98,
            2.62, 0.9, 2.08, 0.88, 0.75, 0.93, 0.17, 0.02, 0.07]
    },
    'FaceWear': {
        name: ['No FaceWear', 'Sunglasses Black', 'Sunglasses White', 'Batman Mask', 'Robber Mask Beige', 'Robber Mask Green', 'Medical Mask',
            'Robber Mask Rainbow', 'Cyclopse Shades', 'Sunglasses Pink', 'Jason Mask', 'Cyborg Device', 'Jaon Mask'],
        value: [43.58, 14.88, 6.07, 3.0, 5.2, 6.02, 1.82, 3.62, 4.48, 8.92, 0.73, 1.67, 0.02]
    },
    'NeckWear': {
        name: ['No NeckWear', 'Sporran Dark', 'Kanaria Egg', 'Bullet Sash', 'Sporran Light', 'Tie', 'Bowtie', 'HAHA Tie', 'Banana', 'Freemason Chain',
            'Dragon Ball', 'Chain', 'Ape Chain', 'Priest Collar', 'Stethoscope', 'No Neckwear', 'Sprran Dark', 'Lightsaber', 'No NeckWare'],
        value: [54.75, 9.08, 3.0, 1.93, 14.08, 3.02, 1.42, 1.1, 3.33, 1.6, 1.83, 1.38, 0.87, 1.43, 1.1, 0.02, 0.02, 0.02, 0.02]
    },
    'WingWear': {
        name: ['Bandaid', 'Polkadot Tattoo', 'No WingWear', 'Lightsaber', 'Expect Chaos Tattoo', 'Wing Ring', 'Lost&Found Tag', 'Infinity Wing'],
        value: [1.63, 5.68, 75.25, 2.42, 5.18, 7.13, 2.38, 0.32]
    },
}