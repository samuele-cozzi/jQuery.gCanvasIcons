(function ($) {

    $.fn.gIconSearch = function (options) {

        options = $.extend({
            lineWidth: 10,				//int value
			lineColor: 'black',
			arrowRotation: -1 / 4 * Math.PI,			//int value from 0 to 2 PI
			percDimension: .75,			//int value from 0 to 1
        }, options);

        var counterContainer = 0, 
        methods = {
			drawArrow: function() {
				
				var radius = $(this).data('radius') - options.lineWidth;
				var context = this.getContext('2d');
				context.save();
				
				context.lineWidth = options.lineWidth * 1 / options.percDimension;
				context.strokeStyle = options.lineColor;
				
				
				context.scale( options.percDimension, options.percDimension);
				context.rotate(options.arrowRotation);
				context.translate(0, radius * 1 / 3);
				
				context.beginPath();
				context.arc(0, 0, radius * 2 / 3 - options.lineWidth / 2, 0, 2 * Math.PI, false);
				context.stroke();
				
				context.translate(0, -radius * 1 / 3);
				
				context.beginPath();
				context.moveTo(options.lineWidth * 2/3, -radius * 1 / 3 + options.lineWidth / 2);
				context.lineTo(options.lineWidth * 2/3, -radius - options.lineWidth / 2);
				context.lineTo(-options.lineWidth * 2/3, -radius - options.lineWidth / 2);
				context.lineTo(-options.lineWidth * 2/3, -radius * 1 / 3 + options.lineWidth / 2);
				//context.lineTo(xb, -ya);
				context.closePath();
				context.lineJoin = 'round';
				context.fill();
				
				context.stroke();
				
				context.restore();
				//context.rotate(-options.arrowRotation);
				//context.scale( 1 / options.percDimension, 1 / options.percDimension);
			}

        };

        return this.each(function () {
			
			var radius = this.width / 2;
			$(this).attr('data-radius', radius);
			
			var context = this.getContext('2d');
			context.save();
			
			//set the environment context
			context.translate(this.width / 2, this.height / 2);
			context.scale( 1, - this.height / this.width);
			
			methods.drawArrow.apply(this);
			
			context.restore();
			//context.scale( 1, this.height / this.width);
			//context.translate(-this.width / 2, -this.height / 2);
			
			
        }); // end each

    };

})(jQuery);