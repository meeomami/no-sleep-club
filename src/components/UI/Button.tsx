import type { FC, ReactNode } from "react";
import styled from "styled-components";
import Flex from "./Flex";
import React from "react";
import { rv } from "@/utils/rv";

interface ButtonProps {
	handler?: (() => void) | ((event: any) => void);
	$icon?: FC;
	children?: ReactNode;
}

const StyledButton = styled(Flex).attrs({ as: "button" })<{ $icon: boolean }>`
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

	svg {
		width: ${rv(32, 20)};
		height: ${rv(32, 20)};
	}

	svg,
	svg path {
		fill: currentColor;
	}
`;

const Button: FC<ButtonProps> = ({ handler, $icon, children }) => {
	return (
		<StyledButton
			$icon={Boolean($icon)}
			$padding={[!$icon ? rv(20, 8) : rv(13, 5), !$icon ? rv(24, 12) : rv(16, 6)]}
			$border="calc(2px + 1 * ((100vw - 320px) / (1920 - 320))) solid #1f1f1f"
			$bgc="#6E808E"
			onClick={handler}
		>
			{$icon ? React.createElement($icon) : children}
		</StyledButton>
	);
};

export default Button;
