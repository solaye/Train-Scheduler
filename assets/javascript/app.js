$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBHqKJH7KOf9RYyDwyzGAaJbZ1on6Zid_Q",
        authDomain: "train-scheduler-stet.firebaseapp.com",
        databaseURL: "https://train-scheduler-stet.firebaseio.com",
        projectId: "train-scheduler-stet",
        storageBucket: "train-scheduler-stet.appspot.com",
        messagingSenderId: "295616836096"
      };
      firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function(event) {
    
    event.preventDefault();
  var trainTime = $("#first-train").val();

  console.log(typeof trainTime);

    console.log(event);
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment(parseInt(trainTime), 'HH:mm').format('hh:mm a')
    var frequency = $("#frequency").val().trim();
  console.log(firstTrain);
    // Creates local "temporary" object for holding train data
    var train = {
     trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };

    database.ref().push(train);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot) {
console.log('string');
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain= childSnapshot.val().firstTrain;
    var frequency= childSnapshot.val().frequency;

    
    
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");





    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
         $("<td>").text(nextTrain),
         $("<td>").text(tMinutesTillTrain)

      );
    
      // Append the new row to the table
      $("#add-row").append(newRow);
    



}); 


})