//Initializing a 2D array of blank numbers

//function to create a 2D array of blank numbers 9*9
function createArray(rows, cols) {
    var arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
        for (var j=0;j<cols;j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
}

