export class BoostSet {
  constructor(array) {
    this.array = array;
  }
  getArray() {
    return [...this.array];
  }
  set(array) {
    return [...this.filter(array, (value, index) => array.indexOf(value) === index)];
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

  sum(other) {
    return [...this.set([...this.getArray(), ...other])];
  }
  complement(other) {
    return [...this.filter(this.getArray(), (value) => !other.includes(value))];
  }
  intersect(other) {
    return [...this.filter(this.getArray(), (value) => other.includes(value))];
  }
  resultALL(other) {
    return [...this.getArray().flat(Infinity), ...other.flat(Infinity)];
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
    console.log("합집합(sum) = [" + display_sum + "]");
    console.log("여집합(complement) = [" + display_com + "]");
    console.log("교집합(intersect) = [" + display_inter + "]");
    console.log();
    console.log("모든 요소 출력 : [" + display_result + "]");
  }

  display(in_array) {
    let result = in_array.reduce((pre, value) => {
      pre = pre + value + ", ";
      return pre;
    }, []);
    return result.slice(0, -2);
  }
}
