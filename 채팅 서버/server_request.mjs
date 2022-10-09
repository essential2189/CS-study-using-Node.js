import { broadcastLeftGroup, broadcast, findGroup } from "./utils.mjs";
import { writeData, max_camper, ID_list, group, mission_list, peersession_group, peersession_starter, peersession_flag, max_count, socket_list, checkin_time } from "./server.mjs";

// checkin
export function CheckIn(socket, data_string) {
  let data_split = data_string.split(" ");
  if (Number(data_split[1].slice(1)) <= max_camper && !ID_list.includes(data_split[1])) {
    ID_list.push(data_split[1]);
    socket.nickname = data_split[1];
    let group_id = 0;
    for (let i = 0; i < group.length; i++) {
      if (group[i].length < 4) {
        group[i].push(socket);
        group_id = i;
        break;
      }
    }
    checkin_time[socket.nickname] = new Date();
    console.log(">> checkin " + data_string + " (success) from " + socket.remoteAddress + ":" + socket.remotePort + " => group#" + group_id);
    writeData(socket, "checkin:checkin success group = " + (group_id + 1));
  } else {
    writeData(socket, "checkin:checkin fail");
  }
}

// checkout
export function CheckOut(socket) {
  let group_id = false;

  for (let i = 0; i < group.length; i++) {
    for (let j = 0; j < group[i].length; j++) {
      if (group[i][j].nickname === socket.nickname) {
        group[i].splice(j, 1);
        group_id = i;
        break;
      }
    }
    if (group_id !== false) break;
  }
  if (group_id !== false) {
    let time = new Date() - checkin_time[socket.nickname];
    console.log(">> checkout from group#" + group_id + " " + socket.nickname + " - disconnected");

    writeData(socket, "disconnect, 활동 시간 = " + time / 1000 + "s");
    broadcastLeftGroup(group_id, socket.nickname);
  }
}

// mission
export function Mission(socket, data_string) {
  let data_split = data_string.split(" ");
  let day = data_split[1];

  console.log("mission from " + socket.nickname + " : " + data_string + " => " + mission_list[day]);
  writeData(socket, "mission:keywords are " + mission_list[day]);
}

// peersession
export function Peersession(socket, data_string) {
  try {
    let group_id = findGroup(socket, group);

    if (peersession_flag[group_id] !== true) {
      peersession_starter.push(socket.nickname);
      max_count[group_id] = [Number(data_string.split("=")[1].trim()), 0];
      peersession_group.push(group[group_id]);
      peersession_flag[group_id] = true;
      broadcast(group_id, "server", "피어세션이 시작되었습니다.");
      console.log(">> message to group#" + (group_id + 1) + "=> 피어세션이 시작되었습니다, from=server");
    } else {
      writeData(socket, "이미 피어세션을 시작했습니다.");
    }
  } catch (err) {
    writeData(socket, "체크인을 먼저 해주세요.");
  }
}

// complete
export function Complete(socket) {
  if (peersession_starter.includes(socket.nickname)) {
    let group_id = findGroup(socket, group);
    peersession_flag[group_id] = false;
    broadcast(group_id, "server", "피어세션이 종료되었습니다.");
    console.log(">> message to group#" + (group_id + 1) + "=> 피어세션이 종료되었습니다, from=server");
  } else {
    writeData(socket, "당신은 피어세션 호스트가 아닙니다.");
  }
}

// message
export function Message(socket, data_string) {
  try {
    let peer_group_id = findGroup(socket, peersession_group);

    // 메시지 개수 +1
    let count = max_count[peer_group_id];
    count[1] += 1;
    max_count[peer_group_id] = [count[0], count[1]];

    console.log(">> message from " + socket.nickname + " => " + data_string);

    if (count[0] >= count[1] && peersession_flag[peer_group_id] === true) {
      broadcast(peer_group_id, socket.nickname, data_string);
      console.log(">> message to group#" + (peer_group_id + 1) + " => text=" + data_string + ", from=" + socket.nickname);
    } else if (peersession_flag[peer_group_id] === false) broadcast(peer_group_id, "server", "피어세션을 먼저 시작하세요");
    else broadcast(peer_group_id, "server", "최대 메시지 개수 초과.");
  } catch {
    writeData(socket, "피어세션을 먼저 시작해주세요.");
  }
}

// direct
export function Direct(socket, data_string) {
  try {
    let to = data_string.split(" ")[2].slice(0, -1);
    let msg = data_string.split(", ")[1];
    let flag = false;

    for (let i = 0; i < socket_list.length; i++) {
      if (socket_list[i].nickname === to) {
        writeData(socket_list[i], "direct from " + socket.nickname + ", " + msg);
        flag = true;
        break;
      }
    }
    console.log(">> direct from " + socket.nickname + " => to=" + to + ", text=" + data_string);
    if (flag === true) {
      writeData(socket, "direct (success)");
      console.log(">> message to " + to + " => " + ", text=" + data_string);
    } else writeData(socket, "direct (fail)");
  } catch {
    console.log("잘못된 양식입니다. 예) direct to {campID}, {msg}");
  }
}
