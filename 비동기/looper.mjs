import { delay_noodle, delay_rice, delay_chicken, delay_galbi } from "./delay.mjs";

export async function cooking(Q) {
  while (Q.length) {
    let menu = Q.shift();

    if (menu === "1") {
      console.log("\n라면 시작");
      console.log(":" + menu, Q);
      await delay_noodle();
    } else if (menu === "2") {
      console.log("\n떡볶이 시작");
      console.log(":" + menu, Q);
      await delay_rice();
    } else if (menu === "3") {
      console.log("\n닭볶음탕 시작");
      console.log(":" + menu, Q);
      await delay_chicken();
    } else if (menu === "2") {
      console.log("\n갈비찜 시작");
      console.log(":" + menu, Q);
      await delay_galbi();
    }
  }
}
