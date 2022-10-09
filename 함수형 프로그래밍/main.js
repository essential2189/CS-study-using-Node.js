import { BoostSet } from "./BoostSet.js";
import { CountSet } from "./CountSet.js";

// 기능 확인
function main() {
  // BoostSet 입력값 수정
  const arrA = [1, 2, 3];
  const arrB = [1, 3];

  const boost_set = new BoostSet(arrA);

  boost_set.closure(arrB);

  // CountSet 입력값 수정
  const objectA = { 1: 2, 2: 2, 3: 2 };
  const objectB = { 1: 1, 3: 3 };

  let count_set = new CountSet(objectA);

  count_set.closure(objectB);
}

main();
