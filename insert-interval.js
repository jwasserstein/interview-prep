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
  
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  const out = [];
  
  let i = 0;
  while (i < intervals.length && intervals[i][0] < newInterval[0]) {
    out.push(intervals[i]);
    i++;
  }
  
  if (out.length > 0 && isOverlap(out[out.length-1], newInterval)) {
    out[out.length-1] = merge(out[out.length-1], newInterval);
  } else {
    out.push(newInterval);
  }
  
  while (i < intervals.length && isOverlap(out[out.length-1], intervals[i])) {
    out[out.length-1] = merge(out[out.length-1], intervals[i]);
    i++;
  }
  
  out.push(...intervals.slice(i));
  return out;
};

function isOverlap(a, b) {
  return a[0] <= b[1] && a[1] >= b[0];
}

function merge(a, b) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  let left = 0;
  let right = intervals.length-1;
  let guess = 0;
  
  while (left <= right) {
    guess = Math.floor((left + right) / 2);
    
    if (guess === 0) {
      if (newInterval[0] <= intervals[guess][0]) {
        break;
      } else {
        guess++;
        left = guess;
      }
    } else if (guess === intervals.length-1 && newInterval[0] > intervals[intervals.length-1][0]) {
      guess++;
      break;
    } else if (intervals[guess-1][0] > newInterval[0]) {
      right = guess - 1;
    } else if (newInterval[0] > intervals[guess][0]) {
      left = guess + 1;
    } else {
      break;
    }
  }
  intervals.splice(guess, 0, newInterval);
  
  let mergeLoc;
  if (guess === 0) {
    mergeLoc = 0;
    guess = 1;    
  } else {
    mergeLoc = guess - 1;
    if (isOverlap(intervals[mergeLoc], intervals[guess])) {
      intervals[mergeLoc] = merge(intervals[mergeLoc], intervals[guess]);
      guess++;
    } else {
      mergeLoc++;
      guess++;
    }
  }

  while (guess < intervals.length && isOverlap(intervals[mergeLoc], intervals[guess])) {
    intervals[mergeLoc] = merge(intervals[mergeLoc], intervals[guess]);
    guess++;
  }
  mergeLoc++;
  while (guess < intervals.length) {
    [intervals[guess], intervals[mergeLoc]] = [intervals[mergeLoc], intervals[guess]];
    guess++;
    mergeLoc++;
  }
  
  intervals.splice(mergeLoc, intervals.length - mergeLoc);
  
  return intervals;
};


function isOverlap(a, b) {
  return a[0] <= b[1] && b[0] <= a[1];
}

function merge(a, b) {
  return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}
