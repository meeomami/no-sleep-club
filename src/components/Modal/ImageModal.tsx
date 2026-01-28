import type { FC } from "react";
import ModalWrapper from "./ModalWrapper";
import styled from "styled-components";
import { useAppSelector } from "@/hooks/useAppSelector";

const StyledImage = styled.img`
	max-width: 1440px;
	width: 100%;
`;

const ImageModal: FC = () => {
	const { url } = useAppSelector((state) => state.image);

	const { image: isActive } = useAppSelector((state) => state.modal);

	return (
		<ModalWrapper isActive={isActive} name="image" isDefaultContent>
			<StyledImage src={url || ""} />
		</ModalWrapper>
	);
};

export default ImageModal;
