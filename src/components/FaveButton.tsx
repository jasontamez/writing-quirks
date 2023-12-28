import React, { useCallback, useEffect, useState } from 'react';
import { IonFab, IonFabButton, IonIcon, useIonToast } from '@ionic/react';
import { heart } from 'ionicons/icons';

import { FavoritesObject, addFavorite, removeLastFavorite } from '../store/generalSettingsSlice';
import { useAppDispatch } from '../store/hooks';

interface FaveProps {
	prop: keyof FavoritesObject
	text: string
}

const FaveButton: React.FC<FaveProps> = (props) => {
	const { prop, text } = props;
	const [touched, setTouched] = useState<boolean>(false);
	const [doToast, undoToast] = useIonToast();
	const dispatch = useAppDispatch();
	useEffect(() => {
		setTouched(false);
	}, [text, prop]);
	const doTap = useCallback(() => {
		if(touched) {
			setTouched(false);
			dispatch(removeLastFavorite(prop));
			undoToast().then(() => doToast({
				message: `Removed from favorites.`,
				color: "warning",
				duration: 1800,
				position: "middle"
			}));
			return;
		}
		setTouched(true);
		dispatch(addFavorite([prop, text]));
		undoToast().then(() => doToast({
			message: `Saved to favorites.`,
			color: "success",
			duration: 1800,
			position: "middle"
		}));
	}, [touched, prop, text, dispatch]);

	return (
		<IonFab slot="fixed" horizontal="start" vertical="bottom">
			<IonFabButton color={touched ? "danger" : "medium"} onClick={doTap}>
				<IonIcon icon={heart} />
			</IonFabButton>
		</IonFab>
	);
};

export default FaveButton;
