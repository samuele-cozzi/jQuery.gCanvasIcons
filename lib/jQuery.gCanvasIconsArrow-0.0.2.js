(function ($) {

    $.fn.gIconArrow = function (options) {

        options = $.extend({
            lineWidth: 10,				//int value
			lineColor: 'black',
			arrowRotation: 0,			//int value from 0 to 2 PI
			percDimension: .75,			//int value from 0 to 1
        }, options);

        var counterContainer = 0, 
        methods = {
			drawArrow: function() {
				
				var radius = $(this).data('radius') - options.lineWidth;
				var context = this.getContext('2d');
				context.save();
				
				context.lineWidth = options.lineWidth;
				context.strokeStyle = options.lineColor;
				
				var xa = radius * options.percDimension;
				var xb = Math.cos(4 / 3 * Math.PI) * radius * options.percDimension;
				var ya = Math.sin(2 / 3 * Math.PI) * radius * options.percDimension;
				
				context.rotate(options.arrowRotation);
				
				context.beginPath();
				context.moveTo(xa, 0);
				context.lineTo(xb,ya);
				context.lineTo(xb, -ya);
				context.closePath();
				context.lineJoin = 'round';
				context.fill();
				
				context.stroke();
				
				context.restore();
			}
        };

        return this.each(function () {
			
			var radius = this.width / 2;
			$(this).attr('data-radius', radius);
			
			var context = this.getContext('2d');
			context.save();
			context.translate(this.width / 2, this.height / 2);
			context.scale( 1, - this.height / this.width);
			
			methods.drawArrow.apply(this);
			
			context.restore();
			
        }); 

    };

})(jQuery);