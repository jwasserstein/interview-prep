/*
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

 

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
Example 4:

Input: candidates = [1], target = 1
Output: [[1]]
Example 5:

Input: candidates = [1], target = 2
Output: [[1,1]]
 

Constraints:

1 <= candidates.length <= 30
1 <= candidates[i] <= 200
All elements of candidates are distinct.
1 <= target <= 500
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const out = [];
    const s = new Set();
    
    function recursiveSum(t, sol){
        if(t === 0) {
            const stringified = JSON.stringify(sol.sort((a, b) => a-b));
            if(!s.has(stringified)) {
                out.push(sol);
                s.add(stringified);
            }
            return;
        }
        if(t < 0) {
            return;
        }
        
        for(let i = 0; i < candidates.length; i++){
            recursiveSum(t-candidates[i], [...sol, candidates[i]]);
        }
    }
    recursiveSum(target, []);
    
    return out;
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const out = [];
    
    function recursiveSum(t, sol, idx){
        if(t < 0) return;
        else if(t === 0) {
            out.push(sol);
            return;
        }
        
        for(let i = idx; i < candidates.length; i++){
            recursiveSum(t-candidates[i], [...sol, candidates[i]], i);
        }
    }
    recursiveSum(target, [], 0);
    return out;
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const out = [];
    function recursiveSum(nums, idx, sum) {
      if (sum > target) {
        return;
      } else if (sum === target) {
        out.push(nums);
        return;
      }
      
      for (let i = idx; i < candidates.length; i++) {
        recursiveSum(nums.concat(candidates[i]), i, sum + candidates[i]);
      }
    }
    
    recursiveSum([], 0, 0);
    
    return out;
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const out = [];
    function recursiveSum(start, subTarget, sol) {
      if (subTarget < 0) return;
      if (subTarget === 0) return out.push([...sol]);
      for (let i = start; i < candidates.length; i++) {
        sol.push(candidates[i]);
        recursiveSum(i, subTarget - candidates[i], sol);
        sol.pop();
      }
    }
    
    for (let i = 0; i < candidates.length; i++) {
      recursiveSum(i, target - candidates[i], [candidates[i]]);
    }
    return out;
};
  