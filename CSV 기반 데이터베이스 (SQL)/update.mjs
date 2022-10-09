import fs from "fs";
import { int_string_split, findColumn, __dirname } from "./utils.mjs";

function updateCSV(csvPath, set, where) {
  let data = fs.readFileSync(csvPath, { encoding: "utf8", flag: "r" });
  let data_split = data.split("\n");
  let data_csv = int_string_split(data_split);
  let where_col = findColumn(data_csv[0], where[0]);
  let set_col = findColumn(data_csv[0], set[0]);
  let flag = false;

  // update 진행
  for (let i = 1; i < data_csv.length; i++) {
    if (data_csv[i][where_col] == where[1]) {
      data_csv[i][set_col] = set[1];
      console.log("UPDATE (" + data_csv[i] + ")\n");
      flag = true;
    }
  }
  if (flag === false) {
    console.log("\n조건에 맞는 레코드가 없습니다.\n");
    return;
  }
  fs.writeFileSync(csvPath, data_csv.join("\n"), { encoding: "utf8" });
}

export function Update(name, set, where) {
  updateCSV(__dirname + "/" + name + ".csv", set, where);
}
