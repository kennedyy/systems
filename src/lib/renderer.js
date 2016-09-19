module.exports = function(doc) {
	var app = require('./app');

	function showDoc(id) {
		app.emit('doc-selected', id);
	};

	app.on('doc-rendered', function(doc) {
		$('#content').html(doc.body);
	});

	$(function() {
		showDoc(doc);

		$('.stuff-link').on('click', function(event) {
			event.preventDefault();
			showDoc(this.id);
		});
	});
};
