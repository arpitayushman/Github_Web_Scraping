let cheerio = require('cheerio');
let request = require('request');
let getIssuesPageHtml = require('./issue');
function getReposPageHtml(url,topic) {
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }
        else if(response.statusCode == 404){
            console.log("Page not found");
        }
        else{
            // console.log(html);
            getReposLing(html);
            
        }
    }
    function getReposLing(html){
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-text-secondary.text-normal.lh-condensed");
        console.log(topic);
        for(let i=0;i<8;i++){
            let twoAnchors = $(headingsArr[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            // console.log(link);
            let fullLink = `https://github.com${link}/issues`;
            // console.log("fullLink", fullLink);
            let repoName = link.split("/").pop();
            getIssuesPageHtml(fullLink,topic,repoName);
        }
        console.log("``````````````````````````````````");
    }

}
module.exports = getReposPageHtml