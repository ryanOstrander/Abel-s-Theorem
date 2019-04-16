//------FUNCTION TO MULTIPLY TWO COMPLEX SOLUTIONS---------//

function mltCmp(eq1, eq2) {
    let c1r = eq1.re;
    let c1i = eq1.im;
    let c2r = eq2.re;
    let c2i = eq2.im;
  
    //store real and imaginary parts
    let newRealComp = (c1r*c2r - c1i*c2i);
    let newImaginaryComp = (c1r*c2i + c1i*c2r);
  
    //combine real and imaginary parts
    var newRoot = math.complex(newRealComp, newImaginaryComp);

    return newRoot;
    
  }


  
//------FUNCTION TO RETURN AN UPDATED COEFFICIENT LIST---------//

function updateCoefficients(points){

  var cRootList = [
    math.complex(points[0].x, points[0].y),
    math.complex(points[1].x, points[1].y),
    math.complex(points[2].x, points[2].y),
    math.complex(points[3].x, points[3].y),
    math.complex(points[4].x, points[4].y)
  ];

  return cRootList;

}



//------FUNCTION TO ROUND ROOTS---------//

function roundRoots(){

  for (item in points) {

    points[item].x = Math.round(points[item].x);
    points[item].y = Math.round(points[item].y);

  }

}



//------FUNCTION TO GET ORIGINAL COEFFICIENT POSITIONS---------//

function catchOriginalCo() {

  originalCoefficients = coeffList;
  print(originalCoefficients);
  catchOriginal = false;

}



//------FUNCTION TO GET ORIGINAL COEFFICIENT POSITIONS---------//

function plotCoefficients() {

    for (i = 0; i < coeffList.length; i++) {

      pt = new Point(coeffList[i].re,coeffList[i].im , 2);
      noStroke();
      fill(colors[i]);
      pt.plotPoint('a' + (i));

    }

  }



//------FUNCTION TO PLOT ORIGINAL COEFFICIENTS---------//

function plotOriginalCoefficients(){
  for (i = 0; i < originalCoefficients.length; i++) {
    let cPt = new Point(originalCoefficients[i].re, originalCoefficients[i].im , 2);
    cPt.plotOriginal(' ');
  }

  catchOriginal = false;

}



//------FUNCTION TO EVALUATE COEFFICIENTS GIVEN A SET OF COMPLEX SOLUTIONS Z---------//

function evalCoeffs(z){
  var coefficients = [];
  var p1, p2, p3, p4, p5;

  //calculate a0 coefficient (−z1z2z3z4z5)
  p1 = mltCmp(z[0], z[1]);
  p2 = mltCmp(z[2], z[3]);
  let a0 = mltCmp(mltCmp(p1, p2), z[4]);
  a0.re *= -1;
  a0.im *= -1;
  coefficients.push(a0);

  //calculate a1 coefficient (z1z2z3z4 + z1z2z3z5 + z1z2z4z5 + z1z3z4z5 + z2z3z4z5)
  p1 = mltCmp(z[3], mltCmp(mltCmp(z[0], z[1]), z[2]));
  p2 = mltCmp(z[4], mltCmp(mltCmp(z[0], z[1]), z[2]));
  p3 = mltCmp(z[4], mltCmp(mltCmp(z[0], z[1]), z[3]));
  p4 = mltCmp(z[4], mltCmp(mltCmp(z[0], z[2]), z[3]));
  p5 = mltCmp(z[4], mltCmp(mltCmp(z[1], z[2]), z[3]));

  let a1 = math.add(p5, math.add(math.add(p1, p2), math.add(p3, p4)));
  coefficients.push(a1);

  //calculate a2 coefficient ( −(z1z2z3 + z1z2z4 + · · · + z3z4z5) sum over all 10 triples)
  p1 = math.add(mltCmp(mltCmp(z[0], z[1]), z[2]), mltCmp(mltCmp(z[0], z[1]), z[3]));
  p2 = math.add(mltCmp(mltCmp(z[0], z[1]), z[4]), mltCmp(mltCmp(z[0], z[2]), z[3]));
  p3 = math.add(mltCmp(mltCmp(z[0], z[2]), z[4]), mltCmp(mltCmp(z[0], z[3]), z[4]));
  p4 = math.add(mltCmp(mltCmp(z[1], z[2]), z[3]), mltCmp(mltCmp(z[1], z[2]), z[4]));
  p5 = math.add(mltCmp(mltCmp(z[1], z[3]), z[4]), mltCmp(mltCmp(z[2], z[3]), z[4]));
  let a2 = math.add(math.add(math.add(p1, p2), math.add(p3, p4)), p5);

  a2.re *= -1;
  a2.im *= -1;
  coefficients.push(a2);

  //calculate a3 coefficient (z1z2 + z1z3 + · · · + z4z5 (sum over all 10 pairs))
  p1 = math.add(mltCmp(z[0], z[1]), mltCmp(z[0], z[2]));
  p2 = math.add(mltCmp(z[0], z[3]), mltCmp(z[0], z[4]));
  p3 = math.add(mltCmp(z[1], z[2]), mltCmp(z[1], z[3]));
  p4 = math.add(mltCmp(z[1], z[4]), mltCmp(z[2], z[3]));
  p5 = math.add(mltCmp(z[2], z[4]), mltCmp(z[3], z[4]));
  let a3 = math.add(math.add(math.add(p1, p2), math.add(p3, p4)), p5);
  coefficients.push(a3);

  //calculate a4 coefficient (−(z1 + z2 + z3 + z4 + z5))
  let a4 = math.add(math.add(math.add(math.add(z[0], z[1]), z[2]), z[3]), z[4]);
  a4.re *= -1;
  a4.im *= -1;
  coefficients.push(a4);

  return coefficients;

}




//------FUNCTION TO CALCULATE POINT GIVEN COEFFICIENT---------//

function calcFromCoef(a) {
  var calcPoint;
  var calcPlot;

  //sqrt(4a0 + a1)/2
  calcPoint = math.divide(math.add((math.multiply(4, a[0])), a[1]) , 2);
  calculate4th(calcPoint);

  //  very ugly
  //  1/5root(a4^3*a2 + 7a1 - a0 + a3)
  //  let innerRadical = math.add(math.subtract(math.add(math.multiply(math.pow(a[4], 3), a[2]), math.multiply(7, a[1])) , a[0]) , a[3]);
  //  calcPoint = math.pow(innerRadical, 1/5);
  //  calculate4th(calcPoint);


  calcPlot = new Point(calcPoint.re, calcPoint.im, 3);

  //save history every 10 frames
  if ((frameCount % 3) == 0 && beginPath && !animationComplete) {
   calcHistory.push([calcPlot.pixelX, calcPlot.pixelY]); 
  }
  
  return calcPlot;

}

//------FUNCTION TO TRACE POINTS ON 4TH SCREEN---------//
function store4thPath(){
  //save history every 10 frames
  if ((frameCount % 3) == 0 && beginPath && !animationComplete) {
    calcHistory.push([calcPlot.pixelX, calcPlot.pixelY]); 
   }
}



//------FUNCTION TO DRAW THE FOURTH SCREEN POINTS---------//
function calculate4th(z){
  let x = z.re;
  let y = z.im;
  let n = 5;
  let zMag = math.sqrt((x**2)+(y**2));
  var theta;
  var kPoints = [];
  var real;
  var imag;

  if (x > 0 && y > 0) theta = Math.atan(y/x);
  if (x < 0 && y > 0) theta = PI + Math.atan(y/x);
  if (x < 0 && y < 0) theta = -PI + Math.atan(y/x);
  if (x > 0 && y < 0) theta = Math.atan(y/x);

  for (let k = 0; k < n; k++) {
    real = math.pow(zMag, 1/n) * (cos(theta + TWO_PI*k/n));
    imag = math.pow(zMag, 1/n) * (sin(theta + TWO_PI*k/n));
    kPoints.push(new Point(real, imag, 4));
  }

  let kSize = kPoints.length;

  for (let i = 0; i < kSize; i++) {

    kPoints[i].plotPoint("z" + (i+1));

    if (!animationComplete && beginPath && !stopFirstHist) {

      if ((frameCount % 8) == 0) {

        if (i == 0) s4z1HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 1) s4z2HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 2) s4z3HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 3) s4z4HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 4) s4z5HistP1.push([kPoints[i].pixelX, kPoints[i].pixelY]); 

       }

    } else if (!animationComplete && beginPath && !stopSecondHist) {

        if ((frameCount % 8) == 0) {

          if (i == 0) s4z1HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
          if (i == 1) s4z2HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
          if (i == 2) s4z3HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
          if (i == 3) s4z4HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
          if (i == 4) s4z5HistP2.push([kPoints[i].pixelX, kPoints[i].pixelY]); 

        }

    } else if (!animationComplete && beginPath && !stopThirdHist) {

      if ((frameCount % 8) == 0) {

        if (i == 0) s4z1HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 1) s4z2HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 2) s4z3HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 3) s4z4HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
        if (i == 4) s4z5HistP3.push([kPoints[i].pixelX, kPoints[i].pixelY]); 

      }

  } else if (!animationComplete && beginPath && !stopFourthHist) {

    if ((frameCount % 8) == 0) {

      if (i == 0) s4z1HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
      if (i == 1) s4z2HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
      if (i == 2) s4z3HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
      if (i == 3) s4z4HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 
      if (i == 4) s4z5HistP4.push([kPoints[i].pixelX, kPoints[i].pixelY]); 

    }

}
    

  }

}


//------FUNCTION TO DRAW CALCULATION HISTORY---------//

function drawHistory(history) {
  var size = history.length;

  strokeWeight(2);

  if (size >= 2) {

    //draw a line for every point in calculations history
    for (let i = 0; i < size - 1; i++) {
      line(history[i][0], history[i][1], history[i+1][0], history[i+1][1]);
    }

  }

  strokeWeight(1);

}


//------FUNCTION TO DRAW AXIS ON CANVAS---------//

function sketchAxis(){

  //create the center partition
  fill(120);
  noStroke();
  rect(width/2 - 2, 0, 4, height);
  rect(0, height/2 - 2, width , 5);

  //create top left
  stroke(200);
  fill(200);
  line(0, 372/2, 498, 372/2);
  line(498/2, 0, 498/2, 372);

  textSize(14);
  text(topLeftBound, 498 - 30, height/4 - 5);
  text("-" + topLeftBound, 5, height/4 - 5);
  text(topLeftBound, 498/2 + 5, 15);
  text("-" + topLeftBound, 498/2 + 5, height/2 - 5);



  //create top right side
  line(502, 372/2, width, 372/2);
  line((498/2) * 3, 0, (498/2) * 3, 372);

  textSize(14);
  text(topRightBound, width - 20, height/4 - 8);
  text(topRightBound, (498/2)*3 + 5, 15);
  text("-" + topRightBound, (498/2)*2 + 10, height/4 - 5);
  text("-" + topRightBound, (498/2)*3 + 5 , height/2 - 5);

  //create bottom left side
  line(0, (372/2)*3, 498, (372/2)*3);
  line(498/2, 372 + 4, 498/2, height);

  textSize(14);
  text(bottomLeftBound, 498 - 23, (height/4 - 5) * 3);
  text("-" + bottomLeftBound, 5, (height/4 - 5)*3);
  text(bottomLeftBound, 498/2 + 5, (height/2) + 20);
  text("-" + bottomLeftBound, 498/2 + 5, height - 5);

  //create bottom right side
  line(502, (372/2)*3, width, (372/2)*3);
  line((498/2) * 3, 372 + 4, (498/2) * 3, height);

  textSize(14);
  text(bottomrightBound, width - 20, (height/4 - 4)*3);
  text(bottomrightBound, (498/2)*3 + 5, height/2 + 20);
  text("-" + bottomrightBound, 498 + 10, (height/4 - 5)*3);
  text("-" + bottomrightBound, (498/2)*3 + 5 , height - 5);

}

function commutator(){

}