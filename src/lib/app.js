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
		page.name = path.basename(file, '.md');

		result.push(page);
	});

	return result;
};

var App = function() {
	this.docs = loadDocs();

	this.on('view-selected', function(name) {
		var view = new View(name);
		this.emit('view-rendered', view.toHtml());
	});

	this.on('doc-selected', function(name) {
		var doc = _.find(this.docs, function(doc) {
			return doc.name === name;
		});

		this.emit('doc-rendered', doc.html);
	});
};

util.inherits(App, Emitter);
module.exports = new App();
