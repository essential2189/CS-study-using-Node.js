import fs from "fs";
import { int_string_split, findColumn, __dirname } from "./utils.mjs";

export function reportTable(name) {
  let fromPath = __dirname + "/" + name + ".csv";
  let data = fs.readFileSync(fromPath, { encoding: "utf8", flag: "r" });
  let data_split = data.split("\n");
  let data_csv = int_string_split(data_split);

  console.log("\n컬럼 종류 : " + data_csv[0]);
  console.log("전체 레코드 수 : " + (data_csv.length - 1));
  console.log("최초 레코드 : ", data_csv[1]);
  console.log("마지막 레코드 : ", data_csv[data_csv.length - 1], "\n");
}

export function exportTable(toName, fromName, where) {
  let fromPath = __dirname + "/" + fromName + ".csv";
  let toPath = __dirname + "/" + toName + ".csv";
  let data = fs.readFileSync(fromPath, { encoding: "utf8", flag: "r" });
  let data_split = data.split("\n");
  let data_csv = int_string_split(data_split);
  let col = findColumn(data_csv[0], where[0]);
  let flag = false;
  let result = "";
  let export_count = 0;

  // export 진행
  for (let i = 1; i < data_csv.length; i++) {
    if (data_csv[i][col] == where[1]) {
      result += data_csv[i] + "\n";
      console.log("(" + data_csv[i] + ")");
      flag = true;
      export_count++;
    }
  }
  console.log("\nEXPORT COUNT = " + export_count + "\n");
  if (flag === false) {
    console.log("\n조건에 맞는 레코드가 없습니다.\n");
    return;
  } else fs.writeFileSync(toPath, result, { encoding: "utf8" });
}

export function importTable(fromName, toName) {
  let fromPath = __dirname + "/" + fromName + ".csv";
  let toPath = __dirname + "/" + toName + ".csv";
  let fromData = fs.readFileSync(fromPath, { encoding: "utf8", flag: "r" });
  let from_data_split = fromData.split("\n");
  let toData = fs.readFileSync(toPath, { encoding: "utf8", flag: "r" });
  let to_data_split = toData.split("\n");
  let import_count = 0;
  let flag = false;

  // 비교를 위해 id 값 제거
  for (let i = 0; i < from_data_split.length; i++) from_data_split[i] = from_data_split[i].split(",").slice(1).join(",");

  // 비교를 위해 id 값 제거
  for (let i = 1; i < to_data_split.length; i++) to_data_split[i] = to_data_split[i].split(",").slice(1).join(",");

  // import 진행
  if (from_data_split[0].split(",").length === to_data_split[0].split(",").length - 1) {
    for (let i = 0; i < from_data_split.length; i++) {
      if (!to_data_split.includes(from_data_split[i]) && from_data_split[i].length !== 0) {
        to_data_split.push(from_data_split[i]);
        console.log("(" + from_data_split[i] + ")");
        import_count++;
        flag = true;
      }
    }
    console.log("\nIMPORT COUNT = " + import_count + "\n");
  } else {
    console.log("\n컬럼 개수가 일치하지 않습니다.\n");
  }

  if (flag === true) {
    // 앞에 id 1부터 다시 붙여주기
    for (let i = 1; i < to_data_split.length; i++) to_data_split[i] = i + "," + to_data_split[i];
    fs.writeFileSync(toPath, to_data_split.join("\n"), { encoding: "utf8" });
  } else {
    console.log("\n새로운 항목이 없습니다.\n");
  }
}
