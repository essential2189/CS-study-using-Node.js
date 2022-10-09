import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function Init(dir) {
  fs.mkdirSync(path.join(__dirname, "/" + dir + "/.mit/objects"), { recursive: true });
  fs.mkdirSync(path.join(__dirname, "/" + dir + "/.mit/index"), { recursive: true });
  fs.writeFileSync(__dirname + "/" + dir + "/.mit/index/commits.txt", "");
}
