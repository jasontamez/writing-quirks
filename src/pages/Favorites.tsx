import React, { FC, Fragment, ReactElement, useCallback } from 'react';
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
import { settingsSharp, trashOutline } from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FaveInfo, FavoritesObject, favoriteNames, removeFavorite, toggleSeparate, toggleSort } from '../store/generalSettingsSlice';
import './Favorites.css';

interface PropsIndividual {
	faves: FaveInfo[]
	reverseSort: boolean
	title: string
	prop: keyof FavoritesObject
}
interface PropsAll {
	faves: FavoritesObject
	reverseSort: boolean
}
interface PropsItem {
	content: ReactElement
	prop: keyof FavoritesObject
	text: string
	time: number
}

type AllFavesObject = [string, keyof FavoritesObject, string, number];

const Fave: FC<PropsItem> = (props) => {
	const { content, prop, text, time } = props;
	const dispatch = useAppDispatch();
	const removeFunc = useCallback(() => dispatch(removeFavorite([prop, text, time])), [prop, text, time]);
	return (
		<IonItemSliding>
			<IonItem className="favorite">
				<div className="content">
					{content}
					<IonIcon src="svg/drag-handle.svg" className="handle" size="small" />
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

const Faves: FC<PropsIndividual> = (props) => {
	const { faves, reverseSort, title, prop } = props;
	const sorted = reverseSort ? faves.slice().reverse() : faves;
	return (
		<>
			<IonItemDivider>{title}</IonItemDivider>
			{sorted.map((fave, i) => {
				const [text, time] = fave;
				const date = (new Date(time)).toLocaleDateString();
				return (
					<Fave
						key={`${title}-${text}-${i}`}
						prop={prop}
						text={text}
						time={time}
						content={
							<div className="innerContent">
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

const sorter = (a: AllFavesObject, b: AllFavesObject) => a[3] - b[3];
const revSorter = (a: AllFavesObject, b: AllFavesObject) => b[3] - a[3];

const AllFaves: FC<PropsAll> = (props) => {
	const { faves, reverseSort } = props;
	const allFaves: AllFavesObject[] = [];
	favoriteNames.forEach(([title, prop]) => {
		faves[prop].forEach((pair) => {
			allFaves.push([title, prop, ...pair]);
		});
	});
	allFaves.sort(reverseSort ? revSorter : sorter);
	return (
		<>
			<IonItemDivider>Favorites</IonItemDivider>
			{allFaves.map((fave, i) => {
				const [group, prop, text, time] = fave;
				const date = (new Date(time)).toLocaleDateString();
				return (
					<Fave
						key={`${group}-${text}-${i}`}
						prop={prop}
						text={text}
						time={time}
						content={
							<div className="innerContent">
								<div className="text">{text}</div>
								<div className="date">{date}, {group}</div>
							</div>
						}
					/>
				);
			})}
		</>
	);
};

const Favorites: FC = () => {
	const {
		favorites,
		reverseFavoritesSort,
		separateFavoritesByGenerator
	} = useAppSelector(state => state.generalSettings);
	const dispatch = useAppDispatch();

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
							favoriteNames.map(([text, prop]) => {
								const faves = favorites[prop];
								if(faves.length === 0) {
									return <Fragment key={`frag-${prop}`}></Fragment>;
								}
								return <Faves
									key={`faveBlock-${prop}`}
									prop={prop}
									faves={faves}
									reverseSort={reverseFavoritesSort}
									title={text}
								/>
							})
						:
							<AllFaves
								faves={favorites}
								reverseSort={reverseFavoritesSort}
							/>
					}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Favorites;