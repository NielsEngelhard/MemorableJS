"use server"

import { z } from "zod";
import { signInSchema, signUpSchema } from "./schemas";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { DbUser, UserSettingsTable, UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { hashPassword, generateSalt, comparePasswords } from "./password-hasher";
import { createUserSession, removeUserFromSession } from "./session";
import { cookies } from "next/headers";
import generateRandomUsername from "@/lib/generator/username-generator";
import generateRandomColorHex from "@/lib/generator/colorhex-generator";
import { UserModel } from "./models";
import { UserStatisticsTable } from "@/drizzle/schema/user-statistics";
import { MapDbUserToModel } from "../user/mapper";

type SignInResponse = {
    ok: boolean;
    user?: UserModel;
    errorMsg?: string;
}

export async function signIn(unsafeData: z.infer<typeof signInSchema>): Promise<SignInResponse> {
    const { success, data } = signInSchema.safeParse(unsafeData);
    if (!success) return SignInResponseFactory.error("Invalid login data");
    
    const user = await findUserByEmailOrUsername(data.username);

    if (user == null) return SignInResponseFactory.error();

    const isCorrectPassword = await comparePasswords({
        hashedPassword: user.hashedPassword,
        salt: user.salt,
        password: data.password,        
    });


    if (!isCorrectPassword) return SignInResponseFactory.error();

    await createUserSession({
        userId: user.id,
        role: user.role,
        sessionId: ""
    }, await cookies());

    return SignInResponseFactory.success(MapDbUserToModel(user));
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>): Promise<string | undefined> {
    const { success, data } = signUpSchema.safeParse(unsafeData);
    if (!success) return "Login failed";

    const existingUserByEmail = await db.select()
        .from(UsersTable)
        .where(eq(UsersTable.email, data.email))
        .then(rows => rows[0]);

    if (existingUserByEmail) return "Email address is already in use";

    var username: string = generateRandomUsername();
    if (data.username) {
        // Check if username is already in use
        const existingUserByUsername = await db.select()
            .from(UsersTable)
            .where(eq(UsersTable.username, data.username))
            .then(rows => rows[0]);

        if (existingUserByUsername) return "Username is already taken";
        
        username = data.username;
    }
    
    try {
        const salt = generateSalt();
        const hashedPassword = await hashPassword(data.password, salt);
    
        const userId = await createUser(data.email, hashedPassword, salt, username);        
        if (userId == null) return "Unable to create account"; 

        await createUserSession({
            sessionId: "",
            userId: userId,
            role: "user"
        }, await cookies());
    } catch (ex) {
        console.log(ex);
        return "Something went wrong while creating your account";
    }

    return undefined;
}

export async function logOut() {
    removeUserFromSession(await cookies());
    
    redirect("/");
}

async function createUser(email: string, hashedPassword: string, salt: string, username: string): Promise<string> {
    var userId = await db.transaction(async (tx) => {
        const user = await tx
            .insert(UsersTable)
            .values({
                username: username,
                colorHex: generateRandomColorHex(),
                email: email,
                hashedPassword: hashedPassword,
                salt: salt,           
                role: "user",
                level: 0,            
            })
            .returning({ id: UsersTable.id });            

            const userId = user[0].id;

            await tx.insert(UserSettingsTable).values({
                userId: userId,
            });  
            
            await tx.insert(UserStatisticsTable).values({
                userId: userId,                
            });    

            return userId;
    });

    return userId;
};

async function findUserByEmailOrUsername(usernameOrEmail: string): Promise<DbUser> {
    const usernameIsEmail = usernameOrEmail.includes("@");
  
    const users = usernameIsEmail
      ? await db.select().from(UsersTable).where(eq(UsersTable.email, usernameOrEmail))
      : await db.select().from(UsersTable).where(eq(UsersTable.username, usernameOrEmail));
  
    return users[0] ?? null;
  }

class SignInResponseFactory {
    static success(user: UserModel): SignInResponse {
        return {
            ok: true,
            user: user,
        };
    }

    static error(errorMsg?: string): SignInResponse {
        if (!errorMsg) errorMsg = "Username/password combination does not match";
        
        return {
            ok: false,
            errorMsg: errorMsg,
        };
    }
}