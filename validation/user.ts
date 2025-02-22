import { z } from "zod";
const nameRegex = /^[A-Za-z]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const createUserSchema = z.object({
  firstName: z
    .string()
    .min(3, "FirstName must be at least 3 char")
    .regex(nameRegex, "FirstName must contain only alphabets"),
  lastName: z
    .string()
    .min(3, "LastName must be at least 3 char")
    .regex(nameRegex, "LastName must contain only alphabets"),
  userName: z
    .string()
    .min(3, "UserName must container at least 3 char")
    .toLowerCase(),
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
