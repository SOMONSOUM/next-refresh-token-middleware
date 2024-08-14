import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Please provide an email" })
    .email({ message: "Please provide an valid email" }),
  password: z
    .string({ required_error: "Please provide a password" })
    .min(6)
    .max(64),
});

export type LoginInput = z.infer<typeof LoginSchema>;
