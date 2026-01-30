import Flex from "@/components/UI/Flex";
import type { UseInputReturns } from "@/hooks/useInput";
import { useRef, type FC } from "react";
import styled from "styled-components";
import { Placeholder, StyledInput } from "./Input";
import { rv } from "@/utils/rv";

interface TextareaProps {
	value: string;
	onChange: UseInputReturns["onChange"];
	placeholder?: string;
}

const StyledTextarea = styled(StyledInput).attrs({ as: "textarea" })`
	resize: none;
	line-height: 1.5;
	font-size: 16px;
	color: #1f1f1f;
`;

const TextareaContainer = styled.div`
	border: ${rv(3, 2)} solid #1f1f1f;
	background-color: #e4ebf1;
`;

const Textarea: FC<TextareaProps> = ({ value, onChange, placeholder }) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleInput = () => {
		const element = textAreaRef.current;

		if (!element) return;

		element.style.height = "auto";
		element.style.height = element.scrollHeight + "px";
	};

	return (
		<Flex $column $gap={4}>
			{placeholder && <Placeholder>{placeholder}</Placeholder>}
			<TextareaContainer>
				<StyledTextarea ref={textAreaRef} onInput={handleInput} value={value} onChange={onChange} />
			</TextareaContainer>
		</Flex>
	);
};

export default Textarea;
