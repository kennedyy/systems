'use strict';

var fs = require('fs');

module.exports = (function() {
	const fileName = 'numbers.txt';

	function generate(n) {
		let numbers;
		let quantity = (process.argv.length > 2) ? parseInt(process.argv[2]) : (n || 90000);

		numbers = generateNumbers(quantity);
		writeFile(fileName, numbers);

        console.log('Wrote ' + numbers.length + ' integers to ' + fileName);
	}

    // Returns an array of given lenth full of 6 digits integers.
	function generateNumbers(quantity) {
		let numbers = [];

		for (let i = 0; i < quantity; i++)
			numbers.push(getRandomIntInclusive(100000, 999999));

        return numbers;
	}

    // Write array of numbers to file.
    function writeFile(fileName, numbers) {
        fs.writeFileSync(fileName, numbers);
    }

    // Returns a random integer between the given range.
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return generate;
})();
