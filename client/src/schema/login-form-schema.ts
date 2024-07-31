import { LoginFormData } from "@/types/auth/types";
import { z, ZodType } from "zod";

export const loginSchema: ZodType<LoginFormData> = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must contain at least 8 characters").max(128)
  });