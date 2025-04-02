import React, { useState, useEffect } from "react";
import axios from "axios";
import { CollectorItems } from "../../UI_components/CollectorItem";
import { TextSapn } from "../../styles/Common";
import {
	MarketPlaceCollectorItemGrid, MarketPlaceMintContainer, MarketPlaceMpHeaderDiv,
	FilterContainer, FilterItem
} from './MarketplaceStyles';
import { testOwnedItems, testSaleItems } from "../Profile/data";

export const MarketPlaceComponent = (props) => {
	const [items, setItems] = useState([...testOwnedItems, ...testSaleItems]);
	const [sortType, setSortType] = useState('list'); // price, rarity, collection
	let axiosFlag = false;
	// const fetchItem = (collection) => {
	// 	if (!collection || axiosFlag) return;
	// 	axiosFlag = true;
	// 	let page = 1;
	// 	axios.get(`/api/item?collection=${collection}&saleType=fixed&pageLimit=100&sortBy=timestamp&sortDir=asc&page=${page}`)
	// 		.then(res => {
	// 			axiosFlag = false;
	// 			if (!res.data.items.length) {
	// 				return;
	// 			}
	// 			if (page === 1) setItems(res.data.items);
	// 			else setItems(items.concat(res.data.items));
	// 		}).catch(e => {
	// 			axiosFlag = false;
	// 			console.log(e);
	// 			setItems([]);
	// 		})
	// }
	// useEffect(() => {
	// 	fetchItem(props.collection);
	// }, [props.collection]);
	const sortByType = (type) => {
		setSortType(type);
		if (!items.length) return;
		if (type === 'price') {
			setItems(items.sort((a, b) => a.pair.price - b.pair.price));
		}
		if (type === 'rarity') {
			setItems(items.sort((a, b) => (a.attack + a.defence + a.health + a.speed + a.range) - (b.attack + b.defence + b.health + b.speed + b.range)))
		}
		if (type === 'collection') {
			setItems(items.sort((a, b) => {
				if (a.name < b.name)
					return -1;
				if (a.name > b.name)
					return 1;
				return 0;
			}));
		}
		if (type === 'list') {
			setItems(items.sort((a, b) => a.timestamp - b.timestamp));
		}
	}
	return (
		<MarketPlaceMintContainer>
			<MarketPlaceMpHeaderDiv>
				<FilterContainer>
					{/* <div><TextSapn style={{ fontWeight: 900, fontSize: '16px', lineHeight: '19px', letterSpacing: '4px' }}>SORT BY</TextSapn></div> */}
					<FilterItem className={sortType === 'price' ? 'active' : ''} onClick={() => sortByType('price')}><span>PRICE</span></FilterItem>
					<FilterItem className={sortType === 'list' ? 'active' : ''} onClick={() => sortByType('list')}><span>JUST LISTED</span></FilterItem>
					<FilterItem className={sortType === 'rarity' ? 'active' : ''} onClick={() => sortByType('rarity')}><span>RARITY</span></FilterItem>
					{/* <FilterItem className={sortType === 'collection' ? 'active' : ''} onClick={() => sortByType('collection')}><span>COLLECTION</span></FilterItem> */}
				</FilterContainer>
			</MarketPlaceMpHeaderDiv>
			<MarketPlaceCollectorItemGrid>
				<CollectorItems items={items} {...props} />
			</MarketPlaceCollectorItemGrid>
		</MarketPlaceMintContainer>
	);
};
