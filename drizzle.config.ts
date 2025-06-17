import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema.ts",
    strict: true,
    verbose: true,
    dbCredentials: {
        host: 'localhost',
        port: 5432,
        database: 'memorable',
        user: 'postgres',
        password: 'kaas',
        ssl: false
    }
})