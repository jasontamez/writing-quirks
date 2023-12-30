import React from 'react';
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import {
	beer,
	fastFood,
	planet,
	skull,
	trailSign,
	bulb,
	settingsSharp
} from 'ionicons/icons';

import packageJson from '../../package.json';

const Main: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Writing Quirks</IonTitle>
					<IonButtons slot="end">
						<IonButton routerDirection="forward" routerLink="/settings" color="medium">
							<IonIcon slot="icon-only" icon={settingsSharp} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="main">
					<IonItemDivider>Tools</IonItemDivider>
					<IonItem>
						<div className="unit">
							<IonButton color="primary" size="default" routerDirection="forward" routerLink="/prompts">
								<IonIcon icon={bulb} slot="start" />
								<IonLabel>Writing Prompts</IonLabel>
							</IonButton>
							<div className="text">Attempts to combine disparate ideas into topics that may (or may not) inspire a creative work.</div>
						</div>
					</IonItem>
					<IonItem>
						<div className="unit">
							<IonButton color="secondary" size="default" routerDirection="forward" routerLink="/taverns">
								<IonIcon icon={beer} slot="start" />
								<IonLabel>Taverns and Inns</IonLabel>
							</IonButton>
							<div className="text">Creates names for medieval European establishments you could find in a fantasy world.</div>
						</div>
					</IonItem>
					<IonItem>
						<div className="unit">
							<IonButton color="tertiary" size="default" routerDirection="forward" routerLink="/streets">
								<IonIcon icon={trailSign} slot="start" />
								<IonLabel>Suburban Street Names</IonLabel>
							</IonButton>
							<div className="text">Uses commonly used parts to make names you might find in an American suburban town.</div>
						</div>
					</IonItem>
					<IonItem>
						<div className="unit">
							<IonButton color="primary" size="default" routerDirection="forward" routerLink="/babbles">
								<IonIcon icon={planet} slot="start" />
								<IonLabel>Technobabble</IonLabel>
							</IonButton>
							<div className="text">Scifi tropes condensed into nonsense one might shout in an emergency.</div>
						</div>
					</IonItem>
					<IonItem>
						<div className="unit">
							<IonButton color="secondary" size="default" routerDirection="forward" routerLink="/insults">
								<IonIcon icon={skull} slot="start" />
								<IonLabel>Shakespearian Insults</IonLabel>
							</IonButton>
							<div className="text">Verily, thou must use the Bard's language to smite thine foes' fragile facades.</div>
						</div>
					</IonItem>
					<IonItem className="ending">
						<div className="unit">
							<IonButton color="tertiary" size="default" routerDirection="forward" routerLink="/flavors">
								<IonIcon icon={fastFood} slot="start" />
								<IonLabel>Really Odd Flavors</IonLabel>
							</IonButton>
							<div className="text">Creates bizarre flavor profiles that an alien might think a human would enjoy.</div>
						</div>
					</IonItem>
					<IonItemDivider>App Info</IonItemDivider>
					<IonItem className="version" lines="none">
						<h2 className="ion-text-center ion-text-wrap">v.{packageJson.version}</h2>
						<p className="ion-text-center ion-text-wrap">App icon incorporates pencil icon by <a href="https://www.flaticon.com/free-icons/pencil">Freepik - Flaticon</a>.</p>
						<p className="ion-text-center ion-text-wrap">Background icons for Writing Prompts by <a href="https://www.flaticon.com/free-icons/idea">Freepik - Flaticon</a>.</p>
						<p className="ion-text-center ion-text-wrap">Chains graphic for Taverns and Inns by <a href="https://www.freepik.com/free-vector/black-vertical-chains-set_4431390.htm">macrovector_official</a> on Freepik.</p>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Main;
