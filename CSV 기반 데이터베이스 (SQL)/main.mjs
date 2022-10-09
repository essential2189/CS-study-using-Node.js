import promptSync from "prompt-sync";
import { createTable } from "./create_table.mjs";
import { insertInto } from "./insert_into.mjs";
import { deleteFrom } from "./delete_from.mjs";
import { Update } from "./update.mjs";
import { selectFrom } from "./select_from.mjs";
import { dropTable } from "./drop_table.mjs";
import { reportTable, exportTable, importTable } from "./port_table.mjs";
import { CT, IN, DE, UP, SL, EX } from "./utils.mjs";

global.id_count = 1;

function getInput() {
  const prompt = promptSync();
  const input = prompt("> ");
  return input;
}

function main() {
  while (1) {
    let input = getInput();
    let input_split = input.split(" ");
    let sql = input_split.slice(0, 2).join(" ").toUpperCase();

    try {
      if (sql === "CREATE TABLE") {
        let regex = CT(input, input_split);
        createTable(regex[0], regex[1]);
      } else if (sql === "INSERT INTO") {
        let regex = IN(input, input_split);
        insertInto(regex[0], regex[1], regex[2]);
      } else if (sql === "DELETE FROM") {
        let regex = DE(input, input_split);
        deleteFrom(regex[0], regex[1]);
      } else if (input_split[0].toUpperCase() === "UPDATE") {
        let regex = UP(input, input_split);
        Update(regex[0], regex[1], regex[2]);
      } else if (sql === "SELECT FROM") {
        let regex = SL(input, input_split);
        selectFrom(regex[0], regex[1]);
      } else if (sql === "DROP TABLE") {
        dropTable(input_split[2]);
      } else if (sql === "REPORT TABLE") {
        reportTable(input_split[2]);
      } else if (sql === "EXPORT TO") {
        let regex = EX(input, input_split);
        exportTable(regex[0], regex[1], regex[2]);
      } else if (sql === "IMPORT FROM") {
        importTable(input_split[2], input_split[4]);
      }
    } catch {
      console.log("\ncondition 형식에 맞춰서 입력해주세요.\n예) WHERE column = word\n");
    }
  }
}

main();
