from flask import *
import json
import Routines
from flask import request
from datetime import date
import calendar
from datetime import datetime



app = Flask(__name__)  

bddFile = open("bdd.json")
data = json.load(bddFile)

bddImagesFile = open("imagesBdd.json")
bddPhotos = json.load(bddImagesFile)

bddFile.close()
bddImagesFile.close()


if(bddPhotos["images"]):
    for i in bddPhotos["images"]:
        data[i["nameRoutine"]]["photo"] = i["photo"]


@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response

@app.route("/img/<image>")
def getImage(image):
    return send_file("./static/" + image);

@app.route("/createRoutine/", methods=['POST'])
def createRoutine():
    
    json = request.json
    daysRoutine = json.get("days")
    
    defaultNameRoutine = "Rutina" + str(len(data) + 1)
    today = date.today().strftime("%d/%m/%Y")
    daysObject = {}

    for i in daysRoutine:
        daysObject[i] = {"day": i, "data": []}

    newRoutine = Routines.Routine(defaultNameRoutine, daysObject, today)
    objectRoutine = newRoutine.createNewRoutine()
    data[objectRoutine["name"]] = objectRoutine
    
    return objectRoutine


@app.route("/modifyRoutine/", methods=["POST", "GET"])
def modifyRoutine():
    
    json = request.json    
    nameRoutine = json.get("nameRoutine")
    day = json.get("day")
    reps = json.get("dataExercice")["reps"]
    sets = json.get("dataExercice")["sets"]
    nameExercice = json.get("dataExercice")["nameExercice"]

    data[nameRoutine]["days"][day]["data"].append({"nameExercice" : nameExercice, "sets" : sets, "reps" : reps})
        
    return data[nameRoutine]

@app.route("/changeConfigRoutine/", methods=["POST", "GET"])
def changeConfig():

    json = request.json
    oldNameRoutine = json.get("nameRoutine")
    newConfigRoutine = json.get("newConfigRoutine")
    
    data[oldNameRoutine]["name"] = newConfigRoutine["nameRoutine"]
    data[oldNameRoutine]["description"] = newConfigRoutine["descritpionRoutine"]
    data[oldNameRoutine]["photo"] = newConfigRoutine["imageRoutine"]

    if(newConfigRoutine["activateRoutine"] == True):
        for i in data.keys():
            data[i]["activeRoutine"] = False

    data[oldNameRoutine]["activeRoutine"] = newConfigRoutine["activateRoutine"]
    
    data[newConfigRoutine["nameRoutine"]] = data.pop(oldNameRoutine, None)

    return data[newConfigRoutine["nameRoutine"]]
    

@app.route("/getRoutines/")
def getRoutines():
    myRoutines = []

    for routine in data.values():
        myRoutines.append(routine)

    return myRoutines


@app.route("/todaysRoutine/")
def getTodaysRoutine():
    
    dt = datetime.now()
    todayName = dt.strftime('%A')

    for i in data.values():
        if(i["activeRoutine"] == True):
                try:
                    return {"dayRoutine" : data[i["name"]]["days"][todayName]["data"], "dayName" : todayName, "chillday" : False} 
                except:
                    print("No hi ha cap dia")

    return {"dayRoutine" : [], "dayName" : todayName, "chillday" : True}
    


@app.route("/routine/<nameRoutine>/", methods=['GET'])
def getMyRoutine(nameRoutine):

    try:
         return data[nameRoutine]
    except:
        return {}

def dumpJSON():

    bddPhotosAdd = {
        "images" : []
    }

    for i in data.values():
        if(i["photo"] != ""):
            bddPhotosAdd["images"].append({"nameRoutine" : i["name"], "photo" : i["photo"]})
            data[i["name"]]["photo"] = ""

    nFile1 = open("bdd.json", "w")
    nFile1.write(json.dumps(data))
    nFile1.close()

    nFile2 = open("imagesBdd.json", "w")
    nFile2.write(json.dumps(bddPhotosAdd))
    nFile2.close()

    print("JSONS actualitzados")

if __name__ == '__main__':
    app.run(port=5000) 
    # app.run(host="1921414", port=21431)
    dumpJSON()


