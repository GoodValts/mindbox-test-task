export const formateToInputValue = (value: number, charsAmount: number) => {
  return "0".repeat(charsAmount).concat(value.toString()).slice(-charsAmount);
};
