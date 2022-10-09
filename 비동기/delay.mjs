export function delay_noodle(i, client) {
  return new Promise((resolve) =>
    setTimeout(() => {
      global.delivery_wait.push(client + "라면");
      console.log("\n요리사" + i + " - " + client + "라면 완성");
      resolve(i);
    }, 3000)
  );
}

export function delay_rice(i, client) {
  return new Promise((resolve) =>
    setTimeout(() => {
      global.delivery_wait.push(client + "떡볶이");
      console.log("\n요리사" + i + " - " + client + "떡볶이 완성");
      resolve(i);
    }, 5000)
  );
}

export function delay_chicken(i, client) {
  return new Promise((resolve) =>
    setTimeout(() => {
      global.delivery_wait.push(client + "닭볶음탕");
      console.log("\n요리사" + i + " - " + client + "닭볶음탕 완성");
      resolve(i);
    }, 7000)
  );
}

export function delay_galbi(i, client) {
  return new Promise((resolve) =>
    setTimeout(() => {
      global.delivery_wait.push(client + "갈비찜");
      console.log("\n요리사" + i + " - " + client + "갈비찜 완성");
      resolve(i);
    }, 10000)
  );
}

export function delay_delivery(i, client) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("\n배달기사" + i + " - 고객" + client + " 배달완료");
      resolve(i);
    }, 10000)
  );
}
