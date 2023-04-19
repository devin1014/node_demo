const fs = require('fs');

const ads = ['精C小说', '518', 'SKY', 'ps', 'COＭ', '５1８ＳKＹ.COM', '地址：']
const inputDir = './res'
const outputDir = './res2'

let output = true

function parse(file, logging) {
    const fileInput = `${inputDir}/${file}`
    const fileOutput = `${outputDir}/${file}`
    let result = ''
    const fileData = fs.readFileSync(fileInput, 'utf-8');
    fileData.split(/\r?\n/).forEach(line => {
        let isAd = false
        ads.forEach(ad => {
            if (line.indexOf(ad) >= 0) {
                isAd = true
            }
        })
        if (isAd) return
        let isTitle = line.startsWith('☆、')
        if (isTitle) {
            parseTitle(line, function (res) {
                if (logging) {
                    console.log(`    ${res[0]}    ${res[1]}`)
                }
                result += `###${res[0]}  ${res[1]}\n`
                if (res[2]) {
                    result += `${res[2]}\n`
                }
            })
        } else {
            if (logging) {
                console.log(`    ${line}`);
            }
            result += `    ${line}\n`
        }
    });

    if (output) {
        fs.writeFileSync(fileOutput, result)
    }
}

function parseTitle(title, callback) {
    let index = title.indexOf('章') + 1
    if (!index) {
        index = title.indexOf('张') + 1
    }
    if (index) {
        let content = undefined
        let titleName = title.substring(index)
        if (titleName.length > 10) {
            content = titleName
            titleName = title.substring(index, index + 4)
        }
        let titleNumber = title.substring(2, index)
        callback([titleNumber, titleName, content])
    }
}

exports.parse = parse