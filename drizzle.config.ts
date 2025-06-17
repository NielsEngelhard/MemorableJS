import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    out: "./drizzle/migrations",
    schema: "./drizzle/schema.ts",
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