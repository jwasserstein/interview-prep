/*
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: []
 

Constraints:

0 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if(nums.length < 3) return [];
    
    nums.sort((a, b) => a - b);
    
    let i = 0;
    const out = [];
    
    while(i < nums.length){
        const set = new Set();
        const target = 0 - nums[i];
        let j = i + 1;
        while(j < nums.length){
            if(set.has(target - nums[j])) {
                out.push([nums[i], target-nums[j], nums[j]]);
                set.add(nums[j]);
                const lastVal = nums[j];
                while(nums[j] === lastVal && j < nums.length) j++;
            } else {
                set.add(nums[j]);
                j++;
            }
            
        }
        const lastVal = nums[i];
        while(nums[i] === lastVal) i++;
    }
    
    return out;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSumTwoPointer = function(nums) {
    if(nums.length < 3) return [];
    
    nums.sort((a, b) => a - b);
    
    const out = [];
    let i = 0;
    while(i < nums.length){
        const target = 0 - nums[i];
        
        let left = i + 1, right = nums.length - 1;
        while(left < right){
            const currVal = nums[left] + nums[right];
            if(currVal < target) {
                left++;
            } else if (currVal > target) {
                right--;
            } else {
                out.push([nums[i], nums[left], nums[right]]);
                const lastVal = nums[left];
                while(nums[left] === lastVal) left++;
            }
        }
        const lastVal = nums[i];
        while(nums[i] === lastVal) i++;
    }
    
    return out;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort();
    
    const out = [];
  
    let i = 0;
    while(i < nums.length) {
      if (nums[i] > 0) break;
  
      const target = 0 - nums[i];
      const seen = new Set();
      for(let j = i + 1; j < nums.length; j++) {
        if (seen.has(target - nums[j])) {
          const sol = [nums[i], nums[j], target - nums[j]];
          out.push(sol);
          j = nextDist(j, nums) - 1;
        }
        seen.add(nums[j]);
      }
      
      i = nextDist(i, nums);
    }
    return out;
  };
  
  function nextDist(n, nums) {
    let i = n;
    while (i < nums.length && nums[i] === nums[n]) i++;
    return i;
} 

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    
    const out = [];
  
    let i = 0;
    while(i < nums.length) {
      if (nums[i] > 0) break;
  
      const target = 0 - nums[i];
      let left = i+1;
      let right = nums.length-1;
      while (left < right) {
        if (nums[left] + nums[right] === target) {
          out.push([nums[left], nums[right], nums[i]]);
          left = nextDist(left, nums, 1);
        } else if (nums[left] + nums[right] > target) {
          right = nextDist(right, nums, -1);
        } else {
          left = nextDist(left, nums, 1);
        }
      }
      i = nextDist(i, nums, 1);
    }
    return out;
  };
  
  function nextDist(n, nums, incr) {
    let i = n;
    while (i < nums.length && nums[i] === nums[n]) i += incr;
    return i;
}
  