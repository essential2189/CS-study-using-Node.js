export function printSender(pkt, SRC_Port, DST_Port, sender_sqn, ack, contents_len) {
  console.log(">> Sending Packet : " + pkt);
  console.log("Source Port : " + SRC_Port);
  console.log("Destination Port : " + DST_Port);
  console.log("Sequence Number : " + sender_sqn);
  console.log("Ack Number : " + ack);
  console.log("Content-Length : " + contents_len);
  console.log("[" + pkt + ", " + SRC_Port + ", " + DST_Port + ", " + sender_sqn + ", " + ack + ", " + contents_len + "]\n\n");
}
export function printReciver(pkt, SRC_Port, DST_Port, sender_sqn, ack, contents_len) {
  console.log("<< Received Packet : " + pkt);
  console.log("Source Port : " + DST_Port);
  console.log("Destination Port : " + SRC_Port);
  console.log("Sequence Number : " + sender_sqn);
  console.log("Ack Number : " + ack);
  console.log("Content-Length : " + contents_len);
  console.log("[" + pkt + ", " + SRC_Port + ", " + DST_Port + ", " + sender_sqn + ", " + ack + ", " + contents_len + "]\n\n");
}
export function printSendData(pkt, SRC_Port, DST_Port, sender_sqn, segment, contents, contents_len) {
  console.log(">> Sending Packet : " + pkt);
  console.log("Source Port : " + SRC_Port);
  console.log("Destination Port : " + DST_Port);
  console.log("Sequence Number : " + sender_sqn);
  console.log("Segmentation : " + segment);
  console.log("Content-Length : " + contents_len);
  console.log(contents);
  console.log("[" + pkt + ", " + SRC_Port + ", " + DST_Port + ", " + sender_sqn + ", " + segment + ", " + contents_len + ", " + contents + "]\n\n");
}
