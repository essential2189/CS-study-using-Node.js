function getInput(){
    const prompt = require("prompt-sync")();

    const array1 = prompt("First array : ");

    const array2 = prompt("Second array : ");

    return [array1, array2];
}

//https://stackoverflow.com/questions/26320253/is-there-a-javascript-function-similar-to-the-python-counter-function
// python의 Counter 기능
function Counter(array) {
    array.forEach(val => this[val] = (this[val] || 0) + 1);
}

// // 배열을 띄어쓰기 기준으로 자르고 int형으로 변환
// function split_array(array) {
//     var array1 = array[0].split(" ").map(function(x) {
//         return parseInt(x, 10);
//     })
//     var array2 = array[1].split(" ").map(function(x) {
//         return parseInt(x, 10);
//     })

//     return [array1, array2];
// }

// 배열의 길이가 7이상인지 탐지
function len_7(array1, array2) {
    if(array1.length != 7 || array2.length != 7) {
        console.log("배열의 길이가 7이어야합니다.");
        return "continue";
    } else if(array1.length == 7 || array2.length == 7){
        return false;
    }
}

// 배열 원소의 크기가 1~13을 벗어났는지 탐지
function array_size(c_arr1, c_arr2){
    for (let i = 0; i < 7; i++) {
        if(c_arr1[i] < 1 || c_arr1[i] > 13 || c_arr2[i] < 1 || c_arr2[i]){
            console.log("각 배열 원소의 크기는 1보다 크거나 같고 13보다 작거나 같은 정수여야합니다.");
            return "continue";
        } else {
            return false;
        }
    }
}

// 4개 이상의 같은 숫자 탐지
function number4(c_arr1, c_arr2, array1, array2) {
    for (let i = 0; i < 7; i++) {
        if(c_arr1[array1[i]] > 4 || c_arr2[array2[i]] > 4){
            console.log("각 배열에 같은 숫자는 4개까지만 존재해야합니다.");
            return "continue";
        } else{
            return false;
        }
    }
}

// 배열들이 각 조건에 부합하는지 확인
function check_array_condition(array1, array2, c_arr1, c_arr2, flag1, flag2, flag3){
    if (len_7(array1, array2) == "continue"){return "continue";} 
    else {flag1 = false;}
    if (array_size(c_arr1, c_arr2) == "continue"){return "continue";} 
    else {flag2 = false;}
    if (number4(c_arr1, c_arr2, array1, array2) == "continue"){return "continue";} 
    else {flag3 = false;}

    if(flag1 == false || flag2 == false || flag3 == false){return 1;}
}

// 배열 2개를 입력받고 조건에 부합하지 않는한 계속 입력받음
function check_array() {
    var flag1 = flag2 = flag3 = true;
    while(true){
        var array = getInput();
        var array1 = array[0].split(" "); var array2 = array[1].split(" ");
        var c_arr1 = new Counter(array1); var c_arr2 = new Counter(array2);
        var flag = check_array_condition(array1, array2, c_arr1, c_arr2, flag1, flag2, flag3)
        if (flag == "continue"){continue;} 
        else{
            return [array1, array2, c_arr1, c_arr2, 1];}
    }
}

// 페어 확인
function pair(c_arr, int_p, property, max_pair){
    if (c_arr[property] == 2) {
        if (int_p > max_pair){
            max_pair = int_p;
        }
    }
    return max_pair;
}

// 트리플 확인
function triple(c_arr, int_p, property, max_triple){
    if (c_arr[property] == 3) {
        if (int_p > max_triple){
            max_triple = int_p;
        }
    }
    return max_triple;
}

// 포카드 확인
function four(c_arr, int_p, property, max_four){
    if (c_arr[property] == 4) {
        if (int_p > max_four){
            max_four = int_p;
        }
    }
    return max_four;
}

// 스트레이트 확인
function straight(int_p, init_num, straight_cnt, straight_array) {
    if (Math.abs(init_num - int_p) == 1) {
        straight_cnt += 1;
        init_num = int_p;
        if (straight_cnt >= 4) {
            straight_array.push(int_p);
        }
    } else {init_num = int_p; straight_cnt = 0;}
    return straight_array;
}

// 족보(페어, 트리플, 포카드, 스트레이트) 체크하여 가장 큰 수 return
// Counter를 통해 각 원소의 갯수를 토대로 체크
// 스트레이트는 이전 원소 - 현재 원소 == 1일 경우를 count하여 체크
function check_condition_all(array, c_arr) {
    var max_pair = max_triple = max_four = straight_cnt = 0
    var straight_array = [];
    var init_num = Number(array[0]);

    for(const property in c_arr){
        let int_p = Number(property);
        max_pair = pair(c_arr, int_p, property, max_pair);
        max_triple = triple(c_arr, int_p, property, max_triple);
        max_four = four(c_arr, int_p, property, max_four);
        straight_array = straight(int_p, init_num, straight_cnt, straight_array);
    } return [max_pair, max_triple, max_four, straight_array]; }

// 1번 배열과 2번 배열의 각 족보 비교
function check_condition(array1, array2, c_arr1, c_arr2) {
    
    const [max_pair1, max_triple1, max_four1, straight1] = check_condition_all(array1, c_arr1);
    const [max_pair2, max_triple2, max_four2, straight2] = check_condition_all(array2, c_arr2);
    
    var result = 0
    result = compare(max_pair1, max_triple1, max_four1, straight1, max_pair2, max_triple2, max_four2, straight2)
    return result
}

function compare(max_pair1, max_triple1, max_four1, straight1, max_pair2, max_triple2, max_four2, straight2){
    // 상위 족보부터 비교하여 만약 이기면 return하므로 하위 족보는 비교하지 않는다.
    var result = 0
    result = four_card(max_four1, max_four2);
    if (result == 1) {return 1;}
    else if(result == 2){return 2;}

    result = straigth_card(straight1, straight2);
    if (result == 1) {return 1;}
    else if(result == 2){return 2;}

    result = triple_card(max_triple1, max_triple2);
    if (result == 1) {return 1;}
    else if(result == 2){return 2;}

    result = pair_card(max_pair1, max_pair2);
    if (result == 1) {return 1;}
    else if(result == 2){return 2;}

    // 모든 족보에서 return되지 않았음으로(규칙이 없거나, 우위를 비교할 수 없음) 0을 return
    if (result == 0) {return 0;}
}

function four_card(max_four1, max_four2){
    if (max_four1 > max_four2) {
        return 1;
    } else if (max_four2 > max_four1) {
        return 2;
    } else {
        return 0
    }
}

function straigth_card(straight1, straight2) {
    if (straight1.length != 0 && straight2.length == 0){return 1;} 
    else if (straight2.length != 0 && straight1.length == 0){return 2;} 
    else {
        if (Math.max(straight1) > Math.max(straight2)) {return 1;} 
        else if (Math.max(straight2) > Math.max(straight1)) {return 2;}
    }
    return 0
}

function triple_card(max_triple1, max_triple2) {
    if (max_triple1 > max_triple2) {
        return 1;
    } else if (max_triple2 > max_triple1) {
        return 2;
    } else {
        return 0
    }
}

function pair_card(max_pair1, max_pair2){
    if (max_pair1 > max_pair2) {
        return 1;
    } else if (max_pair2 > max_pair1) {
        return 2;
    } else {
        return 0
    }
}

// main 함수 여기서 처음 실행됨
// 이 코드의 시작점
function myMain() {
    const [array1, array2, c_arr1, c_arr2, return_value] = check_array();
    
    if (return_value == 1) {
        result = check_condition(array1, array2, c_arr1, c_arr2);
        return result
    }
}

if (require.main === module) {
    var result = 0
    result = myMain();

    console.log(result)
}