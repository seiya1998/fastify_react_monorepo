// cuidのバリデーション
export const validateCuid = (cuid: string): boolean => {
  const cuidPattern = /^c[a-z0-9]{24}$/;
  return cuidPattern.test(cuid);
};