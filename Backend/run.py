from flask import Flask
import json
import Routines
from flask import request

app = Flask(__name__)

file = open("Backend/myRoutines.json")
data = json.load(file)

@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'

    return response


@app.route("/createRoutine/", methods=['POST'])
def createRoutine():
    
    json = request.json
    print(json)
    daysRoutine = json.get("days")
    

    daysObject = {}
    for i in daysRoutine:
        daysObject[i] = {}

    defaultNameRoutine = "Rutina" + str(len(data["rutinas"]) + 1)
    newRoutine = Routines.Routine(defaultNameRoutine, daysObject)
    objectRoutine = newRoutine.createNewRoutine()
    data["rutinas"].append(objectRoutine)
    
    return objectRoutine

@app.route("/getRoutines/")
def getRoutines():
    return data["rutinas"]

@app.route("/routine/<nameRoutine>/", methods=['GET'])
def getMyRoutine(nameRoutine):
    for i in data["rutinas"]:
        if i["name"] == nameRoutine:
            return i
        
    return {}


def dumpJSON():
    nFile = open("Backend/myRoutines.json", "w")
    nFile.write(json.dumps(data))
    nFile.close()
    print("JSON actualitzado")

if __name__ == '__main__':
    app.run(port=5000)
    dumpJSON()


