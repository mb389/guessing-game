/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
function GameInfo(playersGuess) {
  this.winningNumber = Math.floor(Math.random()*101);
  this.playersGuess = playersGuess;
  this.count=[];
  this.hintArr=[];
  this.playersGuessSubmission = function () {
    this.playersGuess=+document.getElementById('guess1').value;
    document.getElementById('guess1').value = "";
  };
  this.checkGuess = function () {
    if (this.count.indexOf(this.playersGuess)<0 && this.playersGuess > 0 && this.playersGuess <= 100) { //if guess is valid add to array, progress guess count, hide alert2
      this.count.push(this.playersGuess);
      $("#alert2").hide();
      $("#alert").html("<h4>"+(5-this.count.length)+" guesses remaining.<br> "+this.guessMessage()+"</h4>");
      if (this.playersGuess==this.winningNumber) {
        hideAll();
        $("#alert").html("<h1> YOU WIN!</h1>");
        $("#alert").animate({
          height: '+=200px'
        });
        $("#alert").css({"font-size": "200%"});
        $(".jumbotron").css({"background-color": "green"});
      }
      else if (this.count.length>=5) {
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
    else if (this.count.indexOf(this.playersGuess)>-1) {
      $("#alert2").show();
      $("#alert2").html("<h4>You already guessed that!");
    }
    else if (this.playersGuess <=0 || this.playersGuess >100) {
      $("#alert2").show();
      $("#alert2").html("<h4>Please guess between 1 and 100!");
    }
  };
  this.guessMessage = function() {
    if (this.playersGuess >0 && this.playersGuess <=100)
      return "Your guess was "+lowerOrHigher(this.playersGuess,this.winningNumber)+" by "+distance(this.playersGuess,this.winningNumber)+".";
    else
      return "";
  };
  this.provideHint = function() { //hints are within the range of the player's last guess
    var dist = distance(this.winningNumber,this.playersGuess);
    var lastDist = 0;
    var max=0;
    var min=0;
    var ran=1;

  if (dist=="10-20")
    lastDist=20;
  else if (dist=="20-30")
    lastDist=30;
  else if (dist=="30-50")
    lastDist=50;
  else if(dist=="50-80"||dist==">80")
    lastDist=80;
  else
    lastDist=10;

  if (this.hintArr.length == (5-this.count.length)*2) {
    $("#alert2").show();
    $("#alert2").html("<h4>It's one of these: "+this.hintArr+".</h4>");
  } else {
   if (this.count.length>0) {
    if (this.playersGuess>this.winningNumber) {
        if ((this.playersGuess-lastDist)>0)
            min=this.playersGuess-lastDist;
        else
            min=1;
        max=this.playersGuess;
    }
    if (this.playersGuess<this.winningNumber) {
         if ((this.playersGuess+lastDist)>100)
            max=101;
        else
            max=this.playersGuess+lastDist+1;
        min=this.playersGuess+1;
    }
    while (this.hintArr.length<((5-this.count.length)*2)) {
        ran=Math.floor(Math.random()*(max-min)+min);
        if (this.hintArr.indexOf(ran)>-1)
          ran=Math.floor(Math.random()*(max-min)+min);
        else
         this.hintArr.push(ran);
       };
    if (this.hintArr.indexOf(this.winningNumber)<0)
      this.hintArr[this.hintArr.length-1]=this.winningNumber;
    this.hintArr.sort(function(a,b) {return a-b});
  $("#alert2").show();
  $("#alert2").html("<h4>It's one of these: "+this.hintArr+".</h4>");
  }
  else {
    $("#alert2").show();
    $("#alert2").html("<h4>You haven't made any guesses yet.</h4>");
    }
  }
  };
  }

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(a,b){
  if (a>b)
    return "higher";
  else
    return "lower";
}

function hideAll() {
  $("#guess1").hide();
  $("#submit").hide();
  $("#player-guesses").hide();
  $("#hint").hide();
  $("#name").hide();
}

function distance(a,b) {
  if (Math.abs(a-b)>10&&Math.abs(a-b)<20)
    return "10-20";
  else if (Math.abs(a-b)>20&&Math.abs(a-b)<30)
    return "20-30";
  else if (Math.abs(a-b)>30&&Math.abs(a-b)<50)
      return "30-50";
  else if (Math.abs(a-b)>50&&Math.abs(a-b)<80)
      return "50-80";
  else if (Math.abs(a-b)>80)
    return ">80";
  else
    return "<10";
}

// Allow the "Player" to Play Again
function playAgain(){
 location.reload();
var play = new GameInfo();
}

/* **** Event Listeners/Handlers ****  */
