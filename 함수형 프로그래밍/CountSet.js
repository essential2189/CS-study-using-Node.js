export class CountSet {
  constructor(object) {
    this.object = object;
    this.array = this.getObjectToArray(object);
    this.removeArray = this.array;
  }
  getArray() {
    return [...this.array];
  }
  getRemoveArray() {
    return [...this.removeArray];
  }

  // 나만의 고차함수
  getObjectToArray(in_object) {
    let temp = [];
    for (const [key, value] of Object.entries(in_object)) {
      for (let i = 0; i < value; i++) {
        temp.push(Number(key));
      }
    }
    return [...temp];
  }
  // 나만의 고차함수
  getObject(in_array) {
    const set_array = this.set(in_array);
    let temp = {};
    for (let i = 0; i < set_array.length; i++) {
      let count = this.filter(in_array, (x) => x == set_array[i]).length;
      temp[set_array[i]] = count;
    }
    return temp;
  }
  filter(arr, func) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      func(arr[i], i) && result.push(arr[i]);
    }
    return result;
  }
  map(arr, func) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(func(arr[i], i));
    }
    return result;
  }

  append(element) {
    return this.getObject(this.getArray().push(element));
  }

  remove(element) {
    const idx = this.removeArray.indexOf(element);
    if (idx > -1) this.removeArray.splice(idx, 1);
    return [...this.removeArray];
  }

  countFor(element) {
    return this.filter(this.getArray(), (x) => x == element).length;
  }

  set(array) {
    return [...this.filter(array, (value, index) => array.indexOf(value) === index)];
  }

  sum(other) {
    return this.getObject([...this.getArray(), ...this.getObjectToArray(other)]);
  }
  complement(other) {
    this.removeArray = this.getRemoveArray();
    for (let i = 0; i < this.getObjectToArray(other).length; i++) {
      this.removeArray = this.remove(this.getObjectToArray(other)[i]);
    }
    return this.getObject([...this.removeArray]);
  }
  intersect(other) {
    return this.getObject([...this.filter(this.set(this.getArray()), (value) => this.set(this.getObjectToArray(other)).includes(value))]);
  }
  resultALL(other) {
    return [this.getObject([...this.getArray().flat(Infinity)]), other];
  }

  closure(other) {
    const sum_result = this.sum(other);
    const com_result = this.complement(other);
    const inter_result = this.intersect(other);
    const result_all = this.resultALL(other);

    const display_sum = this.display(sum_result);
    const display_com = this.display(com_result);
    const display_inter = this.display(inter_result);
    const display_result = this.display(result_all);

    console.log("합집합(sum) = [" + JSON.stringify(display_sum) + "]");
    console.log("여집합(complement) = [" + JSON.stringify(display_com) + "]");
    console.log("교집합(intersect) = [" + JSON.stringify(display_inter) + "]");
    console.log();
    console.log("모든 요소 출력 : [" + JSON.stringify(display_result) + "]");
  }

  display(in_array) {
    let result = [in_array].reduce((pre, value) => {
      pre = value;
      return pre;
    }, {});
    return result;
  }
}
