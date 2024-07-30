import { LoginFormData, SignupFormData } from "@/types/auth/types";
import { z, ZodType } from "zod";

export const signUpSchema: ZodType<SignupFormData> = z
  .object({
    name:z.string().min(2, "Please enter a vaild name"),
    email: z.string().email(),
    password: z.string().min(8, "Password must contain at least 8 characters").max(128)
  });