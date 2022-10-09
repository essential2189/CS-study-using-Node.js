import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ReciveFromSender } from "./send(reciver).mjs";
import { printSender, printReciver, printSendData } from "./utils.mjs";
import promptSync from "prompt-sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const address = { "192.168.1.2": "CC:46:D6:A0:41:BB", "192.168.1.3": "3C:5A:B4:00:11:CD", "192.168.1.4": "CC:46:D6:B1:F9:CC", "192.168.1.5": "3C:5A:B4:93:01:4B", "192.168.1.6": "3C:5A:B4:11:7B:B0", "192.168.1.7": "CC:46:D6:B0:CC:EF", "192.168.1.8": "CC:46:D6:A4:3F:F0", "192.168.1.9": "3C:5A:B4:6F:EA:DC", "192.168.1.10": "3C:5A:B4:08:A4:5B" };

const SRC_IP = "192.168.1.2";
const DST_IP = "192.168.1.3";

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

function ApplicationLayer(from, to, title, contents) {
  console.log("\n=============== Sender Application Layer ===============\n");
  console.log(from);
  console.log(to);
  console.log(title);
  console.log("\\r\\n");
  console.log(contents);
  console.log("\n========================================================\n");
  PresentationLayer(from, to, title, contents);
}

function PresentationLayer(from, to, title, contents) {
  let base64EncodedText = Buffer.from(contents, "utf8").toString("base64");
  console.log("\n============== Sender Presentation Layer ===============\n");
  console.log(from);
  console.log(to);
  console.log(title);
  console.log("\\r\\n");
  console.log(base64EncodedText);
  console.log("\n========================================================\n");
  sleep(500);
  SeestionLayer(from, to, title, base64EncodedText);
}

function SeestionLayer(from, to, title, base64EncodedText) {
  let uuid = uuidv4();
  uuid = "Session-Id: " + uuid + "\\r\\n";
  console.log("\n================ Sender Seestion Layer =================\n");
  console.log(from);
  console.log(to);
  console.log(title);
  console.log(uuid);
  console.log("\\r\\n");
  console.log(base64EncodedText);
  console.log("\n========================================================\n");
  sleep(500);
  TransportLayer(from, to, title, uuid, base64EncodedText);
}

function TransportLayer(from, to, title, uuid, base64EncodedText) {
  const SRC_Port = 10001;
  const DST_Port = 200;
  const DATA = from + to + title + uuid + "\\r\\n" + base64EncodedText;
  const DATA_SIZE = DATA.length;
  let segment = false;
  let loop_count = 1;
  let sender_sqn = Math.floor(Math.random() * (100 - 1)) + 1;
  let reciver_sqn = 0;
  let connection = false;
  let contents = "";
  let contents_len = 0;
  let ack;
  let pkt = "";

  console.log("\n================ Sender Transport Layer ================\n");
  console.log(">> 요청 데이터");
  console.log(DATA + "\n\n");

  if (DATA_SIZE > 100) {
    if (DATA_SIZE % 100 == 0) loop_count = parseInt(DATA_SIZE / 100);
    else loop_count = parseInt(DATA_SIZE / 100) + 1;
    segment = true;
  }

  if (connection === false) {
    pkt = "SYN";
    printSender(pkt, SRC_Port, DST_Port, sender_sqn, ack, contents_len);
    sleep(500);
    let syn = NetworkLayer([pkt, SRC_Port, DST_Port, sender_sqn, ack, contents_len]);
    printReciver(syn[0], syn[1], syn[2], syn[3], syn[4], syn[5]);
    sleep(500);
    if (syn[0] === "SYN+ACK") {
      pkt = "ACK";
      reciver_sqn = syn[4];
      ack = syn[3];
      printSender(pkt, SRC_Port, DST_Port, reciver_sqn, ++ack, contents_len);
      connection = NetworkLayer([pkt, SRC_Port, DST_Port, ack, reciver_sqn, contents_len]);
    }
  }

  if (connection === true) {
    console.log("\n\nCONNECTION SUCCESS\n\n");
    pkt = "DATA";
    if (segment === true) {
      for (let i = 0; i < loop_count; i++) {
        if (i === loop_count - 1) segment = false;
        contents = DATA.slice(i * 100, (i + 1) * 100);
        sender_sqn += contents.length + 1;
        printSendData(pkt, SRC_Port, DST_Port, sender_sqn, segment, contents, contents.length);
        sleep(500);
        let rcv = NetworkLayer([pkt, SRC_Port, DST_Port, sender_sqn, ++ack, contents, contents.length]);
        printReciver(rcv[0], rcv[1], rcv[2], rcv[3], rcv[4], rcv[5]);
        sleep(500);
      }
    } else {
      sender_sqn += DATA.length + 1;
      printSendData(pkt, SRC_Port, DST_Port, sender_sqn, segment, DATA, DATA.length);
      sleep(500);
      let rcv = NetworkLayer([pkt, SRC_Port, DST_Port, sender_sqn, ++ack, contents, DATA.length]);
      printReciver(rcv[0], rcv[1], rcv[2], rcv[3], rcv[4], rcv[5]);
      sleep(500);
    }
  }
  console.log("\n========================================================\n");
  console.log("CONNECTION CLOSED");
  sleep(500);
  NetworkLayer(["CLOSED"]);
}

function NetworkLayer(header) {
  console.log("\n================= Sender Network Layer =================\n");
  console.log(">> Network Layer 요청", header);
  console.log([SRC_IP, DST_IP, header]);
  console.log("\n========================================================\n");
  sleep(500);
  return DataLinkLayer([SRC_IP, DST_IP, header]);
}

function DataLinkLayer(header) {
  console.log("\n================ Sender Data Link Layer ================\n");
  console.log(">> Data Link Layer 요청", header);
  console.log([address[SRC_IP], address[DST_IP], header]);
  console.log("\n========================================================\n");
  sleep(500);
  return PhysicalLayer([address[SRC_IP], address[DST_IP], header]);
}

function PhysicalLayer(header) {
  console.log("\n================ Sender Physical Layer =================\n");
  console.log(">> Physical Layer 요청", header);

  let text = header.toString();

  const bufferText = Buffer.from(text, "utf8");
  console.log("\n\nHEX : " + bufferText.toString("hex") + "\n\n");
  console.log("\n========================================================\n");
  sleep(500);
  const r = new ReciveFromSender(bufferText);
  return r.PhysicalLayer();
}

function getInput() {
  const prompt = promptSync();

  const from = prompt("From: ");
  const to = prompt("to: ");
  const title = prompt("title: ");
  const filename = prompt("filename: ");

  return [from, to, title, filename];
}

function main() {
  let input = getInput();
  let from = "From: " + input[0] + "\\r\\n";
  let to = "To: " + input[1] + "\\r\\n";
  let title = "Title: " + input[2] + "\\r\\n";
  let filename = input[3];
  const contenst = fs.readFileSync(__dirname + "/" + filename, { encoding: "utf8", flag: "r" });

  ApplicationLayer(from, to, title, contenst);
}

main();
