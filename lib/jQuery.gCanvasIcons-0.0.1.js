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
				var message = '120�';
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

(function ($) {

    $.fn.gIconAnimateCircle = function (options) {

        options = $.extend({
            lineWidth: 10,				//int value
			line1Color: 'black',
			line2Color: '#d0d0d0',
			duration: 600,
			rotation: -Math.PI /2,
			clockwise: true
        }, options);

        var methods = {
            
			drawCircleContainer: function( step, linecolor ) {
					
				var radius = $(this).data('radius') - options.lineWidth / 2;
				var context = this.getContext('2d');
				context.save();
				
				context.translate(this.width / 2, this.height / 2);
				context.scale( 1, - this.height / this.width);
				
				context.lineWidth = options.lineWidth;
				context.strokeStyle = linecolor;
				
				context.rotate( options.rotation);
				if(!options.clockwise) {
					context.scale(1, -1);
				}
				
				context.beginPath();
				context.scale(-1,1);
				context.arc(0, 0, radius, 0, step, false);
				context.scale(-1,1);
				context.stroke();
				
				if(!options.clockwise) {
					context.scale(1, -1);
				}
				
				context.restore();
			
			},
			
			rotationStep: function( angle ) {
				
				var radius = $(this).data('radius') - options.lineWidth / 2;
				var context = this.getContext('2d');
				
				context.save();
				
				context.translate(this.width / 2, this.height / 2);
				
				context.clearRect(-this.width/2, -this.height/2, this.width, this.height);
				context.rotate( $(this).data('angle') + angle );
				context.drawImage($('img', this)[0], -this.width/2, -this.height/2 );
				
				context.restore();
			},
			
			animateCircleContainer1: function() {
				
				$(this).stop();
				$(this).addClass('running-animation');
				$(this).animate({ top: 2 * Math.PI},{ 
					duration: options.duration, 
					queue: false,
					step: function(step) {
						methods.drawCircleContainer.apply(this, [step, options.line1Color]);
					},
					complete: function() {
						//methods.drawFullCircleContainer.apply(this, [options.linecolor]);
						$(this).removeClass('running-animation');
						if ( $(this).hasClass('myhover') ) {
							methods.animateCircleContainer2.apply(this);
						}
						
						if ( $('img', this).length == 0 )
						{
							$('<img src="'+ this.toDataURL() +'"/>').appendTo(this);
						}
					}
				});
			},
			
			animateCircleContainer2: function() {
				
				$(this).stop();
				$(this).addClass('running-animation');
				$(this).animate({ top: 2 * Math.PI},{ 
					duration: options.duration, 
					queue: false,
					step: function(step) {
						methods.drawCircleContainer.apply(this, [step, options.line2Color]);
					},
					complete: function() {
						$(this).removeClass('running-animation');
						methods.animateCircleContainer1.apply(this);
					}
				});
			}, 
			
			rotateIcon: function( angle ) {
				if ( $(this).data('angle') === undefined ) { $(this).attr('data-angle', 0); }
				
				$(this).stop();
				$(this).addClass('running-animation');
				$(this).animate({ top: angle},{ 
					duration: options.duration, 
					queue: false,
					step: function(step) {
						methods.rotationStep.apply(this, [step]);
					},
					complete: function() {
						var newAngle = $(this).data('angle') + angle;
						$(this).data('angle', newAngle);
						$(this).removeClass('running-animation');
					}
				});
			}

        };

        return this.each(function () {
			
			$(this).css('cursor','pointer');
			methods.animateCircleContainer1.apply(this);
			

			$(this).hover(function(){
				if ( !$(this).hasClass('running-animation') ) {
					$(this).addClass('myhover');
					methods.animateCircleContainer2.apply(this);
				}
			}, function(){
				$(this).removeClass('myhover');
			});
			
			$(this).click(function(){
				methods.rotateIcon.apply(this, [Math.PI]);
				/*
				if ( !$(this).hasClass('running-animation') ) {
					counterContainer = 0;
					$(this).addClass('myhover');
					methods.animateCircleContainer2.apply(this);
				}
				*/
			});
        }); // end each

    };

})(jQuery);

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

(function ($) {

    $.fn.gIconGrid = function (options) {

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