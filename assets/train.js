$(document).ready(function(){
    console.log("test");

   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6BDUblNm3Pb4DBTAbxd5Jn1m7CK2dPp8",
    authDomain: "train-schedule-cf4cc.firebaseapp.com",
    databaseURL: "https://train-schedule-cf4cc.firebaseio.com",
    projectId: "train-schedule-cf4cc",
    storageBucket: "",
    messagingSenderId: "536089065403"
  };
  firebase.initializeApp(config)

  // declare database var
  database = firebase.database();
  
      var name;
      var destination;
      var time;
      var freq;
  
      $("#submitbtn").on('click', function(event){
          // prevents overwriting 
          event.preventDefault();
  
          // add values to the HTML elements
          name = $("#name").val().trim();
          destination = $("#destination").val().trim();
          time = $("#time").val().trim();
          freq = $("#freq").val().trim();
  
          // console.log(name);
          // console.log(destination);
          // console.log(time);
          // console.log(freq);
  
          database.ref().push({
              name: name,
              destination: destination,
              time: time,
              freq: freq,
              dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
      });
  
  
          database.ref().on('child_added', function(childSnapshot){
              //Log info coming out of snapshot
              // console.log(childSnapshot.val().name);
              // console.log(childSnapshot.val().destination);
              // console.log(childSnapshot.val().time);
              // console.log(childSnapshot.val().freq);


            //Assign tFreq to the snapshot of freq     
            var tFreq = childSnapshot.val().freq;

            // Assign firstTime to the snapshot value of time
            var firstTime = childSnapshot.val().time;
        
            // First Time 
            var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
            console.log(firstTimeConverted);
        
            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        
            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);
        
            // Time apart (remainder)
            var tRemainder = diffTime % tFreq;
            console.log(tRemainder);
        
            // Minute Until Train
            var tMinutesTillTrain = tFreq - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        
            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
            // This acts as a loop for each 'childSnapshot'added to the info below in a new table row, or <td> 
                $("#table").append("<tr>" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>"  + "<td>" + childSnapshot.val().freq + "</td>" + "<td>" + moment(nextTrain).format("hh:mm")  + "</td>" + "<td>" +  tMinutesTillTrain + "</td>" + "</tr>");
            }, function(errorObject){
                console.log("Errors handled: " + errorObject.code);
       })
    });
  
            