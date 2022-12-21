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
    },
    "individual_data"
);

//COLLEGE MODEL
const Colleges = mongoose.model(
    "Colleges",
    {
        //GENERAL
        INSTNM: String,
        ADM_RATE: String,
        //COLLEGE
        UGDS: String,
        CONTROL: String,
        HBCU: String,
        MENONLY: String,
        WOMENONLY: String,
        FEMALE: String,
        ICLEVEL: String,
        ENDOWBEGIN: String,
        PFTFAC: String,
        HIGHDEG: String,
        RELAFFIL: String,
        PCIP01: String,
        PCIP03: String,
        PCIP04: String,
        PCIP05: String,
        PCIP09: String,
        PCIP10: String,
        PCIP11: String,
        PCIP12: String,
        PCIP13: String,
        PCIP14: String,
        PCIP15: String,
        PCIP16: String,
        PCIP19: String,
        PCIP22: String,
        PCIP23: String,
        PCIP24: String,
        PCIP25: String,
        PCIP26: String,
        PCIP27: String,
        PCIP29: String,
        PCIP30: String,
        PCIP31: String,
        PCIP38: String,
        PCIP39: String,
        PCIP40: String,
        PCIP41: String,
        PCIP42: String, //Check each for null later?
        PCIP43: String,
        PCIP44: String,
        PCIP45: String,
        PCIP46: String,
        PCIP47: String,
        PCIP48: String,
        PCIP49: String,
        PCIP50: String,
        PCIP51: String,
        PCIP52: String,
        PCIP54: String,
        //COST
        COSTT4_A: String,
        PCTPELL: String,
        PCTFLOAN: String,
        MEDIAN_HH_INC: String,
        //LOCATION
        CITY: String,
        STABBR: String,
        ZIP: String,
        REGION: String,
        LOCALE: String,
        LATITUDE: String,
        LONGITUDE: String,
        //SUCCESS
        COMP_ORIG_YR4_RT: String,
        RET_FT4: String,
        MD_EARN_WNE_P6: String,
    },
    "raw_data"
);

//INDIVIDUAL MODEL
const Individual = mongoose.model(
    "Individual",
    {
        //GENERAL
        id: String,
        //COLLEGE (always calculates)
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
        //COST (option to calculate)
        costImportance: Boolean,
        prefCOA: Number, //0 if none => (won't update any)
        income: Number, //Household => 0 if none (won't update any)
        federalAidImportance: Boolean,
        //FILTER (NEED MORE DATA)
        //FOOD (NEED MORE DATA)
        //LOCATION (option to calculate)
        locationImportance: Boolean,
        ZIP: Number,
        curState: String,
        prefCity: String,
        prefState: String,
        prefRegion: Number, //-1 if none
        livingAtHome: Boolean,
        prefLocale: Number, //-1 if none
        prefSummerClimate: String,
        prefWinterClimate: String,
        //STUDENT LIFE (NEED MORE DATA)
        //SUCCESS (option to calculate)
        successImportance: Boolean,
        retentionRateImportance: Boolean,
        prefRetentionRate: Number, //minimum 4yr
        graduationRateImportance: Boolean,
        prefGraduationRate: Number, //minimum 4yr
        alumniCarreerImportance: Boolean,
        desiredEarnings: Number, //6yrs after entry
        //TRANSPORTATION (NEED MORE DATA)
        //WEIGHTS
        collegeWeight: Number, //1-3 (not important, neutral, very important)
        costWeight: Number,
        locationWeight: Number,
        successWeight: Number,
    },
    "test"
);

//SUMMER TEMPERATURE FUNCTION
function getSummerTemperature(zip) {
    const zipCode = zip.toString().charAt(0);

    switch (zipCode) {
        case "0":
            return 52.5;
        case "1":
            return 62.5;
        case "2":
            return 75;
        case "3":
            return 80;
        case "4":
            return 70;
        case "5":
            return 65;
        case "6":
            return 75;
        case "7":
            return 80;
        case "8":
            return 67.5;
        case "9":
            return 65;
        default:
            return 0;
    }
}

//WINTER TEMPERATURE FUNCTION
function getWinterTemperature(zip) {
    const zipCode = zip.toString().charAt(0);

    switch (zipCode) {
        case "0":
            return 22.5;
        case "1":
            return 27.5;
        case "2":
            return 40;
        case "3":
            return 52.5;
        case "4":
            return 32.5;
        case "5":
            return 20;
        case "6":
            return 27.5;
        case "7":
            return 42.5;
        case "8":
            return 32.5;
        case "9":
            return 40;
        default:
            return 0;
    }
}

function getMajorScore(
    majorCode,
    majorImportant,
    PCIP01,
    PCIP03,
    PCIP04,
    PCIP05,
    PCIP09,
    PCIP10,
    PCIP11,
    PCIP12,
    PCIP13,
    PCIP14,
    PCIP15,
    PCIP16,
    PCIP19,
    PCIP22,
    PCIP23,
    PCIP24,
    PCIP25,
    PCIP26,
    PCIP27,
    PCIP29,
    PCIP30,
    PCIP31,
    PCIP38,
    PCIP39,
    PCIP40,
    PCIP41,
    PCIP42,
    PCIP43,
    PCIP44,
    PCIP45,
    PCIP46,
    PCIP47,
    PCIP48,
    PCIP49,
    PCIP50,
    PCIP51,
    PCIP52,
    PCIP54
) {
    let tempScore = 0.0;
    switch (majorCode) {
        case "PCIP01":
            if (PCIP01 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP01 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP03":
            if (PCIP03 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP03 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP04":
            if (PCIP04 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP04 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP05":
            if (PCIP05 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP05 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP09":
            if (PCIP09 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP09 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP10":
            if (PCIP10 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP10 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP11":
            if (PCIP11 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP11 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP12":
            if (PCIP12 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP12 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP13":
            if (PCIP13 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP13 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP14":
            if (PCIP14 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP14 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP15":
            if (PCIP15 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP15 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP16":
            if (PCIP16 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP16 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP19":
            if (PCIP19 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP19 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP22":
            if (PCIP22 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP22 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP23":
            if (PCIP23 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP23 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP24":
            if (PCIP24 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP24 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP25":
            if (PCIP25 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP25 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP26":
            if (PCIP26 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP26 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP27":
            if (PCIP27 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP27 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP29":
            if (PCIP29 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP29 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP30":
            if (PCIP30 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP30 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP31":
            if (PCIP31 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP31 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP38":
            if (PCIP38 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP38 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP39":
            if (PCIP39 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP39 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP40":
            if (PCIP40 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP40 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP41":
            if (PCIP41 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP41 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP42":
            if (PCIP42 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP42 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP43":
            if (PCIP43 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP43 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP44":
            if (PCIP44 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP44 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP45":
            if (PCIP45 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP45 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP46":
            if (PCIP46 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP46 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP47":
            if (PCIP47 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP47 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP48":
            if (PCIP48 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP48 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP49":
            if (PCIP49 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP49 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP50":
            if (PCIP50 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP50 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP51":
            if (PCIP51 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP51 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP52":
            if (PCIP52 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP52 * 100 > 20) tempScore += 30;
            }
            break;
        case "PCIP54":
            if (PCIP54 > 0) {
                tempScore += 30;
                if (majorImportant && PCIP54 * 100 > 20) tempScore += 30;
            }
            break;
    }
    return tempScore;
}

function collegeScore(
    ADM_RATE,
    prestiegeImportance,
    internshipImportance,
    studyAbroadImportance,
    rigorImportance,
    workStudyImportance,
    academicResourcesImportance,
    researchImportance,
    prefSize,
    prefPublicControl,
    prefPrivateControl,
    hbcuImportance,
    coedImportance,
    sameGenderImportance,
    gender,
    prefSexRatioF,
    pref4yr,
    facilityImportance,
    prefCommittedFaculty,
    prefHighestDegree,
    prefReligious,
    prefReligion,
    majorProminenceImportance,
    prefMajor,
    PCIP01,
    PCIP03,
    PCIP04,
    PCIP05,
    PCIP09,
    PCIP10,
    PCIP11,
    PCIP12,
    PCIP13,
    PCIP14,
    PCIP15,
    PCIP16,
    PCIP19,
    PCIP22,
    PCIP23,
    PCIP24,
    PCIP25,
    PCIP26,
    PCIP27,
    PCIP29,
    PCIP30,
    PCIP31,
    PCIP38,
    PCIP39,
    PCIP40,
    PCIP41,
    PCIP42,
    PCIP43,
    PCIP44,
    PCIP45,
    PCIP46,
    PCIP47,
    PCIP48,
    PCIP49,
    PCIP50,
    PCIP51,
    PCIP52,
    PCIP54,
    UGDS,
    CONTROL,
    HBCU,
    MENONLY,
    WOMENONLY,
    ICLEVEL,
    ENDOWBEGIN,
    PFTFAC,
    HIGHDEG,
    RELAFFIL,
    FEMALE
) {
    let tempScore = 0.0;
    tempScore += ((100 - ADM_RATE * 100) * prestiegeImportance) / 50;
    tempScore += ((100 - ADM_RATE * 100) * internshipImportance) / 50;
    tempScore += ((100 - ADM_RATE * 100) * studyAbroadImportance) / 50;
    tempScore += ((100 - ADM_RATE * 100) * rigorImportance) / 50;
    tempScore += ((100 - ADM_RATE * 100) * workStudyImportance) / 50;
    tempScore += ((100 - ADM_RATE * 100) * academicResourcesImportance) / 50;
    tempScore += ((100 - ADM_RATE * 100) * researchImportance) / 50;
    if (Math.abs(prefSize - UGDS) <= 3000) {
        tempScore += 25;
    }
    if (prefPublicControl && CONTROL == 1) {
        tempScore += 15;
    }
    if (prefPrivateControl && CONTROL != 1) {
        tempScore += 15;
    }
    if (hbcuImportance >= 4) {
        if (HBCU != 0) {
            tempScore += 20;
        }
    }
    if (coedImportance >= 4) {
        if (MENONLY == 0 && WOMENONLY == 0) {
            tempScore += 20;
        }
    }
    if (gender === "M" && MENONLY == 1 && sameGenderImportance >= 4) {
        tempScore += 20;
    }
    if (gender === "F" && WOMENONLY == 1 && sameGenderImportance >= 4) {
        tempScore += 20;
    }
    if (Math.abs(prefSexRatioF - FEMALE * 100) <= 5) {
        tempScore += 10;
    }
    if (pref4yr) {
        if (ICLEVEL == 1) {
            tempScore += 10;
        }
    }
    if (facilityImportance) {
        if (ENDOWBEGIN / UGDS >= 45000) {
            tempScore += 10;
        }
    }
    if (prefCommittedFaculty >= 4) {
        if (PFTFAC * 100 >= 55) {
            tempScore += 10;
        }
    }
    if (prefHighestDegree == HIGHDEG) {
        tempScore += 30;
    }
    if (prefReligious && prefReligion == RELAFFIL) {
        tempScore += 20;
    }
    tempScore += getMajorScore(
        prefMajor,
        majorProminenceImportance,
        PCIP01,
        PCIP03,
        PCIP04,
        PCIP05,
        PCIP09,
        PCIP10,
        PCIP11,
        PCIP12,
        PCIP13,
        PCIP14,
        PCIP15,
        PCIP16,
        PCIP19,
        PCIP22,
        PCIP23,
        PCIP24,
        PCIP25,
        PCIP26,
        PCIP27,
        PCIP29,
        PCIP30,
        PCIP31,
        PCIP38,
        PCIP39,
        PCIP40,
        PCIP41,
        PCIP42,
        PCIP43,
        PCIP44,
        PCIP45,
        PCIP46,
        PCIP47,
        PCIP48,
        PCIP49,
        PCIP50,
        PCIP51,
        PCIP52,
        PCIP54
    );
    return tempScore;
}

function costScore(
    costImportance,
    prefCOA,
    COSTT4_A,
    income,
    MEDIAN_HH_INC,
    federalAidImportance,
    PCTPELL,
    PCTFLOAN
) {
    let tempScore = 0.0;
    if (costImportance) {
        if (prefCOA + 10000 >= COSTT4_A) {
            tempScore += 70;
        }
        if (income * 0.47 >= COSTT4_A || income >= MEDIAN_HH_INC) {
            tempScore += 40;
        }
        if (federalAidImportance && PCTPELL >= 0.33 && PCTFLOAN >= 0.33) {
            tempScore += 40;
        }
    }
    return tempScore;
}

function locationScore(
    locationImportance,
    prefCity,
    CITY,
    prefState,
    STABBR,
    curState,
    prefRegion,
    REGION,
    livingAtHome,
    prefLocale,
    LOCALE,
    prefSummerClimate,
    prefWinterClimate,
    ZIP
) {
    let tempScore = 0.0;
    if (locationImportance) {
        if (prefCity === CITY) {
            tempScore += 40;
        }
        if (prefState === STABBR) {
            tempScore += 60;
        }
        if (curState === STABBR) {
            tempScore += 20;
        }
        if (prefRegion == REGION) {
            tempScore += 70;
        }
        if (livingAtHome) {
            if (curState === STABBR) {
                tempScore -= 200; //ESSENTIALLY REMOVES THE COLLEGE FROM CONTENTION
            }
        }
        if (prefLocale == LOCALE) {
            tempScore += 50;
        }
        if (Math.abs(prefSummerClimate - getSummerTemperature(ZIP)) < 10) {
            tempScore += 40;
        }
        if (Math.abs(prefWinterClimate - getWinterTemperature(ZIP)) < 10) {
            tempScore += 40;
        }
    }
    return tempScore;
}

function successScore(
    successImportance,
    retentionRateImportance,
    prefRetentionRate,
    RET_FT4,
    graduationRateImportance,
    prefGraduationRate,
    COMP_ORIG_YR4_RT,
    alumniCarreerImportance,
    desiredEarnings,
    MD_EARN_WNE_P6,
    ADM_RATE
) {
    let tempScore = 0.0;
    if (successImportance) {
        if (retentionRateImportance && prefRetentionRate / 100 <= RET_FT4) {
            tempScore += 40;
        }
        if (
            graduationRateImportance &&
            prefGraduationRate / 100 <= COMP_ORIG_YR4_RT
        ) {
            tempScore += 40;
        }
        if (alumniCarreerImportance) {
            tempScore += (100 - ADM_RATE) / 5;
        }
        if (
            Math.abs(desiredEarnings - MD_EARN_WNE_P6) <= 10000 ||
            desiredEarnings <= MD_EARN_WNE_P6
        ) {
            tempScore += 60;
        }
    }
    return tempScore;
}

//API CALL RESULT
app.get("/test/:id", async (req, res) => {
    try {
        const id = req.params.id; //GETS ID FROM API CALL URL
        const individual = await Individual.findOne({ id }); //GETS DOCUMENT ASSOCIATED WITH THE ID
        const lists = await Lists.findOne({ id });
        let safetiesArr = [];
        let targetsArr = [];
        let reachesArr = [];

        //SAFETIES
        lists.safeties.forEach(async (col) => {
            //FINDS COLLEGE DATA ASSOCIATED WITH NAME
            let college = await Colleges.findOne({ INSTNM: col });

            //COLLEGE
            let tempCollegeScore = collegeScore(
                college.ADM_RATE,
                individual.prestiegeImportance,
                individual.internshipImportance,
                individual.studyAbroadImportance,
                individual.rigorImportance,
                individual.workStudyImportance,
                individual.academicResourcesImportance,
                individual.researchImportance,
                individual.prefSize,
                individual.prefPublicControl,
                individual.prefPrivateControl,
                individual.hbcuImportance,
                individual.coedImportance,
                individual.sameGenderImportance,
                individual.gender,
                individual.prefSexRatioF,
                individual.pref4yr,
                individual.facilityImportance,
                individual.prefCommittedFaculty,
                individual.prefHighestDegree,
                individual.prefReligious,
                individual.prefReligion,
                individual.majorProminenceImportance,
                individual.prefMajor,
                college.PCIP01,
                college.PCIP03,
                college.PCIP04,
                college.PCIP05,
                college.PCIP09,
                college.PCIP10,
                college.PCIP11,
                college.PCIP12,
                college.PCIP13,
                college.PCIP14,
                college.PCIP15,
                college.PCIP16,
                college.PCIP19,
                college.PCIP22,
                college.PCIP23,
                college.PCIP24,
                college.PCIP25,
                college.PCIP26,
                college.PCIP27,
                college.PCIP29,
                college.PCIP30,
                college.PCIP31,
                college.PCIP38,
                college.PCIP39,
                college.PCIP40,
                college.PCIP41,
                college.PCIP42,
                college.PCIP43,
                college.PCIP44,
                college.PCIP45,
                college.PCIP46,
                college.PCIP47,
                college.PCIP48,
                college.PCIP49,
                college.PCIP50,
                college.PCIP51,
                college.PCIP52,
                college.PCIP54,
                college.UGDS,
                college.CONTROL,
                college.HBCU,
                college.MENONLY,
                college.WOMENONLY,
                college.ICLEVEL,
                college.ENDOWBEGIN,
                college.PFTFAC,
                college.HIGHDEG,
                college.RELAFFIL,
                college.FEMALE
            );
            //COST
            let tempCostScore = costScore(
                individual.costImportance,
                individual.prefCOA,
                college.COSTT4_A,
                individual.income,
                college.MEDIAN_HH_INC,
                individual.federalAidImportance,
                college.PCTPELL,
                college.PCTFLOAN
            );
            //LOCATION
            let tempLocationScore = locationScore(
                individual.locationImportance,
                individual.prefCity,
                college.CITY,
                individual.prefState,
                college.STABBR,
                individual.curState,
                individual.prefRegion,
                college.REGION,
                individual.livingAtHome,
                individual.prefLocale,
                college.LOCALE,
                individual.prefSummerClimate,
                individual.prefWinterClimate,
                college.ZIP
            );
            //SUCCESS
            let tempSuccessScore = successScore(
                individual.successImportance,
                individual.retentionRateImportance,
                individual.prefRetentionRate,
                college.RET_FT4,
                individual.graduationRateImportance,
                individual.prefGraduationRate,
                college.COMP_ORIG_YR4_RT,
                individual.alumniCarreerImportance,
                individual.desiredEarnings,
                college.MD_EARN_WNE_P6,
                college.ADM_RATE
            );
            let totalScore =
                individual.costWeight * tempCostScore +
                individual.locationWeight * tempLocationScore +
                individual.successWeight * tempSuccessScore +
                individual.collegeWeight * tempCollegeScore +
                Math.random();
            //MATH.random() to ensure no duplicate keys
            safetiesArr.push(totalScore);
            await doAsyncWork(totalScore); //stalls insertion until done with loop
        });
        //ADDS SAFETY SCORES TO MONGODB
        await Promise.all(lists.safeties.map((col) => doAsyncWork(col))).then(
            () => {
                // Create a new document with the array field
                lists.set("fs", safetiesArr);

                // Save the document to the database
                lists.save(function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Document saved successfully!");
                    }
                });
            }
        );
        //TARGETS
        lists.targets.forEach(async (col) => {
            //FINDS COLLEGE DATA ASSOCIATED WITH NAME
            let college = await Colleges.findOne({ INSTNM: col });

            //COLLEGE
            let tempCollegeScore = collegeScore(
                college.ADM_RATE,
                individual.prestiegeImportance,
                individual.internshipImportance,
                individual.studyAbroadImportance,
                individual.rigorImportance,
                individual.workStudyImportance,
                individual.academicResourcesImportance,
                individual.researchImportance,
                individual.prefSize,
                individual.prefPublicControl,
                individual.prefPrivateControl,
                individual.hbcuImportance,
                individual.coedImportance,
                individual.sameGenderImportance,
                individual.gender,
                individual.prefSexRatioF,
                individual.pref4yr,
                individual.facilityImportance,
                individual.prefCommittedFaculty,
                individual.prefHighestDegree,
                individual.prefReligious,
                individual.prefReligion,
                individual.majorProminenceImportance,
                individual.prefMajor,
                college.PCIP01,
                college.PCIP03,
                college.PCIP04,
                college.PCIP05,
                college.PCIP09,
                college.PCIP10,
                college.PCIP11,
                college.PCIP12,
                college.PCIP13,
                college.PCIP14,
                college.PCIP15,
                college.PCIP16,
                college.PCIP19,
                college.PCIP22,
                college.PCIP23,
                college.PCIP24,
                college.PCIP25,
                college.PCIP26,
                college.PCIP27,
                college.PCIP29,
                college.PCIP30,
                college.PCIP31,
                college.PCIP38,
                college.PCIP39,
                college.PCIP40,
                college.PCIP41,
                college.PCIP42,
                college.PCIP43,
                college.PCIP44,
                college.PCIP45,
                college.PCIP46,
                college.PCIP47,
                college.PCIP48,
                college.PCIP49,
                college.PCIP50,
                college.PCIP51,
                college.PCIP52,
                college.PCIP54,
                college.UGDS,
                college.CONTROL,
                college.HBCU,
                college.MENONLY,
                college.WOMENONLY,
                college.ICLEVEL,
                college.ENDOWBEGIN,
                college.PFTFAC,
                college.HIGHDEG,
                college.RELAFFIL,
                college.FEMALE
            );
            //COST
            let tempCostScore = costScore(
                individual.costImportance,
                individual.prefCOA,
                college.COSTT4_A,
                individual.income,
                college.MEDIAN_HH_INC,
                individual.federalAidImportance,
                college.PCTPELL,
                college.PCTFLOAN
            );
            //LOCATION
            let tempLocationScore = locationScore(
                individual.locationImportance,
                individual.prefCity,
                college.CITY,
                individual.prefState,
                college.STABBR,
                individual.curState,
                individual.prefRegion,
                college.REGION,
                individual.livingAtHome,
                individual.prefLocale,
                college.LOCALE,
                individual.prefSummerClimate,
                individual.prefWinterClimate,
                college.ZIP
            );
            //SUCCESS
            let tempSuccessScore = successScore(
                individual.successImportance,
                individual.retentionRateImportance,
                individual.prefRetentionRate,
                college.RET_FT4,
                individual.graduationRateImportance,
                individual.prefGraduationRate,
                college.COMP_ORIG_YR4_RT,
                individual.alumniCarreerImportance,
                individual.desiredEarnings,
                college.MD_EARN_WNE_P6,
                college.ADM_RATE
            );
            let totalScore =
                individual.costWeight * tempCostScore +
                individual.locationWeight * tempLocationScore +
                individual.successWeight * tempSuccessScore +
                individual.collegeWeight * tempCollegeScore +
                Math.random();
            //MATH.random() to ensure no duplicate keys
            targetsArr.push(totalScore);
            await doAsyncWork(totalScore); //stalls insertion until done with loop
        });
        //ADDS TARGET SCORES TO MONGODB
        await Promise.all(lists.targets.map((col) => doAsyncWork(col))).then(
            () => {
                // Create a new document with the array field
                lists.set("ft", targetsArr);

                // Save the document to the database
                lists.save(function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Document saved successfully!");
                    }
                });
            }
        );
        //REACHES
        lists.reaches.forEach(async (col) => {
            //FINDS COLLEGE DATA ASSOCIATED WITH NAME
            let college = await Colleges.findOne({ INSTNM: col });

            //COLLEGE
            let tempCollegeScore = collegeScore(
                college.ADM_RATE,
                individual.prestiegeImportance,
                individual.internshipImportance,
                individual.studyAbroadImportance,
                individual.rigorImportance,
                individual.workStudyImportance,
                individual.academicResourcesImportance,
                individual.researchImportance,
                individual.prefSize,
                individual.prefPublicControl,
                individual.prefPrivateControl,
                individual.hbcuImportance,
                individual.coedImportance,
                individual.sameGenderImportance,
                individual.gender,
                individual.prefSexRatioF,
                individual.pref4yr,
                individual.facilityImportance,
                individual.prefCommittedFaculty,
                individual.prefHighestDegree,
                individual.prefReligious,
                individual.prefReligion,
                individual.majorProminenceImportance,
                individual.prefMajor,
                college.PCIP01,
                college.PCIP03,
                college.PCIP04,
                college.PCIP05,
                college.PCIP09,
                college.PCIP10,
                college.PCIP11,
                college.PCIP12,
                college.PCIP13,
                college.PCIP14,
                college.PCIP15,
                college.PCIP16,
                college.PCIP19,
                college.PCIP22,
                college.PCIP23,
                college.PCIP24,
                college.PCIP25,
                college.PCIP26,
                college.PCIP27,
                college.PCIP29,
                college.PCIP30,
                college.PCIP31,
                college.PCIP38,
                college.PCIP39,
                college.PCIP40,
                college.PCIP41,
                college.PCIP42,
                college.PCIP43,
                college.PCIP44,
                college.PCIP45,
                college.PCIP46,
                college.PCIP47,
                college.PCIP48,
                college.PCIP49,
                college.PCIP50,
                college.PCIP51,
                college.PCIP52,
                college.PCIP54,
                college.UGDS,
                college.CONTROL,
                college.HBCU,
                college.MENONLY,
                college.WOMENONLY,
                college.ICLEVEL,
                college.ENDOWBEGIN,
                college.PFTFAC,
                college.HIGHDEG,
                college.RELAFFIL,
                college.FEMALE
            );
            //COST
            let tempCostScore = costScore(
                individual.costImportance,
                individual.prefCOA,
                college.COSTT4_A,
                individual.income,
                college.MEDIAN_HH_INC,
                individual.federalAidImportance,
                college.PCTPELL,
                college.PCTFLOAN
            );
            //LOCATION
            let tempLocationScore = locationScore(
                individual.locationImportance,
                individual.prefCity,
                college.CITY,
                individual.prefState,
                college.STABBR,
                individual.curState,
                individual.prefRegion,
                college.REGION,
                individual.livingAtHome,
                individual.prefLocale,
                college.LOCALE,
                individual.prefSummerClimate,
                individual.prefWinterClimate,
                college.ZIP
            );
            //SUCCESS
            let tempSuccessScore = successScore(
                individual.successImportance,
                individual.retentionRateImportance,
                individual.prefRetentionRate,
                college.RET_FT4,
                individual.graduationRateImportance,
                individual.prefGraduationRate,
                college.COMP_ORIG_YR4_RT,
                individual.alumniCarreerImportance,
                individual.desiredEarnings,
                college.MD_EARN_WNE_P6,
                college.ADM_RATE
            );
            let totalScore =
                individual.costWeight * tempCostScore +
                individual.locationWeight * tempLocationScore +
                individual.successWeight * tempSuccessScore +
                individual.collegeWeight * tempCollegeScore +
                Math.random();
            //MATH.random() to ensure no duplicate keys
            reachesArr.push(totalScore);
            await doAsyncWork(totalScore); //stalls insertion until done with loop
        });
        //ADDS REACH SCORES TO MONGODB
        await Promise.all(lists.reaches.map((col) => doAsyncWork(col))).then(
            () => {
                // Create a new document with the array field
                lists.set("fr", reachesArr);

                // Save the document to the database
                lists.save(function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Document saved successfully!");
                    }
                });
            }
        );
        res.json(0); //TEMPORARY OUTPUT
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching item");
    }
});

async function doAsyncWork(item) {
    //BANDAID FIX ATM
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

app.listen(3000, () => {
    console.log("API server listening on port 3000");
});
