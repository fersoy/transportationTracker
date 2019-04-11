
 $(".animated").css("color", "yellow")
.slideUp(2000)
.slideDown(2000);


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAT1O_Yb38SNuy7vCq4SBHNitiql4smXcE",
    authDomain: "traintracker-1b7bb.firebaseapp.com",
    databaseURL: "https://traintracker-1b7bb.firebaseio.com",
    projectId: "traintracker-1b7bb",
    storageBucket: "",
    messagingSenderId: "452571291620"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$("#train-btn").on("click", function(event) {
  event.preventDefault();

  var tFrequency = "";
  var trainTime = "";
  var arrivalTime = "";
  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  // var currentTime = moment().toNow;// this part need to be searched
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#train-time-input").val().trim();
  var tFrequency = $("#frequency-input").val().trim();
  var arrivalTime = moment().add(tMinutesTillTrain, "minutes");
  var nextTrain = moment(arrivalTime).format("hh:mm");



  var newTrain = {
    name: trainName,
    dest: destination,
    start: trainTime,
    time: tFrequency,
     away: nextTrain
  };
  console.log(newTrain);

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.time);
  // console.log(newTrain.away);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
  $("#arrival-time-input").val("");

});
database.ref().on("child_added", function(childSnapshot) {
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().start;
    var tFrequency = childSnapshot.val().time;
    var arrivalTime = childSnapshot.val().away;
  
    // Prettify the train time start
    var trainTimePretty = moment.unix(trainTime).format("HH:mm");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(tFrequency),
      $("<td>").text(trainTime),
      $("<td>").text(arrivalTime),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
