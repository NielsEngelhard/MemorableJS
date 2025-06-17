import { drizzle } from "drizzle-orm/node-postgres";
import DrizzleConfig from "../drizzle.config";
import * as schema from "./schema";

// export const db = drizzle({
//     schema,
//     DrizzleConfig
// });

var dbConnectionString = process.env.SECRET_DATABASE_CONNECTION_STRING ?? "";
export const db = drizzle(dbConnectionString);