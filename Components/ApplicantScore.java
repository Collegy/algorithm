package Components;

public class ApplicantScore {

    //Applicant Score Data  (keep private)
    private AAbility ability;

    //Applicant Score Constructor
    public ApplicantScore(AAbility applicantAbility) {
        this.ability = applicantAbility;
    }

    //Calculates the test score portion of the applicant score
    //{0 +/- 1, 400}
    public double scoreCPTest() {
        double totalWeight = 400.0; //Max value of scale

        if (ability.getCPTestType().equals("ACT")) {
            return (((ability.getCPTestScore() - 1) / 35) * (totalWeight - 1)) + 1;
        } else if (ability.getCPTestType().equals("SAT")) {
            return (ability.getCPTestScore() / 400 - 1) * (totalWeight / 3);
        } else {
            return 200.0; //If test optional (correct later)
        }
    }

    //Calculates the test score portion of the application score
    //{1, 500}
    public double scoreGPA() {
        double totalWeight = 500.0; //Max value of scale
        double gpaScaleMax = 4.0; //Keep this as 4.0 with the data for now, help to convert to 4.0 in UI
        
        return ability.getGpa() * ((totalWeight - 1) / gpaScaleMax) + 1;
    }

    //Calculates the courseload portion of the application score
    //{0, 400}
    public double scoreCourseload() {
        //Arbitrary Weights (for importance of each category)
        double w1 = 1 / 6;
        double w2 = 1 / 6;
        double w3 = 4 / 15;
        double w4 = 1 / 6;
        double w5 = 1 / 15;
        double w6 = 1 / 6;

        int scale = 40; //Important for making the scale {0, 400} overall

        double csCYN = ability.isCsCourses() ? 150 : 0;
        double cCYN = ability.isCoreCourses() ? 490 : 0;

        return (w1 * ability.getMajorRelatedCourses() * scale)
                    + (w2 * ability.getHonorsCourses() * scale)
                        + (w3 * ability.getApIBCourses() * scale)
                            + (w4 * ability.getForeignLangCourses() * scale)
                                + (w5 * csCYN) + (w6 * cCYN) + 1;
    }

    //Calculates the scoreConfidence portion of the applicant score
    //{0, 300}
    public double scoreConfidence() {
        double totalWeight = 300.0;

        double ecSCore = ability.getExtracurriculars() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double eScore = ability.getEssays() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double aScore = ability.getAwards() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double rScore = ability.getRecommendations() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double vScore = ability.getVolunteering() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double wScore = ability.getWork() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double tScore = ability.getTalent() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double iScore = ability.getInterviewing() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double cScore = ability.getCharacter() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}
        double itScore = ability.getInterest() * ((totalWeight / 10 - 1) / 5);
        //{0, 30}

        return ecSCore + eScore + aScore + rScore + vScore + wScore + tScore + iScore + cScore + itScore;
    }

    //Calculates the addtional portions of the applicant score
    //{-25, 90}
    public double scoreAdditionals() {
        double additional = 0.0;

        //If applicant is international, adds 25 to applicant score
        additional += ability.isInternational() ? 25 : 0;

        //If applicant is first generation, adds 25 to applicant score
        additional += ability.isFirstGen() ? 25: 0;

        //If applicant is the top 10% of their class, adds 40 to applicant score
        additional += ((ability.getClassRank() / ability.getClassSize()) < 0.1) ? 40 : 0;

        //If applicant is a transfer, subtracts 25 from applicant score
        additional -= ability.isTransfer() ? 20 : 0;

        return additional;
    }

    //Calculates the total applicant score and returns it (use this to get applicant score)
    public double calculateAbilityScore() {
        return scoreCPTest() + scoreGPA() + scoreCourseload() + scoreConfidence() + scoreAdditionals();
    }

}
