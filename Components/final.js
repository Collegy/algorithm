//EXPRESS AND MONGO SETUP
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("DBURL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.useDb("colleges");
const app = express();
app.use(express.json());

//LIST MODEL
const applicantImps = require("./applicant");
const Lists = applicantImps.Lists;

const rankImps = require("./rank");
//INDIVIDUAL MODEL
const Individual = rankImps.Individual;

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

async function final(i_d) {
  const id = i_d; //GETS ID FROM API CALL URL
  const individual = await Individual.findOne({ id }); //GETS DOCUMENT ASSOCIATED WITH THE ID
  const lists = await Lists.findOne({ id });
  let safetiesArr = lists.safeties;
  let safetiesScoresArr = lists.fs;
  let targetsArr = lists.targets;
  let targetsScoresArr = lists.ft;
  let reachesArr = lists.reaches;
  let reachesScoresArr = lists.fr;
  let safetyCount = individual.listLengths.safeties;
  let targetCount = individual.listLengths.targets;
  let reachCount = individual.listLengths.reaches;

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
  getFinalSafeties.splice(getFinalSafeties.indexOf("Safeties"), 1);
  getFinalTargets.splice(getFinalTargets.indexOf("Targets"), 1);
  getFinalReaches.splice(getFinalReaches.indexOf("Reaches"), 1);
  lists.set("finalSafeties", getFinalSafeties);
  lists.set("finalTargets", getFinalTargets);
  lists.set("finalReaches", getFinalReaches);
  //MUST USE SAVE OR UPDATEONE/MANY FUNCTIONS WHEN SETTING A NOSQL LIST
  lists.save(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Document saved successfully!");
    }
  });
  return {
    safeties: getFinalSafeties,
    targets: getFinalTargets,
    reaches: getFinalReaches,
  };
}

module.exports = { final: final };
