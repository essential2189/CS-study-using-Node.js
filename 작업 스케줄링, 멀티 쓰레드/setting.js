// 실행 시간 설정
export const process_time = { A: 3, B: 5, C: 7, D: 10, E: 15, F: 21 };

// 데드라인 설정
export const deadline = { A: 30, B: 50, C: 90, D: 160, E: 260, F: 410 };

// 우선순위 설정
export const priority = { A: 6, B: 5, C: 4, D: 3, E: 2, F: 1 };

// 랜덤 알파뱃으로 리턴
function random_alpha(min = 0, max = 5) {
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  if (rand == 0) return "A";
  else if (rand == 1) return "B";
  else if (rand == 2) return "C";
  else if (rand == 3) return "D";
  else if (rand == 4) return "E";
  else if (rand == 5) return "F";
}

// 무작위 3개 프로세스 리턴
export function getProcessList() {
  let process_list = [];

  for (let i = 0; i < 3; i++) {
    let alpha = random_alpha();
    if (!process_list.includes(alpha)) process_list.push(alpha);
    else i--;
  }
  return process_list;
}

// 프로세스의 데드라인 리턴
export function getDeadlineList(process_list) {
  let deadline_list = [];
  for (let i = 0; i < process_list.length; i++) {
    deadline_list.push(deadline[process_list[i]]);
  }
  return deadline_list;
}

// 프로세스의 우선순위 리턴
export function getPriorityeList(process_list) {
  let priority_list = [];
  for (let i = 0; i < process_list.length; i++) {
    priority_list.push(priority[process_list[i]]);
  }
  return priority_list;
}

// 쓰레드 갯수 계산
export function calc_thread(process_list) {
  let thread_nums = {};
  let total_thread = 0;
  for (let i = 0; i < process_list.length; i++) {
    thread_nums[process_list[i]] = parseInt(process_time[process_list[i]] / 2);
    total_thread += parseInt(process_time[process_list[i]] / 2);
  }
  return [thread_nums, total_thread];
}
