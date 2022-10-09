class Path {
  constructor(path) {
    this.path = this.checkPath(path);
    if (!(this.path.includes("/") && this.path.includes(":"))) {
      this.split = this.pathSplit(path);
      this.root = this.getRoot();
      this.base = this.getBase();
      this.ext = this.getExt();
      this.name = this.getName();
      this.lastDirectory = this.getLastDirectory();
      this.components = this.getComponents();
      this.absoluteString = this.getAbsoluteString();
    }
  }

  checkPath(path) {
    if (path.includes("/")) {
      let regex = /[^ㄱ-ㅎ가-힣\w\.\/\:\s]+/gi;
      if (regex.test(path) === true || path.includes("//")) throw new Error("올바른 Path가 아닙니다.");
    } else {
      let regex = /[\|\?*<\">\/]+/gi;
      if (regex.test(path) === true || path.includes("\\\\")) throw new Error("올바른 Path가 아닙니다.");
    }
    return path;
  }

  multiPath() {
    if (this.path.includes("/") && this.path.includes(":")) return this.path.split(":");
  }

  pathSplit(path) {
    if (path.includes("/")) {
      let temp = path.split("/");
      temp[0] = "/";
      return temp;
    } else return path.split("\\");
  }

  getRoot() {
    if (this.split[0] === "/") {
      return "/";
    } else {
      let regex = /[a-zA-Z]:[\\\/]/gi;
      return this.path.match(regex)[0];
    }
  }

  setRoot(root) {
    this.root = root;
  }

  getBase() {
    let regex = /[\w]+\.[\w]+/gi;
    if (regex.test(this.path) === true) return this.path.match(regex)[0];
    else return "";
  }

  setBase(base) {
    this.base = base;
  }

  getExt() {
    let regex = /\.[\w]+/gi;
    if (regex.test(this.path) === true) return this.path.match(regex)[0];
    else return "";
  }

  setExt(ext) {
    this.ext = ext;
  }

  getName() {
    if (this.base.length > 0) return this.base[0].split(".")[0];
    else return "";
  }

  setName(name) {
    this.name = name;
  }

  getLastDirectory() {
    return this.split[this.split.length - 2];
  }

  setLastDirectory(lastDirectory) {
    this.lastDirectory = lastDirectory;
  }

  getComponents() {
    if (this.split[0] === "/") {
      return [...this.split];
    } else {
      return [this.root, ...this.split.slice(1)];
    }
  }

  getAbsoluteString() {
    if (this.root === "/") return this.root + this.getComponents().slice(1, -1).join("/") + "/" + this.base;
    else return this.root + this.getComponents().slice(1, -1).join("\\") + "\\" + this.base;
  }

  appendComponent(string) {
    let temp = this.split.slice(0, -1);
    temp.push(string);
    temp.push(this.getBase());
    this.split = temp;
    if (this.root === "/") this.path = this.split.join("/").slice(1);
    else this.path = this.split.join("\\");
    return this.path;
  }

  deleteLastComponent() {
    let temp = this.split.slice(0, -2);
    temp.push(this.getBase());
    this.split = temp;
    if (this.root === "/") this.path = this.split.join("/").slice(1);
    else this.path = this.split.join("\\");
    return this.path;
  }

  relative(input_path) {
    let input_split = this.pathSplit(input_path).slice(1);
    let split = this.split.slice(1);

    let idx = 0;
    let count = 0;
    for (let i = 0; i < split.length; i++) {
      if (split[i] != input_split[idx]) {
        count++;
      }
      if (idx < input_split.length) idx++;
    }

    let temp = [];
    for (let i = 0; i < count; i++) {
      temp.push("..");
    }
    if (count >= input_split.length) {
      temp.push([...input_split]);
    } else {
      temp.push([...input_split.slice(input_split.length - count)]);
    }
    temp = temp.flat(Infinity);
    return temp.join("/");
  }

  stringfy() {
    if (this.root === "/") return { root: this.root, dir: this.root + this.components.slice(1, -1).join("/"), base: this.base, ext: this.ext, name: this.name };
    else return { root: this.root, dir: this.root + this.components.slice(1, -1).join("\\"), base: this.base, ext: this.ext, name: this.name };
  }

  printALL() {
    console.log("root : " + this.getRoot());
    console.log("base : " + this.getBase());
    console.log("ext : " + this.getExt());
    console.log("name : " + this.getName());
    console.log("lastDirectory : " + this.getLastDirectory());
    console.log("components :", this.getComponents());
    console.log("absoluteString : " + this.getAbsoluteString());
  }
}

module.exports = Path;

function mission1() {
  console.log("=========================UNIX=========================");
  const unix_path = new Path("/home/왕 승 재/boost/camp/challenge/day17/problem.md");
  unix_path.printALL();
  console.log("======================================================");

  console.log("========================WINDOW========================");
  const win_path = new Path("C:\\home\\왕 승 재\\boost\\camp\\challenge\\day17\\problem.md");
  win_path.printALL();
  console.log("======================================================");

  const unix_multipath = new Path("/usr/bin:/usr/local/bin");
  console.log("MULTI PATH : /usr/bin:/usr/local/bin");
  console.log(unix_multipath.multiPath());

  // test error
  // const error_path = new Path("/home/왕 승 재//boost/camp/challenge/day17/problem.md");
}

function mission2() {
  var path = new Path("/home/user/boost/camp/challenge/day12/problem.md");

  path.appendComponent("base");
  path.appendComponent("camp");
  console.log("========================Append========================");
  path.printALL();
  console.log("======================================================");

  path.deleteLastComponent();
  console.log("========================Delete========================");
  path.printALL();
  console.log("======================================================");

  const path1 = new Path("/first/second/last/param");
  console.log("=======================Relative=======================");
  console.log(path1.relative("/first/second/most/jk"));
  console.log(path1.relative("/second/most/jk"));
  console.log(path1.relative("/first/third/most/jk"));

  console.log("======================================================");
}

// mission1();
// mission2();
