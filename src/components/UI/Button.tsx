import type { FC, ReactNode } from "react";
import styled from "styled-components";
import Flex from "./Flex";

interface ButtonProps {
	handler?: () => void;
	children?: ReactNode;
}

const StyledButton = styled(Flex).attrs({ as: "button" })`
	font-weight: 500;
	font-size: 18px;
	color: #eff2f9;
	box-shadow:
		inset -3px -3px 0 0 rgba(0, 0, 0, 0.4),
		inset 3px 3px 0 0 rgba(244, 244, 244, 0.55);
	text-shadow: 2px 2px #1f1f1f;
	transition: 350ms;

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			box-shadow:
				inset 0 0 0 0 rgba(0, 0, 0, 0.4),
				inset 0 0 0 0 rgba(244, 244, 244, 0.55);
			text-shadow: 0 0 #1f1f1f;
			border-color: transparent;
		}
	}
`;

const Button: FC<ButtonProps> = ({ handler, children }) => {
	return (
		<StyledButton $padding={[20, 24]} $border="3px solid #1f1f1f" $bgc="#6E808E" onClick={handler}>
			{children}
		</StyledButton>
	);
};

export default Button;
