import { knex } from "knex";
import path from "path";

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    'change-password-tokens': ChangePasswordTokens;

  }
}

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve("./databases/database.db"),
  },
});

export const getUsers = () => db("users").select('id', 'email', 'fullName', 'avatar');
export const getUser = (email: string) => db("users").where("email", email);

export const initializeTables = async () => {
  await db.schema.dropTableIfExists("users");
  await db.schema.dropTableIfExists("change-password-tokens");

  if (!(await db.schema.hasTable("users"))) {
    await db.schema.createTable("users", (table) => {
      table.increments("id", {
        primaryKey: true,
      });
      table.string("password").notNullable();
      table.string("email").notNullable();
      table.string("fullName").notNullable();
      table.string("avatar").notNullable();
      table.boolean("isAdmin").defaultTo(false);
    });
  }

  if (!(await db.schema.hasTable("change-password-tokens"))) {
    await db.schema.createTable("change-password-tokens", (table) => {
      table.increments("id", {
        primaryKey: true,
      });
      table.string("email").notNullable();
      table.string("changePasswordToken").notNullable();
    });
  }
};
