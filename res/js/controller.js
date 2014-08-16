define([
	'marionette',
	'./models/contacts',
	'./view/asideGroups',
	'./view/asideContacts'
],function(Marionette, modelContacts, viewAsideGroups, viewAsideContacts) {
	
	var appController = Marionette.Controller.extend({
		initialize: function(options) {
			this._collectionContacts = options.collectionContacts;
			this._collectionGroups = options.collectionGroups;
			this._router = options.router;
			
			this._mainRegion = options.mainRegion;
			this._asideContactsRegion = options.asideContactsRegion;
			this._asideGroupsRegion = options.asideGroupsRegion;

			this._collectionContacts.fetch({
				add: true,
				data: {type: 'getAll'}
			});

			this._collectionGroups.fetch({
				add: true,
				data: {type: 'getAllGroups'}
			});

			var	contactsView = new viewAsideContacts({collection: this._collectionContacts});
			var	groupsView = new viewAsideGroups({collection: this._collectionGroups});

			this._asideContactsRegion.show(contactsView);
			this._asideGroupsRegion.show(groupsView);

		},

		home: function() {
			var that = this;
			require(['../view/currentUser'], function(viewShowUser) {
				var showEmptyUser = new viewShowUser({
					model: new modelContacts
				});
				that._mainRegion.show(showEmptyUser);	
			});
		},

		showCurrentContact: function(id) {
			var user = this._collectionContacts.get(id)
				that = this;
			if(user){				
				require(['../view/currentUser'], function(viewShowUser) {
					var currentUserView = new viewShowUser({model: user});
					that._mainRegion.show(currentUserView);

					that.listenTo(currentUserView, 'remove:currentUser', function(){
						user.destroy({
							contentType: 'application/json',
							data: JSON.stringify({contactID: id}),
							wait: true,
							success: function(model, resp) {
								if(resp){
									that._router.navigate('',true);
								}
							}
						});
					});
				});
			}else{
				this._router.navigate('',true);
			}
		},

		newContact: function() {
			var that = this;

			require(['../view/addNewUser'], function(viewAddUser) {
				newUserView = new viewAddUser({
					model: new modelContacts,
					groupsCollection: that._collectionGroups
				});
				that._mainRegion.show(newUserView);

				that.listenTo(newUserView, 'submit:addNewUser', function(attrs, isNew){
					attrs.isNew = isNew;
					attrs.id = that._collectionContacts.isEmpty() ? 1 : (+ _.max(that._collectionContacts.pluck('id')) + 1);
					that._collectionContacts.create(attrs,{
					 	wait : true,
					 	success : function(model, resp, options){
							that._router.navigate('contact/'+attrs.id,true);
							$('.aside-contacts-link:last').addClass('active');
						},
						error : function(err) {
							console.log('error callback', err);
						}
					 });
				});	
			});
		},

		edditCurrentContact: function(id) {
			var that = this;

			require(['../view/addNewUser'], function(viewAddUser) {
				var editUser = that._collectionContacts.get(id);
				if(editUser){
					var editUserView = new viewAddUser({
						model: editUser,
						groupsCollection: that._collectionGroups
					});
					that._mainRegion.show(editUserView);

					editUserView.on('submit:addNewUser', function(attrs, isNew){
						attrs.id = id;
						attrs.isNew = isNew;
						that._collectionContacts.set(attrs, {remove: false});
						editUser.save();
						that._router.navigate('contact/'+attrs.id,true);
					});
				}
			});
		}

	});
	
	return appController;
});