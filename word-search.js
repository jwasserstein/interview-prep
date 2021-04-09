/*
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
 

Follow up: Could you use search pruning to make your solution faster with a larger board?
*/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
    const wordFreq = new Map();
    for(let i = 0; i < word.length; i++){
        wordFreq.set(word[i], (wordFreq.get(word[i]) || 0) + 1);
    }
    for(let row = 0; row < board.length; row++){
        for(let col = 0; col < board[row].length; col++){
            if(wordFreq.has(board[row][col])) {
                wordFreq.set(board[row][col], wordFreq.get(board[row][col]) - 1);
                if(wordFreq.get(board[row][col]) === 0) wordFreq.delete(board[row][col])
            }
        }
    }
    if(wordFreq.size > 0) return false;
    
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ];
    
    function recursiveSearch(row, col, wordIdx, set){
        if(wordIdx > word.length-1) return true;
        
        for(let i = 0; i < directions.length; i++){
            const nextRow = row+directions[i][0];
            const nextCol = col+directions[i][1];
            
            if(set.has(`${nextRow},${nextCol}`)) continue;
            
            if(board[nextRow]?.[nextCol] === word[wordIdx]){
                set.add(`${nextRow},${nextCol}`);
                if(recursiveSearch(nextRow, nextCol, wordIdx+1, set))
                    return true;
                set.delete(`${nextRow},${nextCol}`);
            }
        }
        return false;
    }
    
    for(let row = 0; row < board.length; row++){
        for(let col = 0; col < board[row].length; col++){
            if(board[row][col] !== word[0]) continue;
            
            const letterSet = new Set([`${row},${col}`]);
            if(recursiveSearch(row, col, 1, letterSet))
                return true;
        }
    }
    
    return false;
};