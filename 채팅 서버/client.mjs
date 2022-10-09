import net from "net";
import process from "process";
import readline from "readline";
import { CheckIn } from "./client_request.mjs";

process.setMaxListeners(0);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PORT = 2022;
const IP = "127.0.0.1";

let checkin_flag = false;

function getConnection() {
  let client = net.connect({ port: PORT, host: IP }, function () {
    this.on("data", function (data) {
      ////////////// 서버로부터 데이터를 수신해서 처리하는 곳 //////////////
      let data_string = data.toString();
      // check in
      if (data_string.includes("checkin")) {
        let data_split = data_string.split(":");
        let CI = CheckIn(data_split, checkin_flag);
        if (CI === true) checkin_flag = true;
      }
      // checkout
      else if (data_string.includes("checkout")) {
        console.log("\n< " + data_string + "\n");
      } else if (data_string.includes("disconnect")) {
        console.log("\n< " + data_string + "\n");
        rl.close();
        return;
      }
      // mission
      else if (data_string.includes("mission")) {
        let data_split = data_string.split(":");
        console.log("\n< " + data_split[1] + "\n");
      }
      // peersession
      else if (data_string.includes("peersession")) {
        // 모든 처리를 서버에서 함
      }
      // direct
      else if (data_string.includes("direct")) {
        console.log("\n< " + data_string + "\n");
      }
      // message
      else if (!data_string.includes("undefined")) {
        console.log("\n< " + data_string + "\n");
      }
      ////////////////////////////////////////////////////////////
      // input
      getInput(conn);
    });
    this.on("end", function () {
      console.log("Client disconnected");
    });
    this.on("error", function (err) {
      console.log("Socket Error: ", JSON.stringify(err));
    });
    this.on("timeout", function () {
      console.log("Socket Timed Out");
    });
    this.on("close", function () {
      console.log("Socket Closed");
    });
  });

  return client;
}

function writeData(socket, data) {
  var success = !socket.write(data);
  if (!success) {
    (function (socket, data) {
      socket.once("drain", function () {
        writeData(socket, data);
      });
    })(socket, data);
  }
}

function getInput(conn) {
  rl.question(">", function (input) {
    writeData(conn, input);
  });
}

// 첫 시작, TCP 서버에 연결
let conn = getConnection();
getInput(conn);
