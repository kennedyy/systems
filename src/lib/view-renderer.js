module.exports = function(view) {
	var app = require('./app');

	app.on('rendered', function(rendered) {
		$('#main').html(rendered);
	});

	function showContent(view) {
		app.emit('view-selected', view);
	};

	$(function() {
		showContent(view);

		$('.nav').on('click', function(event) {
			event.preventDefault();
			showContent(this.id)
		});
	});
};
