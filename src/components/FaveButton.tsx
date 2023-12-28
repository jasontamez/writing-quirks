import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';

import { AppDispatch } from '../store/store';
import { FavoritesObject, addFavorite } from '../store/generalSettingsSlice';
import { useAppSelector } from '../store/hooks';

interface FaveProps {
	prop: keyof FavoritesObject
	text: string
	dispatch: AppDispatch
}

const FaveButton: React.FC<FaveProps> = (props) => {
	const { prop, text, dispatch } = props;
	const { favorites } = useAppSelector(state => state.generalSettings);
	const color = favorites[prop][favorites[prop].length - 1] === text ? "medium" : "danger";

	return (
		<IonFab slot="fixed" horizontal="start" vertical="bottom">
			<IonFabButton color={color} onClick={() => dispatch(addFavorite([prop, text]))}>
				<IonIcon icon={heart} />
			</IonFabButton>
		</IonFab>
	);
};

export default FaveButton;
