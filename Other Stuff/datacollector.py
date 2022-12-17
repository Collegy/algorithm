#Compiles the annual excel sheet released with college data into a txt file
import csv
colleges = []
completeColleges = []
with open('.\data\Most-Recent-Cohorts-Institution.csv') as csvDataFile:
    data = list(csv.reader(csvDataFile))
    i = 0
    for row in data:
        if(i != 0):
            college = []

            college.append(data[i][3]) #NAME
            college.append(data[i][59]) #SAT
            college.append(data[i][56]) #ACT
            if(data[i][59] != "NULL" and data[i][59] != "SAT_AVG"): #GPA
                college.append(round((float(data[i][59]) * 0.00203 + 1.06), 2)) #Make a better linear model later
            else:
                college.append(data[i][59])
            if(data[i][36] != "NULL" and data[i][36] != "ADM_RATE"): #ADMRATE
                college.append(round((float(data[i][36]) * 100), 2))
            else:
                college.append(data[i][36])
            college.append(data[i][5]) #STATE
            college.append(data[i][4]) #CITY

            colleges.append(college)
        i += 1

    for x in range(len(colleges)):
        if(colleges[x][0] != "NULL" and colleges[x][1] != "NULL" and colleges[x][2] != "NULL" and colleges[x][3] != "NULL" and colleges[x][4] != "NULL" and colleges[x][5] != "NULL" and colleges[x][6] != "NULL"):
            completeCollege = []
            completeCollege.append(str(colleges[x][0])) #NAME
            completeCollege.append(str(colleges[x][1])) #SAT
            completeCollege.append(str(colleges[x][2])) #ACT
            completeCollege.append(str(colleges[x][3])) #GPA
            completeCollege.append(str(colleges[x][4])) #ADMRATE
            completeCollege.append(str(colleges[x][5])) #STATE
            completeCollege.append(str(colleges[x][6])) #CITY
            completeColleges.append(completeCollege)

    for x in range(len(completeColleges)): #Should print if it works!
        print(completeColleges[x][0], completeColleges[x][1], completeColleges[x][2], completeColleges[x][3], completeColleges[x][4], completeColleges[x][5], completeColleges[x][6])

    with open("collegeStats.txt", "w") as txt_file:
        for line in completeColleges:
            txt_file.write((line[0]) + "," + line[1] + "," + line[2] + "," + line[3] + "," + line[4] + "," + line[5] + "," + line[6] + "\n") #Writes it into the file we use with the Java code!