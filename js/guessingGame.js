/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess=0;
var winningNumber=0;
var count=[];
var guesses=5;
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(event){
  count=[];
  winningNumber=(Math.ceil(Math.random()*100));
}


// Fetch the Players Guess
function playersGuessSubmission(event){
  playersGuess = +document.getElementById('guess1').value;
  if (count.indexOf(playersGuess)<0 && playersGuess >= 0 && playersGuess <= 100) { //if guess is valid add to array, progress guess count, hide alert2
  count.push(playersGuess);
  guesses=5-count.length;
  $("#alert2").hide();
}
else if (count.indexOf(playersGuess)>0) {
  $("#alert2").show();
  $("#alert2").html("<h4>You already guessed that!");
}
else if (playersGuess <=0 || playersGuess >=100) {

  $("#alert2").show();
  $("#alert2").html("<h4>Please guess between 0 and 100!");
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
	// add code here
  if (playersGuess==winningNumber) {
    $("#alert").html("<h4> YOU WIN!</h4>");
    $("#alert2").hide();
  } else {
    $("#alert").html("<h4>"+guesses+" guesses remaining.<br> "+guessMessage()+"</h4>");
  }
  if (count.length>=5) {
        $("#alert").hide();
        $("#alert2").show();
        $("#alert2").html("<h4>You lose!</h4>");
    }
}

function guessMessage() {
if (playersGuess >=0 && playersGuess <=100)
  return "Your guess was "+lowerOrHigher()+" by "+distance()+".";
else
  return "";

}

function distance() {
  if (Math.abs(playersGuess-winningNumber)>20&&Math.abs(playersGuess-winningNumber)<40)
    return "20-40";
  else if (Math.abs(playersGuess-winningNumber)>40&&Math.abs(playersGuess-winningNumber)<60)
    return "40-60";
  else if (Math.abs(playersGuess-winningNumber)>60&&Math.abs(playersGuess-winningNumber)<80)
      return "60-80";
  else if (Math.abs(playersGuess-winningNumber)>80)
    return ">80";
  else
    return "<20";

}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
var hintArr=[];
var ran=1;
for (var i=0;i<((5-count.length)*2-1);i++) {
    ran=Math.ceil(Math.random()*100);
    while (hintArr.indexOf(ran)>-1)
      ran=Math.ceil(Math.random()*100);
     hintArr.push(ran);
   };

if (hintArr.indexOf(winningNumber)<0)
  hintArr.push(winningNumber);
hintArr.sort(function(a,b) {return a-b});

$("#alert2").show();
$("#alert2").html("<h4>It's one of these: "+hintArr+".</h4>");


}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
  generateWinningNumber();
 location.reload();
}





/* **** Event Listeners/Handlers ****  */
