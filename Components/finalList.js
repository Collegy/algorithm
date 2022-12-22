//EXPRESS AND MONGO SETUP
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://admin:O8GrEZkLMDYKA1Iz@cluster0.lcd3jzt.mongodb.net/colleges?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const connection = mongoose.connection;
connection.useDb("colleges");
const app = express();
app.use(express.json());

//LIST MODEL
const Lists = mongoose.model(
    "Lists",
    {
        //GENERAL
        id: String,
        //LOCATION
        safeties: [String],
        targets: [String],
        reaches: [String],
        fs: [Number],
        ft: [Number],
        fr: [Number],
        finalListSTR: [String],
    },
    "individual_data"
);

//INDIVIDUAL MODEL
const Individual = mongoose.model(
    "Individual",
    {
        //GENERAL
        id: String,
        //LIST LENGTH
        safeties: Number, //has to be a reasonable number with range, check later
        targets: Number,
        reaches: Number,
    },
    "test"
);

app.get("/final/:id", async (req, res) => {
    try {
        const id = req.params.id; //GETS ID FROM API CALL URL
        const individual = await Individual.findOne({ id }); //GETS DOCUMENT ASSOCIATED WITH THE ID
        const lists = await Lists.findOne({ id });
        let safetiesArr = lists.safeties;
        let safetiesScoresArr = lists.fs;
        let targetsArr = lists.targets;
        let targetsScoresArr = lists.ft;
        let reachesArr = lists.reaches;
        let reachesScoresArr = lists.fr;
        let safetyCount = individual.safeties;
        let targetCount = individual.targets;
        let reachCount = individual.reaches;

        //Accounts for reasonable list size
        if (safetyCount > safetiesArr.length) {
            safetyCount = safetiesArr.length;
        }
        if (targetCount > targetsArr.length) {
            targetCount = targetsArr.length;
        }
        if (reachCount > reachesArr.length) {
            reachCount = reachesArr.length;
        }

        let getFinalSafeties = await getMaxValues(
            safetiesScoresArr,
            safetiesArr,
            safetyCount,
            "Safeties"
        );
        let getFinalTargets = await getMaxValues(
            targetsScoresArr,
            targetsArr,
            targetCount,
            "Targets"
        );
        let getFinalReaches = await getMaxValues(
            reachesScoresArr,
            reachesArr,
            reachCount,
            "Reaches"
        );
        let tempFinalListSTR = [
            ...getFinalSafeties.concat(getFinalTargets),
            ...getFinalReaches,
        ];
        lists.set("finalListSTR", tempFinalListSTR);
        //MUST USE SAVE OR UPDATEONE/MANY FUNCTIONS WHEN SETTING A NOSQL LIST
        lists.save(function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log("Document saved successfully!");
            }
        });
        res.json(0);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching item");
    }
});

app.listen(3000, () => {
    console.log("API server listening on port 3000");
});

function getMaxValues(values, names, amount, list) {
    const sortedValues = values.slice().sort((a, b) => b - a);
    const topValues = sortedValues.slice(0, amount);
    const result = [];
    result.push(list);
    for (let i = 0; i < values.length; i++) {
        if (topValues.includes(values[i])) {
            result.push(names[i]);
        }
    }
    return result;
}
