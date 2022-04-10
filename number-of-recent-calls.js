/*
You have a RecentCounter class which counts the number of recent requests within a certain time frame.

Implement the RecentCounter class:

RecentCounter() Initializes the counter with zero recent requests.
int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].
It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.

 

Example 1:

Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]

Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3
 

Constraints:

1 <= t <= 109
Each test case will call ping with strictly increasing values of t.
At most 104 calls will be made to ping.
*/


var RecentCounter = function() {
  this.data = [];
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.data.push(t);
  
  if (this.data.length === 1) return 1;
  else if (this.data.length === 2) {
    if (t - this.data[0] <= 3000) return 2;
    else return 1;
  }
  
  let left = 0;
  let right = this.data.length-1;
  let startIdx;
  if (t - this.data[left] === 3000) {
    startIdx = left;
  } else if (t - this.data[right] === 3000) {
    startIdx = right;
  } else {
    while (right - left > 1) {
      let guess = Math.round((left + right) / 2);
      if (t - this.data[guess] === 3000) {
        startIdx = guess;
        break;
      } else if (t - this.data[guess] > 3000) {
        left = guess;
      } else {
        right = guess;
      }
    }
    if (startIdx === undefined) {
      if (t - this.data[left] <= 3000) startIdx = left;
      else startIdx = right
    }
  }
  return this.data.length - startIdx;
};

/** 
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */