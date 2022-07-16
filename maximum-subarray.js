/*
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Example 2:

Input: nums = [1]
Output: 1
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  let cumulativeSum = nums[0];
  let minSum = Math.min(0, nums[0]);
  let maxSum = cumulativeSum;
  
  for(let i = 1; i < nums.length; i++) {
    cumulativeSum += nums[i];
    maxSum = Math.max(cumulativeSum - minSum, maxSum);
    minSum = Math.min(cumulativeSum, minSum);
  }

  return maxSum;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  const prefixSum = new Array(nums.length);
  prefixSum[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    prefixSum[i] = prefixSum[i-1] + nums[i];
  }
  
  const suffixMax = new Array(nums.length);
  suffixMax[suffixMax.length-1] = prefixSum[nums.length-1];
  for (let i = suffixMax.length-2; i >= 0; i--) {
    suffixMax[i] = Math.max(suffixMax[i+1], prefixSum[i]);
  }
  
  let maxSum = -Infinity;
  for (let i = 0; i < prefixSum.length-1; i++) {
    maxSum = Math.max(suffixMax[i+1] - prefixSum[i], maxSum);
  }
  
  return Math.max(maxSum, suffixMax[0]);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let currSum = nums[0];
  let globalSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    globalSum = Math.max(globalSum, currSum);
  }
  return globalSum;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let currPrefix = 0;
  let minPrefix = 0;
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    currPrefix += nums[i];
    maxSum = Math.max(maxSum, currPrefix - minPrefix);
    minPrefix = Math.min(minPrefix, currPrefix);
  }
  
  return maxSum;
};

