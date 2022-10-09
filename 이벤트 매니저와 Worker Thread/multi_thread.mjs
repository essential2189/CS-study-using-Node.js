import { Worker, workerData, isMainThread } from "worker_threads";
import { postEvent, stringify } from "./eventManager.mjs";

if (isMainThread) {
  const threads = new Set();

  threads.add(new Worker("./multi_thread.mjs", { workerData: { command: "stringify" } }));
  threads.add(new Worker("./multi_thread.mjs", { workerData: { command: "post", eventName: "ModelDataChanged", sender: "albumModel", data: { data: "abc" } } }));
  threads.add(new Worker("./multi_thread.mjs", { workerData: { command: "post", eventName: "ViewUpdated", sender: "albumView", data: { view: "xxx" } } }));
  threads.add(new Worker("./multi_thread.mjs", { workerData: { command: "post", eventName: "DidShakeMotion", sender: "albumController", data: { from: "blue" } } }));
  threads.add(new Worker("./multi_thread.mjs", { workerData: { command: "post", eventName: "AllDataChanged", sender: "dummy", data: {} } }));

  // 워커들 이벤트 등록
  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    });

    worker.on("exit", () => {
      threads.delete(worker);
    });

    worker.on("message", (msg) => {});
  }
} else {
  // 워커들 일 등록

  if (workerData.command === "post") {
    console.log("=====================");
    postEvent(workerData.eventName, workerData.sender, workerData.data);
    console.log("=====================");
  } else if (workerData.command === "stringify") {
    console.log("=====================");
    stringify();
    console.log("=====================");
  }
}
