import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Commit {
  constructor(dir, treeHashList, hashMap) {
    this.treeHashList = treeHashList;
    this.dir = dir;
    this.hashMap = hashMap;
    this.changedFile = {};
  }

  commit() {
    let text = "";

    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜

    if (this.treeHashList.length > 1) {
      text = this.treeHashList.shift() + ", " + this.treeHashList.shift() + "\n" + year + "/" + month + "/" + date;
    }

    const hash = crypto.createHash("sha256");

    hash.update(text);

    const hex = hash.copy().digest("hex");

    let front = hex.slice(0, 8);
    let back = hex.slice(8);

    fs.mkdirSync(path.join(__dirname, "/" + this.dir + "/.mit/objects/" + front + "/"), { recursive: true });

    fs.writeFileSync(__dirname + "/" + this.dir + "/.mit/objects/" + front + "/" + back + ".txt", text, "utf8");

    // commit 역순으로 해시값을 commits.txt에 저장
    let index_commit = fs
      .readFileSync(__dirname + "/" + this.dir + "/.mit/index/commits.txt")
      .toString()
      .split("\n");

    index_commit.unshift(hex);
    fs.writeFileSync(__dirname + "/" + this.dir + "/.mit/index/commits.txt", index_commit.join("\n"), { encoding: "utf8" });
    return [hex, Object.keys(this.hashMap)];
  }
}
