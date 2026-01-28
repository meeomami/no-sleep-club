import { type UseInputReturns } from "@/hooks/useInput";
import { useState, type FC } from "react";
import styled from "styled-components";

interface InputProps {
	type?: "text" | "password";
	value: string;
	placeholder?: string;
	onChange: UseInputReturns["onChange"];
}

const StyledInput = styled.input<InputProps & { $isFocused: boolean }>`
	border: 3px solid #1f1f1f;
	background-color: #e4ebf1;
	box-shadow:
		inset -3px -3px 0 0 rgba(0, 0, 0, 0.4),
		inset 3px 3px 0 0 rgba(244, 244, 244, 0.55);
	color: #1f1f1f;
	padding: 24px 16px;
	font-size: 16px;
	font-weight: 500;
	width: 100%;
	transition: 250ms;

	${({ $isFocused }) =>
		$isFocused &&
		`
		padding: 31px 16px 17px;
	`}

	&::placeholder {
		color: transparent;
	}
`;

const InputContainer = styled.div`
	position: relative;
`;

const Placeholder = styled.div<{ $isFocused: boolean }>`
	font-size: 16px;
	color: #7b858d;
	position: absolute;
	top: 50%;
	left: 19px;
	translate: 0 calc(-50%);
	pointer-events: none;
	transition: 250ms;
	${({ $isFocused }) =>
		$isFocused &&
		`
			font-size: 12px;
			translate: 0 calc(-50% - 9px);
		`}
`;

const Input: FC<InputProps> = (props) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	return (
		<InputContainer>
			{props.placeholder && <Placeholder $isFocused={isFocused || props.value !== ""}>{props.placeholder}</Placeholder>}
			<StyledInput
				$isFocused={isFocused || props.value !== ""}
				onBlur={() => setIsFocused(false)}
				onFocus={() => setIsFocused(true)}
				{...props}
			/>
		</InputContainer>
	);
};

export default Input;
