define([
	'marionette',
	'../view/asideContactsOne',
	'text!../../../templates/asideContacts.tpl'
],function(Marionette, itemOneView, templateAsideContacts) {
	var viewAsideContacts = Marionette.CompositeView.extend({
		template: _.template(templateAsideContacts),
		childView: itemOneView,
		childViewContainer: '.addressList',

		events: {
			'click #new': 'openNewUser'
		},

		initialize: function() {
			this.collection.on('change', this.render, this);
		},

		openNewUser: function(){
			$('.aside-contacts-link.active').removeClass('active');
			window.location.hash = 'contact/new';
		}
	});	

	return viewAsideContacts;
});

	