import { z } from "zod";
import crypto from "crypto";
import { db } from "@/drizzle/db";
import { UserSessionTable } from "@/drizzle/schema/user-session";
import { and, eq, gt } from "drizzle-orm";
import { UsersTable } from "@/drizzle/schema";
import { sessionSchema } from "./schemas";

const SESSION_EXPIRATION_DAYS = 7;
const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * SESSION_EXPIRATION_DAYS;
const COOKIE_SESSION_KEY = "session-id";

type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
    set: (
      key: string,
      value: string,
      options: {
        secure?: boolean
        httpOnly?: boolean
        sameSite?: "strict" | "lax"
        expires?: number
      }
    ) => void
    get: (key: string) => { name: string; value: string } | undefined
    delete: (key: string) => void
  }

// OPTIMIZATION POSSIBILITY: use redis for storing and retrieving the session instead of regular database
// REASON FOR NOT NOW      : probably not much users so database speed/load is not worth implementing Redis for now
export async function createUserSession(userSession: UserSession, cookies: Cookies) {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();
    userSession.sessionId = sessionId;

    console.log(userSession);

    await createOrUpdateUserSession(userSession);

    setCookie(sessionId, cookies);
}

export async function createOrUpdateUserSession(userSession: UserSession) {
    await db.insert(UserSessionTable).values({
        sessionId: userSession.sessionId,
        userId: userSession.userId,
        role: userSession.role,
        expireDateTime: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
    });     
}

export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  return getSessionAndUserById(sessionId);
}

export async function removeUserFromSession(cookies: Pick<Cookies, "get" | "delete">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  cookies.delete(COOKIE_SESSION_KEY);
  await removeUserSessionFromDb(sessionId);
}

function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
    cookies.set(COOKIE_SESSION_KEY, sessionId, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
    })
}

async function getSessionAndUserById(sessionId: string): Promise<UserAndSessionModel> {
  const now = new Date();

  const result = await db.select()
              .from(UserSessionTable)
              .where(and(
                eq(UserSessionTable.sessionId, sessionId),
                gt(UserSessionTable.expireDateTime, now)
              ))              
              .innerJoin(UsersTable, eq(UserSessionTable.userId, UsersTable.id));    

  var user = result[0];
  if (!user) throw new Error("Session not found or expired"); 
  
  return {
    user: {
      id: user.users.id,
      username: user.users.username,
      email: user.users.email,
      level: user.users.level,
      joinDate: user.users.createdAt,
      colorHex: user.users.colorHex,

    },
    session: {
      sessionId: sessionId
    }
  };
}

async function removeUserSessionFromDb(sessionId: string) {
  await db.delete(UserSessionTable).where(eq(UserSessionTable.sessionId, sessionId));
}