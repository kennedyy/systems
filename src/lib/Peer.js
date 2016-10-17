'use strict';

module.exports = (function() {
	const P2P = require('socket.io-p2p');
	const io = require('socket.io-client');

	class Peer {
		constructor(ip) {
			this._ip = ip;
		}

		createConnection() {
			var socket = io(this._ip);

			this._client = new P2P(socket, {
				autoUpgrade: true
			});
			
			this._client.on('calculate', calculate);
		}

		listen(cb) {
			this._client.on('result', cb);
		}

		send(data) {
			this._client.emit('calculate', data);
		}
	}

	function calculate(data) {
		var initial = Date.now();
		var result = data.base;

		for (let i = 1; i < data.exponent; i++)
			result *= data.base;

		this.emit('result', {
			end: Date.now(),
			initial: inital,
			result: result
		});
	}

	return Peer;

}());
