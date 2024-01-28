import React, { FC, SetStateAction, Dispatch, useCallback, PropsWithChildren } from "react";

import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
	onOpen: (event: CustomEvent<void>) => void
	maybeClose: MouseEventHandler<HTMLIonButtonElement>
	maybeSave: MouseEventHandler<HTMLIonButtonElement>
}

const PromptsAddModal: FC<PropsWithChildren<ModalProps>> = (props) => {
	const {
		modalOpen,
		setModalOpen,
		title,
		children,
		onOpen,
		maybeClose,
		maybeSave
	} = props;

	const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);

	return (
		<BasicAddModal
			modalOpen={modalOpen}
			closeModal={closeModal}
			onOpen={onOpen}
			title={title}
			maybeSave={maybeSave}
			maybeClose={maybeClose}
		>
			{ children }
		</BasicAddModal>
	);
}

export default PromptsAddModal;
