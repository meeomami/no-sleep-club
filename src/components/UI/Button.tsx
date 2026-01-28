import type { FC, ReactNode } from "react";
import styled from "styled-components";
import Flex from "./Flex";

interface ButtonProps {
	handler?: () => void;
	children?: ReactNode;
}

const StyledButton = styled(Flex).attrs({ as: "button" })`
	font-weight: 500;
	font-size: calc(14px + 4 * ((100vw - 320px) / (1920 - 320)));
	color: #eff2f9;
	box-shadow:
		inset calc(-2px + -1 * ((100vw - 320px) / (1920 - 320))) calc(-2px + -1 * ((100vw - 320px) / (1920 - 320))) 0 0
			rgba(0, 0, 0, 0.4),
		inset calc(2px + 1 * ((100vw - 320px) / (1920 - 320))) calc(2px + 1 * ((100vw - 320px) / (1920 - 320))) 0 0
			rgba(244, 244, 244, 0.55);
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
		<StyledButton
			$padding={["calc(8px + 12 * ((100vw - 320px) / (1920 - 320)))", "calc(12px + 12 * ((100vw - 320px) / (1920 - 320)))"]}
			$border="calc(2px + 1 * ((100vw - 320px) / (1920 - 320))) solid #1f1f1f"
			$bgc="#6E808E"
			onClick={handler}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
