( function($) {

        $.fn.difference = function(a, b) {
            return Math.abs(a - b);
        };

        $.fn.streak = function(options) {

            var winHeight = $(window).height();
            var winWidth = $(window).width();
            var newCanvas = $('<canvas id="myCanvas" height="' + winHeight + '" width="' + winWidth + '"  />', {});

            $("body").append(newCanvas);

            var target = $('#' + options.target.toString());
            var streakColor = 'green';
            if (options.color) {
                streakColor = options.color.toString();
            }

            $('#myCanvas').css("zIndex", 1000);
            $('#myCanvas').css("position", "absolute");
            $('#myCanvas').css("left", 0);
            $('#myCanvas').css("top", 0);

            var isTargetAboveDestination = (target.offset().top < $(this).offset().top) ? true : false;
            var isTargetInLeftSide = (target.offset().left < $(this).offset().left) ? true : false;

            var topDiff = $.fn.difference(target.offset().top, $(this).offset().top);
            var leftDiff = $.fn.difference(target.offset().left, $(this).offset().left);

            var isBaseFill = (topDiff >= leftDiff) ? true : false;

            console.log('topDiff ' + topDiff);
            console.log('leftDiff ' + leftDiff);

            return this.each(function() {

                var dest_left = $(this).offset().left;
                var dest_top = $(this).offset().top;
                var dest_height = $(this).outerHeight();
                var dest_width = $(this).outerWidth();

                var target_left = target.offset().left;
                var target_top = target.offset().top;
                var target_height = target.outerHeight();
                var target_width = target.outerWidth();

                // We'll get back to this in a moment

                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.beginPath();

                if (isTargetAboveDestination) {
                    if (isBaseFill) {
                        ctx.moveTo(dest_left, dest_top);
                        ctx.lineTo(dest_left + dest_width, dest_top);
                        ctx.lineTo(target_left, target_top + target_height);
                        ctx.lineTo(dest_left, dest_top);
                    } else {
                        // wall side
                        ctx.moveTo(dest_left + dest_width, dest_top);
                        ctx.lineTo(dest_left + dest_width, dest_top + dest_height);
                        ctx.lineTo(target_left, target_top + target_height);
                        ctx.lineTo(dest_left + dest_width, dest_top);
                    }
                } else {
                    ctx.moveTo(dest_left, dest_top + dest_height);
                    ctx.lineTo(dest_left + dest_width, dest_top + dest_height);
                    ctx.lineTo(target_left, target_top);
                    ctx.lineTo(dest_left, dest_top + dest_height);
                }

                ctx.fillStyle = streakColor;
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
