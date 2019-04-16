//------FUNCTION TO CREATE A PATH---------//

function Path(complexRoot, endRoot, screen){

    var pt = new Point(complexRoot.re, complexRoot.im, screen);
    var endPt = new Point(endRoot.re, endRoot.im, screen);

    var beginX = pt.pixelX;
    var beginY = pt.pixelY;
    var distX = endPt.pixelX - pt.pixelX;
    var distY = endPt.pixelY - pt.pixelY;
    var percent = 0.0;

    var check1, check2, check3, check4 = false;

    //push the paths location to the "points" global list
    points.push(pt);

    //method that plots the point and plots it's original trace
    this.plot = function(name){
        pt.plotPoint(name);
        pt.plotOriginal(' ');
    }

    //method that sets the end point of the path
    this.setEnd = function(endPoint){
        endPt = new Point(endPoint.x, endPoint.y, screen);
        beginX = pt.pixelX;
        beginY = pt.pixelY;
        distX = endPt.pixelX - pt.pixelX;
        distY = endPt.pixelY - pt.pixelY;
        percent = 0.0;
    }

    //method that starts the path
    this.startPath = function(){

        //moves path and checks for completion
        if (percent <= 1.0) {
            pt.pixelX = beginX + percent * distX;
            pt.pixelY = beginY + pow(percent, exponent) * distY;
            pt.pixelToPoint();
            percent += step;
        } else if (!check1) {
            print("first path complete");
            check1 = true;
            firstPathDone = true;
        } else if (!check2 && check1) {
            print("second path complete");
            check2 = true;
            secondPathDone = true;
        } else if (!check3 && check1 && check2) {
            print("third path complete");
            check3 = true;
            thirdPathDone = true;
        } else if (!check4 && check1 && check2 && check3) {
            print("fourth path complete");
            print("animation complete");
            check4 = true;
            fourthPathDone = true;
            animationComplete = true;
            noLoop();
        }

    }

}