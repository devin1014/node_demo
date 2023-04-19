const https = require('https');
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const url = "https://movie.douban.com/top250?start=${index}";

function start() {
    clear("./file")
    clear("./image")
    for (let index = 0; index < 10; index++) {
        const startNum = index * 25;
        const realUrl = url.replace("${index}", startNum);
        requestUrl(realUrl, function (data) {
            const allFiles = parseFilms(startNum, data);
            saveAllFilms(`douban_film_top25_${index}.json`, allFiles);
            downloadImage(allFiles[0].pic);
        })
    }
}

function clear(targetFile) {
    if (fs.existsSync(targetFile)) {
        const files = fs.readdirSync(targetFile);
        files.forEach(function (file, index) {
            fs.unlinkSync(path.join(targetFile, file));
        });
    }
}

async function requestUrl(url, callback) {
    console.log("request: " + url);
    https.get(url, function (res) {
        let data;
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(data);
        });
    });
}

function parseFilms(startNum, data) {
    const $ = cheerio.load(data);
    let allFilms = [];
    $('li .item').each(function (index) {
        const title = $('.title', this).first().text();
        const star = $('.rating_num', this).text();
        const pic = $('.pic img', this).attr('src');
        console.log(startNum + index, title, star, pic);
        allFilms.push({ title, star, pic })
    });
    return allFilms;
}

function saveAllFilms(name, allFilms) {
    fs.writeFile(`./file/${name}`, JSON.stringify(allFilms), function (err) {
        if (err) {
            console.log('failed: ' + err);
        }
    });
}

function downloadImage(url) {
    const name = path.basename(url);
    request({ url }).pipe(fs.createWriteStream(`./image/${name}`).on('close', err => {
        if (err) {
            console.log("failed: " + err);
        }
    })
    )
}

exports.start = start