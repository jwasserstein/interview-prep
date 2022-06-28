/*
Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

You may return the answer in any order.

 

Example 1:

Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
Example 2:

Input: n = 1, k = 1
Output: [[1]]
 

Constraints:

1 <= n <= 20
1 <= k <= n
*/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const nums = [];
    for(let i = 1; i <= n; i++) nums.push(i);
    
    const out = [];
    function recursiveCombo(idx, iterations, sol){
        if(iterations === 0) return out.push(sol);
        
        for(let i = idx; i < nums.length; i++){
            recursiveCombo(i+1, iterations-1, [...sol, nums[i]]);
        }
    }
    
    recursiveCombo(0, k, []);
    return out;
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const out = [];
    function recursiveCombo(idx, remain, sol) {
      if (remain === 0) return out.push(sol.slice());
      
      for (let i = idx; i <= n; i++) {
        sol.push(i);
        recursiveCombo(i+1, remain-1, sol);
        sol.pop();
      }
    }
    recursiveCombo(1, k, []);
    return out;
};
  