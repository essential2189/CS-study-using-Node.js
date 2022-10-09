// worker.js
import { parentPort } from "worker_threads";

parentPort.on("message", (value) => {
  // console.log(value);
  parentPort.postMessage(2);
  parentPort.close();
});
