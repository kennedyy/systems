module.exports = function(doc) {
	var app = require('./app');

	app.on('doc-rendered', function(html) {
		$('#content').html(html);
	});

	function showDoc(name) {
		app.emit('doc-selected', name);
	};

	$(function() {
		showDoc(doc);

		$('.doc-link').on('click', function(event) {
			event.preventDefault();

			var name = $(this).data('doc');
			showDoc(name);
		});
	});
};
