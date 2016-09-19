var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var showdown = require('showdown');
var gm = require('gray-matter');
var converter = new showdown.Converter();

var MarkdownPage = function(filePath) {
	var result = {};

	// Load the file contents.
	var raw = fs.readFileSync(filePath, 'utf-8');

	// Parse the front matter.
	var parsed = gm(raw);
	_.extend(result, parsed.data);

	// Parse the markdown.
	result.body = converter.makeHtml(parsed.content);

	return result;
};


module.exports = MarkdownPage;
