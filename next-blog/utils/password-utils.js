import { hash } from "bcryptjs";
import { compare } from "bcryptjs";

export const passwordHashed = async (password) => {
  const passwordHashed = await hash(password, 12);
  return passwordHashed;
};

export const checkPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};
