let stack_pointer = 0;
let heap_pointer = 0;
let stack_size = 0;
let heap_size = 0;
let total_size = 0;

let memory = {};

let recent_name = "";

function init(stackSize, heapSize) {
  stack_size = stackSize * 4 - 4;
  heap_size = heapSize * 4 - 4;
  total_size = stackSize + heapSize;

  let bass_address = "stack:1";

  for (let i = 0; i < total_size; i++) {
    if (i < stackSize) {
      memory["stack:" + i * 4] = 0;
    } else {
      memory["heap:" + i * 4] = 0;
    }
  }
  heap_pointer = total_size * 4 - 4;

  console.log("\nbass address: " + bass_address + "\n");
}

size_dict = {};
function setSize(type, length) {
  if (type in size_dict) {
    console.log(type, " already set");
  } else {
    size_dict[type] = length;
  }
  console.log("\nsize list :");
  console.log(size_dict);
  console.log();
}

function malloc(type, count) {
  if (size_dict[type] < 8) {
    new_mem = 8 * count;
  } else {
    new_mem = size_dict[type] * count;
  }

  memory["stack:" + stack_pointer] = "heap:" + heap_pointer + ":" + new_mem;

  let randomStr = "data:" + Math.random().toString(16).substring(2, 7);
  for (let i = heap_pointer; i > heap_pointer - new_mem; i = i - 4) {
    if (memory["heap:" + i] == 0) {
      memory["heap:" + i] = randomStr;
    }
  }

  heap_pointer = heap_pointer - new_mem;
  stack_pointer = stack_pointer + 4;
  while (memory["stack:" + stack_pointer] != 0) {
    stack_pointer = stack_pointer + 4;
  }

  console.log("저장된 stack 위치 - " + "stack:" + (Number(stack_pointer) - 4));
}

function free(pointer) {
  if (pointer in memory) {
    let heap_addr = memory[pointer]; // heap:116:16
    let add_split = heap_addr.split(":"); // heap, 116, 16
    let start_addr = Number(add_split[1]);
    let count = Number(add_split[2]);

    for (let i = 0; i < count; i = i + 4) {
      memory["heap:" + (start_addr - i)] = 0;
    }
    memory[pointer] = 0;

    stack_pointer = Number(pointer.split(":")[1]);
    heap_pointer = start_addr;
  } else {
    console.log("wrong pointer");
  }
}

function call(name, paramCount) {
  memory["stack:" + stack_pointer] = name;
  stack_pointer = stack_pointer + (paramCount + 1) * 4;
  recent_name = name;
}

// search by value
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);

  // const map = {"first" : "1", "second" : "2"};
  // console.log(getKeyByValue(map,"2"));
}

function returnFrom(name) {
  if (name == recent_name) {
    let addr = getKeyByValue(memory, name);
    let num = Number(addr.split(":")[1]);
    for (let i = num; i <= stack_size; i = i + 4) {
      if (memory["stack:" + i] != 0) {
        memory["stack:" + i] = 0;
      }
      recent_name = memory["stack:" + i];
    }
    stack_pointer = num;
  } else {
    console.log("error");
  }
}

function usage() {
  let stack_use = 0;
  let stack_not_use = 0;
  let heap_use = 0;
  let heap_not_use = 0;

  for (let i = 0; i <= stack_size; i = i + 4) {
    if (memory["stack:" + i] == 0) {
      stack_not_use++;
    } else {
      stack_use++;
    }
  }
  for (let i = stack_size + 4; i <= stack_size + heap_size + 4; i = i + 4) {
    if (memory["heap:" + i] == 0) {
      heap_not_use++;
    } else {
      heap_use++;
    }
  }

  console.log(
    "stack size:",
    stack_size,
    "stack in use:",
    stack_use,
    "stack not use:",
    stack_not_use
  );
  console.log(
    "heap size:",
    heap_size,
    "heap in use:",
    heap_use,
    "heap not use:",
    heap_not_use
  );
}

function callstack() {
  let text = "";
  for (const [key, value] of Object.entries(memory)) {
    if (value != 0) {
      if (key.split(":")[0] == "stack" && value.split(":")[0] != "heap") {
        text = text + value + " " + key + " -> ";
      }
    }
  }
  console.log(text.slice(0, -4));
}

function heapdump() {
  let text = "";
  for (const [key, value] of Object.entries(memory)) {
    if (value != 0) {
      if (value.split(":")[0] == "heap") {
        let value_split = value.split(":");
        text =
          text +
          "Stack Pointer Variable: " +
          key +
          ", Heap Data: " +
          memory[value_split[0] + ":" + value_split[1]] +
          ", Heap Data Size: " +
          Number(value_split[2]) +
          "\n";
      }
    }
  }
  console.log(text);
}

function garbageCollect() {
  let not_garbage = [];
  for (let i = 0; i <= stack_size; i = i + 4) {
    if (memory["stack:" + i] != 0) {
      let stack_split = memory["stack:" + i].split(":");
      if (stack_split[0] == "heap") {
        for (let j = 0; j < stack_split[2]; j = j + 4) {
          not_garbage.push(stack_split[0] + ":" + (Number(stack_split[1]) - j));
        }
      }
    }
  }
  console.log("not garbage : " + not_garbage);

  for (let i = stack_size + 4; i <= stack_size + heap_size + 4; i = i + 4) {
    if (!not_garbage.includes("heap:" + i)) {
      memory["heap:" + i] = 0;
    }
  }
}

function reset() {
  for (let i = 0; i <= stack_size; i = i + 4) {
    memory["stack:" + i] = 0;
  }
  for (let i = stack_size + 4; i <= stack_size + heap_size + 4; i = i + 4) {
    memory["heap:" + i] = 0;
  }
  stack_pointer = 0;
  heap_pointer = total_size * 4 - 4;
  recent_name = "";
}

function printMemory() {
  console.log();
  console.log();
  console.log(memory);
  console.log("Stack Pointer :", stack_pointer);
  console.log("Heap Pointer :", heap_pointer);
}

const memSys = require("./main.js");

// 커맨드입력 받기
function getInputMenu() {
  const prompt = require("prompt-sync")();

  console.log(
    "\nCommand List : init, setSize, malloc, free, call, returnFrom, usage, callstack, heapdump, garbageCollect, reset, exit\n"
  );
  const input = prompt("command : ");

  return input;
}

function getInit() {
  const prompt = require("prompt-sync")();

  const stack_size = prompt("stack size : ");

  const heap_size = prompt("heap size : ");

  return { stack_size, heap_size };
}

function getSetSize() {
  const prompt = require("prompt-sync")();

  const type = prompt("type : ");

  const lenght = prompt("lenght : ");

  return { type, lenght };
}

function getMalloc() {
  const prompt = require("prompt-sync")();

  const type = prompt("type : ");

  const count = prompt("count : ");

  return { type, count };
}

function getFree() {
  const prompt = require("prompt-sync")();

  console.log("\nstack address - stack:0, stack:4, stack:8...\n");
  const pointer = prompt("pointer : ");

  return { pointer };
}

function getCall() {
  const prompt = require("prompt-sync")();

  const name = prompt("name : ");
  const paramCount = prompt("paramCount : ");

  return { name, paramCount };
}

function getReturnFrom() {
  const prompt = require("prompt-sync")();

  const name = prompt("name : ");

  return { name };
}

function myMain() {
  console.log("\nexit 입력시 종료");
  while (true) {
    let input = getInputMenu();
    console.log();
    if (input == "exit") {
      break;
    }

    if (input == "init") {
      let in_input = getInit();
      init(Number(in_input.stack_size), Number(in_input.heap_size));
    } else if (input == "setSize") {
      let in_input = getSetSize();
      setSize(in_input.type, Number(in_input.lenght));
    } else if (input == "malloc") {
      let in_input = getMalloc();
      malloc(in_input.type, Number(in_input.count));
    } else if (input == "free") {
      let in_input = getFree();
      free(in_input.pointer);
    } else if (input == "call") {
      let in_input = getCall();
      call(in_input.name, Number(in_input.paramCount));
    } else if (input == "returnFrom") {
      let in_input = getReturnFrom();
      returnFrom(in_input.name);
    } else if (input == "usage") {
      usage();
    } else if (input == "callstack") {
      callstack();
    } else if (input == "heapdump") {
      heapdump();
    } else if (input == "garbageCollect") {
      garbageCollect();
    } else if (input == "reset") {
      reset();
    }

    printMemory();
  }
}

if (require.main === module) {
  myMain();
}
