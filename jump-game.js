/*
Given an array of non-negative integers nums, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

 

Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
 

Constraints:

1 <= nums.length <= 3 * 104
0 <= nums[i] <= 105
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canJump = function(nums) { 
    if(nums.length === 1) return true;
    
    const criticalIdxs = [nums.length-1];
    for(let i = 0; i < nums.length-1; i++){
        while(nums[i] === 0 && i < nums.length) {
            i++;
            if(nums[i] !== 0 && i < nums.length) criticalIdxs.push(i);
        }
    }
    
    outer: for(let i = 0; i < criticalIdxs.length; i++){
        for(let j = criticalIdxs[i] - 1; j >= 0; j--){
            if(nums[j] >= (criticalIdxs[i] - j)) continue outer;
        }
        return false;
    }
    
    return true;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var canJumpBottomUp = function(nums) { 
    let yIdx = nums.length-1;
    for(let i = nums.length-2; i >= 0; i--){
        if(nums[i] >= (yIdx - i)) yIdx = i;
    }
    return yIdx === 0;
};