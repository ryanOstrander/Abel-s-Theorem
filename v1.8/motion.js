//------FUNCTION TO CREATE A MOTION OF PATHS---------//

function Motion(r1, r2, r3, r4, r5){
    
    var path1 = new Path(r1, r5, 1);
    var path2 = new Path(r2, r1, 1);
    var path3 = new Path(r3, r2, 1);
    var path4 = new Path(r4, r4, 1);
    var path5 = new Path(r5, r3, 1);

    var allPaths = [path1, path2, path3, path4, path5];
    var newLocations;



    //plot the paths
    this.plot = function(){
        let count = 0;

        for (path in allPaths) {
            count++;
            allPaths[path].plot("z" + count);
        }

    }

    //move the paths
    this.update = function(){

        for (path in allPaths) {
            allPaths[path].startPath();
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

    }

    //get the new locations for the points
    this.setNewLocations = function(newPoints){
        newLocations = newPoints;
        print(newLocations);
    }
}