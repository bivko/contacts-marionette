define([
	'marionette'
],function(Marionette) {
	
	var viewAsideGroupsOne = Marionette.ItemView.extend({
		tagName: 'option',
		template: _.template('<%- name %>')
	});

	return viewAsideGroupsOne;
});