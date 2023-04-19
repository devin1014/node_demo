const fs = require('fs');

function parse(file) {
    let list = new Array();
    let dul = new Array();
    const fileData = fs.readFileSync(file, 'utf-8');
    fileData.split(/\r?\n/).forEach(line => {
        line.split("、").forEach(item => {
            let name = item.trim()
            if (name.length == 0) return;
            if (list.indexOf(name) >= 0) {
                dul.push(name);
            } else {
                list.push(name);
                console.log(name);
            }
        })
    });
    console.log(`${file} 找到${list.length}个名字`)
    dul.forEach(name => {
        console.log(`重复的名字：${name}`)
    });
}

exports.parse = parse