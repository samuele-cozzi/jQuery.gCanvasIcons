(function ($) {

    $.fn.gCanvas = function (options) {

        options = $.extend({
            width: 600,				//int value
			height: 200
        }, options);

        return this.each(function () {
			
			$('<canvas>')
				.attr('width', options.width)
				.attr('height', options.height)
				.appendTo(this);
				
        }); // end each

    };

})(jQuery);
