/*
We define a magic square to be an  matrix of distinct positive integers from  to  where the sum of any row, column, or diagonal of length  is always equal to the same number: the magic constant.

You will be given a  matrix  of integers in the inclusive range . We can convert any digit  to any other digit  in the range  at cost of . Given , convert it into a magic square at minimal cost. Print this cost on a new line.

Note: The resulting magic square must contain distinct integers in the inclusive range .

Example

$s = [[5, 3, 4], [1, 5, 8], [6, 4, 2]]

The matrix looks like this:

5 3 4
1 5 8
6 4 2
We can convert it to the following magic square:

8 3 4
1 5 9
6 7 2
This took three replacements at a cost of .

Function Description

Complete the formingMagicSquare function in the editor below.

formingMagicSquare has the following parameter(s):

int s[3][3]: a  array of integers
Returns

int: the minimal total cost of converting the input square to a magic square
Input Format

Each of the  lines contains three space-separated integers of row .

Constraints

Sample Input 0

4 9 2
3 5 7
8 1 5
Sample Output 0

1
Explanation 0

If we change the bottom right value, , from  to  at a cost of ,  becomes a magic square at the minimum possible cost.

Sample Input 1

4 8 2
4 5 7
6 1 6
Sample Output 1

4
Explanation 1

Using 0-based indexing, if we make

-> at a cost of 
-> at a cost of 
-> at a cost of ,
then the total cost will be .
*/

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
    const magic = [];
    
    function genMagic(mat, vals){
        if(vals.length === 0){
            const sum = mat[0][0] + mat[0][1] + mat[0][2];
            for(let i = 0; i < mat.length; i++){
                if(sum !== mat[i][0] + mat[i][1] + mat[i][2])
                    return;
            }
            for(let i = 0; i < mat[0].length; i++){
                if(sum !== mat[0][i] + mat[1][i] + mat[2][i])
                    return;
            }
            if(sum !== mat[2][0] + mat[1][1] + mat[0][2])
                return;
            if(sum !== mat[0][0] + mat[1][1] + mat[2][2])
                return;
            
            magic.push(mat.map(row => row.slice()));
            return;
        }
        
        let col = (9 - vals.length) % 3;
        let row = Math.floor((9 - vals.length)/3);
        
        for(let i = 0; i < vals.length; i++){
            mat[row][col] = vals[i];
            const newVals = vals.slice();
            newVals.splice(i, 1);
            genMagic(mat, newVals);
        }
    }
    
    function calcCost(base, magic){
        let cost = 0;
        for(let i = 0; i < base.length; i++){
            for(let j = 0; j < base[0].length; j++){
                cost += Math.abs(base[i][j] - magic[i][j]);
            }
        }
        return cost;
    } 
    
    genMagic([[],[],[]], [1,2,3,4,5,6,7,8,9]);
    
    let minCost;
    for(let i = 0; i < magic.length; i++){
        const cost = calcCost(s, magic[i]);
        minCost = minCost === undefined ? cost : Math.min(minCost, cost);
    }
    return minCost;
}