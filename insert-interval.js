/*
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

 

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
Example 3:

Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]
Example 4:

Input: intervals = [[1,5]], newInterval = [2,3]
Output: [[1,5]]
Example 5:

Input: intervals = [[1,5]], newInterval = [2,7]
Output: [[1,7]]
 

Constraints:

0 <= intervals.length <= 104
intervals[i].length == 2
0 <= intervals[i][0] <= intervals[i][1] <= 105
intervals is sorted by intervals[i][0] in ascending order.
newInterval.length == 2
0 <= newInterval[0] <= newInterval[1] <= 105
*/

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
 var insert = function(intervals, newInterval) {
    if(intervals.length === 0) return [newInterval];
    if(intervals[0][0] > newInterval[1]) return [newInterval, ...intervals];
    if(intervals[intervals.length-1][1] < newInterval[0]) return [...intervals, newInterval];
    
    const out = [];
    let i = 0;
    
    while(i < intervals.length && intervals[i][1] < newInterval[0]){
        out.push(intervals[i]);
        i++;
    }
    
    let min = Math.min(intervals[i][0], newInterval[0]);
    while(i < intervals.length && intervals[i][0] <= newInterval[1]) i++;
    let max = Math.max(intervals[i-1][1], newInterval[1]);
    out.push([min, max]);
    
    while(i < intervals.length && intervals[i][0] < max) i++;

    while(i < intervals.length) {
        out.push(intervals[i]);
        i++;
    }

    return out;
};

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    if (intervals.length === 0) return [newInterval];
    if (newInterval[1] < intervals[0][0]) {
      return [newInterval].concat(intervals);
    }
    if (newInterval[0] > intervals[intervals.length-1][1]) {
      return intervals.concat([newInterval]);
    }
    
    const out = [];
    
    for (let i = 0; i < intervals.length; i++) {
      if (newInterval[0] > intervals[i][1]) { // newInterval strictly after interval[i]
        out.push(intervals[i]);
      } else if (newInterval[1] < intervals[i][0]) { // newInterval strictly before interval[i]
        out.push(newInterval);
        out.push(intervals[i]);
        for (let j = i + 1; j < intervals.length; j++) {
          out.push(intervals[j]);
        }
        return out;
      } else { // merge
        const starting = Math.min(newInterval[0], intervals[i][0]);
        let ending = Math.max(newInterval[1], intervals[i][1]);
        while (i < intervals.length -1 && ending >= intervals[i+1][0]) {
          ending = Math.max(ending, intervals[i+1][1]);
          i++;
        }
        out.push([starting, ending]);
        
        for (let j = i + 1; j < intervals.length; j++) {
          out.push(intervals[j]);
        }
        return out;
      }
    }
    
    return out;
};
  