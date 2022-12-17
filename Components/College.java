package Components;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.*;

public class College {
    
    //College Data
    private ArrayList<ArrayList<String>> colleges;

    //College Contructor
    public College() {
        assembleList();
    }

    //College Getters and Setters
	public ArrayList<ArrayList<String>> getArrayList() {
		return this.colleges;
	}

	public void setArrayList (ArrayList<ArrayList<String>> c) {
		this.colleges = c;
	}

    //Assembles College List ArrayList of ArrayLists from collegeStats.txt
    public void assembleList() {
        try {
            File inFile = new File("collegeStats.txt");
            Scanner scan = new Scanner(inFile);
            String college;
            colleges = new ArrayList<>();
            while (scan.hasNextLine()) {
                college = scan.nextLine(); //Gets all the data for a college
                try (Scanner scan2 = new Scanner(college)) {
                    scan2.useDelimiter(","); //Breaks the data up/formats it w/o the comma
                    ArrayList<String> collegeStuff = new ArrayList<String>(7);
                    while (scan2.hasNextLine()) {
                        collegeStuff.add(scan2.next()); //Adds the formatted data to an ArrayList
                    }
                    colleges.add(collegeStuff); //Adds the ArrayList for a college to another ArrayList
                }
            }
            scan.close();
        } catch (FileNotFoundException fNFE) {
            return;
        }
    }
}
