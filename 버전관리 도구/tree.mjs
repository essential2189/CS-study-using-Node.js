import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Tree {
  constructor(dir, hashMap) {
    this.dir = dir;
    this.hashMap = hashMap;
  }
  getFilesizeInBytes(filename) {
    let stats = fs.statSync(filename);
    let fileSizeInBytes = stats.size;
    return fileSizeInBytes;
  }

  getContents(i) {
    let front = this.hashMap[i].slice(0, 8);
    let back = this.hashMap[i].slice(8);

    let filename = __dirname + "/" + this.dir + "/.mit/objects/" + front + "/" + back + ".txt.gz";
    let temp = front + ", " + this.getFilesizeInBytes(filename) + ", " + back;
    return temp;
  }

  mktree() {
    let filelist = fs.readdirSync(__dirname + "/" + this.dir + "/.mit/objects");
    let text = "";
    for (let i = 0; i < filelist.length; i++) {
      if (filelist[i] !== ".DS_Store") {
        let filename = fs.readdirSync(__dirname + "/" + this.dir + "/.mit/objects/" + filelist[i]);
        text += filelist[i] + ", " + this.getFilesizeInBytes(__dirname + "/" + this.dir + "/.mit/objects/" + filelist[i]) + ", " + filename + "\n";
      }
    }

    const hash = crypto.createHash("sha256");

    hash.update(text);

    const hex = hash.copy().digest("hex");

    let front = hex.slice(0, 8);
    let back = hex.slice(8);

    fs.mkdirSync(path.join(__dirname, "/" + this.dir + "/.mit/objects/" + front + "/"), { recursive: true });

    fs.writeFileSync(__dirname + "/" + this.dir + "/.mit/objects/" + front + "/" + back + ".txt", text, { encoding: "utf8" });

    return hex;
  }
}
