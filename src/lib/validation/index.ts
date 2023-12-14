import * as z from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Минимум 2 символа!" })
    .max(50, { message: "Максимум 50 символов!" }),
  username: z
    .string()
    .min(2, {
      message: "Минимум 2 символа!",
    })
    .max(50, { message: "Максимум 50 символов!" }),
  email: z.string().email().min(6, { message: "Минимум 6 символов!" }),
  password: z.string().min(8, { message: "Минимум 6 символов!" }),
});

export const SignInValidation = z.object({
  username: z
    .string()
    .min(2, {
      message: "Минимум 2 символа!",
    })
    .max(50, { message: "Максимум 50 символов!" }),
});
