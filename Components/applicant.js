//EXPRESS AND MONGO SETUP
const mongoose = require("mongoose");
mongoose.connect("DBURL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.useDb("colleges");

//ALGORITHM FUNCTIONS
function testScore(act, sat) {
  let totalWeight = 400.0;

  let score1 = ((act - 1) / 35.0) * totalWeight;
  let score2 = (sat / 400.0 - 1) * (totalWeight / 3);

  if (act != -1 && sat != -1) {
    return (score1 + score2) / 2;
  } else if (act != -1) {
    return score1;
  } else if (sat != -1) {
    return score2;
  } else {
    return 200.0;
  }
}

function gpaScore(gpa) {
  let totalWeight = 500.0;
  let gpaScale = 4.0;

  return gpa * (totalWeight / gpaScale);
}

function courseloadScore(honors, apib, lang, cs, core, major) {
  let totalWeight = 400.0;
  let courseloadScore = 0.0;

  courseloadScore += (honors * totalWeight) / 40; //10 estimated max
  courseloadScore += (apib * totalWeight) / 40; //10 estimated max
  courseloadScore += (lang * totalWeight) / 25; //4 estimated max
  courseloadScore += (major * totalWeight) / 25; //4 estimated max

  if (cs === "Y") {
    courseloadScore += totalWeight / 16;
  }
  if (core === "Y") {
    courseloadScore += totalWeight / 8.5;
  }

  return courseloadScore;
}

function confidenceScore(
  extracurriculars,
  essay,
  awards,
  recommendations,
  volunteering,
  works,
  talents,
  interviewing,
  character,
  interest
) {
  let totalWeight = 300.0;
  let confidenceScore = 0.0;

  confidenceScore += (extracurriculars * totalWeight) / 50;
  confidenceScore += (essay * totalWeight) / 50;
  confidenceScore += (awards * totalWeight) / 50;
  confidenceScore += (recommendations * totalWeight) / 50;
  confidenceScore += (volunteering * totalWeight) / 50;
  confidenceScore += (works * totalWeight) / 50;
  confidenceScore += (talents * totalWeight) / 50;
  confidenceScore += (interviewing * totalWeight) / 50;
  confidenceScore += (character * totalWeight) / 50;
  confidenceScore += (interest * totalWeight) / 50;
  return confidenceScore;
}

//SUBMISSION MODEL
const Submissions = mongoose.model("submissions", {
  id: String,
  academic: {
    gpa: Number,
    sat: Number,
    act: Number,
  },
  courseload: {
    honors: Number,
    apib: Number,
    lang: Number,
    cs: String,
    core: String,
    major: Number,
  },
  confidence: {
    extracurriculars: Number,
    essay: Number,
    awards: Number,
    recommendations: Number,
    volunteering: Number,
    works: Number,
    talents: Number,
    interviewing: Number,
    character: Number,
    interest: Number,
  },
  colleges: {
    legacy1: String,
    legacy2: String,
    legacy3: String,
    alumni1: String,
    alumni2: String,
    alumni3: String,
    feeder1: String,
    feeder2: String,
    feeder3: String,
  },
  residency: {
    zipcode: Number,
    state: String,
    country: String,
  },
  class: {
    size: Number,
    rank: Number,
  },
  adversity: {
    fgen: Boolean,
    international: Boolean,
    transfer: Boolean,
  },
  collegePrefs: {
    prestiegeImportance: Number, //0-5
    internshipImportance: Number, //0-5
    studyAbroadImportance: Number, //0-5
    rigorImportance: Number, //0-5
    workStudyImportance: Number, //0-5
    academicResourcesImportance: Number, //0-5
    researchImportance: Number, //0-5
    prefSize: Number,
    prefCommittedFaculty: Number, //0-5
    facilityImportance: Boolean,
    prefPublicControl: Boolean,
    prefPrivateControl: Boolean,
    prefSexRatioF: Number, //out of 100%
    prefMajor: String, //Make data a PCIP value
    prefHighestDegree: Number,
    prefReligious: Boolean,
    prefRelgion: Number,
    pref4yr: Boolean,
    gender: String,
    sameGenderImportance: Number, //0-5
    hbcuImportance: Number,
    coedImportance: Number,
    majorProminenceImportance: Boolean,
  },
  costPrefs: {
    costImportance: Boolean,
    prefCOA: Number, //0 if none => (won't update any)
    income: Number, //Household => 0 if none (won't update any)
    federalAidImportance: Boolean,
  },
  locationPrefs: {
    locationImportance: Boolean,
    ZIP: Number,
    curState: String,
    prefCity: String,
    prefState: String,
    prefRegion: Number, //-1 if none
    livingAtHome: Boolean,
    prefLocale: Number, //-1 if none
    prefSummerClimate: Number,
    prefWinterClimate: Number,
  },
  successPrefs: {
    successImportance: Boolean,
    retentionRateImportance: Boolean,
    prefRetentionRate: Number, //minimum 4yr
    graduationRateImportance: Boolean,
    prefGraduationRate: Number, //minimum 4yr
    alumniCarreerImportance: Boolean,
    desiredEarnings: Number, //6yrs after entry
  },
  weights: {
    collegeWeight: Number, //1-3 (not important, neutral, very important)
    costWeight: Number,
    locationWeight: Number,
    successWeight: Number,
  },
  listLengths: {
    safeties: Number, //has to be a reasonable number with range, check later
    targets: Number,
    reaches: Number,
  },
  //FILTER (NEED MORE DATA)
  //FOOD (NEED MORE DATA)
  //STUDENT LIFE (NEED MORE DATA)
  //TRANSPORTATION (NEED MORE DATA)
});

//COLLEGE MODEL
const Colleges = mongoose.model(
  "Colleges",
  {
    _id: mongoose.Schema.Types.ObjectId,
    INSTNM: String,
    STABBR: String,
    BASE_SCORE: Number,
  },
  "score_data"
);

//INDIVIDUAL DATA OUTPUT MODEL
const Lists = mongoose.model(
  "Lists",
  {
    //GENERAL
    id: String,
    safeties: [String],
    targets: [String],
    reaches: [String],
    fs: [Number],
    ft: [Number],
    fr: [Number],
    finalSafeties: [String],
    finalTargets: [String],
    finalReaches: [String],
    finalListSTR: [String],
  },
  "individual_data"
);

//API CALL RESULT
async function applicant(i_d) {
  const id = i_d; //GETS ID FROM API CALL URL
  const submission = await Submissions.findOne({ id }); //GETS DOCUMENT ASSOCIATED WITH THE ID

  //TEMPORARY VARIABLES FOR LATER
  let total = 0.0; //APPLICANT SCORE
  let legacy = [];
  let alumni = [];
  let feeder = [];
  let state;
  let size;
  let rank;
  let fgen;
  let international;
  let transfer;
  let safeties = [];
  let targets = [];
  let reaches = [];

  //GETS USER ABILITY SCORE
  total =
    testScore(submission.academic.act, submission.academic.sat) +
    gpaScore(submission.academic.gpa) +
    courseloadScore(
      submission.courseload.honors,
      submission.courseload.apib,
      submission.courseload.lang,
      submission.courseload.cs,
      submission.courseload.core,
      submission.courseload.major
    ) +
    confidenceScore(
      submission.confidence.extracurriculars,
      submission.confidence.essay,
      submission.confidence.awards,
      submission.confidence.recommendations,
      submission.confidence.volunteering,
      submission.confidence.works,
      submission.confidence.talents,
      submission.confidence.interviewing,
      submission.confidence.character,
      submission.confidence.interest
    );

  //SETS TEMPORARY VARIABLES
  legacy.push(submission.colleges.legacy1);
  legacy.push(submission.colleges.legacy2);
  legacy.push(submission.colleges.legacy3);
  alumni.push(submission.colleges.alumni1);
  alumni.push(submission.colleges.alumni2);
  alumni.push(submission.colleges.alumni3);
  feeder.push(submission.colleges.feeder1);
  feeder.push(submission.colleges.feeder2);
  feeder.push(submission.colleges.feeder3);
  state = submission.residency.state;
  size = submission.class.size;
  rank = submission.class.rank;
  fgen = submission.adversity.fgen;
  international = submission.adversity.international;
  transfer = submission.adversity.transfer;

  //PREPARES COLLEGES LISTS WITH ADJUSTMENTS FOR OUTPUT
  let colleges = await Colleges.find();
  colleges.forEach((college) => {
    let totalWeight = 250.0;
    if (college.BASE_SCORE != "NULL") {
      //ADJUSTED SCORE METRICS
      let tempScore = college.BASE_SCORE;
      legacy.forEach((college) => {
        if (college.INSTNM === college) {
          tempScore -= totalWeight * 0.08;
        }
      });
      alumni.forEach((college) => {
        if (college.INSTNM === college) {
          tempScore -= totalWeight * 0.04;
        }
      });
      feeder.forEach((college) => {
        if (college.INSTNM === college) {
          tempScore -= totalWeight * 0.12;
        }
      });
      if (state === college.STABBR) {
        tempScore -= totalWeight * 0.16;
      } else {
        tempScore += totalWeight * 0.12;
      }
      if (international) tempScore -= totalWeight * 0.12;
      if (fgen) tempScore -= totalWeight * 0.12;
      if (transfer) tempScore += totalWeight * 0.08;
      if (rank / size < 0.1) tempScore -= totalWeight * 0.16;

      //LIST FORMATION AND ADDITIONS
      if (Math.abs(tempScore - total) < 50) {
        targets.push(college.INSTNM);
      } else if (tempScore - total > 50 && tempScore - total < 125) {
        reaches.push(college.INSTNM);
      } else if (total - tempScore > 50 && total - tempScore < 125) {
        safeties.push(college.INSTNM);
      }
    }
  });

  //CREATION OF NEW USER LISTS DOCUMENT IN MONGO
  let person = await Lists.findOne({ id });
  if (person == null) {
    let newIndividualData = await Lists.create({
      id: id,
      safeties: safeties,
      targets: targets,
      reaches: reaches,
    });
    person.save(function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Document saved successfully!");
      }
    });
  } else {
    const fields = {
      id: id,
      safeties: safeties,
      targets: targets,
      reaches: reaches,
    };
    person.set(fields);
    person.save(function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Document saved successfully!");
      }
    });
  }
}

module.exports = {
  Lists: Lists,
  Individual: Submissions,
  applicant: applicant,
};
