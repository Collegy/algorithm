package Components;

public class AAbility {

    //Applicant Ability Data

        //Test Score Part
    private int cPTestScore;
    private String cPTestType;

        //Gpa Score Part
    private double gpa; //{0.0, 4.0 +- error} (give tips to convert or make a feature)
    private double gpaScaleMax; //Keep this as 4.0 with the data for now

        //Courseload Score Part
    private int[] courses;
    private int majorRelatedCourses; //{0, 6} FOR NOW (should max a non max eventually)
    private int honorsCourses; //{0, 14} FOR NOW
    private int apIBCourses; //{0, 14} FOR NOW
    private int foreignLangCourses; //{0, 4} FOR NOW
    private boolean csCourses;
    private boolean coreCourses;

        //Confidence Score Part
    private int extracurriculars; //{0, 5}
    private int essays;
    private int awards;
    private int recommendations;
    private int volunteering;
    private int work;
    private int talent;
    private int interviewing;
    private int character;
    private int interest;

        //College Score Specifics
    private String[] legacy; //specifc for college (handled in CollegeScore)
    private String parent1College;
    private String parent2College; //give 2 options only, make empty Strings if none
    private String[] alumni; //specific for college (handled in CollegeScore)
    private String alumni1;
    private String alumni2; //give 2 options only, make empty Strings if none
    private String[] feeder; //specific for college (handled in CollegeScore)
    private String feeder1;
    private String feeder2;
    private String feeder3; //give 3 options only, make empty Strings if none
    private String residency; //specifc for college (handled in CollegeScore)

        //Applicant Score Specifics
    private int classRank; //for top 10% perk calculations
    private double classSize;
    private boolean firstGen;
    private boolean international;
    private boolean transfer;

    //Applicant Ability Getters and Setters
    public int getCPTestScore() {
		return this.cPTestScore;
	}

	public void setCPTestScore(int cPTestScore) {
		this.cPTestScore = cPTestScore;
	}

	public String getCPTestType() {
		return this.cPTestType;
	}

	public void setCPTestType(String cPTestType) {
		this.cPTestType = cPTestType;
	}

	public double getGpa() {
		return this.gpa;
	}

	public void setGpa(double gpa) {
		this.gpa = gpa;
	}

	public double getGpaScaleMax() {
		return this.gpaScaleMax;
	}

	public void setGpaScaleMax(double gpaScaleMax) {
		this.gpaScaleMax = gpaScaleMax;
	}

    public int[] getCourses() {
		return this.courses;
	}

	public void setCourses(int[] courses) {
		this.courses = courses;
	}

	public int getMajorRelatedCourses() {
		return this.majorRelatedCourses;
	}

	public void setMajorRelatedCourses(int majorRelatedCourses) {
		this.majorRelatedCourses = majorRelatedCourses;
	}

	public int getHonorsCourses() {
		return this.honorsCourses;
	}

	public void setHonorsCourses(int honorsCourses) {
		this.honorsCourses = honorsCourses;
	}

	public int getApIBCourses() {
		return this.apIBCourses;
	}

	public void setApIBCourses(int apIBCourses) {
		this.apIBCourses = apIBCourses;
	}

	public int getForeignLangCourses() {
		return this.foreignLangCourses;
	}

	public void setForeignLangCourses(int foreignLangCourses) {
		this.foreignLangCourses = foreignLangCourses;
	}

	public boolean isCsCourses() {
		return this.csCourses;
	}

	public void setCsCourses(boolean csCourses) {
		this.csCourses = csCourses;
	}

	public boolean isCoreCourses() {
		return this.coreCourses;
	}

	public void setCoreCourses(boolean coreCourses) {
		this.coreCourses = coreCourses;
	}

    public int getExtracurriculars() {
		return this.extracurriculars;
	}

	public void setExtracurriculars(int extracurriculars) {
		this.extracurriculars = extracurriculars;
	}

	public int getEssays() {
		return this.essays;
	}

	public void setEssays(int essays) {
		this.essays = essays;
	}

	public int getAwards() {
		return this.awards;
	}

	public void setAwards(int awards) {
		this.awards = awards;
	}

	public int getRecommendations() {
		return this.recommendations;
	}

	public void setRecommendations(int recommendations) {
		this.recommendations = recommendations;
	}

	public int getVolunteering() {
		return this.volunteering;
	}

	public void setVolunteering(int volunteering) {
		this.volunteering = volunteering;
	}

	public int getWork() {
		return this.work;
	}

	public void setWork(int work) {
		this.work = work;
	}

	public int getTalent() {
		return this.talent;
	}

	public void setTalent(int talent) {
		this.talent = talent;
	}

	public int getInterviewing() {
		return this.interviewing;
	}

	public void setInterviewing(int interviewing) {
		this.interviewing = interviewing;
	}

	public int getCharacter() {
		return this.character;
	}

	public void setCharacter(int character) {
		this.character = character;
	}

	public int getInterest() {
		return this.interest;
	}

	public void setInterest(int interest) {
		this.interest = interest;
	}

    public String[] getLegacy() {
		return this.legacy;
	}

	public void setLegacy(String[] legacy) {
		this.legacy = legacy;
	}

	public String getParent1College() {
		return this.parent1College;
	}

	public void setParent1College(String parent1College) {
		this.parent1College = parent1College;
	}

	public String getParent2College() {
		return this.parent2College;
	}

	public void setParent2College(String parent2College) {
		this.parent2College = parent2College;
	}

	public String[] getAlumni() {
		return this.alumni;
	}

	public void setAlumni(String[] alumni) {
		this.alumni = alumni;
	}

	public String getAlumni1() {
		return this.alumni1;
	}

	public void setAlumni1(String alumni1) {
		this.alumni1 = alumni1;
	}

	public String getAlumni2() {
		return this.alumni2;
	}

	public void setAlumni2(String alumni2) {
		this.alumni2 = alumni2;
	}

	public String[] getFeeder() {
		return this.feeder;
	}

	public void setFeeder(String[] feeder) {
		this.feeder = feeder;
	}

	public String getFeeder1() {
		return this.feeder1;
	}

	public void setFeeder1(String feeder1) {
		this.feeder1 = feeder1;
	}

	public String getFeeder2() {
		return this.feeder2;
	}

	public void setFeeder2(String feeder2) {
		this.feeder2 = feeder2;
	}

	public String getFeeder3() {
		return this.feeder3;
	}

	public void setFeeder3(String feeder3) {
		this.feeder3 = feeder3;
	}

	public String getResidency() {
		return this.residency;
	}

	public void setResidency(String residency) {
		this.residency = residency;
	}

    public int getClassRank() {
		return this.classRank;
	}

	public void setClassRank(int classRank) {
		this.classRank = classRank;
	}

	public double getClassSize() {
		return this.classSize;
	}

	public void setClassSize(double classSize) {
		this.classSize = classSize;
	}

	public boolean isFirstGen() {
		return this.firstGen;
	}

	public void setFirstGen(boolean firstGen) {
		this.firstGen = firstGen;
	}

	public boolean isInternational() {
		return this.international;
	}

	public void setInternational(boolean international) {
		this.international = international;
	}

	public boolean isTransfer() {
		return this.transfer;
	}

	public void setTransfer(boolean transfer) {
		this.transfer = transfer;
	}

    //Applicant Constructors
    public AAbility() {
        this(1510, "SAT", 4.0, 4.0, 3, 10, 10, 4, true, true, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, "RIT", "UoR", "Cornell", "Cornell", "Pitt", "Cornell", "RIT", "NY", 15, 500, false, false, false);
    }

    public AAbility(int cPTestScore, String cPTestType, double gpa, double gpaScaleMax, int majorRelatedCourses, int honorsCourses, int apIBCourses, int foreignLangCourses, boolean csCourses, boolean coreCourses, int extracurriculars, int essays, int awards, int recommendations, int volunteering, int work, int talent, int interviewing, int character, int interest, String parent1College, String parent2College, String alumni1, String alumni2, String feeder1, String feeder2, String feeder3, String residency, int classRank, double classSize, boolean firstGen, boolean international, boolean transfer) {
        this.cPTestScore = cPTestScore;
        this.cPTestType = cPTestType;

        this.gpa = gpa;
        this.gpaScaleMax = gpaScaleMax;

        this.courses = new int[4];
        this.majorRelatedCourses = majorRelatedCourses; //6 max
        this.honorsCourses = honorsCourses; //14 max
        this.apIBCourses = apIBCourses; //14 max
        this.foreignLangCourses = foreignLangCourses; //4 max
        courses[0] = majorRelatedCourses;
        courses[1] = honorsCourses;
        courses[2] = apIBCourses;
        courses[3] = foreignLangCourses;
        this.csCourses = csCourses;
        this.coreCourses = coreCourses;

        this.extracurriculars = extracurriculars; //0-5
        this.essays = essays;
        this.awards = awards;
        this.recommendations = recommendations;
        this.volunteering = volunteering;
        this.work = work;
        this.talent = talent;
        this.interviewing = interviewing;
        this.character = character;
        this.interest = interest;

        this.legacy = new String[2];
        this.parent1College = parent1College;
        this.parent2College = parent2College;
        legacy[0] = parent1College;
        legacy[1] = parent2College;
        this.alumni = new String[2];
        this.alumni1 = alumni1;
        this.alumni2 = alumni2;
        alumni[0] = alumni1;
        alumni[1] = alumni2;
        this.feeder = new String[3];
        this.feeder1 = feeder1;
        this.feeder2 = feeder2;
        this.feeder3 = feeder3;
        feeder[0] = feeder1;
        feeder[1] = feeder2;
        feeder[2] = feeder3;
        this.residency = residency;

        this.classRank = classRank;
        this.classSize = classSize;
        this.firstGen = firstGen;
        this.international = international;
        this.transfer = transfer;
    }
}
