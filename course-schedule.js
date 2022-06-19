/*

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.

*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let prereq = prerequisites;
  let prereq2 = [];
  
  while (prereq.length > 0) {
    const set = new Set(prereq.map(prereq => prereq[0]));
    for (let i = 0; i < prereq.length; i++) {
      if (set.has(prereq[i][1])) {
        prereq2.push(prereq[i]);
      }
    }

    if (prereq.length === prereq2.length) {
      return false;
    }
    prereq = prereq2;
    prereq2 = [];
  }
  
  return true;
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  const courseMap = new Map();
  prerequisites.forEach(prereq => {
    if (!courseMap.has(prereq[0])) {
      courseMap.set(prereq[0], []);
    }
    courseMap.get(prereq[0]).push(prereq[1]);
  });
  
  const set = new Set();
  function dfs(num) {
    if (set.has(num)) return false;
    set.add(num);
    const dependencies = courseMap.get(num) || [];
    for (let i = 0; i < dependencies.length; i++) {
      if (!dfs(dependencies[i])) return false;
    }
    set.delete(num);
    courseMap.delete(num);
    return true;
  }
  
  for (const [course] of courseMap) {
    if (!dfs(course)) return false;
  }
  
  return true;
};
