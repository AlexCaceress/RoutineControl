import json

bddData = json.load(open("Backend/bdd.json"))
bddPhotos = json.load(open("Backend/imagesBdd.json"))

bddPhotosAdd = []

for i in bddData.values():
    if(i.photo != ""):
        bddPhotos.append({"nameRoutine" : i.name, "photo" : i.photo})
        bddData[i.name]["photo"] = ""


nFile = open("Backend/imagesBdd.json", "w")
nFile.write(json.dumps(bddPhotosAdd))
nFile.close()

nFile2 = open("Backend/bdd.json", "w")
nFile2.write(json.dumps(bddData))
nFile2.close()

print("JSONS actualitzados")

