import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Blob {
  constructor(hash, dir) {
    this.hash = hash;
    this.front = hash.slice(0, 8);
    this.back = hash.slice(8);
    this.dir = dir;
    this.filename = __dirname + "/" + this.dir + "/.mit/objects/" + this.front + "/" + this.back;
  }

  mkblob() {
    fs.mkdirSync(path.join(__dirname, "/" + this.dir + "/.mit/objects/" + this.front + "/"), { recursive: true });

    var input = new Buffer.from(this.hash, "utf8");

    fs.writeFileSync(__dirname + "/" + this.dir + "/.mit/objects/" + this.front + "/" + this.back + ".txt", zlib.deflateSync(input), { encoding: "utf8" });
  }
}
