import fs from "fs";
import { int_string_split, __dirname } from "./utils.mjs";

function insertCSV(csvPath, col, value) {
  let columns = ["id", ...col];
  let data = fs.readFileSync(csvPath, { encoding: "utf8", flag: "r" });
  value = int_string_split(value); // split을 하면서 숫자는 numeric형으로 문자열은 string으로 변환.
  let values = [global.id_count, ...value];
  let value_join = values.join(",");
  let data_col = data.split("\n")[0].split(",");

  if (data_col.length !== columns.length) console.log("\n컬럼 갯수가 일치 하지 않습니다.\n");
  else {
    // insert 진행
    data += "\n" + value_join;
    console.log("\nINSERTED (" + value_join + ")\n");
    fs.writeFileSync(csvPath, data, { encoding: "utf8" });
    global.id_count++;
  }
}

export function insertInto(name, col, value) {
  insertCSV(__dirname + "/" + name + ".csv", col, value);
}
