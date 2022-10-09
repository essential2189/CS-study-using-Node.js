import { process_time } from "./setting.js";
import { Worker } from "worker_threads";
import { work } from "./multi_main.js";

export class RoundRobin_thread {
  constructor(process_list) {
    this.process_list = process_list;

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

  async scheduling(count, status) {
    let threadCount = parseInt(process_time[this.process_list[this.idx]] / 2);
    this.print(status, count);

    while (1) {
      threadCount = parseInt(process_time[this.process_list[this.idx]] / 2);

      // break 옵션
      if (this.break_option(status) === true) {
        this.print(status, count);
        break;
      }

      // 현재 프로세스가 terminated 상태가 아니라면 실행
      if (this.check_terminated(this.idx, status) === true) {
        let worker = [];
        for (let i = 0; i < threadCount; i++) {
          worker.push(new Worker("./worker.js"));
        }
        for (let i = 0; i < threadCount; i++) {
          worker[i].postMessage("produce thread");
          worker[i].on("message", (runtime) => {
            // 실행 시간 +
            if (count[this.process_list[this.idx]] + runtime < process_time[this.process_list[this.idx]]) {
              count[this.process_list[this.idx]] += runtime;
            } else {
              count[this.process_list[this.idx]] = process_time[this.process_list[this.idx]];
            }
            worker[i].terminate();
          });
        }

        // 1초 대기
        this.sleep(1);
        await work().then(() => {
          // running, waiting 설정
          this.set_status(status);
        });

        // 출력
        this.print(status, count);
      } // if not terminated

      // 현재 run 할려는 프로세스가 최대 동작 시간에 도달하면 terminated로 상태 변환
      this.terminated(count[this.process_list[this.idx]], status);

      this.idx = (this.idx + 1) % this.process_list.length;
    }
  }
}
