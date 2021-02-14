/*
We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly 1.

Given an integer array nums, return the length of its longest harmonious subsequence among all its possible subsequences.

A subsequence of array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.

 

Example 1:

Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].
Example 2:

Input: nums = [1,2,3,4]
Output: 2
Example 3:

Input: nums = [1,1,1,1]
Output: 0
 

Constraints:

1 <= nums.length <= 2 * 104
-109 <= nums[i] <= 109
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    nums.sort((a, b) => a-b);
    
    let maxLen = 0;
    let start1 = null;
    let start2 = null;
    for(let i = 0; i < nums.length; i++){
        if(start1 === null && nums[i] !== nums[start2]) start1 = i;
        if(start2 === null && nums[i] - nums[start1] === 1) start2 = i;
        
        if(nums[i] - nums[start1] > 1){
            if(start2 !== null) maxLen = Math.max(maxLen, i - start1);
            start1 = i;
        }
        if(start2 !== null && nums[i] - nums[start2] > 1){
            maxLen = Math.max(maxLen, i - start2);
            start2 = start1 === i ? null : i;
        }
    }
    if(nums[nums.length-1] - nums[start1] >= 1){
        maxLen = Math.max(maxLen, nums.length - start1);
    }
    if(start2 !== null && nums[nums.length-1] - nums[start2] >= 1){
        maxLen = Math.max(maxLen, nums.length - start2);
    }
    return maxLen;
};