'use strict';

var fs = require('fs');
var generateNumbers = require('../lib/generateNumbers');

(function() {
	const fileName = 'numbers.txt';

	function main() {
		console.log('\nSequential');

		let initialTime, endTime, numbers, total;

		//generateNumbers(25000000);
		numbers = readFile(fileName);

		initialTime = getCurrentTime();
		total = sumNumbers(numbers);
		endTime = getCurrentTime();

		printSum(total, numbers.length);
		printCalculationTime(endTime - initialTime);
	}

	// Reads a file and parse it into an array.
	function readFile(fileName) {
		return fs.readFileSync(fileName).toString().split(',');
	}

	// Returns current time in milliseconds.
	function getCurrentTime() {
		return Date.now();
	}

	// Returns the sum of the given array of integers.
	function sumNumbers(numbers) {
		let total = 0;
		let length = numbers.length;

		for (let i = 0; i < length; i++)
			total += +numbers[i];

		return total;
	}

	function printSum(total, length) {
		console.log('The sum of the ' + length + ' numbers is: ' + total);
	}

	function printCalculationTime(time) {
		console.log('Total calculation time: ' + time + ' ms.');
	}

	main();
})();
