import json

file1 = open("Backend/bdd.json")
bddData = json.load(file1)
file1.close()

bddPhotosAdd = {
    "images" : []
}

for i in bddData.values():
    if(i["photo"] != ""):
        bddPhotosAdd["images"].append({"nameRoutine" : i["name"], "photo" : i["photo"]})
        bddData[i["name"]]["photo"] = ""

nFile1 = open("Backend/bdd.json", "w")
nFile1.write(json.dumps(bddData))
nFile1.close()

nFile2 = open("Backend/imagesBdd.json", "w")
nFile2.write(json.dumps(bddPhotosAdd))
nFile2.close()

print("JSONS actualitzados")

