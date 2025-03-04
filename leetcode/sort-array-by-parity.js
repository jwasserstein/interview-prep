/*
Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.

Return any array that satisfies this condition.

 

Example 1:

Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
Example 2:

Input: nums = [0]
Output: [0]
 

Constraints:

1 <= nums.length <= 5000
0 <= nums[i] <= 5000
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function(nums) {
  let even = 0;
  let odd = 0;
  
  while (even < nums.length && odd < nums.length) {
    while (nums[odd] % 2 !== 1) {
      odd++;
      if (odd >= nums.length) return nums;
    }
    
    even = Math.max(even, odd);
    
    while (nums[even] % 2 !== 0) {
      even++;
      if (even >= nums.length) return nums;
    }
    [nums[even], nums[odd]] = [nums[odd], nums[even]];
  }
};

