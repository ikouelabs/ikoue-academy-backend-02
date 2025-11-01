import "dotenv/config";
//import { drizzle } from "drizzle-orm/libsql";
import { drizzle } from "drizzle-orm/node-postgres";

//const db = drizzle(process.env.DB_FILE_NAME || "mem:local.db");
const db = drizzle(process.env.DATABASE_URL!);

export default db;
