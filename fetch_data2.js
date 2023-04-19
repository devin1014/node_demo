const http = require('http');
// const request = require('request');
const cheerio = require('cheerio');
const pretty = require("pretty");
// const path = require('path');
// const fs = require('fs');
const url = "http://www.520cg.com/Collect/shoulie.htm";

function start() {
    console.log("start")
    requestUrl(url, function (data) {
        //console.log(data)
        const allFiles = parseFilms(data);
        // saveAllFilms(`douban_film_top25_${index}.json`, allFiles);
        // downloadImage(allFiles[0].pic);
    })
    console.log("end")
}

function parseFilms(data) {
    const $ = cheerio.load(data);
    console.log(pretty($.html()));
    let allFilms = [];
    console.log("------------------------------")
    $('img').each(function (index, el) {
        //$('img', this).attr('src')
       console.log($(this).attr('src'));
    })
    // $('.c tr').each(function (index) {
    //     console.log(index)
    //     const title = $('.b', this).first().text();
    //     // const star = $('.rating_num', this).text();
    //     const pic = $('img', this).attr('src');
    //     console.log(title, pic);
    //     allFilms.push({ title, pic })
    // });
    return allFilms;
}

function requestUrl(url, callback) {
    console.log("request: " + url);
    http.get(url, function (res) {
        let data;
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            console.log("request: "+ url + ", completed.")
            callback(data);
        });
    });
}

exports.start = start