define([
	'marionette',
	'../view/asideGroupsOne'
],function(Marionette, itemOneView) {
	
	var viewAsideGroups = Marionette.CollectionView.extend({
		tagName: 'select',
		childView: itemOneView,

		initialize: function(options) {
			this.selectClass = options.selectClass || 'groupSelect';
			this.selectID = options.selectID || 'groups-list';
			
			this.$el.addClass(this.selectClass).attr('id',this.selectID);
		}
	});	

	return viewAsideGroups;
});