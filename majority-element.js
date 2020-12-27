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
    }
    let maxCount = 0;
    let maxVal;
    let keys = Object.keys(hashMap);
    for(let i = 0; i < keys.length; i++){
        if(hashMap[keys[i]] > maxCount){
            maxCount = hashMap[keys[i]];
            maxVal = keys[i];
        }
    }
    return maxVal;
};