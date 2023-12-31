import React, { FC, Fragment, MouseEventHandler, ReactElement, memo, useCallback, useMemo } from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonList,
	IonPage,
	IonTitle,
	IonToggle,
	IonToolbar
} from '@ionic/react';
import { ellipsisVertical, settingsSharp, trashOutline } from 'ionicons/icons';
import { useWindowHeight } from '@react-hook/window-size/throttled';
import { VariableSizeList, areEqual } from 'react-window';
import memoizeOne, { MemoizedFn } from 'memoize-one';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FaveInfo, FavoritesObject, favoriteNames, removeFavorite, toggleSeparate, toggleSort } from '../store/generalSettingsSlice';
import './Favorites.css';
import { AppDispatch } from '../store/store';

interface PropsIndividual {
	faves: FaveInfo[]
	reverseSort: boolean
	title: string
	prop: keyof FavoritesObject
}
interface PropsItem {
	content: ReactElement
	prop: keyof FavoritesObject
	text: string
	time: number
}
type AllFavesInfo = [
	string, //name of generator
	keyof FavoritesObject, //property
	string, //idea
	number //timestamp
];
interface AllFavesData {
	faves: AllFavesInfo[]
	removeFunc: Function
}
interface AllFavesRenderArg {
	index: number
	style: {
		[key: string]: any
	}
	data: AllFavesData
}

type IndividualFavesInfo = [
	number, //generator indicator
	string, //idea
	number, //timestamp
];
interface IndividualFavesData {
	faves: (IndividualFavesInfo | string)[]
	removeFunc: Function
}
interface IndividualFavesRenderArg {
	index: number
	style: {
		[key: string]: any
	}
	data: IndividualFavesData
}

const FaveOLD: FC<PropsItem> = (props) => {
	const { content, prop, text, time } = props;
	const dispatch = useAppDispatch();
	const removeFunc = useCallback(() => dispatch(removeFavorite([prop, text, time])), [prop, text, time]);
	return (
		<IonItemSliding>
			<IonItem className="favorite">
				<div className="content">
					{content}
					<IonIcon icon={ellipsisVertical} className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				<IonItemOption color="danger" onClick={removeFunc}>
					<IonIcon slot="icon-only" icon={trashOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};

const FavesOLD: FC<PropsIndividual> = (props) => {
	const { faves, reverseSort, title, prop } = props;
	const sorted = reverseSort ? faves.slice().reverse() : faves;
	return (
		<>
			<IonItemDivider>{title}</IonItemDivider>
			{sorted.map((fave, i) => {
				const [text, time] = fave;
				const date = (new Date(time)).toLocaleDateString();
				return (
					<FaveOLD
						key={`${title}-${text}-${i}`}
						prop={prop}
						text={text}
						time={time}
						content={
							<div className="verticalContent">
								<div className="text">{text}</div>
								<div className="date">{date}</div>
							</div>
						}
					/>
				);
			})}
		</>
	);
};

const maker = memoizeOne(
	(
		favorites: FavoritesObject,
		reverseSort: boolean,
		removeFunc: Function
	): IndividualFavesData => {
		const faves: (IndividualFavesInfo | string)[] = [];
		favoriteNames.forEach((pair, indexOfFavoriteInfo) => {
			const [group, prop] = pair;
			const ideas = [...favorites[prop]];
			reverseSort && ideas.reverse();
			faves.push(
				group,
				...ideas.map(
					([text, time]) => ([indexOfFavoriteInfo, text, time] as IndividualFavesInfo)
				)
			);
		});
		return {
			faves,
			removeFunc
		};
	}
);
const makerAll = memoizeOne(
	(
		favorites: FavoritesObject,
		reverseSort: boolean,
		removeFunc: Function
	): AllFavesData => {
		const sorter = (a: AllFavesInfo, b: AllFavesInfo) => a[3] - b[3];
		const reverseSorter = (a: AllFavesInfo, b: AllFavesInfo) => b[3] - a[3];
		const faves: AllFavesInfo[] = [];
		favoriteNames.forEach(([group, prop]) => {
			faves.push(
				...favorites[prop].map(
					([text, time]) => ([group, prop, text, time] as AllFavesInfo)
				)
			);
		});
		faves.sort(reverseSort ? reverseSorter : sorter);
		return {
			faves,
			removeFunc
		};
	}
);

const RenderAllFaves = memo(({index, style, data}: AllFavesRenderArg) => {
	const { faves, removeFunc } = data;
	const [group, prop, text, time] = faves[index];
	const date = (new Date(time)).toLocaleDateString();
	return (
		<IonItemSliding style={style}>
			<IonItem className="favorite">
				<div className="content">
					<div className="horizontalContent">
						<div className="group">{group}</div>
						<div className="text">{text}</div>
						<div className="date">{date}</div>
					</div>
					<IonIcon icon={ellipsisVertical} className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				<IonItemOption color="danger" onClick={() => removeFunc(prop, text, time)}>
					<IonIcon slot="icon-only" icon={trashOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
}, areEqual);
const RenderIndividualFaves = memo(({index, style, data}: IndividualFavesRenderArg) => {
	const { faves, removeFunc } = data;
	const target = faves[index];
	if(typeof target === "string") {
		return <IonItemDivider>{target}</IonItemDivider>;
	}
	const [indexOfFavoriteInfo, text, time] = target;
	const prop = favoriteNames[indexOfFavoriteInfo][1];
	const date = (new Date(time)).toLocaleDateString();
	return (
		<IonItemSliding style={style}>
			<IonItem className="favorite">
				<div className="content">
					<div className="verticalContent">
						<div className="text">{text}</div>
						<div className="date">{date}</div>
					</div>
					<IonIcon icon={ellipsisVertical} className="handle" size="small" />
				</div>
			</IonItem>
			<IonItemOptions side="end">
				<IonItemOption color="danger" onClick={() => removeFunc(prop, text, time)}>
					<IonIcon slot="icon-only" icon={trashOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
}, areEqual);


const Favorites: FC = () => {
	const {
		favorites,
		reverseFavoritesSort,
		separateFavoritesByGenerator
	} = useAppSelector(state => state.generalSettings);
	const height = useWindowHeight();
	const dispatch = useAppDispatch();
	const removeFunc = useCallback((
		prop: keyof FavoritesObject,
		text: string,
		time: number
	) => dispatch(removeFavorite([prop, text, time])), []);
	const allFavoritesData = makerAll(favorites, reverseFavoritesSort, removeFunc);
	const individualFavoritesData = maker(favorites, reverseFavoritesSort, removeFunc);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Favorites</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="forward" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={settingsSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="favorites">
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={reverseFavoritesSort}
							onClick={() => dispatch(toggleSort())}
						>Show Newest First</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={separateFavoritesByGenerator}
							onClick={() => dispatch(toggleSeparate())}
						>Separate by Source</IonToggle>
					</IonItem>
					{
						separateFavoritesByGenerator ?
							<VariableSizeList
								className="individualFaves"
								height={100}
								itemCount={individualFavoritesData.faves.length}
								estimatedItemSize={48}
								itemSize={(index: number) => typeof individualFavoritesData.faves === "string" ? 20 : 50}
								itemData={individualFavoritesData}
								width="100%"
							>{RenderIndividualFaves}</VariableSizeList>
						:
							<>
								<IonItemDivider>Favorites</IonItemDivider>
								<VariableSizeList
									className="allFaves"
									height={100}
									itemCount={allFavoritesData.faves.length}
									estimatedItemSize={48}
									itemSize={(index: number) => 50}
									itemData={allFavoritesData}
									width="100%"
								>{RenderAllFaves}</VariableSizeList>
							</>
					}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Favorites;
