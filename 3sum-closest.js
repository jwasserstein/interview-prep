/*
Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 

Constraints:

3 <= nums.length <= 10^3
-10^3 <= nums[i] <= 10^3
-10^4 <= target <= 10^4
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);
    
    let closestTarget;
    for(let i = 0; i < nums.length; i++){
        for(let j = i+1; j < nums.length-1; j++){
            let targetVal = target - (nums[i] + nums[j]);
            
            let left = j+1, right = nums.length-1;
            while(right - left > 1){
                const guess = Math.round((right + left)/2);
                if(nums[guess] < targetVal) {
                    left = guess;
                } else if (nums[guess] > targetVal){
                    right = guess;
                } else {
                    return target;
                }
            }
            const closestVal = Math.abs(nums[left] - targetVal) < 
                               Math.abs(nums[right] - targetVal) ?
                               nums[left] : nums[right];
            const error = Math.abs(target - (nums[i] + nums[j] + closestVal));
            
            if(closestTarget === undefined || (error < Math.abs(target - closestTarget))){
                closestTarget = nums[i] + nums[j] + closestVal;
            }
        }
    }
    
    return closestTarget;
};