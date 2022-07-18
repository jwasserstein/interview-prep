/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  const islandSet = new Set();
  let counter = 0;
  
  function exploreIsland(i, j, grid, islandSet) {
    islandSet.add(`${i},${j}`);
    if (i + 1 < grid.length && !islandSet.has(`${i+1},${j}`) && grid[i+1][j] === '1') {
      exploreIsland(i+1, j, grid, islandSet);
    }
    if (i - 1 >= 0 && !islandSet.has(`${i-1},${j}`) && grid[i-1][j] === '1') {
      exploreIsland(i-1, j, grid, islandSet);
    }
    if (j + 1 < grid[i].length && !islandSet.has(`${i},${j+1}`) && grid[i][j+1] === '1') {
      exploreIsland(i, j+1, grid, islandSet);
    }
    if (j - 1 >= 0 && !islandSet.has(`${i},${j-1}`) && grid[i][j-1] === '1') {
      exploreIsland(i, j-1, grid, islandSet);
    }
  }
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1' && !islandSet.has(`${i},${j}`)) {
        counter++;
        exploreIsland(i, j, grid, islandSet);
      }
    }
  }
  
  return counter;
};

/**
 * @param {character[][]} grid
 * @return {number}
 */
 var numIslands = function(grid) {
  let counter = 0;
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        counter++;
        exploreIsland(i, j, grid);
      }
    }
  }
  
  return counter;
};

function exploreIsland(i, j, grid) {
  grid[i][j] = '0';
  if (i + 1 < grid.length && grid[i+1][j] === '1') {
    exploreIsland(i+1, j, grid);
  }
  if (i - 1 >= 0 && grid[i-1][j] === '1') {
    exploreIsland(i-1, j, grid);
  }
  if (j + 1 < grid[i].length && grid[i][j+1] === '1') {
    exploreIsland(i, j+1, grid);
  }
  if (j - 1 >= 0 && grid[i][j-1] === '1') {
    exploreIsland(i, j-1, grid);
  }
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let counter = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        counter++;
        explore(grid, i, j);
      }
    }
  }
  
  return counter;
};

function explore(grid, i, j) {
  grid[i][j] = '0';
  if (i > 0 && grid[i-1][j] === '1') explore(grid, i-1, j);
  if (i < grid.length-1 && grid[i+1][j] === '1') explore(grid, i+1, j);
  if (j > 0 && grid[i][j-1] === '1') explore(grid, i, j-1);
  if (j < grid[i].length-1 && grid[i][j+1] === '1') explore(grid, i, j+1);
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let islandCount = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        islandCount++;
        exploreIsland(i, j, grid);
      }
    }
  }
  return islandCount;
};

function exploreIsland(i, j, grid) {
  if (grid[i][j] !== '1') return;

  grid[i][j] = '0';
  
  if (i > 0)                exploreIsland(i-1, j, grid);
  if (i < grid.length-1)    exploreIsland(i+1, j, grid);
  if (j > 0)                exploreIsland(i, j-1, grid);
  if (j < grid[i].length-1) exploreIsland(i, j+1, grid);
}
