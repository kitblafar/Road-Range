let fs = require('fs');

let fileName = "./Test_Data.csv"

createCSVdata();

function createCSVdata() {
    let x;
    for (x = 0; x <= 500; x++) {
        let time = x * 100;
        let a = x;
        let b = 1;
        let c = x * x;
        let d = x * x * x;
        let e = 1 / (x + 1);
        let f = 1 / (x * x + 1);
        let g = x + 3;
        let h = -x;
        let i = -x * x;
        let j = -1 / (x + 1);

        let CSVData = `${time},${a},${b},${c},${d},${e},${f},${g},${h},${i},${j}\n`
        fs.appendFile(fileName, CSVData, function (err) {
            if (err) return console.log(err);
            //console.log('data written to file-' + fileName);
        });
    }
}