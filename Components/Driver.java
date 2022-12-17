package Components;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class Driver {

    public static void fileWrite() {
        AAbility applicantAbility = new AAbility(1000, "SAT", 3.7, 4.0, 6, 2, 1, 2, false, true, 3, 4, 1, 5, 2, 4, 2, 1, 3, 5, "RIT", "UoR", "Caucasian", "Joe Biden", "Juice World", "Cornell", "RIT", "NY", 200, 500, false, false, false);

        //AAbility applicantAbility = new AAbility();

        CollegeListMaker cLM = new CollegeListMaker(applicantAbility);

        try {
            PrintWriter outWriter = new PrintWriter("collegeStatsRefined.txt");
                    //Prints to visibly see each separate list
            for (ArrayList<String> s : cLM.getTargets()) {
                outWriter.println(s.get(0) + "," + s.get(1) + "," + s.get(2) + "," + s.get(3) + "," + s.get(4) + "," + s.get(5) + "," + s.get(6) + "," + s.get(7) + "," + s.get(8));
            }
            for (ArrayList<String> s : cLM.getSafeties()) {
                outWriter.println(s.get(0) + "," + s.get(1) + "," + s.get(2) + "," + s.get(3) + "," + s.get(4) + "," + s.get(5) + "," + s.get(6) + "," + s.get(7) + "," + s.get(8));
            }
            for (ArrayList<String> s : cLM.getReaches()) {
                outWriter.println(s.get(0) + "," + s.get(1) + "," + s.get(2) + "," + s.get(3) + "," + s.get(4) + "," + s.get(5) + "," + s.get(6) + "," + s.get(7) + "," + s.get(8));
            }
            outWriter.println("Works!");
            outWriter.close();
        } catch (FileNotFoundException fNFE) {
            return;
        }
    }

    public static void main(String[] args) {
        fileWrite();
    }
}
