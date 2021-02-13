let fs = require('fs');

let fileName= "./Test_Data.csv"

createCSVdata();

function createCSVdata() {
    let x;
    for(x=0; x<=2000; x++) {
        let time= x*100;
        let a=x;
        let b=1;
        let c=x*x;
        let d=x*x*x;

        let CSVData=`${time},${a},${b},${c},${d}\n`
        fs.appendFile(fileName, CSVData, function (err) {
            if (err) return console.log(err);
            //console.log('data written to file-' + fileName);
        });
    }
}