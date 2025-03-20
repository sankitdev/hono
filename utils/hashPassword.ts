import { password } from "bun";

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return password.hash(plainPassword, {
    algorithm: "argon2d",
    memoryCost: 4,
    timeCost: 5,
  });
};
