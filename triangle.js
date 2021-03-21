/*
Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

 

Example 1:

Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
Example 2:

Input: triangle = [[-10]]
Output: -10
 

Constraints:

1 <= triangle.length <= 200
triangle[0].length == 1
triangle[i].length == triangle[i - 1].length + 1
-104 <= triangle[i][j] <= 104
 

Follow up: Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?
*/

/**
 * @param {number[][]} triangle
 * @return {number}
 */
 var minimumTotal = function(triangle) {
    const sols = triangle.map(r => new Array(r.length));
    sols[0][0] = triangle[0][0];
    for(let row = 1; row < triangle.length; row++){
        for(let col = 0; col < triangle[row].length; col++){
            const upperRight = sols[row-1][col] !== undefined ? 
                                sols[row-1][col] : Infinity;
            const upperLeft = sols[row-1][col-1] !== undefined ? 
                                sols[row-1][col-1] : Infinity;
            sols[row][col] = Math.min(upperRight, upperLeft) + triangle[row][col];
        }
    }
    
    return Math.min(...sols[sols.length-1]);
};