function LfuNode(key, value) {
  this.prev = null;
  this.next = null;

  this.key = key;
  this.data = value;

  this.frequencyCount = 1;
}

function LfuDoublyLinkedList() {
  this.head = new LfuNode("head", null);
  this.tail = new LfuNode("tail", null);

  this.head.next = this.tail;
  this.tail.prev = this.head;

  this.size = 0;
}

LfuDoublyLinkedList.prototype.insertAtHead = function (node) {
  node.next = this.head.next;
  this.head.next.prev = node;

  this.head.next = node;
  node.prev = this.head;

  this.size++;
};

LfuDoublyLinkedList.prototype.removeAtTail = function () {
  const oldTail = this.tail.prev; // save last node to return back

  const prev = this.tail.prev;

  prev.prev.next = this.tail;

  this.tail.prev = prev.prev;

  this.size--;
  return oldTail;
};

LfuDoublyLinkedList.prototype.removeNode = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;

  this.size--;
};

LfuCache.prototype.set = function (key, value) {
  let node = this.keys[key];

  if (node == undefined) {
    node = new LfuNode(key, value);
    this.keys[key] = node;

    if (this.size !== this.capacity) {
      if (this.frequency[1] == undefined) this.frequency[1] = new LfuDoublyLinkedList();

      this.frequency[1].insertAtHead(node);
      this.size++;
    } else {
      const oldTail = this.frequency[this.minFrequency].removeAtTail();
      delete this.keys[oldTail.key];

      if (this.frequency[1] === undefined) this.frequency[1] = new LfuDoublyLinkedList();

      this.frequency[1].insertAtHead(node);
    }

    this.minFrequency = 1;
  } else {
    const oldFrequencyCount = node.frequencyCount;
    node.data = value;
    node.freqCount++;

    this.frequency[oldFrequencyCount].removeNode(node);

    if (this.frequency[node.frequencyCount] === undefined) this.frequency[node.frequencyCount] = new LfuDoublyLinkedList();

    this.frequency[node.frequencyCount].insertAtHead(node);

    if (oldFrequencyCount === this.minFrequeny && Object.keys(this.frequency[oldFequencyCount]).size === 0) {
      this.minFrequency++;
    }
  }
};
LfuCache.prototype.get = function (key) {
  const node = this.keys[key];
  if (node == undefined) return null;

  const oldFrequencyCount = node.frequencyCount;
  node.frequencyCount++;

  this.frequency[oldFrequencyCount].removeNode(node);
  if (this.frequency[node.frequencyCount] === undefined) this.frequency[node.frequencyCount] = new LfuDoublyLinkedList();

  this.frequency[node.frequencyCount].insertAtHead(node);

  if (oldFrequencyCount === this.minFrequency && Object.keys(this.frequency[oldFrequencyCount]).length === 0) {
    this.minFrequency++;
  }

  return node.data;
};
export function LfuCache(capacity) {
  this.keys = {}; // stores LfuNode
  this.frequency = {}; // stores LfuDoublyLinkedList

  this.capacity = capacity;

  this.minFrequency = 0; // keeps track of the lowest frequency linked list
  this.size = 0;
}

//ref https://blog.lmerza.com/2019/01/24/lfu-and-lru-caching-in-javascript/
