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
							<div className="text">Combines disparate ideas into topics that may (or may not) inspire a creative work.</div>
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
								<IonLabel>Sub&shy;urban Street Names</IonLabel>
							</IonButton>
							<div className="text">Uses commonly used parts to make names you might find in an American suburban town.</div>
						</div>
					</IonItem>
					<IonItem>
						<div className="unit">
							<IonButton color="primary" size="default" routerDirection="forward" routerLink="/babbles">
								<IonIcon icon={planet} slot="start" />
								<IonLabel>Techno&shy;babble</IonLabel>
							</IonButton>
							<div className="text">Scifi tropes condensed into nonsense one might shout in an emergency.</div>
						</div>
					</IonItem>
					<IonItem>
						<div className="unit">
							<IonButton color="secondary" size="default" routerDirection="forward" routerLink="/insults">
								<IonIcon icon={skull} slot="start" />
								<IonLabel>Shake&shy;spear&shy;ian Insults</IonLabel>
							</IonButton>
							<div className="text">Verily, thou must use the Bard's language to smite thine foes' fragile fa&ccedil;ades.</div>
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
					<IonItem lines="none">
						<IonLabel>v.{packageJson.version}</IonLabel>
						<IonButton routerDirection="forward" routerLink="/settings" color="medium" slot="end" fill="outline">
							<IonIcon slot="icon-only" icon={settingsSharp} />
						</IonButton>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Main;
