let cheerio = require('cheerio');
let request = require('request');
let getReposPageHtml = require("./reposPage");


let url = "https://github.com/topics";
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else if(response.statusCode == 404){
        console.log("Page not Found!")
    }
    else{
        // console.log("`````````````````~~~~~~~~~~~~~~~~~~~~```````````````````")
        getTopicLink(html);
    }
}
function getTopicLink(html){
    let $ = cheerio.load(html);
    let elemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<elemArr.length;i++){
        let href = $(elemArr[i]).attr("href");
        let topic = href.split("/").pop();
        let fullLink = `https://github.com/${href}`;
        // console.log(fullLink);
        getReposPageHtml(fullLink,topic);
        
    }

}