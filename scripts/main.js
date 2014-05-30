'use strict';
$(function () {
    $('#slydemo').rethinkpagination({animation: 'fadeInDown', selector: 'h1'});
    $('.rethinkpagination').rethinkpagination();
});

$(function () {
    var $frame = $('#slydemo').parent();
    var $wrap = $frame.parent();

    // Call Sly on frame
    var sly = new Sly($frame, {
        horizontal: 1,
        itemNav: 'centered',
        smart: 1,
        activateOn: null,
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 1,
        scrollBar: $wrap.find('.scrollbar'),
        minHandleSize: 50,
        scrollBy: 5,
        speed: 300,
        elasticBounds: 1,
        // easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,

        // Buttons
        prev: $wrap.find('.prev'),
        next: $wrap.find('.next')
    }, {
        move: function (eventName) {
            // console.log($(this).parent()); // 'load'
            // console.log(this.pos);  // Sly position object
        }
    }).init();
});