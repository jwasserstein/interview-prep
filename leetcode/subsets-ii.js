/*
Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsetsWithDup = function(nums) {
    const out = [];
    const set = new Set();
    
    nums.sort((a, b) => a - b);
    
    function recursiveSet(idx, sol){
        if(idx >= nums.length) {
            const str = JSON.stringify(sol);
            if(!set.has(str)) {
                out.push(sol);
                set.add(str);
            }
            return;
        }
        
        recursiveSet(idx+1, sol);
        recursiveSet(idx+1, [...sol, nums[idx]]);
    }
    
    recursiveSet(0, []);
    
    return out;
};