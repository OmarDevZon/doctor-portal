import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, Number(12));

  return hashPassword;
};
