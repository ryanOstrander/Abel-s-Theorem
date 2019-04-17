//------FUNCTION TO CREATE A MOTION OF PATHS---------//

function Motion(r1, r2, r3, r4, r5){
    
    var path1 = new Path(r1, r2, 1);
    var path2 = new Path(r2, r3, 1);
    var path3 = new Path(r3, r1, 1);
    var path4 = new Path(r4, r4, 1);
    var path5 = new Path(r5, r5, 1);

    var allPaths = [path1, path2, path3, path4, path5];
    var newLocations;

    var check1, check2, check3 = false;



    //plot the paths
    this.plot = function() {

        for (let i = 0; i < 3; i++) {
            allPaths[i].plot("z" + (i+1));
        }

    }

    //move the paths
    this.update = function(){
        let i = 0;

        for (path in allPaths) {

            allPaths[path].startPath(zHist[i]);
            i++;

        }

        for (hist in zHist) {
            print(zHist[hist].length);
        }
        
    }

    //set new endpoints for paths
    this.setNewEnds = function(end1, end2, end3, end4, end5){
        var endList = [end1, end2, end3, end4, end5]
        var count = 0;

        for (path in allPaths) {
            allPaths[path].setEnd(newLocations[endList[count] - 1]);
            count++;
        }

        if (!check1 && !check2 && !check3) {
            check1 = true;
        } else if ( !check2 && !check3 && check1) {
            check2 = true;
        } else if (!check3 && check2 && check3) {
            check3 = true;
        }

    }

    //get the new locations for the points
    this.setNewLocations = function(newPoints){
        newLocations = newPoints;
        print(newLocations);
    }
}