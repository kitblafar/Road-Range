let fs = require('fs');

let fileName = "./CarData.csv"

createCSVdata();

function createCSVdata() {
    for (let x = 0; x <= 4000; x++) {
        let time = x/5 * 400;
        let a = x;
        let b = 1;
        let c = x/400 * x/400;
        let d = x/400 * x/400 * x/400;
        let e = 1 / (x/400 + 1);
        let f = 1 / (x/400 * x/400 + 1);
        let g = x + 3;
        let h = -x;
        let i = -x/400 *x/400;
        let j = -1 / (x/400 + 1);

        let CSVData = `${time},${a},${b},${c},${d},${e},${f},${g},${h},${i},${j}\n`
        fs.appendFile(fileName, CSVData, function (err) {
            if (err) return console.log(err);
            //console.log('data written to file-' + fileName);
        });
    }
}