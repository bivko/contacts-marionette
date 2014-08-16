define([
	'marionette',
	'text!../../../templates/currentUser.tpl'
],function(Marionette, templateCurrentUser) {
	var viewCurrentUser = Marionette.ItemView.extend({
		template: _.template(templateCurrentUser),

		events: {
			'click #edit': 'goToEditUser',
			'click #remove': 'removeCurrentUser'
		},

		goToEditUser: function() {
			window.location.hash = 'contact/eddit/'+$('#edit').data('id');
		},

		removeCurrentUser: function() {
			this.trigger('remove:currentUser');
		}
	});

	return viewCurrentUser;
});