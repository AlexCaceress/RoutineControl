from flask import *
import json
import Routines
from flask import request

app = Flask(__name__)  

file = open("Backend/bdd.json")
data = json.load(file)

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
    
    daysObject = {}
    for i in daysRoutine:
        daysObject[i] = {"day": i, "data": []}

    defaultNameRoutine = "Rutina" + str(len(data) + 1)

    newRoutine = Routines.Routine(defaultNameRoutine, daysObject)
    objectRoutine = newRoutine.createNewRoutine()
    data[objectRoutine["name"]] = objectRoutine
    
    return objectRoutine


@app.route("/modifyRoutine/", methods=["POST"])
def modifyRoutine():
    
    json = request.json    
    nameRoutine = json.get("nameRoutine")
    day = json.get("day")
    reps = json.get("dataExercice")["reps"]
    sets = json.get("dataExercice")["sets"]
    nameExercice = json.get("dataExercice")["nameExercice"]

    data[nameRoutine]["days"][day]["data"].append({"nameExercice" : nameExercice, "sets" : sets, "reps" : reps})
        
    return data[nameRoutine]

@app.route("/getRoutines/")
def getRoutines():
    myRoutines = []

    for routine in data.values():
        myRoutines.append(routine)

    return myRoutines

@app.route("/routine/<nameRoutine>/", methods=['GET'])
def getMyRoutine(nameRoutine):
    return data[nameRoutine]

def dumpJSON():
    nFile = open("Backend/bdd.json", "w")
    nFile.write(json.dumps(data))
    nFile.close()
    print("JSON actualitzado")

if __name__ == '__main__':
    app.run(port=5000)
    dumpJSON()


