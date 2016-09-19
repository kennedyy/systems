module.exports = function(doc) {
	var app = require('./app');

	app.on('doc-rendered', function(doc) {
		$('#content').html(doc.body);
	});

	function showDoc(id) {
		app.emit('doc-selected', id);
	};

	$(function() {
		showDoc(doc);

		$('.doc-link').on('click', function(event) {
			event.preventDefault();
			showDoc(this.id);
		});
	});
};
