import React, { useCallback } from 'react';
import { IonButton, IonIcon, useIonToast } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import toaster from '../helpers/toaster';

interface HaltButtonProps {
	errorMessage: string
}

const HaltButton: React.FC<HaltButtonProps> = (props) => {
	const { errorMessage } = props;
	const toast = useIonToast();
	const errorMsg = useCallback(() => (
		toaster({
			message: errorMessage,
			color: "warning",
			duration: 3500,
			toast
		})
	), [errorMessage, toast]);

	return (
		<IonButton color="warning" onClick={errorMsg}>
			<IonIcon slot="icon-only" icon={trashOutline} />
		</IonButton>
	);
};

export default HaltButton;
