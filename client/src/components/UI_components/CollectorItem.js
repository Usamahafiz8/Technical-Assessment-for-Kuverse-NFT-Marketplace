import React, { useEffect, useState } from "react";
import { AttackBlue, DefenceBlue, HealthBlue, SpeedBlue, RangeBlue } from '../constants';
import {
	CollectorItemContainer, CollectorItemDiv, CollectorItemH3, CollectorItemImage, CollectorItemTag, CollectorP, AttributeItem, AttributeTag
} from "../styles/CollectorItemStyles";
import { OverlayModal } from "./OverlayComponents";

export const CollectorItem = (props) => {
	const item = props.item;
	const [toggle, setToggle] = useState(false);

	const openOverlay = () => {
		setToggle(true);
	}
	const closeOverlay = () => {
		setToggle(false);
	}
	if (!item) return;
	return (
		<CollectorItemContainer>
			<OverlayModal
				{...props}
				item={item}
				isOpen={toggle}
				closeOverlay={closeOverlay}
			/>
			<CollectorItemDiv onClick={openOverlay}>
				<CollectorItemH3>{item.name}</CollectorItemH3>
				<CollectorItemImage>
					{item.assetType === "video"
						? <video autoPlay="autoplay" loop={true} style={{ width: '100%', height: '100%', borderRadius: 25 }}>
							<source src={item.mainData} type="video/mp4" />
						</video>
						: <img src={item.mainData} style={{ height: '100%' }} alt="Inventory" />}
					<CollectorItemTag>COMMON</CollectorItemTag>
				</CollectorItemImage>
				<AttributeTag>
					<AttributeItem>
						<img src={AttackBlue} alt="attack" />
						<span>{item.attack}</span>
					</AttributeItem>
					<AttributeItem>
						<img src={DefenceBlue} alt="defence" />
						<span>{item.defence}</span>
					</AttributeItem>
					<AttributeItem>
						<img src={HealthBlue} alt="health" style={{ padding: 0 }} />
						<span>{item.health}</span>
					</AttributeItem>
					<AttributeItem>
						<img src={SpeedBlue} alt="speed" />
						<span>{item.speed}</span>
					</AttributeItem>
					<AttributeItem>
						<img src={RangeBlue} alt="range" />
						<span>{item.range}</span>
					</AttributeItem>
				</AttributeTag>
				<CollectorP>{item.pair.price} kORE</CollectorP>
			</CollectorItemDiv>
		</CollectorItemContainer>
	);
};

export const CollectorItems = (props) => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		if (props?.items?.length) setItems(props.items.map((item => {
			return {
				...item,
				mainData: item.mainData.replace("gateway.pinata.cloud", "kuverse.mypinata.cloud")
			}
		})));
	}, [props]);
	return (
		<>
			{items.map((item, index) => (
				<CollectorItem key={index} item={item} {...props} />
			))}
		</>
	);
};

