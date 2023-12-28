import React, { ReactElement, useState } from 'react';
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
import { FaveInfo, FavoritesObject, favoriteNames, removeFavorite } from '../store/generalSettingsSlice';

interface PropsIndividual {
	faves: FaveInfo[]
	reverseSort: boolean
	title: string
	func: Function
}
interface PropsAll {
	faves: FavoritesObject
	reverseSort: boolean
	func: Function
}
interface PropsItem {
	content: ReactElement
	func: Function
}

type AllFavesObject = [string, keyof FavoritesObject, string, number];

const Fave: React.FC<PropsItem> = (props) => {
	const { content, func } = props;
	return (
		<IonItemSliding>
			<IonItem className="favorite">
				{content}
			</IonItem>
			<IonItemOptions side="end">
				<IonItemOption color="danger" onClick={() => func()}>
					<IonIcon slot="icon-only" icon={trashOutline} />
				</IonItemOption>
			</IonItemOptions>
		</IonItemSliding>
	);
};

const Faves: React.FC<PropsIndividual> = (props) => {
	const { faves, reverseSort, title, func } = props;
	const sorted = reverseSort ? faves.slice().reverse() : faves;
	return (
		<>
			<IonItemDivider>{title}</IonItemDivider>
			{sorted.map((fave, i) => {
				const [text, time] = fave;
				const date = (new Date(time)).toLocaleDateString();
				return (
					<Fave key={`${title}-${text}-${i}`} func={() => func(text, date)} content={<>
						<div className="text">{text}</div>
						<div className="date">{date}</div>
					</>} />
				);
			})}
		</>
	);
};

const sorter = (a: AllFavesObject, b: AllFavesObject) => a[3] - b[3];
const revSorter = (a: AllFavesObject, b: AllFavesObject) => b[3] - a[3];

const AllFaves: React.FC<PropsAll> = (props) => {
	const { faves, reverseSort, func } = props;
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
					<Fave key={`${group}-${text}-${i}`} func={() => func(prop, text, date)} content={<>
						<div className="group">{group}</div>
						<div className="text">{text}</div>
						<div className="date">{date}</div>
					</>} />
				);
			})}
		</>
	);
};

const Prompts: React.FC = () => {
	const { favorites } = useAppSelector(state => state.generalSettings);
	const [reverseSort, setReverseSort] = useState<boolean>(true);
	const [separate, setSeparate] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	return (
		<IonPage>
		<IonHeader>
			<IonToolbar>
				<IonTitle>Favorites</IonTitle>
				<IonButtons slot="end">
					<IonButton routerDirection="forward" routerLink="/" color="medium">
						<IonIcon slot="icon-only" icon={settingsSharp} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={reverseSort}
							onClick={() => setReverseSort(!reverseSort)}
						>Show Newest First</IonToggle>
					</IonItem>
					<IonItem lines="full">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={separate}
							onClick={() => setSeparate(!separate)}
						>Separate by Source</IonToggle>
					</IonItem>
					{
						separate ?
							favoriteNames.map(([text, prop]) => {
								const faves = favorites[prop];
								if(faves.length === 0) {
									return <React.Fragment key={`frag-${prop}`}></React.Fragment>;
								}
								return <Faves
									key={`faveBlock-${prop}`}
									faves={faves}
									reverseSort={reverseSort}
									title={text}
									func={(text: string, date: number) => dispatch(removeFavorite([prop, text, date]))}
								/>
							})
						:
							<AllFaves
								faves={favorites}
								reverseSort={reverseSort}
								func={
									(
										prop: keyof FavoritesObject,
										text: string,
										date: number
									) => dispatch(removeFavorite([prop, text, date]))
								}
							/>
					}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Prompts;
