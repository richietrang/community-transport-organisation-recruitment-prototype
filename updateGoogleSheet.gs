//Required function by google scripts to create a web application. Outputs the html file applicantUpdate.html
function doGet() {
  return HtmlService.createHtmlOutputFromFile("applicantUpdate");
}

//Updates the Google Sheet information for the applicant regarding if they have been contacted, accepted, or rejected
function updateApplicant(firstName, lastName, ct, update){
  //Get the Google Sheet, and the specific Work Sheet
  var id = "1xaTlQYzk3vYje2gpj3JVD625iysEDIKfPTWf2_158j8"; // ID is taken from the google sheets https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0
  var ss = SpreadsheetApp.openById(id);
  var ws = ss.getSheetByName("Form Responses");
  
  //Get all the first name, last name, and the chosen CTs so we can identify the volunteer
  var firstNamedata = ws.getRange(1, 4, ws.getLastRow()).getValues(); //First Name is fourth column and search from row 1 to last row
  var lastNamedata = ws.getRange(1, 5, ws.getLastRow()).getValues(); //Last Name is fifth column and search from row 1 to last row
  var ctNamedata = ws.getRange(1, 10, ws.getLastRow()).getValues(); //CT option 1 is tenth column and search from row 1 to last row
  
  //Convert the data into list form
  var firstNameList = firstNamedata.map(function(r){ return r[0]; });
  var lastNameList = lastNamedata.map(function(r){ return r[0]; });
  var ctList = ctNamedata.map(function(r){ return r[0]; });
  
  //Get the positions of all the matching first names
  var firstNameIndexArray = [];
  for (var counter = 0; counter < firstNameList.length; counter++){
    if (firstName == firstNameList[counter]){
      firstNameIndexArray.push(counter);
    }
  }
  
  //Get the positions of all the matching last names
  var lastNameIndexArray = [];
  for (var counter = 0; counter < lastNameList.length; counter++){
    if (lastName == lastNameList[counter]){
      lastNameIndexArray.push(counter);
    }
  }
  
  //Get the positions of all the matching CTs
  var ctIndexArray = [];
  for (var counter = 0; counter < ctList.length; counter++){
    if (ct == ctList[counter]){
      ctIndexArray.push(counter);
    }
  }
  
  //We now have an array of indexes from first name, last name, CT
  //We now need to find all the number that is shared between:
  //[first name, last name, and CT]
  
  Logger.log("first name indexes are: " + firstNameIndexArray);
  Logger.log("last name indexes are: " + lastNameIndexArray);
  Logger.log("ct choice one indexes are: " + ctIndexArray);

  //Find intersection between first name, last name, and CT preference one 
  var matchingRows = intersection_destructive(firstNameIndexArray, lastNameIndexArray);
  var matchingRows = intersection_destructive(matchingRows, ctIndexArray);
  Logger.log("name ct intersection is " + matchingRows);
  
  //Update for all matching rows
  var rowPosition = -1;
  var applicantFound = 0; //Flag: 0 means not found and 1 means found
  
  //Cycle through any possible duplicates and update google sheet
  for (var counter = 0; counter < matchingRows.length; counter++){
     applicantFound = 1;
     Logger.log("applicant found number is " + applicantFound);
     rowPosition = matchingRows[counter] +1; //must increment as tables count from 1 and not 0 like in programming
    
     if (update == "contacted"){
        var beenContactedCell = ws.getRange(rowPosition, 15, 1); //been contacted col
        beenContactedCell.setValue("Yes");
     } else if (update == "accepted"){
        var beenContactedCell = ws.getRange(rowPosition, 16, 1); //been accepted col
        beenContactedCell.setValue("Accepted");
     } else if (update == "rejected"){
        var beenContactedCell = ws.getRange(rowPosition, 16, 1); //been rejected col
        beenContactedCell.setValue("Rejected");
     }
  }
  
  if (applicantFound == 0){
     return "failed";
  } else {
     return "success";
  }
}

//Function used to find intersection between two arrays
//Source https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
function intersection_destructive(a, b)
{
  var result = [];
  while( a.length > 0 && b.length > 0 )
  {  
     if      (a[0] < b[0] ){ a.shift(); }
     else if (a[0] > b[0] ){ b.shift(); }
     else /* they're equal */
     {
       result.push(a.shift());
       b.shift();
     }
  }
  return result;
}

