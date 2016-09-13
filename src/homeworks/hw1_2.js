'use strict';

var fs = require('fs');
var path = require('path');

var Threads = require('../lib/node_modules/webworker-threads');

var generateNumbers = require('../lib/generateNumbers');
var worker = require('./worker.js');

(function() {
	let data = [];
	const fileName = 'numbers.txt';
	let numbersLength = 0;
	let threads = [];
	let threadsQuantity = (process.argv.length > 2) ? parseInt(process.argv[2]) : 3;

	function main() {
		console.log('Parallel');
		console.log(`Using ${threadsQuantity} theads.`);

		//generateNumbers(25000000);
		createThreads(threadsQuantity);
		startThreads();

		spinForever();
	}

	function createThreads(threadsQuantity) {
		for (let i = 0; i < threadsQuantity; i++) {
			threads.push(new Threads.Worker(worker));

			// Use data returned by thread and kill it.
			threads[i].onmessage = function(event) {
				//console.log('Thread #' + this.thread.id + ' calculated the sum in ' + event.data.time + ' ms.');
				data.push(event.data);
				this.terminate();
			};
		}
	}

	function readFile(fileName) {
		return fs.readFileSync(fileName).toString().split(',');
	}

	function startThreads() {
		let numbers = readFile(fileName);
		numbersLength = numbers.length;
		let length = threads.length;

		for (let i = 0; i < length; i++) {
			let chunk;

			if (i === length - 1)
				chunk = numbers.splice(0, numbers.length);
			else
				chunk = numbers.splice(0, Math.round(length / length));

			// Send the chunk to thread to calculate.
			threads[i].postMessage(chunk);
		}
	}

	// FIXME: Sometimes does not call printSum.
	function spinForever() {
		let length = data.length;

		if (length === threadsQuantity) {
			return printSum();
		}

		setImmediate(spinForever);
	}

	function printSum() {
		let total = 0;

		for (let i = 0; i < threadsQuantity; i++)
			total += data[i].total;

		console.log('The sum of the ' + numbersLength + ' numbers is: ' + total);
		return printCalculationTime();
	}

	function printCalculationTime() {
		let time = 0;

		for (let i = 0; i < threadsQuantity; i++)
			time += data[i].time;

		console.log('Total calculation time: ' + time + ' ms.');

		return time;
	}

	main();
})();
