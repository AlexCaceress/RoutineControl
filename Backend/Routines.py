class Routine:

  def __init__(self, name = "", days = []):
    self.name = name
    self.days = days
    self.description = ""
    self.photo = ""
    self.activeRoutine = False
    self.numberDays = 0

  def createNewRoutine(self):
    myRoutine = {
        "name" : self.name,          
        "days" : self.days, 
        "description" : self.description, 
        "photo" : self.photo, 
        "activeRoutine" : self.activeRoutine, 
        "numberDays" : len(self.days)
    } 

    return myRoutine

    
