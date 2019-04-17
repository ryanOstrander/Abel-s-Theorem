//globals
const topLeftScale = 1.25;
const topLeftBound = topLeftScale.toString();
const topRightScale = 1;
const topRightBound = topRightScale.toString();
const bottomLeftScale = 0.5;
const bottomLeftBound = bottomLeftScale.toString();
const bottomRightScale = 1;
const bottomrightBound = bottomRightScale.toString();
const height = 750;
const width = 1000;
const step = 0.0025;

var colors = ['red', 'green', 'blue', 'yellow', 'orange'];
var points = [];
var coeffList = [];
var beginPath = false;
var exponent = 4;
var catchOriginal = true;
var calculation;
var calcHistory = [];

//------5 COMPLEX SOLUTIONS (< 1) ---------//
var root1 = math.complex('-0.25 + 0.6i');
var root2 = math.complex('0.3 + 0.75i');
var root3 = math.complex('0.675 - 0.25i'); 
var root4 = math.complex('-0.75 - 0.5i'); 
var root5 = math.complex('0.35 + 0.333i'); 

var motion = new Motion(root1, root2, root3, root4, root5);

//------LISTS---------//
var complexRootList = [root1, root2, root3, root4, root5];
var originalPoints = [];
var originalCoefficients = [];
var s4z1HistP1 = [];
var s4z2HistP1 = [];
var s4z3HistP1 = [];
var s4z4HistP1 = [];
var s4z5HistP1 = [];
var s4z1HistP2 = [];
var s4z2HistP2 = [];
var s4z3HistP2 = [];
var s4z4HistP2 = [];
var s4z5HistP2 = [];
var s4z1HistP3 = [];
var s4z2HistP3 = [];
var s4z3HistP3 = [];
var s4z4HistP3 = [];
var s4z5HistP3 = [];
var s4z1HistP4 = [];
var s4z2HistP4 = [];
var s4z3HistP4 = [];
var s4z4HistP4 = [];
var s4z5HistP4 = [];

var firstPathDone = false;
var secondPathDone = false;
var thirdPathDone = false;
var fourthPathDone = false;
var startSecondPath = false;
var startThirdPath = false;
var startFourthPath = false;

var stopFirstHist, stopSecondHist, stopThirdHist, stopFourthHist = false;
var changeColor1 = false;

var animationComplete = false;



//------SETUP SCENE---------//


function setup() {

  //create the canvis 500 x 500 pixels
  var canvas = createCanvas(1000, 750);

  canvas.position(250, 50);
  canvas.parent('sketch-holder');

  //save the original root positions
  for (let i = 0; i < 5; i++) {
    let newPt = new Point(complexRootList[i].re,complexRootList[i].im , 1);
    originalPoints.push(newPt);
  }
  

}



//------DRAW FUNCTION---------//


function draw() {
  //reset the background
  background(30);

  //plot original point traces
  for (item in originalPoints) {
    originalPoints[item].plotOriginal();
  }

  //creates the axis
  sketchAxis();

  //------DRAW ALL HISTORIES---------//

  stroke(255);
  drawHistory(calcHistory);

  stroke(color('green'));
  drawHistory(s4z1HistP1);
  drawHistory(s4z2HistP1);
  drawHistory(s4z3HistP1);
  drawHistory(s4z4HistP1);
  drawHistory(s4z5HistP1);

  stroke(color('blue'));
  drawHistory(s4z1HistP2);
  drawHistory(s4z2HistP2);
  drawHistory(s4z3HistP2);
  drawHistory(s4z4HistP2);
  drawHistory(s4z5HistP2);

  stroke(color('red'));
  drawHistory(s4z1HistP3);
  drawHistory(s4z2HistP3);
  drawHistory(s4z3HistP3);
  drawHistory(s4z4HistP3);
  drawHistory(s4z5HistP3);

  stroke(color('yellow'));
  drawHistory(s4z1HistP4);
  drawHistory(s4z2HistP4);
  drawHistory(s4z3HistP4);
  drawHistory(s4z4HistP4);
  drawHistory(s4z5HistP4);


  //------MOTIONS---------//

  //plot the points
  motion.plot();

  //start updating motion
  if (beginPath) {
    motion.update();
  }

  //checks for first path complete
  if (firstPathDone){
    motion.setNewLocations(points);
    motion.setNewEnds(4, 5, 3, 1, 2);
    firstPathDone = false;
    stopFirstHist = true;
  } 

  //checks for second path complete
  if (secondPathDone){
    motion.setNewLocations(points);
    motion.setNewEnds(1, 2, 4, 5, 3);
    secondPathDone = false;
    stopSecondHist = true;
  }
  
  //checks for third path complete
  if (thirdPathDone){
    motion.setNewLocations(points);
    motion.setNewEnds(2, 3, 1, 4, 5);
    thirdPathDone = false;
    stopThirdHist = true;
  }

  //------COEFFICIENTS---------//

  //coefficient list
  coeffList = evalCoeffs(updateCoefficients(points));
  plotCoefficients();

  calculation = calcFromCoef(coeffList);
  calculation.plotPoint("f(a0, a1, a2, a3, a4)");
  

  //catch the original coefficient list to plot their original trace
  if (catchOriginal) {
    catchOriginalCo();
  }

  plotOriginalCoefficients();

} 


//------USER CONTROL---------//

function keyPressed(){

  //if spacebar is pressed
  if (key == " " && beginPath == false) {
    beginPath = true;
    print("beginPath set to true!");
  } else if (key == " " && beginPath) {
    beginPath = false;
    firstPathDone = false;
    startSecondPath = false;
    startThirdPath = false;
    startFourthPath = false;
    print("beginPath set to false!");
  }
  
}