import { drizzle } from "drizzle-orm/node-postgres";
import seedUsers from "./user-seed";
import seedWords from "./word-seed";

async function seed() {
    console.log('🌱 Seeding database...');

    const db = drizzle("postgresql://postgres:kaas@localhost:5432/memorable");

    try {
        seedUsers(db);    
        seedWords(db);  
      
        console.log('✅ Seed completed successfully');
    } catch (error) {
      console.error('❌ Seed failed:', error);
    }
  }
  
seed();