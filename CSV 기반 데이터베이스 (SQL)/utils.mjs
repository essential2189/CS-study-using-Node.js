import path from "path";
import { fileURLToPath } from "url";
import { isNumberObject } from "util/types";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export function CT(input, input_split) {
  let regex = /\({1}[^\)]+\){1}/gi;
  let col = input.match(regex)[0].slice(1, -1).split(", ");
  let name = input_split[2];
  return [name, col];
}

export function IN(input, input_split) {
  let regex = /\({1}[^\)]+\){1}/gi;
  let col = input.match(regex)[0].slice(1, -1).split(", ");
  let value = input
    .match(/(VALUES ){1}\({1}[^\)]+\){1}/gi)[0]
    .match(regex)[0]
    .slice(1, -1)
    .split(", ");
  let name = input_split[2];

  return [name, col, value];
}

export function DE(input, input_split) {
  let where = input
    .match(/(WHERE ){1}.+/gi)[0]
    .match(/[\w]+\s\=\s[\w\"]+/gi)[0]
    .split(" = ");
  let name = input_split[2];

  if (/\"[\w]+\"/gi.test(where)) where[1] = where[1].slice(1, -1);

  return [name, where];
}

export function UP(input, input_split) {
  let set = input_split
    .slice(2, 6)
    .join(" ")
    .match(/(SET ){1}.+/gi)[0]
    .match(/[\w]+\s\=\s[\w\"]+/gi)[0]
    .split(" = ");
  let where = input
    .match(/(WHERE ){1}.+/gi)[0]
    .match(/[\w]+\s\=\s[\w\"]+/gi)[0]
    .split(" = ");
  let name = input_split[1];

  if (/\"[\w]+\"/gi.test(set)) set[1] = set[1].slice(1, -1);
  if (/\"[\w]+\"/gi.test(where)) where[1] = where[1].slice(1, -1);

  return [name, set, where];
}

export function SL(input, input_split) {
  let where = input
    .match(/(WHERE ){1}.+/gi)[0]
    .match(/[\w]+\s\=\s[\w\"]+/gi)[0]
    .split(" = ");
  let name = input_split[2];

  if (/\"[\w]+\"/gi.test(where)) where[1] = where[1].slice(1, -1);

  return [name, where];
}

export function EX(input, input_split) {
  let where = input
    .match(/(WHERE ){1}.+/gi)[0]
    .match(/[\w]+\s\=\s[\w\"]+/gi)[0]
    .split(" = ");
  let toName = input_split[2];
  let fromName = input_split[4];

  if (/\"[\w]+\"/gi.test(where)) where[1] = where[1].slice(1, -1);

  return [toName, fromName, where];
}

export function int_string_split(data_split) {
  let data_csv = [];
  for (let i = 0; i < data_split.length; i++) {
    data_csv.push(
      data_split[i].split(",").map(function (t) {
        if (!isNaN(t)) return parseInt(t);
        else if (/\"[\w]+\"/gi.test(t)) return t.slice(1, -1);
        else return t;
      })
    );
  }
  return data_csv;
}

export function findColumn(col, command) {
  for (let i = 0; i < col.length; i++) {
    if (col[i] === command) return i;
  }
  console.log("조건에 맞는 컬럼이 없습니다.");
}
