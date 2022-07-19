/*

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 400

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 1) return nums[0];

  const memo = {};
  const zero = memoizedRob(nums, 0, memo);
  const one = memoizedRob(nums, 1, memo);
  return Math.max(zero, one);
};

function memoizedRob(nums, idx, memo) {
  if (nums.length - idx === 1) return nums[idx];
  if (nums.length - idx === 2) return Math.max(nums[idx], nums[idx+1]);
  
  let maxRob = -Infinity;
  for (let i = idx+2; i < nums.length; i++) {
    if (i in memo) {
      maxRob = Math.max(maxRob, memo[i]);
    } else {
      maxRob = Math.max(maxRob, memoizedRob(nums, i, memo));
    }
  }
  
  memo[idx] = maxRob + nums[idx];
  return memo[idx];
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  const memo = {};
  function recursiveRob(idx) {
    if (idx >= nums.length) return 0;
    if (idx in memo) return memo[idx];
    
    const two = idx < nums.length - 2 ? recursiveRob(idx+2) : 0;
    const one = idx < nums.length - 1 ? recursiveRob(idx+1) : 0;
    
    memo[idx] = Math.max(nums[idx] + two, one);
    
    return memo[idx];
  }
  return recursiveRob(0);
};
