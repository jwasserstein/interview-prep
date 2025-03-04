/*
Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

 

Example 1:

Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
Example 2:

Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
 

Constraints:

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums is sorted in non-decreasing order.
 

Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  if (nums[0] >= 0) return nums.map(num => num**2);
  if (nums[nums.length-1] <= 0) {
    const out = [];
    for (let i = nums.length-1; i >= 0; i--) {
      out.push(nums[i]**2);
    }
    return out;
  }
  
  let left;
  let right;
  let out = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= 0 && nums[i-1] < 0) left = i-1;
    if (nums[i] <= 0 && nums[i+1] > 0) right = i+1;
    if (nums[i] === 0) out.push(0);
  }
  
  while (left >= 0 && right < nums.length) {
    if (nums[left]**2 < nums[right]**2) {
      out.push(nums[left]**2);
      left--;
    } else {
      out.push(nums[right]**2);
      right++;
    }
  }
  while (left >= 0) {
    out.push(nums[left]**2);
    left--;
  }
  while (right < nums.length) {
    out.push(nums[right]**2);
    right++;
  }
  return out;
};
