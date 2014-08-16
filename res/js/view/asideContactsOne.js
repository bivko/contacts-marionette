define([
	'marionette',
	'text!../../../templates/asideContactsOne.tpl'
],function(Marionette, templateAsideContactsOne) {
	
	var viewAsideContactsOne = Marionette.ItemView.extend({
		tagName: 'li',
		className: 'item',
		template: _.template(templateAsideContactsOne),


		initialize: function() {
//			this.listenTo(this.model, "remove", this.remove);
		},

		events: {
			'click .aside-contacts-link': 'onOpenUser'
		},

		onOpenUser: function(e){
			var elem = $(this.el).find('.aside-contacts-link');

			if(!elem.hasClass('active')){
				$('.aside-contacts-link.active').removeClass('active');
				elem.addClass('active');
			}
		}
	});
	return viewAsideContactsOne;
});