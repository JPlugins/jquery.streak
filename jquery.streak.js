( function($) {

        $.fn.streak = function(options) {

            var settings = $.extend({
                text : 'Hello, World!',
                color : null,
                fontStyle : null
            }, options);

            var newCanvas = $('<canvas id="myCanvas" height="2000" width="2000"  />', {

            });

            $("body").append(newCanvas);

            $('#myCanvas').css("zIndex", 1000);
            $('#myCanvas').css("position", "absolute");
            $('#myCanvas').css("left", 0);
            $('#myCanvas').css("top", 0);

            return this.each(function() {

                var dom_1_x = $(this).offset().left;
                var dom_1_y = $(this).offset().top;
                var dom_1_height = $(this).height();
                var dom_2_x = $(options[0]).offset().left;
                var dom_2_y = $(options[0]).offset().top;
                var dom_2_height = $(options[0]).height();
                var dom_2_width = $(options[0]).width();

                // We'll get back to this in a moment

                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.beginPath();

                var x1, x2, y1, y2;
                x1 = dom_1_x;
                x2 = x1 + $(this).outerWidth();
                y1 = dom_1_y + dom_1_height + 5;
                y2 = dom_2_y;

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y1);
                ctx.lineTo(dom_2_x, y2);
                ctx.lineTo(x1, y1);

                console.log(x1 + " " + x2 + " " + y1 + " " + y2);

                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.stroke();

                var myInt = setInterval(function() {

                    clearInterval(myInt);

                    $("#myCanvas").fadeTo(1000, 0);
                    var myInt2 = setInterval(function() {

                        clearInterval(myInt2);

                        $('#myCanvas').remove();
                    }, 1000);

                }, 500);

            });

        };

    }(jQuery));
