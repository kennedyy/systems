'use strict';

$(function() {
	const Peer = require('./lib/Peer');
	var client;
	var end;
	var initial;

	// TODO: Validate input fields.
	$(document).on('click', '#send-message', function(e) {
		e.preventDefault();

		// Create connection.
		if (_.isUndefined(client)) {
			var $ip = $('input[name="ip"]');
			var ip = $ip.val();

			if (!ip)
				return;

			$ip.prop('disabled', true);
			client = new Peer(ip);

			// Create the connection.
			client.createConnection();

			// Listen to messages from peer.
			client.listen(result);
		}

		initial = Date.now();

		// Send a message to peer.
		client.send({
			base: +$('input[name="base"]').val(),
			exponent: +$('input[name="exponent"]').val()
		});
	});

	// Do I have to parse the data?
	function result(data) {
		end = Date.now();

		var calculationTime = data.end - data.initial;
		var executionTime = end - initial;
		var latency = ((end - initial) - (data.end - data.initial)) / 2;

		var html = `<p>Result is: ${data}</p>\
					<p>Calculation time: ${calculationTime} ms.</p>\
					<p>Execution time: ${executionTime} ms.</p>\
					<p><strong>Latency:</strong> ${latency} ms.</p>`;

		$('#result').html(html);
	}
});
