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