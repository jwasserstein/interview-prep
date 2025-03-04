// value - number of cents that needs to be represented
// return - minimum number of coins to represent that value
function minimizeCoin(value) {
	if (typeof value !== "number" || value < 0) {
    return -1;
  }

	const memo = {};
  return memoizedMinimizeCoin(value, memo);
}

function memoizedMinimizeCoin(value, memo) {
	if (value === 0) {
    return 0;
  }

  if (value in memo) {
    return memo[value];
  }

	let minCoins = Infinity;
	if (value >= 25) { // quarter
		minCoins = Math.min(minCoins, memoizedMinimizeCoin(value - 25, memo));
	}
	if (value >= 10) { // dime
		minCoins = Math.min(minCoins, memoizedMinimizeCoin(value - 10, memo));
	}
	if (value >= 5) { // nickel
		minCoins = Math.min(minCoins, memoizedMinimizeCoin(value - 5, memo));
	}
	if (value >= 1) { // penny
		minCoins = Math.min(minCoins, memoizedMinimizeCoin(value - 1, memo));
	}
	memo[value] =  minCoins + 1;
	return memo[value];
}

console.log(minimizeCoin(100));