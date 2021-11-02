//function to create a 2D array of size 9*9
const newGrid= (size) => {
    // console.log("new grid");
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = new Array(size);
    }
    //loop to assign 0 to all elements of array
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
}

//function to check duplicate in row
const checkRow = (grid, row, num) => {
    for (var i = 0; i < grid.length; i++) {
        if (grid[row][i] == num) {
            return false;
        }
    }
    return true;
}

//function to check duplicate in column
const checkColumn = (grid, col, num) => {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i][col] == num) {
            return false;
        }
    }
    return true;
}

//function to check duplicate in 3*3 box
const checkBox = (grid, row, col, num) => {
    var r = row - row % 3;
    var c = col - col % 3;
    for (var i = r; i < r + 3; i++) {
        for (var j = c; j < c + 3; j++) {
            if (grid[i][j] == num) {
                return false;
            }
        }
    }
    return true;
}

//function to check if number is valid in a particular row, column or box
const checkValid = (grid, row, col, num) => {
    return checkRow(grid, row, num) && checkColumn(grid, col, num) && checkBox(grid, row, col, num);
}   



//function to check if the sudoku is solved
const checkSolved = (grid) => {
    // console.log("check solved");
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if (grid[i][j] == 0) {
                return false;
            }
        }
    }
    // console.log("true");
    return true;
}


//funtion for random number generation
const randomNumber = () => {
    return Math.floor(Math.random() * 9 ) ;
}
const findUnassignedPos = (grid, pos) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                pos.row = row;
                pos.col = col;
                return true;
            }
        }
    }
    return false;
}

//function to shuffle the array
const shuffleArray = (arr) => {
    let curr_index = arr.length;

    while (curr_index !== 0) {
        let rand_index = Math.floor(Math.random() * curr_index);
        curr_index -= 1;

        let temp = arr[curr_index];
        arr[curr_index] = arr[rand_index];
        arr[rand_index] = temp;
    }

    return arr;
}

//function to generate sudoku
const sudokuCreate = (grid) => {
    let unassigned_pos = {
        row: -1,
        col: -1
    }

    if (!findUnassignedPos(grid, unassigned_pos)) return true;

    let number_list = shuffleArray([1,2,3,4,5,6,7,8,9]);

    let row = unassigned_pos.row;
    let col = unassigned_pos.col;

    number_list.forEach((num, i) => {
        if (checkValid(grid, row, col, num)) {
            grid[row][col] = num;

            if (checkSolved(grid)) {
                return true;
            } else {
                if (sudokuCreate(grid)) {
                    return true;
                }
            }

            grid[row][col] = 0;
        }
    });

    return checkSolved(grid);
}



//function to return grid after removing certian number of cells from sudoku
const removeCells = (grid, num) => {
    // console.log("remove cells : " + grid + " " + num);
    var row = randomNumber();
    var col = randomNumber();
    while (grid[row][col] == 0) {
        row = randomNumber();
        col = randomNumber();
    }
    grid[row][col] = 0;
    if (num > 0) {
        return removeCells(grid, num - 1);
    }
    else {
        return grid;
    }
}


//function to return sudoku 
const sudoku = (num) => {
    // console.log("sudoku");
    var grid = newGrid(9);
    sudokuCreate(grid);
    var ques = removeCells(grid, num);
    return {
        question: ques,
        answer: grid
    };
    // return ques; 
}

//function to print sudoku
// const printGrid = (grid) => {
//     for (var i = 0; i < grid.length; i++) {
//         for (var j = 0; j < grid.length; j++) {
//             process.stdout.write(grid[i][j] + " ");
//         }
//         console.log("");
//     }
// }


// console.log(JSON.stringify(printGrid(sudoku(0))))