package Components;

public class CollegeScore {
    
    //College Score Data (keep private)
    private CAbility cAbility;
    private AAbility aAbility;

    //College Score Constructor
    public CollegeScore(CAbility cA, AAbility aA) {
        this.cAbility = cA;
        this.aAbility = aA;
    }

    //Calculates the test score portion of the college score
    //{0 +/- 1, 400}
    public double scoreCPTest() {
        double totalWeight = 400.0; //Max value of scale
    
        if (aAbility.getCPTestType().equals("ACT")) {
            return (((cAbility.getAvgACT() - 1) / 35) * (totalWeight - 1)) + 1;
        } else if 
        (aAbility.getCPTestType().equals("SAT")) {
            return (cAbility.getAvgSAT() / 400 - 1) * (totalWeight / 3);
        } else {
            return 0.0; //Never should happen!
        }
    }

    //Calculates the test score portion of the college score
    //{1, 500 +/- some error}
    public double scoreGPA() {
        double totalWeight = 500.0; //Max value of scale
        double gpaScaleMax = 4.0; //Keep this as 4.0 with the data for now

        return cAbility.getAvgGPA() * ((totalWeight - 1) / gpaScaleMax) + 1; 
    }

    //Calculates the courseload portion of the college score
    //{0, 400}
    public double scoreCourseload() {
        double majorRelatedCoursesScore = (100 - cAbility.getAcceptanceRate()) * (24 / 30);
        double honorCoursesScore = (100 - cAbility.getAcceptanceRate()) * (24 / 30);
        double apIBCoursesScore = (100 - cAbility.getAcceptanceRate()) * (24 / 30);
        double foreginLanguageCoursesScore = (100 - cAbility.getAcceptanceRate()) * (24 / 30);
        //{0, 80}

        double csCoursesScore = cAbility.getAcceptanceRate() < 40 ? 40 : 0;
        //{0, 40}
        double coreCoursesScore = cAbility.getAcceptanceRate() <= 100 ? 40 : 0;
        //{0, 40}

        return majorRelatedCoursesScore + honorCoursesScore + apIBCoursesScore + foreginLanguageCoursesScore + csCoursesScore + coreCoursesScore;
    }

    //Calculates the scoreConfidence portion of the college score
    //{0, 300}
    public double scoreConfidence() {

        double extracurricularScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double essayScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double awardScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double recommendationsScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double volunteeringScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double workScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double talentScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double interviewingScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double characterScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}
        double interestScore = (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) > 25 ? 30 : (((100 - cAbility.getAcceptanceRate()) * (3)) / (10)) ;
        //{0, 30}

        return extracurricularScore + essayScore + awardScore + recommendationsScore + volunteeringScore + workScore + talentScore + interviewingScore + characterScore + interestScore;
    }

    //Calculates the addtional portions of the college score
    //{-140, 25}
    public double scoreAdditionals() {
        double additional = 0.0;

        //Residency, lowers college score by 25 if in the same state as you, adds 25 if in different state
        additional -= cAbility.getState().equals(aAbility.getResidency()) ? 40 : -25;
        //Add something for city later?

        //Legacy, lowers college score by 40 if the applicant has legacy there
        for (int i = 0; i < aAbility.getLegacy().length; i++) {
            if (aAbility.getLegacy()[i].equals(cAbility.getCollegeName())) {
                additional -= 20;
            }
        }

        //Alumni, lowers college score by 25 if the applicant knows alumni that go there
        for (int i = 0; i < aAbility.getAlumni().length; i++) {
            if (aAbility.getAlumni()[i].equals(cAbility.getCollegeName())) {
                additional -= 10;
            }
        }

        //Feeder, lowers college score by 25 if the college is a feeder for the applicant's highschool
        for (int i = 0; i < aAbility.getFeeder().length; i++) {
            if (aAbility.getFeeder()[i].equals(cAbility.getCollegeName())) {
                additional -= 30;
            }
        }

        return additional;
    }

    //Calculates the total college score and returns it (use this to get college score)
    public double calculateAbilityScore() {
        return scoreCPTest() + scoreGPA() + scoreCourseload() + scoreConfidence() + scoreAdditionals();
    }
}
