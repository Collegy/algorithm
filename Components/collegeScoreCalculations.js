//ONLY RUN THIS ONCE EVERY YEAR FOR NEW COLLEGE SCORES!

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://admin:O8GrEZkLMDYKA1Iz@cluster0.lcd3jzt.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    function testScore(act, sat) {
        let totalWeight = 400.0;

        let score1 = ((act - 1) / 35.0) * totalWeight;
        let score2 = (sat / 400.0 - 1) * (totalWeight / 3);

        return (score1 + score2) / 2;
    }

    function gpaScore(sat) {
        let totalWeight = 500.0;
        let gpaScale = 4.0;

        let gpa = sat * 0.00203 + 1.06; //linear model in excel

        return gpa * (totalWeight / gpaScale);
    }

    function acceptanceRateScore(acceptanceRate) {
        let totalWeightConfidence = 300.0;
        let totalWeightCourseload = 400.0;

        let scoreConfidence =
            (100 - acceptanceRate) * (totalWeightConfidence / 100);

        let scoreCourseload =
            (100 - acceptanceRate) * (totalWeightCourseload / 125) +
            totalWeightCourseload / 10;

        if (acceptanceRate < 40) {
            scoreCourseload += totalWeightCourseload / 10;
        }

        return scoreConfidence + scoreCourseload;
    }

    if (err) return console.error(err);

    let score = 0.0;

    const collection = client.db("colleges").collection("raw_data");
    const collection2 = client.db("colleges").collection("score_data");
    collection
        .find(
            {},
            { INSTNM: 1, ACTCMMID: 1, SAT_AVG: 1, ADM_RATE: 1, STABBR: 1 }
        )
        .toArray((err, documents) => {
            documents.forEach((doc) => {
                if (
                    doc.ACTCMMID >= 0 &&
                    doc.SAT_AVG >= 0 &&
                    doc.ADM_RATE >= 0
                ) {
                    score =
                        testScore(doc.ACTCMMID, doc.SAT_AVG) +
                        gpaScore(doc.SAT_AVG) +
                        acceptanceRateScore(doc.ADM_RATE * 100.0); //make sure to make out of 100%
                    console.log(doc.INSTNM + " " + score);
                } else {
                    score = "NULL";
                }
                if (score != "NULL") {
                    collection2.insertMany(
                        [
                            {
                                INSTNM: doc.INSTNM,
                                STABBR: doc.STABBR,
                                BASE_SCORE: score,
                            },
                        ],
                        function (err, res) {
                            console.log("Document inserted");
                        }
                    );
                }
            });
        });
});
