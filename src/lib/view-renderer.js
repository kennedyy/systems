module.exports = function(view) {
	var app = require('./app');

	app.on('view-rendered', function(html) {
		$('#main').html(html);
	});

	function showView(name) {
		app.emit('view-selected', name);
	};

	$(function() {
		showView(view);

		$('.nav').on('click', function(event) {
			event.preventDefault();

			var name = $(this).data('view');
			showView(name);
		});
	});
};
