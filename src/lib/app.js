var Emitter = require('events').EventEmitter;
var util = require('util');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var View = require('./view');
var MarkdownPage = require('./markdown_page');
var docsDir = path.join(__dirname, '../../', 'docs');

function loadDocs() {
	var result = [];
	var docsFiles = fs.readdirSync(docsDir);

	_.each(docsFiles, function(file) {
		var filePath = path.join(docsDir, file);
		var page = new MarkdownPage(filePath);

		page.id = path.basename(file, '.md');
		result.push(page);
	});

	return result;
};

var App = function() {
	this.docs = loadDocs();

	this.on('view-selected', function(viewName) {
		var view = new View(viewName);
		this.emit('rendered', view.toHtml());
	});

	this.on('doc-selected', function(id) {
		var doc = _.find(this.docs, function(doc) {
			return doc.id === id;
		});

		this.emit('doc-rendered', doc);
	});
};

util.inherits(App, Emitter);
module.exports = new App();
