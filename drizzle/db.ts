import { drizzle } from "drizzle-orm/node-postgres";
import DrizzleConfig from "../drizzle.config";
import * as schema from "./schema";

// export const db = drizzle({
//     schema,
//     DrizzleConfig
// });

export const db = drizzle(process.env.SECRET_DATABASE_CONNECTION_STRING);