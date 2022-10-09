import fs from "fs";
import { __dirname } from "./utils.mjs";

export function dropTable(name) {
  let csvPath = __dirname + "/" + name + ".csv";

  try {
    fs.unlinkSync(csvPath);
    console.log("\n" + csvPath + " 를 정상적으로 삭제했습니다.\n");
  } catch (err) {
    if (err) {
      console.log("\n존재하지 않는 파일 또는 삭제가 불가능한 파일입니다.\n");
    }
  }
}
