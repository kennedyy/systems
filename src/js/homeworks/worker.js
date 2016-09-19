function worker() {
	function sumNumbers(numbers) {
		var total = 0;
		var length = numbers.length;

		for (var i = 0; i < length; i++)
			total += +numbers[i];

		return total;
	}

	function getCurrentTime() {
		return Date.now();
	}

	// Calculate the sum of the chunk of numbers.
	this.onmessage = function (event) {
		var initialTime, endTime, total;

		initialTime = getCurrentTime();
		total = sumNumbers(event.data);
		endTime = getCurrentTime();

		postMessage({
			total: total,
			time: endTime - initialTime
		});
	}
}

module.exports = worker;
