requirejs.config({
	'urlArgs': "bust=" + (new Date()).getTime(),
	'baseUrl': 'res/js/libraries',
	'path': {
		'backbone': 'backbone',
		'marionette': 'marionette'
	},
	'waitSeconds': 200
});

require(['../app'], function(app) {
	app.start();
});