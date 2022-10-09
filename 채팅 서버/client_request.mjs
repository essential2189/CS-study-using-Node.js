export function CheckIn(data_split, checkin_flag) {
  if (checkin_flag === true) {
    console.log("이미 체크인했습니다.");
    return null;
  } else {
    if (data_split[1].includes("success")) {
      console.log("\n< " + data_split[1] + "\n");
      return true;
    } else if (data_split[1].includes("fail")) {
      console.log("\n< " + data_split[1] + "\n");
      return false;
    }
  }
}
