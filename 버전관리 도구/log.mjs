import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Log {
  constructor(dir, treeList) {
    this.dir = dir;
    this.treeList = treeList;
  }

  log() {
    const data = fs.readFileSync(__dirname + "/" + this.dir + "/.mit/index/commits.txt", { encoding: "utf8", flag: "r" });

    const data_split = data.split("\n");

    for (let i = 0; i < data_split.length - 1; i++) {
      console.log(Number(i + 1) + ". " + this.treeList[data_split[i]]);
    }
  }
}
