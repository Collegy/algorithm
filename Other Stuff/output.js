const fs = require("fs");
const { syncBuiltinESMExports } = require("module");

var targets = [];
var safeties = [];
var reaches = [];

function readFile(filename) {
    fs.readFile(filename, (err, data) => {
        if (err) throw err;

        let colleges = [];

        var individualCollege = data.toString().split("\n", 1000000);

        individualCollege.forEach((college) => {
            let i = 0;

            let dataPoint = college.toString().split(",", 1000000);

            dataPoint.forEach((dP) => {
                if (i == 0) {
                    colleges = [];
                }
                if (i < 9) {
                    colleges.push(dP.trim()); //need to trim to account for any whitespace
                    if (i == 8) {
                        if (colleges[i] === "T") {
                            targets.push(colleges);
                        } else if (colleges[i] === "S") {
                            safeties.push(colleges);
                        } else {
                            reaches.push(colleges);
                        }
                        i == 0;
                    } else {
                        i++;
                    }
                }
            });
        });
        var threeCollegeListsTSR = [];
        threeCollegeListsTSR.push(targets);
        threeCollegeListsTSR.push(safeties);
        threeCollegeListsTSR.push(reaches);
        //Put the array into a JSON object/file
        fs.writeFile(
            "./site/src/userCollegeData.json",
            JSON.stringify(threeCollegeListsTSR),
            "utf8",
            function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            }
        );
    });
}

//Call to function
readFile("./collegeStatsRefined.txt");
