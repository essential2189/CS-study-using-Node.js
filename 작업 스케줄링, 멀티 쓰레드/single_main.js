import { DeadLine } from "./deadline.js";
import { RoundRobin } from "./RoundRobin.js";
import { Priority } from "./priority.js";
import { getProcessList, getDeadlineList, getPriorityeList } from "./setting.js";

function main() {
  const process_list = getProcessList();
  const deadline_list = getDeadlineList(process_list);
  const priority_list = getPriorityeList(process_list);

  const RR = new RoundRobin(process_list);
  const DL = new DeadLine(process_list, deadline_list);
  const PR = new Priority(process_list, priority_list);

  RR.scheduling(); // RoundRobin 스케줄링 실행

  DL.scheduling(); // DeadLine 스케줄링 실행

  PR.scheduling(); // Static priority 스케줄링 실행
}

main();
