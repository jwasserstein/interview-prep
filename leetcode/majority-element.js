/*
Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

You may assume that the array is non-empty and the majority element always exist in the array.

Example 1:

Input: [3,2,3]
Output: 3
Example 2:

Input: [2,2,1,1,1,2,2]
Output: 2
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const hashMap = {};
    for(let i = 0; i < nums.length; i++){
        if(hashMap[nums[i]]){
            hashMap[nums[i]]++;
        } else {
            hashMap[nums[i]] = 1;
        }
        if(hashMap[nums[i]] > nums.length/2){
            return nums[i];
        }
    }
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const counts = {};
    
    for(let i = 0; i < nums.length; i++) {
      if (nums[i] in counts) {
        counts[nums[i]]++;
      } else {
        counts[nums[i]] = 1;
      }
    }
    
    let maxKey;
    let maxCount = 0;
    const keys = Object.keys(counts);
    for(let i = 0; i < keys.length; i++) {
      if (counts[keys[i]] > maxCount) {
        maxCount = counts[keys[i]];
        maxKey = keys[i];
      }
    }
    
    return maxKey;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  const countMap = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    countMap.set(nums[i], (countMap.get(nums[i]) || 0) + 1);
  }
  
  let maxCount = 0;
  let majorityChar;
  for (const [char, count] of countMap) {
    if (count > maxCount) {
      maxCount = count;
      majorityChar = char;
    }
  }
  
  return majorityChar;
};
