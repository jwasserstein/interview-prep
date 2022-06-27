/*
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 

Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    
    let lower = intervals[0][0];
    let upper = intervals[0][1];
    const out = [];
    for(let i = 0; i < intervals.length; i++){
        if(intervals[i][0] <= upper){
            upper = Math.max(upper, intervals[i][1]);
        } else {
            out.push([lower, upper]);
            lower = intervals[i][0];
            upper = intervals[i][1];
        }
    }
    out.push([lower, upper]);
    return out;
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
  
    const out = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
      if (out[out.length-1][1] >= intervals[i][0]) {
        out[out.length-1][0] = Math.min(out[out.length-1][0], intervals[i][0]);
        out[out.length-1][1] = Math.max(out[out.length-1][1], intervals[i][1]);
      } else {
        out.push(intervals[i]);
      }
    }
  
    return out;
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  if (intervals.length === 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  
  const out = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (isOverlap(out[out.length-1], intervals[i])) {
      out[out.length-1] = mergeIntervals(out[out.length-1], intervals[i]);
    } else {
      out.push(intervals[i]);
    }
  }
  return out;
};

function mergeIntervals(a, b) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}

function isOverlap(a, b) {
  return b[0] <= a[1] && a[0] <= b[1];
}

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  
  const out = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const currInterval = out[out.length-1];
    if (isOverlap(currInterval, intervals[i])) {
      out[out.length-1][0] = Math.min(currInterval[0], intervals[i][0]);
      out[out.length-1][1] = Math.max(currInterval[1], intervals[i][1]);
    } else {
      out.push(intervals[i]);
    }
  }
  
  return out;
};

function isOverlap(intervalA, intervalB) {
  return intervalA[1] >= intervalB[0]
      && intervalB[1] >= intervalA[0];
}
