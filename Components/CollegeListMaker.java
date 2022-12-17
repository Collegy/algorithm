package Components;
import java.util.ArrayList;

public class CollegeListMaker {

    //College List Maker Data
    private ArrayList<ArrayList<String>> safeties;
    private ArrayList<ArrayList<String>> targets;
    private ArrayList<ArrayList<String>> reaches;
    private AAbility applicantAbility;

    //College List Maker Constructor
    public CollegeListMaker(AAbility applicantAbility) {
        this.safeties = new ArrayList<ArrayList<String>>();
        this.targets = new ArrayList<ArrayList<String>>();
        this.reaches = new ArrayList<ArrayList<String>>();
        this.applicantAbility = applicantAbility;
        computeScores();
    }

    //College List Maker Getters and Setters
	public AAbility getApplicantAbility() {
		return this.applicantAbility;
	}

	public void setApplicantAbility(AAbility applicantAbility) {
		this.applicantAbility = applicantAbility;
	}

	public ArrayList<ArrayList<String>> getSafeties() {
		return this.safeties;
	}

	public void setSafeties(ArrayList<ArrayList<String>> safeties) {
		this.safeties = safeties;
	}

	public ArrayList<ArrayList<String>> getTargets() {
		return this.targets;
	}

	public void setTargets(ArrayList<ArrayList<String>> targets) {
		this.targets = targets;
	}

	public ArrayList<ArrayList<String>> getReaches() {
		return this.reaches;
	}

	public void setReaches(ArrayList<ArrayList<String>> reaches) {
		this.reaches = reaches;
	}

    //Computes the college scores for each college
    public void computeScores() {
        //Makes some temporary data
        ApplicantScore appScore = new ApplicantScore(this.applicantAbility);
        College colList = new College();
        ArrayList<ArrayList<String>> collegeList = colList.getArrayList();
        ArrayList<ArrayList<String>> collegeScoreList = new ArrayList<>();
        
        //Gets a college score for each college and adds it to the list
        for (ArrayList<String> s : collegeList) {
            CollegeScore colScore = new CollegeScore(new CAbility(s.get(0), Double.parseDouble(s.get(1)), Double.parseDouble(s.get(2)), Double.parseDouble(s.get(3)), Double.parseDouble(s.get(4)), s.get(5), s.get(6)), this.applicantAbility);
            s.add(Double.toString(colScore.calculateAbilityScore()));
            collegeScoreList.add(s);
        }

        //Filters the colleges into three divided lists
        for (ArrayList<String> s : collegeScoreList) {
            if (Math.abs(Double.parseDouble(s.get(7)) - appScore.calculateAbilityScore()) <= 75) {
                s.add("T");
                this.targets.add(s);
            }
            if ((Double.parseDouble(s.get(7)) - appScore.calculateAbilityScore()) > 75 && ((Double.parseDouble(s.get(7)) - appScore.calculateAbilityScore())) < 175) {
                s.add("R");
                this.reaches.add(s);
            }
            if (appScore.calculateAbilityScore() - (Double.parseDouble(s.get(7))) > 75 && (appScore.calculateAbilityScore()) - (Double.parseDouble(s.get(7))) < 175) {
                s.add("S");
                this.safeties.add(s);
            }
        }
    }
}
