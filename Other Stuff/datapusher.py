#Go this route if you want to use MongoDB for user data!
import csv
import pymongo
from pymongo import MongoClient
targets = []
safeties = []
reaches = []

cluster = MongoClient("mongodb+srv://tylerrcady:Mossimo30@collegedata.3lyrlia.mongodb.net/?retryWrites=true&w=majority")
db = cluster["CollegeData"]
collectionTar = db["Targets"]

#always start with _id or they make a random one for us
#post = {"_id": 0, "name": "tim", "score": 5}

with open('collegeStatsRefined.txt') as textDataFile:
    reader = csv.reader(textDataFile)
    for row in reader:
        if(row[8] == "T"):
            targets.append(row)
            post = {"_id": row[7], "name": row[0]}
            #db.drop_collection("Targets") deletes a collection
            #collectionTar = db["Targets"] => doing this creates a new one if it doens't exist with the name "Targets"
            collectionTar.insert_one(post)
            #collectionTar.insert_many([post, post2]) works too
            #delete by tags
            #print(row[0:9]) => In python [#, #)
        if(row[8] == "S"):
            safeties.append(row)
        if(row[8] == "R"):
            reaches.append(row)