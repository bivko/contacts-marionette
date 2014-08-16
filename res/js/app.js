define([
	'backbone',
	'marionette',

	'./collection/contacts',
	'./collection/groups',

	'./router',
	'./controller',
	'./search'

],function(Backbone, Marionette, collectionContacts, collectionGroups, appRouter, appController) {
	var ContactManager = new Marionette.Application();

	ContactManager.addRegions({
		mainRegion: '.main-container',
		asideContactsRegion: '.aside-contacts-list',
		asideGroupsRegion: '.aside-filters'
	});

	ContactManager.addInitializer(function() {
		var contactsList = new collectionContacts(),
			groupsList = new collectionGroups();

		var router = new appRouter(),
			controller = new appController({
				collectionContacts: contactsList,
				collectionGroups: groupsList,
				router: router,
				mainRegion: this.mainRegion,
				asideContactsRegion: this.asideContactsRegion,
				asideGroupsRegion: this.asideGroupsRegion
			});

		router.processAppRoutes(controller, {
			'': 'home',
			'contact/new': 'newContact',
			'contact/eddit/:id': 'edditCurrentContact',
			'contact/:id': 'showCurrentContact'
		});
	});

	ContactManager.on('start', function(options){
		if (Backbone.history){
			Backbone.history.start();
		}
	});

	return ContactManager;
});