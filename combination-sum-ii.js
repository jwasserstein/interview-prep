/*
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

 

Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]
 

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    
    let out = [];
    function recursiveSum(solArr, target, idx){
        let i = idx;
        while(i < candidates.length){
            if(candidates[i] === target) {
                const lastSol = out[out.length-1];
                out.push(solArr.concat(candidates[i]));
            } else if (candidates[i] < target) {
                recursiveSum(solArr.concat(candidates[i]), target-candidates[i], i+1);
            }
            const lastVal = candidates[i];
            while(lastVal === candidates[i]) i++;
        }
    }
    
    recursiveSum([], target, 0);    
    return out;
};