from flask import Flask
import json
import Routines

app = Flask(__name__)

file = open("Backend/myRoutines.json")
data = json.load(file)

@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route("/createRoutine/")
def createRoutine():
    defaultNameRoutine = "Rutina" + str(len(data["rutinas"]) + 1)
    newRoutine = Routines.Routine(defaultNameRoutine)
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


