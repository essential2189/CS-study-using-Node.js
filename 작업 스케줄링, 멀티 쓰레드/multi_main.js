import { DeadLine_thread } from "./deadline_thread.js";
import { RoundRobin_thread } from "./RoundRobin_thread.js";
import { Priority_thread } from "./priority_thread.js";
import { getProcessList, getDeadlineList, getPriorityeList } from "./setting.js";

export function work() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1);
  });
}

async function main() {
  const process_list = getProcessList();
  const deadline_list = getDeadlineList(process_list);
  const priority_list = getPriorityeList(process_list);

  const RR = new RoundRobin_thread(process_list);
  const DL = new DeadLine_thread(process_list, deadline_list);
  const PR = new Priority_thread(process_list, priority_list);

  console.log("======================Round Robin Scheduling=====================");
  await RR.scheduling(RR.init(), RR.init_status()); // RoundRobin 스케줄링 실행
  console.log("=================================================================\n");

  console.log("=======================Deadline Scheduling=======================");
  await DL.scheduling(DL.init(), DL.init_status()); // DeadLine 스케줄링 실행
  console.log("=================================================================\n");

  console.log("=======================Priority Scheduling=======================");
  await PR.scheduling(PR.init(), PR.init_status()); // Static priority 스케줄링 실행
  console.log("=================================================================\n");
}

main();
