import React, { FC, SetStateAction, Dispatch, useCallback, ReactElement, MouseEventHandler } from "react";

import BasicAddModal from "./_ModalAdd";

interface ModalProps {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	title: string
	children: ReactElement
	onOpen: (event: CustomEvent<void>) => void
	maybeClose: MouseEventHandler<HTMLIonButtonElement>
	maybeSave: MouseEventHandler<HTMLIonButtonElement>
}

const PromptsAddModal: FC<ModalProps> = (props) => {
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
