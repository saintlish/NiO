import { Low, JSONFile } from "lowdb";
const adapter = new JSONFile("./cache.json");
export const db = new Low(adapter);
await db.read();
db.data ||= {};
db.write();
