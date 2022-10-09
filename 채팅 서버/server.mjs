import net from "net";
import { CheckIn, CheckOut, Mission, Peersession, Message, Complete, Direct } from "./server_request.mjs";

const PORT = 2022;
const IP = "127.0.0.1";
const max_group = 4;
export const max_camper = 384;
export const mission_list = { day1: "IDE, node", day2: "Linux, Shell", day3: "Crawling, LRU", day4: "Heap, Stack", day6: "XML, XPath", day7: "Object, Class", day8: "CountSet, Closure", day9: "Process, Thread", day11: "Path, UnitTest", day12: "Git, Objects", day13: "OSI, TCP/IP", day14: "HTTP, Request", day16: "Event, Async", day17: "Food, Delivery", day18: "SQL, Report", day19: "Network, Server" };
export let ID_list = [];
export let group = [];
export let socket_list = [];
export let peersession_group = [];
export let peersession_starter = [];
export let peersession_flag = {}; // key:group_id, value:boolean
export let max_count = {}; // key:peer_group_id, value:[maxCount, currentCount]
export let checkin_time = {}; // key:campID, value:time
for (let i = 0; i < max_camper / max_group; i++) group.push([]);

let server = net.createServer(function (socket) {
  console.log("Connected: " + socket.remoteAddress + ":" + socket.remotePort);
  socket_list.push(socket);
  socket.on("data", function (data) {
    ////////////// 클라이언트로부터 데이터를 수신해서 처리 후 송신 //////////////
    let data_string = data.toString();
    // checkin
    if (data_string.includes("checkin")) {
      CheckIn(socket, data_string);
    }
    // checkout
    else if (data_string.includes("checkout")) {
      CheckOut(socket);
    }
    // mission
    else if (data_string.includes("mission")) {
      Mission(socket, data_string);
    }
    // peersession
    else if (data_string.includes("peersession")) {
      Peersession(socket, data_string);
    }
    // complete
    else if (data_string.includes("complete")) {
      Complete(socket);
    }
    // direct
    else if (data_string.includes("direct")) {
      Direct(socket, data_string);
    }
    // message
    else {
      writeData(socket, "undefined");
      if (socket.nickname !== undefined) Message(socket, data_string);
      else writeData(socket, "체크인부터 해주세요.");
    }
    /////////////////////////////////////////////////////////////////
  });

  socket.on("end", function () {
    CheckOut(socket);
  });
});

export function writeData(socket, data) {
  var success = !socket.write(data);
  if (!success) {
    (function (socket, data) {
      socket.once("drain", function () {
        writeData(socket, data);
      });
    })(socket, data);
  }
}

server.on("error", function (error) {
  console.log("So we got problems!", error.message);
});

server.listen(PORT, IP);
console.log("Server Created at " + IP + ":" + PORT + "\n");
