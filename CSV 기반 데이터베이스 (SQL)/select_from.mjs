import fs from "fs";
import { int_string_split, findColumn, __dirname } from "./utils.mjs";

function selectCSV(csvPath, where) {
  let data = fs.readFileSync(csvPath, { encoding: "utf8", flag: "r" });
  let data_split = data.split("\n");
  let data_csv = int_string_split(data_split); // split을 하면서 숫자는 numeric형으로 문자열은 string으로 변환.
  let col = findColumn(data_csv[0], where[0]); // where id = 1일 경우 id라는 컬럼이 몇번째 index에 있는지 찾는다.
  let flag = false;
  let select_count = 0;

  //select 진행
  for (let i = 1; i < data_csv.length; i++) {
    if (data_csv[i][col] == where[1]) {
      console.log("(" + data_csv[i] + ")");
      flag = true;
      select_count++;
    }
  }
  console.log("\nSELECTED COUNT = " + select_count + "\n");
  if (flag === false) {
    console.log("\n조건에 맞는 레코드가 없습니다.\n");
    return;
  }
}

export function selectFrom(name, where) {
  selectCSV(__dirname + "/" + name + ".csv", where);
}
