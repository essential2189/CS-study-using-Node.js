import { delay_noodle, delay_rice, delay_chicken, delay_galbi, delay_delivery } from "./delay.mjs";

let queue = [];
let last_client = "";
let menu_str = "";
let client = "";
let menu = "";

async function Delivery(client) {
  let noodle = 0;
  let rice = 0;
  let chicken = 0;
  let galbi = 0;
  let total_menu = "";

  for (let i = 0; i < global.delivery_wait.length; i++) {
    if (global.delivery_wait[i].includes(client)) {
      if (global.delivery_wait[i].includes("라면")) noodle++;
      else if (global.delivery_wait[i].includes("떡볶이")) rice++;
      else if (global.delivery_wait[i].includes("닭볶음탕")) chicken++;
      else if (global.delivery_wait[i].includes("갈비찜")) galbi++;
    }
  }
  if (noodle > 0) total_menu += "라면" + noodle;
  if (rice > 0) total_menu += "떡볶이" + rice;
  if (chicken > 0) total_menu += "닭볶음탕" + chicken;
  if (galbi > 0) total_menu += "갈비찜" + galbi;

  global.delivery_wait = global.delivery_wait.filter((number) => !number.includes(client));

  for (let i = 0; i < global.deliverer.length; i++) {
    if (global.deliverer[i].length === 0) {
      global.deliverer[i].push(client);
      console.log("배달기사" + (i + 1) + " - " + "고객" + client + " 배달시작");
      global.delivering.push(client + "-" + total_menu);
      delay_delivery(i + 1, client);
      break;
    }
  }
}

async function cooking(queue, cooker) {
  const promises = [];
  let cook_list = [];
  let flag = false;
  for (let i = 1; i <= cooker; i++) {
    // 요리사(Chef)는 메뉴를 한 번에 2개 메뉴까지 동시에 만들 수 있다고 가정한다.
    for (let max_cook = 0; max_cook < 2; max_cook++) {
      if (queue[0] === "/") {
        queue.shift();
        flag = true;
        last_client = client;
        max_cook--;
        continue;
      }
      if (queue.length) {
        menu_str = queue.shift();

        client = menu_str.slice(0, 1);
        menu = menu_str.slice(1);

        if (menu === "1") {
          cook_list.push("c" + i + " - " + client + "라면");
          console.log("\n요리사" + i + " - " + client + "라면 시작");
          console.log("제작 : " + cook_list + " // 대기 : " + queue + " // 배달 대기 : " + global.delivery_wait + " // 배달중 : " + global.delivering);
          promises.push(delay_noodle(i, client));
        } else if (menu === "2") {
          cook_list.push("c" + i + " - " + client + "떡볶이");
          console.log("\n요리사" + i + " - " + client + "떡볶이 시작");
          console.log("제작 : " + cook_list + " // 대기 : " + queue + " // 배달 대기 : " + global.delivery_wait + " // 배달중 : " + global.delivering);
          promises.push(delay_rice(i, client));
        } else if (menu === "3") {
          cook_list.push("c" + i + " - " + client + "닭볶음탕");
          console.log("\n요리사" + i + " - " + client + "닭볶음탕 시작");
          console.log("제작 : " + cook_list + " // 대기 : " + queue + " // 배달 대기 : " + global.delivery_wait + " // 배달중 : " + global.delivering);
          promises.push(delay_chicken(i, client));
        } else if (menu === "4") {
          cook_list.push("c" + i + " - " + client + "갈비찜");
          console.log("\n요리사" + i + " - " + client + "갈비찜 시작");
          console.log("제작 : " + cook_list + " // 대기 : " + queue + " // 배달 대기 : " + global.delivery_wait + " // 배달중 : " + global.delivering);
          promises.push(delay_galbi(i, client));
        }
      }
    } //max count
  } // cooker
  await Promise.all(promises);

  if (flag === true) {
    await Delivery(last_client);
  }
  if (queue.length === 0) console.log("제작 : " + cook_list + " // 대기 : " + queue + " // 배달 대기 : " + global.delivery_wait + " // 배달중 : " + global.delivering);
}

export async function manager(Q, cooker) {
  if (global.flag === false) {
    queue.push(...Q, "/");
  } else if (global.flag === true) {
    queue.push(...Q, "/");
    while (queue.length) {
      await cooking(queue, cooker);
    }
  }
}
