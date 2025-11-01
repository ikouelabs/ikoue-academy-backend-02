import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const db = drizzle(process.env.DB_FILE_NAME || "mem:local.db");

export default db;
