/*
Given an integer rowIndex, return the rowIndexth row of the Pascal's triangle.

Notice that the row index starts from 0.


In Pascal's triangle, each number is the sum of the two numbers directly above it.

Follow up:

Could you optimize your algorithm to use only O(k) extra space?

 

Example 1:

Input: rowIndex = 3
Output: [1,3,3,1]
Example 2:

Input: rowIndex = 0
Output: [1]
Example 3:

Input: rowIndex = 1
Output: [1,1]
 

Constraints:

0 <= rowIndex <= 33
*/

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    if(rowIndex === 0) return [1];
    if(rowIndex === 1) return [1, 1];
    
    let prevRow = [1, 1];
    let currentRow = [];
    for(let i = 2; i <= rowIndex; i++){
        currentRow[0] = 1;
        currentRow[i] = 1;
        for(let j = 1; j < i; j++){
            currentRow[j] = prevRow[j-1] + prevRow[j];
        }
        
        prevRow = currentRow.slice();
    }
    return currentRow;
};