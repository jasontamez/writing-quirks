import React, {
	PropsWithChildren,
	useEffect,
	useRef,
	useState
} from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonViewDidEnter
} from '@ionic/react';
import { FixedSizeList } from 'react-window';
import { addCircle, arrowBackCircleSharp } from 'ionicons/icons';
import { useWindowHeight } from '@react-hook/window-size/throttled';

import { SetState, SetStateBoolean } from '../../store/hooks';
import { $i, $q } from '../../helpers/dollarsignExports';
import { Any } from '../../promptsData/Ideas';
import './Editing.css';

export interface IdeaItem<T> {
	index: number
	style: { [key: string]: any }
	data: T[]
}

interface IdeaEditProps<T> {
	ideas: T[]
	IdeaItems: React.FC<IdeaItem<T>>
	title: string
	setAddModalOpen: SetStateBoolean
}

const baseUnitHeight = 56;
const resetHeights = (
	header: HTMLElement | null,
	button: HTMLElement | null,
	tabs: HTMLElement | null,
	height: number,
	setPromptsHeight: SetState<number>
) => {
	const bitHeight = (header && header.offsetHeight) || baseUnitHeight;
	const buttonHeight = (button && button.offsetHeight) || baseUnitHeight;
	const tabsHeight = (tabs && tabs.offsetHeight) || baseUnitHeight;
	setPromptsHeight(height - bitHeight - buttonHeight - tabsHeight);
	return bitHeight;
};

const PromptsIdeasEdit = <T extends Any>(props: PropsWithChildren<IdeaEditProps<T>>) => {
	const { ideas, IdeaItems, title, setAddModalOpen, children } = props;
	const [unitHeight, setUnitHeight] = useState<number>(48);
	const [promptsHeight, setPromptsHeight] = useState<number>(0);
	const [ideasCopy, setIdeasCopy] = useState<T[]>(ideas);
	const height = useWindowHeight();
	const header = $q("ion-header.pageHeader");
	const button = $i("addButtonIdeas");
	const bar = $q("ion-tab-bar");
	const listRef = useRef<FixedSizeList | null>(null);
	useIonViewDidEnter(() => setUnitHeight(resetHeights(
		$q("ion-header.pageHeader"),
		$i("addButtonIdeas"),
		$q("ion-tab-bar"),
		height,
		setPromptsHeight
	)));
	useEffect(() => setUnitHeight(resetHeights(header, button, bar, height, setPromptsHeight)), [header, height, button, bar]);
	useEffect(() => {
		if(ideas.length > ideasCopy.length) {
			// Find the new item
			let found: number = ideas.length;
			ideasCopy.every((idea, i) => {
				found = i;
				return idea.id === ideas[i].id;
			});
			listRef && listRef.current && listRef.current.scrollToItem(found, "smart");
		}
		setIdeasCopy(ideas);
	}, [ideas, ideasCopy]);
	
	return (
		<IonPage>
			<IonHeader className="pageHeader">
				<IonToolbar>
					<IonTitle>Prompts - {title} - Advanced Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="back" routerLink="/editprompts" color="medium">
							<IonIcon slot="icon-only" icon={arrowBackCircleSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{ children }
				<IonList lines="full" className="editing windowed">
					<FixedSizeList
						className="editing"
						height={promptsHeight}
						itemCount={ideas.length}
						itemData={ideas}
						itemSize={unitHeight}
						width="100%"
						ref={listRef}
					>{IdeaItems}</FixedSizeList>
				</IonList>
				<div id="addButtonIdeas">
					<IonButton color="primary" onClick={() => setAddModalOpen(true)}>
						<IonIcon icon={addCircle} slot="start" />
						<IonLabel>Add new {title.replace(/s$/, "")}</IonLabel>
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default PromptsIdeasEdit;
