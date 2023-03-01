export const hashTextHelper = async (
  hasher: any,
  text: string,
  salts: number = 10
) => {
  return await hasher.hash(text, salts);
};

export const compareTextHelper = async (
  hasher: any,
  plainText: string,
  hashedText: string
) => {
  return await hasher.compare(plainText, hashedText);
};
