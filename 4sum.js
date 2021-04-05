/*
Given an array nums of n integers and an integer target, are there elements a, b, c, and d in nums such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

Notice that the solution set must not contain duplicate quadruplets.

 

Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [], target = 0
Output: []
 

Constraints:

0 <= nums.length <= 200
-109 <= nums[i] <= 109
-109 <= target <= 109
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
 var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    
    const out = [];
    let i = 0;
    while(i < nums.length){
        let j = i + 1;
        while(j < nums.length){
            const set = new Set();
            for(let k = j + 1; k < nums.length; k++){
                const setVal = target - (nums[i] + nums[j] + nums[k]);
                if(set.has(setVal)) {
                    out.push([nums[i], nums[j], nums[k], setVal]);
                    const currNum = nums[k];
                    while(nums[k] === currNum) k++;
                    k--;
                }
                set.add(nums[k]);
            }
            const currNum = nums[j];
            while(nums[j] === currNum) j++;
        }
        const currNum = nums[i];
        while(nums[i] === currNum) i++;
    }
    
    return out;
};