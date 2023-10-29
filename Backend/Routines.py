class Routine:

  def __init__(self, name = "", id="", days = {}, dateCreateRoutine = ""):
    self.name = name
    self.id = id;
    self.days = days
    self.description = ""
    self.photo = ""
    self.activeRoutine = False
    self.numberDays = 0
    self.dateCreateRoutine = dateCreateRoutine

  def createNewRoutine(self):
    myRoutine = {
        "name" : self.name, 
        "id" : self.id,         
        "days" : self.days, 
        "description" : self.description, 
        "photo" : self.photo, 
        "activeRoutine" : self.activeRoutine, 
        "numberDays" : len(self.days),
        "dateCreateRoutine" : self.dateCreateRoutine
    } 

    return myRoutine

    
