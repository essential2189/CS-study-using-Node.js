import { group, peersession_group, writeData } from "./server.mjs";

export function broadcastLeftGroup(group_id, name) {
  if (group[group_id].length === 0) {
    process.stdout.write("\nEveryone left the chat\n");
    return;
  }

  group[group_id].forEach(function (socket, index, array) {
    writeData(socket, "checkout " + name + " (disconnected)");
  });
}

export function broadcast(peer_group_id, from, message) {
  if (peersession_group[peer_group_id].length === 0) {
    process.stdout.write("\nEveryone left the chat\n");
    return;
  }

  peersession_group[peer_group_id].forEach(function (socket, index, array) {
    if (socket.nickname === from) return;

    writeData(socket, "message from " + from + ", " + message);
  });
}

export function findGroup(sock, group) {
  let group_id = false;
  for (let i = 0; i < group.length; i++) {
    for (let j = 0; j < group[i].length; j++) {
      if (group[i][j].nickname === sock.nickname) {
        group_id = i;
      }
    }
    if (group_id !== false) break;
  }
  return group_id;
}
