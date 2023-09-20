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

    nFile = open("Backend/myRoutines.json", "w")
    nFile.write(json.dumps(data))

    return objectRoutine

@app.route("/getRoutines/")
def getRoutines():
    return data["rutinas"]

if __name__ == "__main__":
    app.run(debug=True, port=5000)