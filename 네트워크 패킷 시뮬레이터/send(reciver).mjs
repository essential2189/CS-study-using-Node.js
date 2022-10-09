import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const address = { "CC:46:D6:A0:41:BB": "192.168.1.2", "3C:5A:B4:00:11:CD": "192.168.1.3", "CC:46:D6:B1:F9:CC": "192.168.1.4", "3C:5A:B4:93:01:4B": "192.168.1.5", "3C:5A:B4:11:7B:B0": "192.168.1.6", "CC:46:D6:B0:CC:EF": "192.168.1.7", "CC:46:D6:A4:3F:F0": "192.168.1.8", "3C:5A:B4:6F:EA:DC": "192.168.1.9", "3C:5A:B4:08:A4:5B": "192.168.1.10" };

const My_MAC = "3C:5A:B4:00:11:CD";

let contents = "";
export class ReciveFromSender {
  constructor(hex) {
    this.hex = hex;
    this.header = "";
    this.SRC_MAC = "";
    this.DST_MAC = "";
    this.SRC_IP = "";
    this.DST_IP = "";
    this.pkt = "";
    this.SRC_Port = 0;
    this.DST_Port = 0;
    this.sender_sqn = 0;
    this.ack = 0;
    this.contents_len = 0;
    this.reciver_sqn = Math.floor(Math.random() * (100 - 1)) + 1;
    this.sessionID = "";
    this.text = "";
    this.contents = "";
    this.segment = false;
  }

  PhysicalLayer() {
    this.header = this.hex.toString();
    return this.DataLinkLayer(this.header);
  }

  DataLinkLayer(header) {
    header = header
      .trim()
      .split(",")
      .map((e) => e.trim());

    this.SRC_MAC = header.shift();
    this.DST_MAC = header.shift();

    return this.NetworkLayer(header);
  }

  NetworkLayer(header) {
    this.SRC_IP = header.shift();
    this.DST_IP = header.shift();

    return this.TransportLayer(header);
  }

  TransportLayer(header) {
    this.pkt = header.shift();
    if (this.pkt === "CLOSED") {
      this.SessionLayer();
    }
    this.SRC_Port = header.shift();
    this.DST_Port = header.shift();
    this.sender_sqn = header.shift();

    this.ack = header.shift();

    if (this.pkt === "DATA") {
      this.contents = header.shift();
    }

    this.contents_len = header.shift();

    if (this.pkt === "SYN") return ["SYN+ACK", this.DST_Port, this.SRC_Port, this.reciver_sqn, ++this.sender_sqn, this.contents_len];
    else if (this.pkt === "ACK") return true;
    else if (this.pkt === "DATA") {
      contents += this.contents;
      return ["ACK", this.DST_Port, this.SRC_Port, this.sender_sqn, this.ack, 0];
    }
  }

  SessionLayer() {
    this.sessionID = contents.split("\\r\\n")[3];

    this.PresentationLayer();
  }

  PresentationLayer() {
    this.text = Buffer.from(contents.split("\\r\\n").slice(-1)[0], "base64").toString("utf8");
    this.ApplicationLayer();
  }

  ApplicationLayer() {
    fs.writeFileSync(__dirname + "/" + "sender_result.txt", this.text, "utf8");
    console.log("sender_result.txt Saved");
  }
}
