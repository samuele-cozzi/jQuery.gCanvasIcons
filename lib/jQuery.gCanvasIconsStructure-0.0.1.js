(function ($) {

    $.fn.gIconStructure = function (options) {

        options = $.extend({
            lineWidth: 2,				//int value
			lineColor: 'red',
			type: '',
			objectRotation: 0,			//int value from 0 to 2 PI
			percDimension: .75			//int value from 0 to 1
        }, options);

        var counterContainer = 0, 
        methods = {
			drawArrow: function() {
				
				var radius = $(this).data('radius') - options.lineWidth;
				var context = this.getContext('2d');
				context.save();
				context.lineWidth = options.lineWidth;
				context.strokeStyle = options.lineColor;
				
				var xa = radius;
				var xb = Math.cos(4 / 3 * Math.PI) * radius;
				var ya = Math.sin(2 / 3 * Math.PI) * radius;
				
				context.rotate(options.arrowRotation);
				
				context.beginPath();
				context.moveTo(0, 0);
				context.lineTo(xa, 0);
				context.stroke();
				
				context.moveTo(0, 0);
				context.lineTo(xb, ya);
				context.stroke();
				
				context.moveTo(0, 0);
				context.lineTo(xb, -ya);
				context.stroke();
				
				context.restore();
				
						
				
				
			},
			writeAngles: function() {
				
				var radius = $(this).data('radius') - options.lineWidth;
				var context = this.getContext('2d');
				context.save();
			
				context.translate(this.width / 2, this.height / 2);
				var message = '120°';
				context.font = '18pt Calibri';
				context.fillStyle = options.lineColor;
				context.fillText( message, 3, 25);
				context.fillText( message, 3, -10);
				context.fillText( message, -60, 7);
				
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
			
			if (options.type == 'arrow')
			{
				methods.drawArrow.apply(this);
			}
			
			context.restore();
			
			if (options.type == 'arrow')
			{
				methods.writeAngles.apply(this);
			}
        }); 

    };

})(jQuery);