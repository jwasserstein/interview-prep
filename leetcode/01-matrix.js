/*
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

 

Example 1:


Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]
Example 2:


Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
 

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
mat[i][j] is either 0 or 1.
There is at least one 0 in mat.
*/

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
  const out = mat.map(row => row.map(() => Infinity));
  
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === 0) {
        out[i][j] = 0;
      } else {
        out[i][j] = Math.min(out[i][j-1] ?? Infinity, out[i-1]?.[j] ?? Infinity) + 1;
      }
    }
  }

  for (let i = mat.length-1; i >= 0; i--) {
    for (let j = mat[i].length-1; j >= 0; j--) {
      out[i][j] = Math.min(
        out[i][j],
        Math.min(out[i][j+1] ?? Infinity, out[i+1]?.[j] ?? Infinity) + 1
      );
    }
  }

  return out;
}

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
  const dist = mat.map(row => row.map(cell => Infinity));
  
  for (let i = 0; i < dist.length; i++) {
    for (let j = 0; j < dist[i].length; j++) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0;
      } else {
        let currDist = dist[i][j];
        if (i > 0) {
          currDist = Math.min(currDist, dist[i-1][j] + 1);
        }
        if (j > 0) {
          currDist = Math.min(currDist, dist[i][j-1] + 1);
        }
        dist[i][j] = currDist;
      }
    }
  }
  
  for (let i = dist.length-1; i >= 0; i--) {
    for (let j = dist[i].length-1; j >= 0; j--) {
      if (mat[i][j] === 0) {
        dist[i][j] = 0;
      } else {
        let currDist = dist[i][j];
        if (i < dist.length-1) {
          currDist = Math.min(currDist, dist[i+1][j] + 1);
        }
        if (j < dist[i].length-1) {
          currDist = Math.min(currDist, dist[i][j+1] + 1);
        }
        dist[i][j] = currDist;
      }
    }
  }

  return dist;
};

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
  const out = new Array(mat.length).fill(0).map(() => new Array(mat[0].length));

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === 0) {
        out[i][j] = 0;
      } else {
        const up = i > 0 ? out[i-1][j] + 1 : Infinity;
        const left = j > 0 ? out[i][j-1] + 1 : Infinity;
        out[i][j] = Math.min(up, left);
      }
    }
  }
  
  for (let i = mat.length-1; i >= 0; i--) {
    for (let j = mat[i].length-1; j >= 0; j--) {
      if (mat[i][j] === 0) {
        out[i][j] = 0;
      } else {
        const down = i < mat.length-1 ? out[i+1][j] + 1 : Infinity;
        const right = j < mat[i].length-1 ? out[i][j+1] + 1 : Infinity;
        out[i][j] = Math.min(down, right, out[i][j]);
      }
    }
  }
  
  return out;
};
