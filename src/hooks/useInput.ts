import { useState, type ChangeEvent } from "react";

export interface UseInputReturns {
	value: string;
	reset: () => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (initialValue: string): UseInputReturns => {
	const [value, setValue] = useState<string>(initialValue);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

	const reset = () => {
		setValue("");
	};

	return {
		value,
		onChange,
		reset,
	};
};
