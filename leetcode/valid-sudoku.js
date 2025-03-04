/*
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
*/

/**
 * @param {character[][]} board
 * @return {boolean}
 */
 var isValidSudoku = function(board) {
    // Check rows
    for(let row = 0; row < board.length; row++){
        const rowSet = new Set();
        for(let col = 0; col < board[row].length; col++){
            if(board[row][col] === '.') continue;
            if(rowSet.has(board[row][col])) return false;
            rowSet.add(board[row][col]);
        }
    }
    
    // Check columns
    for(let col = 0; col < board[0].length; col++){
        const colSet = new Set();
        for(let row = 0; row < board.length; row++){
            if(board[row][col] === '.') continue;
            if(colSet.has(board[row][col])) return false;
            colSet.add(board[row][col]);
        }
    }
    
    // Check squares
    for(let row = 0; row < board.length; row += 3){
        for(let col = 0; col < board[row].length; col += 3){
            const squareSet = new Set();
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(board[i+row][j+col] === '.') continue;
                    if(squareSet.has(board[i+row][j+col])) return false;
                    squareSet.add(board[i+row][j+col]);
                }
            }
        }
    }
    
    return true;
};

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      const rowSet = new Set();
      for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
        const col = board[rowIdx][colIdx];
        if (col !== '.') {
          if (rowSet.has(col)) return false;
          rowSet.add(col);
        }
      }
    }
    
    for (let colIdx = 0; colIdx < board[0].length; colIdx++) {
      const colSet = new Set();
      for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
        const row = board[rowIdx][colIdx];
        if (row !== '.') {
          if (colSet.has(row)) return false;
          colSet.add(row);
        }
      }
    }
    
    for (let colIdx = 0; colIdx < board[0].length; colIdx++) {
      const colSet = new Set();
      for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
        const row = board[rowIdx][colIdx];
        if (row !== '.') {
          if (colSet.has(row)) return false;
          colSet.add(row);
        }
      }
    }
    
    for (let x = 0; x < board.length; x += 3) {
      for (let i = 0; i < board.length; i += 3) {
        const boxSet = new Set();
        for (let j = 0; j < board.length / 3; j++) {
          const c = i + j;
          for (let k = 0; k < board.length / 3; k++) {
            const r = x + k;
            if (board[r][c] !== '.') {
              if (boxSet.has(board[r][c])) return false;
              boxSet.add(board[r][c]);
            }
          }
        }
      }
    }
    
    return true;
};