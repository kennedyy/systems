var fs = require('fs');
var showdown = require('showdown');
var converter = new showdown.Converter();

var MarkdownPage = function(filePath) {
	var page = {};

	// Load the file contents.
	var text = fs.readFileSync(filePath, 'utf-8');

	// Parse the markdown.
	page.html = converter.makeHtml(text);

	return page;
};


module.exports = MarkdownPage;
