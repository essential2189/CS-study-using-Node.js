import { prompt } from "prompt-async";
import { cooking } from "./looper.mjs";

async function main() {
  console.log("> 메뉴  =  1. 라면(3초)    2. 떡볶이(5초)    3. 닭볶음탕(7초)    4. 갈비찜(10초)");
  console.log("> 주문할 음식을 입력하세요. 예) 라면 2개 => 1:2");
  console.log("> exit 입력시 종료");

  let Q = [];
  prompt.start();
  while (1) {
    const input = await prompt.get([">"]);
    let input_split = input[">"].split(":");
    for (let i = 0; i < input_split[1]; i++) {
      Q.push(input_split[0]);
    }
    cooking(Q);
  }
}

main();
