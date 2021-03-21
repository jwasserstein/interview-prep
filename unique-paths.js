/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

 

Example 1:


Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
Example 3:

Input: m = 7, n = 3
Output: 28
Example 4:

Input: m = 3, n = 3
Output: 6
 

Constraints:

1 <= m, n <= 100
It's guaranteed that the answer will be less than or equal to 2 * 109.
*/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePaths = function(m, n) {
    const cache = {};
    function recursivePath(m, n){
        if(m === 1 || n === 1) return 1;
        
        const upStr = `${m-1},${n}`;
        const leftStr = `${m},${n-1}`;
        if(!(upStr in cache))
            cache[upStr] = recursivePath(m-1, n);
        if(!(leftStr in cache))
            cache[leftStr] = recursivePath(m, n-1);
    
        return cache[upStr] + cache[leftStr];
    }
    return recursivePath(m, n);
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 var uniquePathsTab = function(m, n) {
    const sols = new Array(m).fill(0).map(() => new Array(n));
    for(let row = 0; row < m; row++){
        for(let col = 0; col < n; col++){
            const left = sols[row]?.[col-1] || 0;
            const up = sols[row-1]?.[col] || 0;
            sols[row][col] = left + up;
            if(row === 0 && col === 0) sols[row][col] = 1;
        }
    }
    return sols[m-1][n-1];
};