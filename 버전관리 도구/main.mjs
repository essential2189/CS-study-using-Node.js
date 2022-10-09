import { Init } from "./init.mjs";
import { Blob } from "./blob.mjs";
import { Tree } from "./tree.mjs";
import { Commit } from "./commit.mjs";
import { Log } from "./log.mjs";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import promptSync from "prompt-sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFiles(dir) {
  return fs.readdirSync(dir).flatMap((item) => {
    if (item !== ".DS_Store" && item !== ".mit") {
      const path = `${dir}/${item}`;

      if (fs.statSync(path).isDirectory()) {
        return getFiles(path);
      }

      return path;
    }
  });
}

function rmEmpty(file_list) {
  file_list = file_list.filter(function (item) {
    return item !== null && item !== undefined && item !== "";
  });
  return file_list;
}

function createHash(file_list) {
  let hashMap = {};
  for (let i = 0; i < file_list.length; i++) {
    const hash = crypto.createHash("sha256");
    const fileBuffer = fs.readFileSync(file_list[i], "utf8");

    hash.update(fileBuffer);

    const hex = hash.copy().digest("hex");

    hashMap[file_list[i]] = hex;
  }
  return hashMap;
}

function deepCopyObject(inObject) {
  var outObject, value, key;
  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }
  outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    value = inObject[key];
    outObject[key] = typeof value === "object" && value !== null ? deepCopyObject(value) : value;
  }
  return outObject;
}

class mit {
  constructor(dir) {
    this.dir = dir;
    this.file_list = [];
    this.hashMap = {};
    this.treeHashList = [];
    this.treeList = {};
  }

  init() {
    Init(this.dir);
    this.file_list = rmEmpty(getFiles(this.dir));
  }

  commit_command() {
    let preMap = deepCopyObject(this.hashMap);

    this.file_list = rmEmpty(getFiles(this.dir));
    this.hashMap = createHash(this.file_list);

    let temp = {};
    let flag = false;
    for (const p in preMap) {
      if (p in this.hashMap && preMap[p] !== this.hashMap[p]) {
        temp[p] = this.hashMap[p];
        flag = true;
      }
    }
    if (flag === true) {
      this.hashMap = temp;
      console.log("File Changed : " + Object.keys(this.hashMap));
      this.blob();
      let h = this.tree();
      this.treeHashList.push(h);
      this.commit();
    } else if (flag === false && Object.keys(preMap).length === 0) {
      console.log("New File : " + Object.keys(this.hashMap));
      this.blob();
      let h = this.tree();
      this.treeHashList.push(h);
      this.commit();
    } else {
      console.log("No File Changed");
    }
  }

  blob() {
    for (let i in this.hashMap) {
      let b = new Blob(this.hashMap[i], this.dir);
      b.mkblob(i);
    }
  }

  tree() {
    let t = new Tree(this.dir, this.hashMap);
    let h = t.mktree();
    return h;
  }

  commit() {
    let c = new Commit(this.dir, this.treeHashList, this.hashMap);
    let result = c.commit();
    this.treeList[result[0]] = result[1];
  }

  log() {
    let l = new Log(this.dir, this.treeList);
    l.log();
  }

  main() {
    while (1) {
      let input = getInput();

      if (input == "exit") {
        break;
      }

      let input_split = input.split(" ");
      if (input_split.length < 3) {
        console.log("입력값이 올바르지 않습니다.");
        continue;
      }

      if (input_split[1] == "init") {
        this.init();
      } else if (input_split[1] == "commit") {
        this.commit_command();
      } else if (input_split[1] == "log") {
        this.log();
      }
    }
  }
}

function getInput() {
  const prompt = promptSync();

  const input = prompt("> ");

  return input;
}

function main() {
  console.log("exit 입력시 종료합니다.");
  let input = getInput();
  if (input == "exit") {
    return;
  }

  let input_split = input.split(" ");
  if (input_split.length < 3) {
    console.log("입력값이 올바르지 않습니다.");
    return;
  }

  let m = new mit(input_split[2]);

  if (input_split[1] == "init") {
    m.init();
  } else if (input_split[1] == "commit") {
    m.commit_command();
  } else if (input_split[1] == "log") {
    m.log();
  }

  m.main();
}

main();
