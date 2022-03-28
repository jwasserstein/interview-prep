/*
Given an array of non-negative integers nums, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

You can assume that you can always reach the last index.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [2,3,0,1,4]
Output: 2
 

Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 105
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
 var jump = function(nums) {
    const jumps = nums.map(() => Infinity);
    jumps[jumps.length-1] = 0;
    
    for(let i = jumps.length-2; i >= 0; i--){
        let minJumps = Infinity;
        for(let j = 1; j <= nums[i]; j++){
            if(i + j >= jumps.length) break;
            minJumps = Math.min(minJumps, jumps[i+j]);
        }
        jumps[i] = minJumps + 1;
    }
    
    return jumps[0];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
 var jumpLinear = function(nums) {
    let jumps = 0, jumpEnd = 0, farthest = 0;
    for(let i = 0; i < nums.length; i++){
        farthest = Math.max(farthest, nums[i] + i);
        if(i >= jumpEnd && i !== nums.length-1){
            jumpEnd = farthest;
            jumps++;
        }
    }
    return jumps;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    if (nums.length === 1) return 0;
    
    const minJumps = new Array(nums.length).fill(undefined);
    minJumps[0] = 0;
    
    for (let i = 0; i < nums.length; i++) {
      for (let j = i+1; j <= i+nums[i]; j++) {
        if (minJumps[j] !== undefined) {
          minJumps[j] = Math.min(minJumps[i] + 1, minJumps[j]);
        } else {
          minJumps[j] = minJumps[i] + 1;
        }
        if (j === nums.length-1) return minJumps[j];
      }
    }
};
  