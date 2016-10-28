var superagent = require('superagent'); //引入我们安装好的模块
var request = require("request");
var cheerio = require('cheerio');
var fs = require('fs'); //引入文件读取模块

//使用superagent请求url http://jandan.net/ooxx
superagent.get('http://jandan.net/ooxx')
    .end(function(err, docs) {
        var $ = cheerio.load(docs.text); //docs.text就是爬取到的数据，把它经过cheerio转换
        var imgArr = [];
        //$('.commentlist li .text p img')找到当前这页的所有图片元素,具体看下图hmtl结构就明白了
        $('.commentlist li .text p img').each(function(idx, element) {
            var $el = $(element);
            imgArr.push($el.attr('src')); //将图片的链接push到数组里
        })
        for (var i = 0; i < imgArr.length; i++) {
            downloadImg(imgArr[i], imgArr[i].split('/')[4]); //下载数组里的每张图片    
        }
    })

var dir = './images';
var downloadImg = function(url, filename) {
    request.head(url, function(err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};