import { DataSource } from "typeorm";
import 'dotenv/config'; // This auto-loads .env

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [process.env.NODE_ENV === "production" ? "dist/entities/*.js" : "src/entities/*.ts"],
  migrations: [process.env.NODE_ENV === "production" ? "dist/migrations/*.js" : "src/migrations/*.ts"],
  synchronize: false,
});
