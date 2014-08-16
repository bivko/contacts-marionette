// Backbone.Wreqr (Backbone.Marionette)
// ----------------------------------
// v1.3.1
//
// Copyright (c)2014 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.wreqr


(function(e,n){if("function"==typeof define&&define.amd)define(["backbone","underscore"],function(e,t){return n(e,t)});else if("undefined"!=typeof exports){var t=require("backbone"),r=require("underscore");module.exports=n(t,r)}else n(e.Backbone,e._)})(this,function(e,n){"use strict";var t=e.Wreqr,r=e.Wreqr={};return e.Wreqr.VERSION="1.3.1",e.Wreqr.noConflict=function(){return e.Wreqr=t,this},r.Handlers=function(e,n){var t=function(e){this.options=e,this._wreqrHandlers={},n.isFunction(this.initialize)&&this.initialize(e)};return t.extend=e.Model.extend,n.extend(t.prototype,e.Events,{setHandlers:function(e){n.each(e,function(e,t){var r=null;n.isObject(e)&&!n.isFunction(e)&&(r=e.context,e=e.callback),this.setHandler(t,e,r)},this)},setHandler:function(e,n,t){var r={callback:n,context:t};this._wreqrHandlers[e]=r,this.trigger("handler:add",e,n,t)},hasHandler:function(e){return!!this._wreqrHandlers[e]},getHandler:function(e){var n=this._wreqrHandlers[e];if(n)return function(){var e=Array.prototype.slice.apply(arguments);return n.callback.apply(n.context,e)}},removeHandler:function(e){delete this._wreqrHandlers[e]},removeAllHandlers:function(){this._wreqrHandlers={}}}),t}(e,n),r.CommandStorage=function(){var t=function(e){this.options=e,this._commands={},n.isFunction(this.initialize)&&this.initialize(e)};return n.extend(t.prototype,e.Events,{getCommands:function(e){var n=this._commands[e];return n||(n={command:e,instances:[]},this._commands[e]=n),n},addCommand:function(e,n){var t=this.getCommands(e);t.instances.push(n)},clearCommands:function(e){var n=this.getCommands(e);n.instances=[]}}),t}(),r.Commands=function(e){return e.Handlers.extend({storageType:e.CommandStorage,constructor:function(n){this.options=n||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this);var t=Array.prototype.slice.call(arguments);e.Handlers.prototype.constructor.apply(this,t)},execute:function(e,n){e=arguments[0],n=Array.prototype.slice.call(arguments,1),this.hasHandler(e)?this.getHandler(e).apply(this,n):this.storage.addCommand(e,n)},_executeCommands:function(e,t,r){var s=this.storage.getCommands(e);n.each(s.instances,function(e){t.apply(r,e)}),this.storage.clearCommands(e)},_initializeStorage:function(e){var t,r=e.storageType||this.storageType;t=n.isFunction(r)?new r:r,this.storage=t}})}(r),r.RequestResponse=function(e){return e.Handlers.extend({request:function(){var e=arguments[0],n=Array.prototype.slice.call(arguments,1);return this.hasHandler(e)?this.getHandler(e).apply(this,n):void 0}})}(r),r.EventAggregator=function(e,n){var t=function(){};return t.extend=e.Model.extend,n.extend(t.prototype,e.Events),t}(e,n),r.Channel=function(){var t=function(n){this.vent=new e.Wreqr.EventAggregator,this.reqres=new e.Wreqr.RequestResponse,this.commands=new e.Wreqr.Commands,this.channelName=n};return n.extend(t.prototype,{reset:function(){return this.vent.off(),this.vent.stopListening(),this.reqres.removeAllHandlers(),this.commands.removeAllHandlers(),this},connectEvents:function(e,n){return this._connect("vent",e,n),this},connectCommands:function(e,n){return this._connect("commands",e,n),this},connectRequests:function(e,n){return this._connect("reqres",e,n),this},_connect:function(e,t,r){if(t){r=r||this;var s="vent"===e?"on":"setHandler";n.each(t,function(t,i){this[e][s](i,n.bind(t,r))},this)}}}),t}(r),r.radio=function(e){var t=function(){this._channels={},this.vent={},this.commands={},this.reqres={},this._proxyMethods()};n.extend(t.prototype,{channel:function(e){if(!e)throw Error("Channel must receive a name");return this._getChannel(e)},_getChannel:function(n){var t=this._channels[n];return t||(t=new e.Channel(n),this._channels[n]=t),t},_proxyMethods:function(){n.each(["vent","commands","reqres"],function(e){n.each(r[e],function(n){this[e][n]=s(this,e,n)},this)},this)}});var r={vent:["on","off","trigger","once","stopListening","listenTo","listenToOnce"],commands:["execute","setHandler","setHandlers","removeHandler","removeAllHandlers"],reqres:["request","setHandler","setHandlers","removeHandler","removeAllHandlers"]},s=function(e,n,t){return function(r){var s=e._getChannel(r)[n],i=Array.prototype.slice.call(arguments,1);return s[t].apply(s,i)}};return new t}(r),e.Wreqr});
//@ sourceMappingURL=backbone.wreqr.map