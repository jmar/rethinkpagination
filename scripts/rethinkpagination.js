/*
 *  Project: rethinkpagination
 *  Description:Scrollable Pagination with previews of the of the page you would like to visit.
 *  Author: Jens Martsch
 *  License: MIT http://opensource.org/licenses/mit-license.php
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, undefined) {
    'use strict';
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    
    // Create the defaults once
    var pluginName = 'rethinkpagination',
        // document = window.document,

        defaults = {
            animation: 'flipX',
            selector: 'h2',
            content: '#content', // not used yet, for future use
            insertTo: '#content', // not used yet, for future use
            timeout: 250
        };

    // The actual plugin constructor

    function Plugin(element, options) {
        this.element = element;
        
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
        this.init();

    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance,
        // e.g., this.element and this.options
        var $plugin = this;
        var upContainerWidth = 0;
       

        this.links = [];
        this.rethinkTimeout = null;
        $(this.element)
            .wrap('<div class="rethinkcontainer">')
            .find('a')
            .each(function (index, element) {
                upContainerWidth += $(element).outerWidth();
                $plugin.links.push(element);
            })
            .end()
            .width(upContainerWidth);
        this.eventHandler();
    };

    Plugin.prototype.eventHandler = function () {
        var $plugin = this;
        var $tooltipText;
        var $tooltip = $('<div />');
        $(this.links).each(function (index, element) {
            // here we could use jQuery.hoverIntent to suggest if the user wants to see the TOC
            $(element).hover(function () {
                    // here we could use the standard $self.options.selector or a data-selector="h2" to let the user choose
                    // for each link seperatly
                    clearTimeout($plugin.timeout);
                    $tooltipText = '';
                    var rethinkTimeout = setTimeout(function () {
                        $.ajax({
                            url: element.href,
                            dataType: 'text',
                            success: function (response) {
                                var $tooltipText = '';
                                // Don´t load images in AJAX result to save bandwith and we only need the text
                                response = response.replace(/<img\b[^>]*>/ig, '');

                                //store in temporary element to modify contents
                                var $holder = $('<div/>').html($(response));
                                $holder.find($plugin.options.selector).each(function () {
                                    $tooltipText += $(this).text() + '<br />';
                                });
                                // $holder.remove();
                                if ($tooltipText !== ''){
                                    $tooltip.html($tooltipText);
                                    // console.log($tooltip.html())
                                    $tooltip.appendTo(document.body);

                                    var $el = $(element);

                                    var place = 'top';
                                    var style = 'light';

                                    $tooltip.attr('class', 'ui-tooltip ' + place + ' ' + style);
                                    var tWidth = $tooltip.outerWidth();
                                    var tHeight = $tooltip.outerHeight();
                                    var pos = $el.offset();
                                    var elWidth = $el.outerWidth();
                                    var elHeight = $el.outerHeight();

                                    switch (place) {
                                    case 'top':
                                        $tooltip.css({
                                            top: pos.top - tHeight,
                                            left: pos.left + Math.round(elWidth / 2) - Math.round(tWidth / 2)
                                        });
                                        break;
                                    case 'left':
                                        $tooltip.css({
                                            top: pos.top + Math.round(elHeight / 2) - Math.round(tHeight / 2),
                                            left: pos.left - tWidth
                                        });
                                        break;
                                    case 'right':
                                        $tooltip.css({
                                            top: pos.top + Math.round(elHeight / 2) - Math.round(tHeight / 2),
                                            left: pos.left + elWidth
                                        });
                                        break;
                                    case 'bottom':
                                        $tooltip.css({
                                            top: pos.top + elHeight,
                                            left: pos.left + Math.round(elWidth / 2) - Math.round(tWidth / 2)
                                        });
                                        break;
                                    }

                                    if ($plugin.options.animation !== '') {
                                        $tooltip.addClass('animated ' + $plugin.options.animation);
                                    }
                                }
                            }
                        }); // End ajax

                    }, $plugin.options.timeout);
                    $plugin.timeout = rethinkTimeout;
                }, // End mouseenter function

                function () {
                    // now after a timeout remove the tooltip
                    clearTimeout($plugin.timeout);
                    $tooltip.remove();
                }
            ); // End hover event
        }); // End each loop
    };

    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function (options) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });

            // If the first parameter is a string and it doesn't start
            // with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                    $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window));