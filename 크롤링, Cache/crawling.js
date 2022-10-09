const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async(keyword)=>{
    keyword = encodeURI(keyword);
    try {
        return axios.get(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=`+keyword);
    }catch(err){
        console.log(err);
    }
}

const getData = async(keyword) =>{
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);

    const contentList = $("ul li");

    var count = 1
    console.log("\n==================================================\n")

    contentList.each((idx,elem)=>{
        let title = $(elem).find("div.total_tit a").text()
        let url = $(elem).find("div.total_source a").attr('href');
        let text = $(elem).find("div.total_group a").text()

        if (title !== undefined && url !== undefined){
            console.log("결과"+count+". 제목: "+title)
            console.log("결과"+count+". 링크: "+url)
            console.log("결과"+count+". 미리보기: "+text)
            count += 1
            console.log()
        }

    });
    console.log("==================================================")
}


function getInput() {
    const prompt = require("prompt-sync")();

    console.log("search engine : www.naver.com")
    const input = prompt("keyword : ");

    return input;
}

// main 함수 여기서 처음 실행됨
// 이 코드의 시작점
function myMain() {
    var input = getInput();
    getData(input);
}

if (require.main === module) {
    myMain();
}

// ref.https://goodmemory.tistory.com/83
