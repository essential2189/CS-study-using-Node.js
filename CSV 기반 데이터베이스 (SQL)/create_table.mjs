import fs from "fs";
import { __dirname } from "./utils.mjs";

function writeCSV(csvPath, column_list) {
  let columns = ["id"];

  // 이름이 id가 아닌 컬럼들을 리스트에 push
  for (let i = 0; i < column_list.length; i++) {
    let name = column_list[i].split(" ")[0];
    if (name !== "id") columns.push(name);
    else console.log("id라는 컬럼은 추가할 수 없습니다.");
  }
  // 리스트를 join해서 문자열로 만들어서 csv 파일 생성
  fs.writeFileSync(csvPath, columns.join(","), { encoding: "utf8" });
  console.log("\nCSV file is successfully created at " + csvPath + "\n");
}

export function createTable(name, column_list) {
  try {
    if (fs.existsSync(__dirname + "/" + name + ".csv")) {
      console.log("File already exist");
    } else {
      writeCSV(__dirname + "/" + name + ".csv", column_list);
    }
  } catch (err) {
    console.error(err);
  }
}
