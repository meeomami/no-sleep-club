import Flex from "@/components/UI/Flex";
import type { UseInputReturns } from "@/hooks/useInput";
import { rv } from "@/utils/rv";
import type { FC } from "react";
import styled from "styled-components";

interface InputProps {
	value: string;
	onChange: UseInputReturns["onChange"];
	placeholder?: string;
}

const InputContainer = styled.div`
	border: ${rv(3, 2)} solid #1f1f1f;
	background-color: #e4ebf1;
`;

export const Placeholder = styled.div`
	font-size: ${rv(16, 14)};
	color: #6e808e;
	font-weight: 500;
`;

export const StyledInput = styled.input`
	font-size: 16px;
	color: #1f1f1f;
	padding: 20px 16px;
	background-color: transparent;
	width: 100%;
`;

const Input: FC<InputProps> = ({ value, onChange, placeholder }) => {
	return (
		<Flex $column $gap={4}>
			{placeholder && <Placeholder>{placeholder}</Placeholder>}
			<InputContainer>
				<StyledInput value={value} onChange={onChange} />
			</InputContainer>
		</Flex>
	);
};

export default Input;
