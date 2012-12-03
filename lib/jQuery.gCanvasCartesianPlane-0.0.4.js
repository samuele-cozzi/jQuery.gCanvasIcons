(function ($) {

    $.fn.gIconCartesianPlane = function (options) {

        options = $.extend({
			type: 'cartesian',
            lineWidthAxis: 3,				//int value
			lineColoraxis: '#ff0000',
			lineWidthPrimary: 2,			
			lineColorPrimary: '#c0c0c0',			
			lineWidthSecondary: 1,			
			lineColorSecondary: '#e3e3e3',
			stepPrimary: 100,
			stepSecondary: 10,
			legenda: true
        }, options);

        var methods = {
            drawXaxis: function() {
				var context = this.getContext('2d');
				
				context.lineWidth = options.lineWidthAxis;
				context.strokeStyle = options.lineColoraxis;
				
				methods.drawXline.apply(this, [0, context]);
			},
			
			drawYaxis: function() {
				var context = this.getContext('2d');
			
				context.lineWidth = options.lineWidthAxis;
				context.strokeStyle = options.lineColoraxis;
				
				methods.drawYline.apply(this, [0, context]);
			},
			
			drawXprimary: function( y ) {
				var context = this.getContext('2d');
				
				context.lineWidth = options.lineWidthPrimary;
				context.strokeStyle = options.lineColorPrimary;
				
				methods.drawXline.apply(this, [y, context]);
			},
			
			drawYprimary: function( x ) {
				var context = this.getContext('2d');
				
				context.lineWidth = options.lineWidthPrimary;
				context.strokeStyle = options.lineColorPrimary;
				
				methods.drawYline.apply(this, [x, context]);
			},
			
			drawXsecondary: function( y ) {
				var context = this.getContext('2d');
				
				context.lineWidth = options.lineWidthSecondary;
				context.strokeStyle = options.lineColorSecondary;
				
				methods.drawXline.apply(this, [y, context]);
			},
			
			drawYsecondary: function( x ) {
				var context = this.getContext('2d');
				
				context.lineWidth = options.lineWidthSecondary;
				context.strokeStyle = options.lineColorSecondary;
				
				methods.drawYline.apply(this, [x, context]);
			},
			
			drawXline: function ( y , context ) {
				context.beginPath();
				context.moveTo(-this.width, y);
				context.lineTo( this.width, y);
				context.stroke();
			},
			
			drawYline: function ( x , context ) {
				context.beginPath();
				context.moveTo( x, -this.height);
				context.lineTo( x, this.height);				
				context.stroke();
			},
			
			getMousePos: function( evt ) {
				var rect = this.getBoundingClientRect();
				return {
					x: evt.clientX - rect.left,
					y: evt.clientY - rect.top
				};
			},
			
			writeMessage: function (message) {
				var context = this.getContext('2d');
				context.save();
				context.translate(this.width / 2, this.height / 2);
				
				context.clearRect(-this.width/2, -this.height/2, this.width, 30);
				context.font = '18pt Calibri';
				context.fillStyle = options.lineColoraxis;
				context.fillText( message, -this.width/2, -this.height/2 + 20);
				
				context.restore();
			}
        };

        return this.each(function () {
			
			var context = this.getContext('2d');
			context.save();
			
			if (options.type == 'cartesian')
			{
				context.translate(this.width / 2, this.height / 2);
				context.scale( 1, -1);
			}
			
			if ( options.stepSecondary != 0) {
				for (var i=0 ; i < this.height; i += options.stepSecondary) {
					methods.drawXsecondary.apply(this, [i]);
				}
				for (var i=0 ; i > -this.height; i -= options.stepSecondary) {
					methods.drawXsecondary.apply(this, [i]);
				}
				
				for (var j=0 ; j < this.width; j+= options.stepSecondary) {
					methods.drawYsecondary.apply(this, [j]);
				}
				for (var j=0 ; j > -this.width; j-= options.stepSecondary) {
					methods.drawYsecondary.apply(this, [j]);
				}
			}
			
			if ( options.stepPrimary != 0) {
				for (var i=0 ; i < this.height; i += options.stepPrimary) {
					methods.drawXprimary.apply(this, [i]);
				}
				for (var i=0 ; i > -this.height; i -= options.stepPrimary) {
					methods.drawXprimary.apply(this, [i]);
				}
				
				for (var j=0 ; j < this.width; j+= options.stepPrimary) {
					methods.drawYprimary.apply(this, [j]);
				}
				for (var j=0 ; j > -this.width; j-= options.stepPrimary) {
					methods.drawYprimary.apply(this, [j]);
				}
			}
			
			methods.drawXaxis.apply(this);
			methods.drawYaxis.apply(this);
			
			context.restore();
			
			if (options.legenda) {
				this.addEventListener('mousemove', function(evt) {
					var mousePos = methods.getMousePos.apply(this, [evt]);
					if (options.type == 'cartesian')
					{
						mousePos.x -= this.width / 2;
						mousePos.y = -(mousePos.y - this.height / 2);
					}
					var message = 'x: ' + mousePos.x + ', y: ' + mousePos.y;
					methods.writeMessage.apply(this, [message]);
				}, false);
			}
        }); // end each

    };

})(jQuery);	