/*
	Author: Andy Sun
	Date: December 5, 2023
	Util JavaScript script (others are libraries/tools)
*/
(function($) {

	/**
	 * Generate an indented list of links from a nav, used with panel()
	 * @return {jQuery} jQuery object
	 */
	$.fn.navList = function() {

		var	$this = $(this);
			$a = $this.find('a'),
			b = [];

		$a.each(function() {

			var	$this = $(this),
				indent = Math.max(0, $this.parents('li').length - 1),
				href = $this.attr('href'),
				target = $this.attr('target');

			b.push(
				'<a ' +
					'class="link depth-' + indent + '"' +
					( (typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
					( (typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
					'<span class="indent-' + indent + '"></span>' +
					$this.text() +
				'</a>'
			);

		});

		return b.join('');

	};

	/**
	 * Panel-ify an element
	 * @param {object} userConfig User config
	 * @return {jQuery} jQuery object
	 */
	$.fn.panel = function(userConfig) {

		// No elements
			if (this.length == 0)
				return $this;

		// Multiple elements
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).panel(userConfig);

				return $this;

			}

		// Vars
			var	$this = $(this),
				$body = $('body'),
				$window = $(window),
				id = $this.attr('id'),
				config;

		// Config
			config = $.extend({

					delay: 0,

					hideOnClick: false,

					hideOnEscape: false,

					hideOnSwipe: false,

					resetScroll: false,

					resetForms: false,

					side: null,

					target: $this,

					visibleClass: 'visible'

			}, userConfig);

			// Expand "target" if it's not a jQuery object already.
				if (typeof config.target != 'jQuery')
					config.target = $(config.target);

		// Panel
			// Methods
				$this._hide = function(event) {

					// Already hidden
						if (!config.target.hasClass(config.visibleClass))
							return;

					// If an event was provided, cancel it
						if (event) {

							event.preventDefault();
							event.stopPropagation();

						}

					// Hide
						config.target.removeClass(config.visibleClass);

					// Post-hide
						window.setTimeout(function() {
								if (config.resetScroll)
									$this.scrollTop(0);

								if (config.resetForms)
									$this.find('form').each(function() {
										this.reset();
									});

						}, config.delay);

				};

			// Vendor fixes
				$this
					.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
					.css('-webkit-overflow-scrolling', 'touch');

			

		return $this;

	};

	

})(jQuery);