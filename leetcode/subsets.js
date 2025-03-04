/*
Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const out = [];
    
    function recursiveSet(idx, sol){
        out.push(sol);
        for(let i = idx; i < nums.length; i++){
            recursiveSet(i+1, [...sol, nums[i]]);
        }
    }
    
    recursiveSet(0, []);
    return out;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const out = [];
    function recursiveSet(idx, sol) {
      out.push(sol.slice());
      for (let i = idx; i < nums.length; i++) {
        sol.push(nums[i]);
        recursiveSet(i + 1, sol);
        sol.pop();
      }
    }
    recursiveSet(0, []);
    return out;
};


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const out = [];
  function generateSets(sol, idx) {
    out.push([...sol]);
    
    for (let i = idx; i < nums.length; i++) {
      sol.push(nums[i]);
      generateSets(sol, i+1);
      sol.pop();
    }
  }
  
  generateSets([], 0);
  return out;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const out = [];
  function recursiveSubset(idx, sol) {
    if (idx === nums.length) return out.push([...sol]);
    
    sol.push(nums[idx]);
    recursiveSubset(idx+1, sol);
    sol.pop();
    recursiveSubset(idx+1, sol);
  }
  recursiveSubset(0, []);
  return out;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const out = [];
  function recursiveSubset(idx, sol) {
    if (idx >= nums.length) return out.push([...sol]);
    
    recursiveSubset(idx+1, sol);
    
    sol.push(nums[idx]);
    recursiveSubset(idx+1, sol);
    sol.pop();
  }
  recursiveSubset(0, []);
  return out;
};
