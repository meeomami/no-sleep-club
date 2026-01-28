export function timeAgo(date: Date | number | string): string {
	const now = Date.now();
	const past = new Date(date).getTime();
	const diffSeconds = Math.floor((now - past) / 1000);

	if (diffSeconds < 0) return "только что";

	const units: {
		limit: number;
		name: [string, string, string];
		value: number;
	}[] = [
		{ limit: 60, name: ["секунда", "секунды", "секунд"], value: 1 },
		{ limit: 3600, name: ["минута", "минуты", "минут"], value: 60 },
		{ limit: 86400, name: ["час", "часа", "часов"], value: 3600 },
		{ limit: 604800, name: ["день", "дня", "дней"], value: 86400 },
		{ limit: 2592000, name: ["неделя", "недели", "недель"], value: 604800 },
		{ limit: 31536000, name: ["месяц", "месяца", "месяцев"], value: 2592000 },
		{ limit: Infinity, name: ["год", "года", "лет"], value: 31536000 },
	];

	for (const unit of units) {
		if (diffSeconds < unit.limit) {
			const count = Math.floor(diffSeconds / unit.value);
			return `${count} ${plural(count, unit.name)} назад`;
		}
	}

	return "только что";
}

function plural(n: number, forms: [string, string, string]) {
	const mod10 = n % 10;
	const mod100 = n % 100;

	if (mod10 === 1 && mod100 !== 11) return forms[0];
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
	return forms[2];
}
