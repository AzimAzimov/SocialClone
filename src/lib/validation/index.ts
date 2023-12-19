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
  password: z.string().min(8, { message: "Минимум 8 символов!" }),
});

export const SignInValidation = z.object({
  email: z.string().email().min(6, { message: "Минимум 6 символов!" }),
  password: z.string().min(8, { message: "Минимум 8 символов!" }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Минимум 5 символа!" })
    .max(2200, { message: "Максимум 2200 символов!" }),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});
