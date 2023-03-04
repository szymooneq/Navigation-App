const roundToTwo = (value: number) => {
	return Math.round(100 * value) / 100;
};

export const recalculatePrice = (rate: string, distance: number) => {
	const days = Math.round(distance / 800);
	if (isNaN(+rate) || !rate.length) return 0;
	if (days >= 1) return roundToTwo(distance * +rate * 1.1 + days * 1000);
	return roundToTwo(distance * +rate * 1.1);
};
