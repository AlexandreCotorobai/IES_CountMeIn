import * as z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
    //password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        //must contain at least one uppercase letter
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        //must contain at least one lowercase letter
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        //must contain at least one number
        .regex(/[0-9]/, "Must contain at least one number")
        //must contain at least one special character
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  })

  export type LoginSchema = z.infer<typeof LoginFormSchema>;