/*
Given integer array nums, return the third maximum number in this array. If the third maximum does not exist, return the maximum number.

 

Example 1:

Input: nums = [3,2,1]
Output: 1
Explanation: The third maximum is 1.
Example 2:

Input: nums = [1,2]
Output: 2
Explanation: The third maximum does not exist, so the maximum (2) is returned instead.
Example 3:

Input: nums = [2,2,3,1]
Output: 1
Explanation: Note that the third maximum here means the third maximum distinct number.
Both numbers with value 2 are both considered as second maximum.
 

Constraints:

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1
 

Follow up: Can you find an O(n) solution?
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
    let firstMax;
    let secondMax;
    let thirdMax;
    
    for(let i = 0; i < nums.length; i++) {
        if([firstMax, secondMax, thirdMax].includes(nums[i])) continue;
        if(firstMax === undefined || nums[i] > firstMax){
            [thirdMax, secondMax, firstMax] = [secondMax, firstMax, nums[i]];
        } else if (secondMax === undefined || nums[i] > secondMax){
            [thirdMax, secondMax] = [secondMax, nums[i]];
        } else if (thirdMax === undefined || nums[i] > thirdMax){
            thirdMax = nums[i];
        }
    }
    return thirdMax !== undefined ? thirdMax : firstMax;
};