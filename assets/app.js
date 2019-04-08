
 $(".animated").css("color", "yellow")
.slideUp(2000)
.slideDown(2000);
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBkRZsDhKVdf1uhqBV3pgTdsWhJOUJApUw",
    authDomain: "employeedatamanagement-31059.firebaseapp.com",
    databaseURL: "https://employeedatamanagement-31059.firebaseio.com",
    projectId: "employeedatamanagement-31059",
    storageBucket: "employeedatamanagement-31059.appspot.com",
    messagingSenderId: "580318130337"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var tFrequency = 5;
  var trainTime = "13:20";
  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();


  var newTrain = {
    name: trainName,
    dest: destination,
    start: trainTime,
    time: tFrequency,
    away: nextTrain
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.time);
  console.log(newTrain.away);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});
database.ref().on("child_added", function(childSnapshot) {
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().start;
    var tFrequency = childSnapshot.val().time;
    var nextTrain = childSnapshot.val().away;
  
    // Prettify the train time start
    // var trainTimePretty = moment.unix(trainTime).format("HH:mm");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(tFrequency),
      $("<td>").text(trainTime),
      $("<td>").text(nextTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
