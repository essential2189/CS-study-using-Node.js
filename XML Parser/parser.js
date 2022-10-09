import { Stack } from "./stack.js";
export const self_close = [
  "<area/>",
  "<base/>",
  "<br/>",
  "<col/>",
  "<embed/>",
  "<hr/>",
  "<img/>",
  "<input/>",
  "<link/>",
  "<meta/>",
  "<param/>",
  "<source/>",
  "<track/>",
  "<wbr/>",
];

export function parser(xml) {
  let count = 0;

  for (let i = 0; i < xml.length; i++) {
    const regex_open = /\<.*\>/gi;
    const regex_close = /\<\/.*\>/gi;
    if (regex_close.test(xml[i])) {
      count++;
    }
  }

  // Lexer
  let text = "";
  let text_list = [];
  let for_cnt = 0;
  for (let i = 0; i < xml.length; i++) {
    const regex_open = /\<.*\>/gi;
    const regex_close = /\<\/.*\>/gi;
    if (regex_close.test(xml[i]) || self_close.includes(xml[i].toLowerCase())) {
      if (self_close.includes(xml[i].toLowerCase())) {
        text = text.split(",").slice(0, -1).join(",");
        text += "," + xml[i];
        text_list.push(text);
        text = text.split(",").slice(0, -1).join(",");
        continue;
      }
      text_list.push(text.slice(0, -1));
      text = text.split(",").slice(0, -1).join(",");
    } else if (regex_open.test(xml[i])) {
      text += xml[i] + ",";
      for_cnt++;
    } else {
      text = text.slice(0, -1) + xml[i] + ",";
    }
  }

  for (let i = 0; i < text_list.length; i++) {
    if (text_list[i].split(",").length != count) {
      delete text_list[i];
    }
  }

  // array에서 빈 값 제거
  text_list = text_list.filter(function (item) {
    return item !== null && item !== undefined && item !== "";
  });

  // Parser
  const stringToObject = (arr) => {
    const obj = {};
    arr.forEach((str) => {
      let curr = obj;
      let splitted = str.split(",");
      let last = splitted.pop();
      let beforeLast = splitted.pop();
      splitted.forEach((sub) => {
        if (!curr.hasOwnProperty(sub)) {
          curr[sub] = {};
        }
        curr = curr[sub];
      });
      if (!curr[beforeLast]) {
        curr[beforeLast] = [];
      }
      curr[beforeLast].push(last);
    });
    return obj;
  };
  return JSON.stringify(stringToObject(text_list), undefined, 2);
}
