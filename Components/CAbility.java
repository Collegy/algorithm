package Components;

public class CAbility {

    //College Ability Data
    private String collegeName;
    private double avgSAT;
    private double avgACT;
    private double avgGPA;
    private double acceptanceRate;
    private String state;
    private String city;

    //College Ability Constructor
    public CAbility(String collegeName, double avgSAT, double avgACT, double avgGPA, double acceptanceRate, String state, String city) {
        this.collegeName = collegeName;
        this.avgSAT = avgSAT;
        this.avgACT = avgACT;
        this.avgGPA = avgGPA;
        this.acceptanceRate = acceptanceRate;
        this.state = state;
        this.city = city;
    }

    //College Ability Getters and Setters
	public String getCollegeName() {
		return this.collegeName;
	}

	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}

	public double getAvgSAT() {
		return this.avgSAT;
	}

	public void setAvgSAT(double avgSAT) {
		this.avgSAT = avgSAT;
	}

	public double getAvgACT() {
		return this.avgACT;
	}

	public void setAvgACT(double avgACT) {
		this.avgACT = avgACT;
	}

	public double getAvgGPA() {
		return this.avgGPA;
	}

	public void setAvgGPA(double avgGPA) {
		this.avgGPA = avgGPA;
	}

    public double getAcceptanceRate() {
		return this.acceptanceRate;
	}

	public void setAcceptanceRate(double acceptanceRate) {
		this.acceptanceRate = acceptanceRate;
	}

    public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}
}
