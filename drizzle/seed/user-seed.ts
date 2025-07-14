import { hashPassword } from "@/features/auth/password-hasher";
import { UsersTable } from "../schema";
import { UserSettingsTable } from "../schema/user-settings";
import { UserStatisticsTable } from "../schema/user-statistics";

export default async function seedUsers(db: any) {
      const salt = 'ThisSaltIsNotOnProductionHaha(IHope)';
      const userPassword = await hashPassword('test', salt);

      const user = await db.insert(UsersTable).values({
          username: 'test',
          email: 'test@turingsolutions.nl',
          hashedPassword: userPassword,
          salt: salt ,
          role: 'admin',
          level: 0,
          colorHex: "#e73549",
      }).returning({
        userId: UsersTable.id
      });

      await db.insert(UserSettingsTable).values({
        userId: user[0].userId
      });  
      
      await db.insert(UserStatisticsTable).values({
        userId: user[0].userId,                
      });        
} 