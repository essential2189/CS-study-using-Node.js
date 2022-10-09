import prompt from "prompt-async";
import { manager } from "./looper2.mjs";

global.flag = true;
global.delivery_wait = [];
global.deliverer = [];
global.delivering = [];

async function main2() {
  const cooker = 2;
  const delivery = 3;

  for (let i = 0; i < delivery; i++) global.deliverer.push([]);

  console.log("> 현재 요리사는 " + cooker + "명, 배달 기사는 " + delivery + "명입니다.");
  console.log("> 메뉴  =  1. 라면(3초)    2. 떡볶이(5초)    3. 닭볶음탕(7초)    4. 갈비찜(10초)");
  console.log("> 고객별로 주문할 음식 개수를 입력하세요. 예) A고객, 라면 2개, 떡볶이 1개 => A, 1:2, 2:1");
  console.log("> exit 입력시 종료");

  prompt.start();

  while (1) {
    let Q = [];

    const input = await prompt.get([">"]);
    let client = input[">"].split(",")[0];
    let menus = input[">"].split(",").slice(1);

    if (client.length === 0 || menus.length === 0) continue;
    for (let i = 0; i < menus.length; i++) {
      let menu_split = menus[i].split(":");
      for (let j = 0; j < menu_split[1]; j++) {
        Q.push(client + menu_split[0].trim());
      }
    }
    // console.log("현재 전체 대기 명단 :", Q);

    manager(Q, cooker);
    global.flag = false;
  }
}

main2();
