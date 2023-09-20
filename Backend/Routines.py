class Routine:
  def __init__(self, name="", days=0, description="", photo="", activeRoutine=False, data=[]):
    self.name = name
    self.days = days
    self.description = description
    self.photo = photo
    self.activeRoutine = activeRoutine
    self.data = data

  def createNewRoutine(self):
    myRoutine = {
        "name" : self.name,          
        "days" : self.days, 
        "description" : self.description, 
        "photo" : self.photo, 
        "activeRoutine" : self.activeRoutine, 
        "data" : self.data
    } 

    return myRoutine

    
