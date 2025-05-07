import { z } from "zod";

const nameRegex = /^[A-Za-z]+$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .regex(nameRegex, "First name must contain only alphabets"),

  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .regex(nameRegex, "Last name must contain only alphabets"),

  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .toLowerCase(),

  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and contain at least 1 uppercase letter, 1 number, and 1 special character"
    ),

  avatar: z.string().url().optional(),
});

const createUserSchema = baseUserSchema.refine(
  data => data.firstName.toLowerCase() !== data.lastName.toLowerCase(),
  {
    message: "First name and last name must not be the same",
    path: ["lastName"],
  }
);

const updateUserSchema = baseUserSchema.partial({
  email: true,
  password: true,
});

export { createUserSchema, updateUserSchema };
