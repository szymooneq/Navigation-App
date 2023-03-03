export const areEqual = (firstValue: any, secondValue: any) => {
	return JSON.stringify(firstValue) === JSON.stringify(secondValue);
};
