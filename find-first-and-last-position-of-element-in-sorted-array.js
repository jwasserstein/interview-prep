/*
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

Follow up: Could you write an algorithm with O(log n) runtime complexity?

 

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]
 

Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums is a non-decreasing array.
-109 <= target <= 109
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var searchRange = function(nums, target) {
    const out = [-1, -1];
    for(let i = 0; i < nums.length; i++){
        if(nums[i] === target){
            out[0] = out[0] !== -1 ? Math.min(out[0], i) : i;
            out[1] = out[1] !== -1 ? Math.max(out[1], i) : i;
        }
    }
    return out;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var searchRangeBinarySearch = function(nums, target) {
    let left = 0, right = nums.length-1;
    let guess;
    let out = [-1, -1];
    
    while(right - left > 1){
        guess = Math.round((right + left)/2);
        if(nums[guess] > target){
            right = guess;
        } else if (nums[guess] < target){
            left = guess;
        } else {
            if(nums[guess-1] !== target) {
                out[0] = guess;
                break;
            } else {
                right = guess;
            }
        }
    }
    
    left = 0;
    right = nums.length-1;
    
    while(right - left > 1){
        guess = Math.round((right + left)/2);
        if(nums[guess] > target){
            right = guess;
        } else if (nums[guess] < target){
            left = guess;
        } else {
            if(nums[guess+1] !== target) {
                out[1] = guess;
                break;
            } else {
                left = guess;
            }
        }
    }
    
    if(nums[0] === target) {
        out[0] = 0;
        if(out[1] === -1) out[1] = 0;
    }
    if(nums[nums.length-1] === target) {
        out[1] = nums.length-1;
        if(out[0] === -1) out[0] = nums.length-1;
    }
    
    return out;
};