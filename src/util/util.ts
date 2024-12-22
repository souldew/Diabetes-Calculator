export const verifyPositiveNumericStr = (str: string) => {
  return /^\d*$/.test(str);
};

export const validateNumber = (value: number) => {
  if (Number.isNaN(value)) {
    throw new Error();
  }
  if (value === Infinity || value === -Infinity) {
    throw new Error();
  }
};
