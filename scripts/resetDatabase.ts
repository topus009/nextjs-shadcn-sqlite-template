import { db, getUsers, resetDatabase } from "../lib/db";
import fs from "fs/promises";
import { sealData } from "iron-session";
import {sessionOptions} from "../lib/withSession";

(async () => {
  try { await fs.mkdir("./databases/"); } catch {}
  try { await fs.rm("./databases/database.db"); } catch {}

  await resetDatabase();

  const adminData = await sealData('AdminAdmin', sessionOptions);
  const userData = await sealData('UserUser', sessionOptions);

  await getUsers().insert({
    id: 1,
    password: adminData,
    email: "admin@gmail.com",
    fullName: "Mr AdminAdmin",
    avatar: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
    isAdmin: true,
  });

  await getUsers().insert({
    id: 2,
    password: userData,
    email: "user@gmail.com",
    fullName: "Mr UserUser",
    avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
    isAdmin: false,
  });

  await db.destroy();
})();
