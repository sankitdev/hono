import { z } from "zod";
const nameRegex = /^[A-Za-z]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 char")
    .regex(nameRegex, "Name must contain only alphabets"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 character")
    .regex(
      passwordRegex,
      "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
    ),
  avatar: z.string().url().optional(),
});

const updateUserSchema = createUserSchema.partial({
  email: true,
  password: true,
});

export { createUserSchema, updateUserSchema };
