var Emitter = require('events').EventEmitter;
var util = require('util');
var path = require('path');
var fs = require('fs');
var View = require('./view');
var MarkdownPage = require('./markdown_page');

const docsDir = path.join(__dirname, '../../', 'docs');
const templatesDir = path.join(__dirname, '../', 'templates');

function loadDocs() {
	var result = [];
	var docsFiles = fs.readdirSync(docsDir);

	_.each(docsFiles, function(file) {
		var filePath = path.join(docsDir, file);
		var name = path.basename(file, '.md');
		var template = path.join(templatesDir, `${name}.html`);

		var page = new MarkdownPage(filePath);
		page.name = name;

		// Append the template to the html if it exists.
		if (fs.existsSync(template))
			page.html += fs.readFileSync(template, 'utf-8');

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
