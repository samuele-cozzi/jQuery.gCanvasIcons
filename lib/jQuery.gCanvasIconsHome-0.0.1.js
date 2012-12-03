(function ($) {

    $.fn.gIconHome = function (options) {

        options = $.extend({
            lineWidth: 10,				//int value
			lineColor: 'black',
			percDimension: .8			//int value from 0 to 1
        }, options);

        var methods = {
			drawHome: function() {
				
				var dim = this.width / 2;
				var context = this.getContext('2d');
				context.save();
				
				context.lineWidth = options.lineWidth;
				context.strokeStyle = options.lineColor;
				
				var fi =(1 + Math.sqrt(5)) / 2;
				var fi2 = dim * 1 / Math.pow( fi, 2 );
				var fi3 = dim / 2 * 1 / Math.pow( fi, 3 );
				
				var xa = dim / 2;
				var xfi = dim * fi / 2;
				var ya = dim;
				var yfi = dim * fi;
				
				context.scale(options.percDimension, options.percDimension);
				context.rotate(Math.PI);
				context.translate(0, - this.width / 2.6);
				
				
				context.beginPath();
				context.moveTo(-fi3 -options.lineWidth / 2, fi2 + options.lineWidth / 2);
				context.lineTo(-fi3 -options.lineWidth / 2,0);
				context.lineTo(-xa,0);
				context.lineTo(-xa, ya);
				
				context.lineTo(-xfi, ya);
				context.lineTo(0, yfi);
				context.lineTo(xfi, ya);
				
				context.lineTo(xa, ya);
				context.lineTo(xa, 0);
				context.lineTo(fi3 +options.lineWidth / 2,0);
				context.lineTo(fi3 +options.lineWidth / 2,fi2 + options.lineWidth / 2);
				context.closePath();
				
				context.lineJoin = 'round';
				context.fill();
				context.stroke();
				
				context.restore();
				//context.translate(0, this.width / 2.6);
				//
				//context.scale(1 / options.percDimension, 1 / options.percDimension);
				
			}

        };

        return this.each(function () {
			
			$(this).addClass('gIcon');
			
			var radius = this.width / 2;
			$(this).attr('data-radius', radius);
			
			var context = this.getContext('2d');
			context.save();
			
			context.translate(this.width / 2, this.height / 2);
			
			methods.drawHome.apply(this);
			
			context.restore();
			//context.translate(-this.width / 2, -this.height / 2);
			
        }); // end each

    };

})(jQuery);
