import { process_time } from "./setting.js";
import { Worker } from "worker_threads";
import { work } from "./multi_main.js";

export class Priority_thread {
  constructor(process_list, priority) {
    this.process_list = process_list;
    this.priority = priority;
    this.idx = 0;
  }

  init() {
    let temp = {};
    for (let i = 0; i < this.process_list.length; i++) {
      temp[this.process_list[i]] = 0;
    }
    return temp;
  }

  init_status() {
    let temp = {};
    for (let i = 0; i < this.process_list.length; i++) {
      temp[this.process_list[i]] = "ready";
    }
    return temp;
  }

  sleep(sec) {
    let start = Date.now(),
      now = start;
    while (now - start < sec * 1000) {
      now = Date.now();
    }
  }

  break_option(status) {
    let values = Object.values(status);
    if (values.every((v) => v === "terminated")) {
      return true;
    }
  }

  check_terminated(i, status) {
    if (status[this.process_list[i]] != "terminated") return true;
    else return false;
  }

  terminated(workingProcess, status) {
    if (workingProcess == process_time[this.process_list[this.idx]] && this.check_terminated(this.idx, status) === true) {
      status[this.process_list[this.idx]] = "terminated";
      return true;
    }
    return false;
  }

  set_status(status) {
    for (let i = 0; i < this.process_list.length; i++) {
      if (this.process_list[this.idx] != this.process_list[i] && this.check_terminated(i, status) === true) {
        status[this.process_list[i]] = "waiting";
      } else if (this.process_list[this.idx] == this.process_list[i] && this.check_terminated(i, status) === true) {
        status[this.process_list[i]] = "running";
      }
    }
  }

  print(status, count) {
    for (let i = 0; i < this.process_list.length; i++) {
      console.log(this.process_list[i] + "(" + status[this.process_list[i]] + "), " + count[this.process_list[i]] + " / " + process_time[this.process_list[i]]);
    }
    console.log(".");
  }

  sortByPriority() {
    let temp = {};
    for (let i = 0; i < this.process_list.length; i++) {
      temp[this.process_list[i]] = this.priority[i];
    }
    temp = Object.fromEntries(Object.entries(temp).sort(([, a], [, b]) => a - b));
    return Object.keys(temp);
  }

  async scheduling(count, status) {
    this.process_list = this.sortByPriority();
    let threadCount = parseInt(process_time[this.process_list[this.idx]] / 2);
    this.print(status, count);

    while (1) {
      threadCount = parseInt(process_time[this.process_list[this.idx]] / 2);

      // break ??????
      if (this.break_option(status) === true) {
        this.print(status, count);
        break;
      }

      // ?????? ??????????????? terminated ????????? ???????????? ??????
      if (this.check_terminated(this.idx, status) === true) {
        let worker = [];
        for (let i = 0; i < threadCount; i++) {
          worker.push(new Worker("./worker.js"));
        }
        for (let i = 0; i < threadCount; i++) {
          worker[i].postMessage("produce thread");
          worker[i].on("message", (runtime) => {
            // ?????? ?????? +
            if (count[this.process_list[this.idx]] + runtime < process_time[this.process_list[this.idx]]) {
              count[this.process_list[this.idx]] += runtime;
            } else {
              count[this.process_list[this.idx]] = process_time[this.process_list[this.idx]];
            }
            worker[i].terminate();
          });
        }

        // 1??? ??????
        this.sleep(1);
        await work().then(() => {
          // running, waiting ??????
          this.set_status(status);
        });

        // ??????
        this.print(status, count);
      } // if not terminated

      // ?????? run ????????? ??????????????? ?????? ?????? ????????? ???????????? terminated??? ?????? ??????
      if (this.terminated(count[this.process_list[this.idx]], status) === true) {
        this.idx = (this.idx + 1) % this.process_list.length;
      }
    }
  }
}
