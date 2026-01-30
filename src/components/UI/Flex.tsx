import type { ReactNode } from "react";
import styled from "styled-components";

type GapProperty = number | [number, number];

export interface FlexProps {
	$wrap?: boolean;
	$column?: boolean;
	$reverse?: boolean;
	$alignItems?: "flex-start" | "flex-end" | "center" | "baseline";
	$justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
	$alignSelf?: "flex-start" | "flex-end" | "center";
	$border?: string;
	$borderRadius?: number;
	$gap?: GapProperty;
	$margin?: number | string | [number | string, (number | string)?, (number | string)?, (number | string)?];
	$padding?: number | string | [number | string, (number | string)?, (number | string)?, (number | string)?];
	$bgc?: string;
	$itemsInRow?: number;
	children?: ReactNode;
}

function calculateChildSize(itemsInRow: number, gap: GapProperty | undefined): string {
	const gapSize = gap ? (Array.isArray(gap) ? gap[0] : gap) : 0;
	return `calc(100%/${itemsInRow} - (${gapSize}px - (${gapSize}px - ${itemsInRow}px)))`;
}

const Flex = styled.div<FlexProps>`
	display: flex;
	${({ $wrap }) => $wrap && `flex-wrap: wrap`};
	${({ $column, $reverse }) =>
		($column || $reverse) && `flex-direction: ${$column ? "column" : "row"}${$reverse ? "-reverse" : ""}`};
	${({ $alignItems }) => $alignItems && `align-items: ${$alignItems}`};
	${({ $alignSelf }) => $alignSelf && `align-self: ${$alignSelf}`};
	${({ $justifyContent }) => $justifyContent && `justify-content: ${$justifyContent}`};
	${({ $border }) => $border && `border: ${$border}`};
	${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius}`};
	${({ $gap }) => $gap && (Array.isArray($gap) ? `column-gap: ${$gap[0]}px; row-gap: ${$gap[1]}px` : `gap: ${$gap}px`)};
	${({ $margin }) =>
		$margin &&
		`margin: ${typeof $margin === "number" ? `${$margin}px` : typeof $margin === "string" ? $margin : $margin.map((value) => (typeof value === "number" ? `${value}px` : value)).join(" ")}`};
	${({ $padding }) =>
		$padding &&
		`padding: ${typeof $padding === "number" ? `${$padding}px` : typeof $padding === "string" ? $padding : $padding.map((value) => (typeof value === "number" ? `${value}px` : value)).join(" ")}`};
	${({ $bgc }) => $bgc && `background-color: ${$bgc}`};
	${({ $itemsInRow, $gap }) =>
		$itemsInRow &&
		`
		& > * {
			flex: 0 0 calc(${calculateChildSize($itemsInRow, $gap)});
		}
	`};
`;

export default Flex;
