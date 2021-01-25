/*
The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, calculate the Hamming distance.

Note:
0 ≤ x, y < 231.

Example:

Input: x = 1, y = 4

Output: 2

Explanation:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑

The above arrows point to positions where the corresponding bits are different.
*/

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
    let xB = Number(x).toString(2);
    let yB = Number(y).toString(2);
    
    while(xB.length > yB.length) yB = '0' + yB;
    while(yB.length > xB.length) xB = '0' + xB;
    
    let count = 0;
    for(let i = 0; i < xB.length; i++){
        if(xB[i] !== yB[i]) count++;
    }
    
    return count;
};