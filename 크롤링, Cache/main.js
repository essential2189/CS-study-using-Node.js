const getData = require('./web_crawling');
const lru_cache = require('./lru_cache');

class LRU extends lru_cache { };

// 키워드 입력 받기
function getInput() {
    const prompt = require("prompt-sync")();
    const input = prompt("키워드를 입력하세요> ");

    return input;
}

// 첫 실행시 LRU에 저장할 수 있는 최대 키워드 개수와 키워드별 데이터 개수 지정
function getOption() {
    const prompt = require("prompt-sync")();

    console.log("Setting Options\n");
    const max_keyword = prompt("Max keyword : ");
    const max_data = prompt("Max data : ");

    return [max_keyword, max_data];
}

// dictionary에서 가장 첫번 째 항목 제거
// 만약 최대 키워드 개수를 초과할 경우 가장 오래된 항목을 제거하는 기능
function removeDictFirst(keyword_dict){
    for (var key in keyword_dict) {
        delete keyword_dict[key];
        break;
    }
    return keyword_dict;
}

// main 함수 여기서 처음 실행됨
// 이 코드의 시작점
async function myMain(options) {
    const max_keyword = options[0];
    const max_data = options[1];

    let lcache = new LRU(max_keyword); // max_keyword setting

    var keyword_dict = {};
    var all_text = ""
    while (true) {

        var temp = ""
        var input = getInput();
        if (input == "exit") {
            break;
        }
        
        // 입력값이 $cache일 경우
        if (input == "$cache"){
            if (all_text == ""){
                console.log("\n\n저장된 키워드가 없습니다.\n\n");
            } else {
                for (let key in keyword_dict) {
                    var temp = temp + key+"("+keyword_dict[key]+"), ";  // apple(1), google(2) ... 형식으로 출력하기 위함
                }
                console.log("\n키워드 :", temp.slice(0, -2)+"\n");  // slice를 통해 맨 뒤의 콤마 제거

            }
        } 

        // 입력값이 $cache가 아닐 경우
        else {
            all_text = await getData.getData(input, max_data);  // 웹 크롤링
            lcache.set(input, all_text);    // 크롤링한 결과를 캐시에 저장

            // 입력한 키워드가 dictionary에 없으면 1로 초기화하고, 있으면 +1 해줌으로써 count
            if (input in keyword_dict){
                let item = lcache.get(input); // 입력한 값에 대한 data를 가져옴
                // 입력한 값이 캐시에 있을 경우
                if (item !== -1) {
                    let temp_kd = keyword_dict[input]
                    delete keyword_dict[input]
                    keyword_dict[input] = temp_kd + 1;
                    console.log("\n\n(본 검색 결과는 캐시에 저장된 내용을 표시합니다.)\n\n\n\n");
                    console.log(item);
                }
                // 입력한 값이 캐시에 없을 경우
                else {
                    console.log("\n\n해당 키워드가 캐시에 존재하지 않습니다.\n\n");
                }

            } else {
                console.log("\n\n\n\n"+all_text)
                if (Object.keys(keyword_dict).length < max_keyword){
                    keyword_dict[input] = 1;
                } else {
                    keyword_dict = removeDictFirst(keyword_dict)
                    keyword_dict[input] = 1;
                }
            } 
        }
    }
}

if (require.main === module) {
    console.log("\n********************\n");
    var options = getOption();
    console.log("\n********************\n\n");
    console.log("exit 입력시 종료\n");
    console.log("search engine : www.naver.com\n");
    myMain(options);
}

