/*
Given an integer array nums, find three numbers whose product is maximum and return the maximum product.

 

Example 1:

Input: nums = [1,2,3]
Output: 6
Example 2:

Input: nums = [1,2,3,4]
Output: 24
Example 3:

Input: nums = [-1,-2,-3]
Output: -6
 

Constraints:

3 <= nums.length <= 104
-1000 <= nums[i] <= 1000
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    nums.sort((a, b) => a - b);
    return Math.max(nums[0]*nums[1]*nums[nums.length-1], nums[nums.length-2]*nums[nums.length-3]*nums[nums.length-1]);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct2 = function(nums) {
    let min = null;
    let min2 = null;
    let max = null;
    let max2 = null;
    let max3 = null;
    
    for(let i = 0; i < nums.length; i++){
        if(max === null || nums[i] > max) {
            max3 = max2;
            max2 = max;
            max = nums[i];
        } else if(max2 === null || nums[i] > max2){
            max3 = max2;
            max2 = nums[i];
        } else if(max3 === null || nums[i] > max3){
            max3 = nums[i];
        }
        
        if(min === null || nums[i] < min){
            min2 = min;
            min = nums[i];
        } else if(min2 === null || nums[i] < min2){
            min2 = nums[i];
            continue;
        }
    }
    
    if(min !== null && min2 !== null){
        return Math.max(min*min2*max, max3*max2*max);
    } else {
        return max3*max2*max;
    }
};