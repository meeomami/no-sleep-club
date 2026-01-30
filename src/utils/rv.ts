export const rv = (startValue: number, endValue: number): string =>
	`calc(${endValue}px + (${startValue - endValue}) * ((100vw - 320px) / (1920 - 320)))`;
