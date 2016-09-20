var fs = require('fs');
var path = require('path');
var jade = require('jade');

var View = function(name) {

	// The files should be in the root of the app.
	var templatePath = path.join(__dirname, '../views', name + '.jade');
	var source = fs.readFileSync(templatePath, 'utf-8');
	var template = jade.compile(source);

	this.toHtml = function(data) {
		return template(data);
	};
};

module.exports = View;
