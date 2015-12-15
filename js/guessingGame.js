/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess=0;
var winningNumber=0;
var count=[];
var guesses=5;
var lastDist=0;
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(event){
  count=[];
  winningNumber=(Math.ceil(Math.random()*100));
}

// Fetch the Players Guess
function playersGuessSubmission(event){
  playersGuess = +document.getElementById('guess1').value;
  if (count.indexOf(playersGuess)<0 && playersGuess > 0 && playersGuess <= 100) { //if guess is valid add to array, progress guess count, hide alert2
  count.push(playersGuess);
  guesses=5-count.length;
  $("#alert2").hide();
}
else if (count.indexOf(playersGuess)>-1) {
  $("#alert2").show();
  $("#alert2").html("<h4>You already guessed that!");
}
else if (playersGuess <=0 || playersGuess >100) {

  $("#alert2").show();
  $("#alert2").html("<h4>Please guess between 1 and 100!");
}
    document.getElementById('guess1').value = "";

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
  if (playersGuess>winningNumber)
    return "higher";
  else {
      return "lower";
  }
}

// Check if the Player's Guess is the winning number

function checkGuess(){
  if (playersGuess==winningNumber) {
    hideAll();
    $("#alert").html("<h1> YOU WIN!</h1>");
    $("#alert").animate({
      height: '+=200px'
    });
    $("#alert").css({"font-size": "200%"});
    $("#alert2").hide();
    $(".jumbotron").css({"background-color": "green"});
  } else {
    $("#alert").html("<h4>"+guesses+" guesses remaining.<br> "+guessMessage()+"</h4>");
  }
  if (count.length>=5) {
        hideAll();
        $("#alert").hide();
        $("#alert2").show();
        $("#alert2").html("<h1>You lose :(</h1>");
        $("#alert2").animate({
          height: '+=200px'
        });
        $("#alert").css({"font-size": "200%"});
        $(".jumbotron").css({"background-color": "red"});
    }
}

function guessMessage() {
if (playersGuess >0 && playersGuess <=100)
  return "Your guess was "+lowerOrHigher()+" by "+distance()+".";
else
  return "";
}

function hideAll() {
  $("#guess1").hide();
  $("#submit").hide();
  $("#player-guesses").hide();
  $("#hint").hide();
  $("#name").hide();
}

function distance() {
  if (Math.abs(playersGuess-winningNumber)>10&&Math.abs(playersGuess-winningNumber)<20) {
    lastDist=20;
    return "10-20";
  }
  else if (Math.abs(playersGuess-winningNumber)>20&&Math.abs(playersGuess-winningNumber)<30) {
    lastDist=30;
    return "20-30";
  }
  else if (Math.abs(playersGuess-winningNumber)>30&&Math.abs(playersGuess-winningNumber)<50) {
      lastDist=50;
      return "30-50";
}
  else if (Math.abs(playersGuess-winningNumber)>50&&Math.abs(playersGuess-winningNumber)<80) {
    lastDist=80;
      return "50-80";
}
  else if (Math.abs(playersGuess-winningNumber)>80) {
    lastDist=80;
    return ">80";
  }
  else {
    lastDist=10;
    return "<10";
  }

}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){ //hints are within the range of the player's last guess
  var hintArr=[];
  var max=0;
  var min=0;
  var ran=1;
if (count.length>0) {
  if (count[count.length-1]>winningNumber) {
      if ((count[count.length-1]-lastDist)>0)
          min=count[count.length-1]-lastDist;
      else
          min=1;
      max=count[count.length-1];
  }
  if (count[count.length-1]<winningNumber) {
       if ((count[count.length-1]+lastDist)>100)
          max=101;
      else
          max=count[count.length-1]+lastDist+1;
      min=count[count.length-1]+1;
  }
  while (hintArr.length<((5-count.length)*2)) {
      ran=Math.floor(Math.random()*(max-min)+min);
      if (hintArr.indexOf(ran)>-1)
        ran=Math.floor(Math.random()*(max-min)+min);
      else
       hintArr.push(ran);
     };

  if (hintArr.indexOf(winningNumber)<0)
    hintArr[hintArr.length-1]=winningNumber;
  hintArr.sort(function(a,b) {return a-b});

$("#alert2").show();
$("#alert2").html("<h4>It's one of these: "+hintArr+".</h4>");
}
else {
  $("#alert2").show();
  $("#alert2").html("<h4>You haven't made any guesses yet.</h4>");
  }
}


// Allow the "Player" to Play Again
function playAgain(){
  generateWinningNumber();
 location.reload();
}





/* **** Event Listeners/Handlers ****  */
