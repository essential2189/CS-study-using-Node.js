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

const getData = async(keyword, max_data) =>{
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);

    const contentList = $("ul li");

    var count = 0
    var all_text = ""

    contentList.each((idx,elem)=>{
        let title = $(elem).find("div.total_tit a").text();
        let url = $(elem).find("div.total_source a").attr('href');
        let text = $(elem).find("div.total_group a").text();

        if (title !== undefined && url !== undefined && count < max_data){
            count += 1;
            all_text = all_text + count + ".\n" + title.trim() + "\n\n" + url.trim() + "\n\n" + text.trim() + "\n\n\n\n";
        }

    });

    return all_text;
}

module.exports = { getData };