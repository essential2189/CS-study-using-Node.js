import { self_close } from "./parser.js";
import { Stack } from "./stack.js";

const stack = new Stack();

export function check_xml(token_in) {
  let key = "";
  const regex = /\<.*\>/i;
  for (let i = 0; i < token_in.length; i++) {
    let temp = token_in[i].split(" ");
    if (regex.test(token_in[i]) == true) {
      if (temp.length > 1) {
        key = temp[0].slice(1);
      } else {
        key = temp[0].slice(1, -1);
      }

      if (key.slice(0, 1) == "/") {
        let sp = stack.pop();
        if ("/" + sp != key) {
          stack.push(sp);
          stack.push(key);
        }
      } else if (self_close.includes(("<" + key + ">").toLowerCase())) {
        continue;
      } else {
        stack.push(key);
      }
    }
  }
  console.log(stack);
  if (stack["_arr"].length == 0) {
    return true;
  } else {
    return false;
  }
}
