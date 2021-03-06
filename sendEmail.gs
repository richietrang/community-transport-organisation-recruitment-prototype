<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <body>
   <!-- Title and instructions -->
   <div class = "container">
        <span><img alt="CTO Logo" src="https://i.imgur.com/Jnxt6si.png"/></span>
        <h3 style = "text-align:center; margin-top:20px;">Update Applicant Progress </h3>
        <p>Hello. Welcome to the CTO job applicant tracking portal. We are happy we could find you a new volunteer or employee to help you achieve your community transport goals. To ensure all applicants have been contacted, please fill out the mandatory form when you have contacted an applicant, or have made a decision about their application. Thanks for all your great work. 
   </div>
   <div class = "container">
      <!-- Modal Structure -->
      <div id="modal1" class="modal">
         <div class="modal-content">
            <h4>Thank You For Updating Their Application</h4>
            <p>You have successfully updated their application.</p>
         </div>
         <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat .modal-close">Close</a>
         </div>
      </div>
      
      <!-- Modal Structure -->
      <div id="modal2" class="modal">
         <div class="modal-content">
            <h4>We couldn't find the applicant</h4>
            <p>Our apologies. We were unable to find the name of the applicant you entered. Please double check that the spelling of their name matches the email notification. Alternatively, messsage 04xxxxxxxx the applicant's name, and whether they have been contacted, accepted, or rejected. </p>
         </div>
         <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat .modal-close">Close</a>
         </div>
      </div>
   
      <!-- Select Form -->
      <div class="row">
         <div class="input-field col s6">
            <select id = "chosenCT">
            <option value="" disabled selected>Choose...</option>
            <option>Access Sydney Community Transport</option>
            <option>Activus Transport</option>
            <option>Allawah Community Care - Coolamon Community Transport</option>
            <option>Auburn Community Transport</option>
            <option>Awabakal Aboriginal Community Transport</option>
            <option>Balranald Community Transport</option>
            <option>Bankstown Canterbury Community Transport</option>
            </select>
            <label>Name of your Community Transport</label>
         </div>
      </div>
      
      <!-- Name Form Input -->
      <div class="row">
         <div class="input-field col s6">
            <input placeholder="Volunteer First Name" id="firstNameInput" type="text" class="validate">
            <label for="firstNameInput">First Name</label>
         </div>
         <div class="input-field col s6">
            <input placeholder="Volunteer Last Name" id="lastNameInput" type="text" class="validate">
            <label for="lastNameInput">Last Name</label>
         </div>
      </div>
      
      <!-- Buttons to update applicant details -->
      <div class = "row">
         <button class="waves-effect waves-light btn" id = "contactedBtn">Applicant Contacted</button>
         <button class="waves-effect waves-light btn" id = "acceptedBtn">Applicant Accepted </button>
         <button class="waves-effect waves-light btn" id = "rejectedBtn">Applicant Rejected </button>
      </div>
  
   </div> <!-- End Container -->
    
    <script> 
    //Javascript for select input form initialisation
    document.addEventListener('DOMContentLoaded', function() {
       var elems = document.querySelectorAll('select');
       var instances = M.FormSelect.init(elems);
    });
    
    //Javascript for modal initialisation    
    var elem= document.querySelector('#modal1');
    var instance1 = M.Modal.init(elem);
    var elem= document.querySelector('#modal2');
    var instance2 = M.Modal.init(elem);
    var updateStatus;
    
    //Call a function running server side in Code.gs
    //Function not visible to public
    document.getElementById("contactedBtn").addEventListener("click",contactedButtonClick);
    document.getElementById("acceptedBtn").addEventListener("click", acceptedButtonClick);
    document.getElementById("rejectedBtn").addEventListener("click", rejectedButtonClick);
    
    // TODO: Remove code duplication for production
    function contactedButtonClick(){
       var firstName = document.getElementById("firstNameInput").value;
       var lastName = document.getElementById("lastNameInput").value;
       var ct = document.getElementById("chosenCT").value;
      
       google.script.run.withSuccessHandler(callback).updateApplicant(firstName, lastName, ct, "contacted");
       document.getElementById("firstNameInput").value = "";
       document.getElementById("lastNameInput").value = ""; 
    }

     function acceptedButtonClick(){
       var firstName = document.getElementById("firstNameInput").value;
       var lastName = document.getElementById("lastNameInput").value;
       var ct = document.getElementById("chosenCT").value;
       
       google.script.run.withSuccessHandler(callback).updateApplicant(firstName, lastName, ct, "accepted");
       document.getElementById("firstNameInput").value = "";
       document.getElementById("lastNameInput").value = "";
    }
    
    function rejectedButtonClick(){
       var firstName = document.getElementById("firstNameInput").value;
       var lastName = document.getElementById("lastNameInput").value;
       var ct = document.getElementById("chosenCT").value;
 
       google.script.run.withSuccessHandler(callback).updateApplicant(firstName, lastName, ct, "rejected");
       document.getElementById("firstNameInput").value = "";
       document.getElementById("lastNameInput").value = "";
    }
    
    //Google functions run asynchronously with a server so cannot return a value normally
    //Callback function needs to be specified
    function callback(updateResults) {
       updateStatus = updateResults;
       //Successfully updated the applicant information
       if (updateStatus == "success"){
          instance1.open();
          console.log("updateWorking is: " + updateStatus);
       } else {
          instance2.open();
       
       }
    }
    </script>       
  </body>
</html>
