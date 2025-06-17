import { userRoles } from "@/drizzle/schema/enum/user-role";
import { z } from "zod";

export const signInSchema = z.object({
    username: z.string().min(1, "Required"),
    password: z.string().min(1, "Required")
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    email: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),    
    username: z.string().optional(),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const sessionSchema = z.object({
    sessionId: z.string(),
    userId: z.string().uuid(),
    role: z.enum(userRoles)
});