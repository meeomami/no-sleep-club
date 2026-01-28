import type { ModalState } from "@/store/slices/modalSlice";
import type { FC, ReactNode } from "react";
import { AnimatePresence as AP, motion as m } from "framer-motion";
import { useActions } from "@/hooks/useActions";
import styled from "styled-components";
import Flex from "../UI/Flex";

interface ModalWrapperProps {
	name: keyof ModalState;
	isActive: boolean;
	isDefaultContent?: boolean;
	children: ReactNode;
}

const Modal = styled(m.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background-color: rgba(22, 23, 25, 0.75);
	overflow: auto;
	overscroll-behavior: contain;
`;

const ModalBody = styled(Flex)`
	min-height: 100%;
	padding: 20px;
`;

const ModalWrapper: FC<ModalWrapperProps> = ({ name, isActive, isDefaultContent, children }) => {
	const { setModalVisibility } = useActions();

	const transitions = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	return (
		<AP>
			{isActive && (
				<Modal {...transitions} onClick={() => setModalVisibility({ name, visibility: false })}>
					<ModalBody $justifyContent="center" $alignItems="center">
						{isDefaultContent ? (
							<div onClick={(event: React.MouseEvent) => event.stopPropagation()}>{children}</div>
						) : (
							<Flex
								onClick={(event: React.MouseEvent) => event.stopPropagation()}
								$bgc="#eff2f9"
								$border="3px solid #1f1f1f"
								$padding={40}
							>
								{children}
							</Flex>
						)}
					</ModalBody>
				</Modal>
			)}
		</AP>
	);
};

export default ModalWrapper;
