import fs from "fs";
import { int_string_split, findColumn, __dirname } from "./utils.mjs";

function deleteCSV(csvPath, command) {
  let data = fs.readFileSync(csvPath, { encoding: "utf8", flag: "r" });
  let data_split = data.split("\n");
  let data_csv = int_string_split(data_split); // split을 하면서 숫자는 numeric형으로 문자열은 string으로 변환.
  let col = findColumn(data_csv[0], command[0]); // where id = 1일 경우 id라는 컬럼이 몇번째 index에 있는지 찾는다.
  let flag = false;

  //delete 진행
  for (let i = 1; i < data_csv.length; i++) {
    if (data_csv[i][col] == command[1]) {
      console.log("DELETED (" + data_csv[i] + ")\n");
      data_csv.splice(i, 1);
      i--;
      global.id_count--;
      flag = true;
    }
  }
  if (flag === false) {
    console.log("\n조건에 맞는 데이터가 없습니다.\n");
    return;
  }

  // 삭제를 진행한 경우 id 값들을 1부터 다시 재정렬 해준다.
  for (let i = 1; i < data_csv.length; i++) data_csv[i][0] = i;
  fs.writeFileSync(csvPath, data_csv.join("\n"), { encoding: "utf8" });
}

export function deleteFrom(name, where) {
  deleteCSV(__dirname + "/" + name + ".csv", where);
}
