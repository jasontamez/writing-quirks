import React from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { heartCircleSharp, settingsSharp } from 'ionicons/icons';

interface PageTitleProps {
	title: string
}

const PageHeader: React.FC<PageTitleProps> = (props) => {
	const { title } = props;

	return (
		<IonHeader>
			<IonToolbar>
				<IonTitle>{title}</IonTitle>
				<IonButtons slot="end">
					<IonButton routerDirection="forward" routerLink="/favorites" color="medium">
						<IonIcon slot="icon-only" icon={heartCircleSharp} />
					</IonButton>
					<IonButton routerDirection="forward" routerLink="/" color="medium">
						<IonIcon slot="icon-only" icon={settingsSharp} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};

export default PageHeader;
