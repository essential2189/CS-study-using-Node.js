import { process_time } from "./setting.js";

export class Priority {
  constructor(process, priority) {
    this.process_list = process;
    this.priority = priority;
    this.count = this.init();
    this.wait = this.init();
    this.status = this.init_status();
    this.idx = 0;
    this.return_count_list = [];
    this.check = [];
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

  break_option() {
    let values = Object.values(this.status);
    if (values.every((v) => v === "terminated")) {
      return true;
    }
  }

  check_terminated(i) {
    if (this.status[this.process_list[i]] != "terminated") return true;
    else return false;
  }

  terminated(return_count) {
    if (this.count[this.process_list[this.idx]] == process_time[this.process_list[this.idx]] && this.check_terminated(this.idx) === true) {
      this.status[this.process_list[this.idx]] = "terminated";
      this.return_count_list.push(return_count);
      return true;
    }
    return false;
  }

  set_status() {
    for (let i = 0; i < this.process_list.length; i++) {
      if (this.process_list[this.idx] != this.process_list[i] && this.check_terminated(i) === true) {
        this.status[this.process_list[i]] = "waiting";
      } else if (this.process_list[this.idx] == this.process_list[i] && this.check_terminated(i) === true) {
        this.status[this.process_list[i]] = "running";
      }
    }
  }

  count_wait() {
    for (let i = 0; i < this.process_list.length; i++) {
      if (this.process_list[this.idx] != this.process_list[i] && this.check_terminated(i) === true) {
        this.wait[this.process_list[i]] += 1;
      }
    }
  }

  print(status, count, wait) {
    for (let i = 0; i < this.process_list.length; i++) {
      console.log(this.process_list[i] + "(" + status[this.process_list[i]] + "), " + count[this.process_list[i]] + " / " + process_time[this.process_list[i]] + " , waiting " + wait[this.process_list[i]] + " sec");
    }
    console.log(".");
  }

  avg_wait() {
    let temp = 0.0;
    for (let i = 0; i < this.process_list.length; i++) {
      temp += this.wait[this.process_list[i]];
    }

    return temp / 3;
  }

  avg_return() {
    let temp = 0.0;
    for (let i = 0; i < this.return_count_list.length; i++) {
      temp += this.return_count_list[i];
    }
    return temp / 3;
  }

  sortByPriority() {
    let temp = {};
    for (let i = 0; i < this.process_list.length; i++) {
      temp[this.process_list[i]] = this.priority[i];
    }
    temp = Object.fromEntries(Object.entries(temp).sort(([, a], [, b]) => a - b));
    return Object.keys(temp);
  }

  print_result() {
    let avgWait = this.avg_wait();
    let avgRetrn = this.avg_return();
    console.log("고정 우선순위 방식 스케줄링이 종료되었습니다.");
    console.log("평균 대기시간 : " + avgWait.toFixed(1) + "sec");
    console.log("평균 반환시간 : " + avgRetrn.toFixed(1) + "sec\n\n");
  }

  scheduling() {
    this.process_list = this.sortByPriority();
    let return_count = 0;
    this.print(this.status, this.count, this.wait);
    while (1) {
      // break 옵션
      if (this.break_option() === true) {
        this.print_result();
        break;
      }

      // 현재 프로세스가 terminated 상태가 아니라면 실행
      if (this.check_terminated(this.idx) === true) {
        return_count++;
        // 1초 대기
        this.sleep(1);

        // 실행 시간 + 1
        this.count[this.process_list[this.idx]] += 1;

        // running, waiting 설정
        this.set_status();

        // 현재 running 중이 아닌 프로세스들 waiting + 1
        this.count_wait();

        // 출력
        this.print(this.status, this.count, this.wait);
      } // if not terminated

      // 현재 run 할려는 프로세스가 최대 동작 시간에 도달하면 terminated로 상태 변환
      if (this.terminated(return_count) === true) {
        this.idx = (this.idx + 1) % this.process_list.length;
      }
    }
  }
}
