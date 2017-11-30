


/**
 * morphing-shapes.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
    // Helper vars and functions.
    const extend = function(a, b) {
        for( let key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    };

    // from http://www.quirksmode.org/js/events_properties.html#position
    const getMousePos = function(ev) {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) 	{
            posx = ev.pageX;
            posy = ev.pageY;
        }
        else if (ev.clientX || ev.clientY) 	{
            posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy };
    };

    const TiltObj = function(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this.DOM = {};
        this.DOM.img = this.el.querySelector('.content__img1');
        this.DOM.imgone = this.el.querySelector('.content__img2');
        this.DOM.imgtwo = this.el.querySelector('.content__img3');
        this._initEvents();
    };

    TiltObj.prototype.options = {
        movement: {
            img : { translation : {x: -10, y: -10} },
            imgone : { translation : {x: 25, y: 25} },
            imgtwo : { translation : {x: -10, y: -10} },
        }
    };

    TiltObj.prototype._initEvents = function() {
        this.mouseenterFn = (ev) => {
            anime.remove(this.DOM.img);
            anime.remove(this.DOM.imgone);
            anime.remove(this.DOM.imgtwo);
        };

        this.mousemoveFn = (ev) => {
            requestAnimationFrame(() => this._layout(ev));
        };

        this.mouseleaveFn = (ev) => {
            requestAnimationFrame(() => {
                anime({
                    targets: [this.DOM.img, this.DOM.imgone, this.DOM.imgtwo],
                    duration: 2500,
                    easing: 'easeOutElastic',
                    elasticity: 400,
                    translateX: 0,
                    translateY: 0
                });
        });
        };

        this.el.addEventListener('mousemove', this.mousemoveFn);
        this.el.addEventListener('mouseleave', this.mouseleaveFn);
        this.el.addEventListener('mouseenter', this.mouseenterFn);
    };

    TiltObj.prototype._layout = function(ev) {
        // Mouse position relative to the document.
        const mousepos = getMousePos(ev);
        // Document scrolls.
        const docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop};
        const bounds = this.el.getBoundingClientRect();
        // Mouse position relative to the main element (this.DOM.el).
        const relmousepos = { x : mousepos.x - bounds.left - docScrolls.left, y : mousepos.y - bounds.top - docScrolls.top };

        // Movement settings for the animatable elements.
        const t = {
            img: this.options.movement.img.translation,
            imgone: this.options.movement.imgone.translation,
            imgtwo: this.options.movement.imgone.translation,
        };

        const transforms = {
            img : {
                x: (-1*t.img.x - t.img.x)/bounds.width*relmousepos.x + t.img.x,
                y: (-1*t.img.y - t.img.y)/bounds.height*relmousepos.y + t.img.y
            },
            imgone : {
                x: (-1*t.imgone.x - t.imgone.x)/bounds.width*relmousepos.x + t.imgone.x,
                y: (-1*t.imgone.y - t.imgone.y)/bounds.height*relmousepos.y + t.imgone.y
            },
            imgtwo : {
                x: (-1*t.imgtwo.x - t.imgtwo.x)/bounds.width*relmousepos.x + t.imgtwo.x,
                y: (-1*t.imgtwo.y - t.imgtwo.y)/bounds.height*relmousepos.y + t.imgtwo.y
            }
        };
        this.DOM.img.style.WebkitTransform = this.DOM.img.style.transform = 'translateX(' + transforms.img.x + 'px) translateY(' + transforms.img.y + 'px)';
        this.DOM.imgone.style.WebkitTransform = this.DOM.imgone.style.transform = 'translateX(' + transforms.imgone.x + 'px) translateY(' + transforms.imgone.y + 'px)';
        this.DOM.imgtwo.style.WebkitTransform = this.DOM.imgtwo.style.transform = 'translateX(' + transforms.imgtwo.x + 'px) translateY(' + transforms.imgtwo.y + 'px)';
    };

    const DOM = {};
    DOM.svg = document.querySelector('.morph');
    DOM.shapeEl = DOM.svg.querySelector('path');
    DOM.contentElems = Array.from(document.querySelectorAll('.content-wrap'));
    DOM.footer = document.querySelector('.content--related');
    const contentElemsTotal = DOM.contentElems.length;
    const shapes = [
        {
            path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            scaleX: 1.2,
            scaleY: 1,
            rotate: 0,
            tx: -30,
            ty: -300,
            fill: {
                color: '#f4f4f4',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                path: {
                    duration: 3000,
                    easing: 'easeOutElastic',
                    elasticity: 600
                },
                svg: {
                    duration: 2000,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            path: 'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
            pathAlt: 'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
            scaleX: .4,
            scaleY: 1.4,
            rotate: 0,
            tx: 0,
            ty: -100,
            fill: {
                color: '#f6f4f4',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                path: {
                    duration: 2000,
                    easing: 'easeOutElastic',
                    elasticity: 600
                },
                svg: {
                    duration: 2000,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            path: 'M 383.8,163.4 C 335.8,352.3 591.6,317.1 608.7,420.8 625.8,524.5 580.5,626 647.3,688 714,750 837.1,760.5 940.9,661.5 1044,562.3 1041,455.8 975.8,393.6 909.8,331.5 854.2,365.4 784.4,328.1 714.6,290.8 771.9,245.2 733.1,132.4 694.2,19.52 431.9,-25.48 383.8,163.4 Z',
            pathAlt: 'M 383.8,163.4 C 345.5,324.9 591.6,317.1 608.7,420.8 625.8,524.5 595.1,597 647.3,688 699.5,779 837.1,760.5 940.9,661.5 1044,562.3 1068,444.4 975.8,393.6 884,342.8 854.2,365.4 784.4,328.1 714.6,290.8 820.3,237.2 733.1,132.4 645.9,27.62 422.1,1.919 383.8,163.4 Z',
            scaleX: .7,
            scaleY: 1.1,
            rotate: -20,
            tx: 200,
            ty: 200,
            fill: {
                color: '#f4f4f4',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                path: {
                    duration: 3000,
                    easing: 'easeOutElastic',
                    elasticity: 600
                },
                svg: {
                    duration: 2500,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            scaleX: 1.5,
            scaleY: 1,
            rotate: -20,
            tx: 0,
            ty: -50,
            fill: {
                color: '#f6f4f4',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                path: {
                    duration: 3000,
                    easing: 'easeOutQuad',
                    elasticity: 600
                },
                svg: {
                    duration: 3000,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            path: 'M 247.6,239.6 C 174.3,404.5 245.5,601.9 358.5,624.3 471.5,646.6 569.1,611.6 659.7,655.7 750.4,699.7 1068,687.6 1153,534.4 1237,381.1 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 928.4,393.8 706.8,283.5 485.2,173.1 320.8,74.68 247.6,239.6 Z',
            pathAlt: 'M 247.6,239.6 C 174.3,404.5 271.3,550.3 358.5,624.3 445.7,698.3 569.1,611.6 659.7,655.7 750.4,699.7 1145,699 1153,534.4 1161,369.8 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 894.5,431 706.8,283.5 519.1,136 320.8,74.68 247.6,239.6 Z',
            scaleX: 1.8,
            scaleY: 1.5,
            rotate: 0,
            tx: 250,
            ty: 50,
            fill: {
                color: '#f4f4f4',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                path: {
                    duration: 3000,
                    easing: 'easeOutElastic',
                    elasticity: 600
                },
                svg: {
                    duration: 2000,
                    easing: 'easeOutExpo'
                }
            }
        },{
            path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            scaleX: 1.2,
            scaleY: 1,
            rotate: 0,
            tx: -30,
            ty: -300,
            fill: {
                color: '#f4f4f4',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                path: {
                    duration: 3000,
                    easing: 'easeOutElastic',
                    elasticity: 600
                },
                svg: {
                    duration: 2000,
                    easing: 'easeOutElastic'
                }
            }
        },
        // footer shape:
        {
            path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
            scaleX: 2.5,
            scaleY: 2,
            rotate: 0,
            tx: 0,
            ty: -50,
            fill: {
                color: '#f6f4f4',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                path: {
                    duration: 3000,
                    easing: 'easeOutQuad',
                    elasticity: 600
                },
                svg: {
                    duration: 3000,
                    easing: 'easeOutElastic'
                }
            }
        }
    ];
    let step;

    const initShapeLoop = function(pos) {
        pos = pos || 0;
        anime.remove(DOM.shapeEl);
        anime({
            targets: DOM.shapeEl,
            easing: 'linear',
            d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
            loop: true,
            fill: {
                value: shapes[pos].fill.color,
                duration: shapes[pos].fill.duration,
                easing: shapes[pos].fill.easing
            },
            direction: 'alternate'
        });
    };

    const initShapeEl = function() {
        anime.remove(DOM.svg);
        anime({
            targets: DOM.svg,
            duration: 1,
            easing: 'linear',
            scaleX: shapes[0].scaleX,
            scaleY: shapes[0].scaleY,
            translateX: shapes[0].tx+'px',
            translateY: shapes[0].ty+'px',
            rotate: shapes[0].rotate+'deg'
        });

        initShapeLoop();
    };

    const createScrollWatchers = function() {
        DOM.contentElems.forEach((el,pos) => {
            const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
        pos = pos ? pos : contentElemsTotal;
        const watcher = scrollMonitor.create(scrollElemToWatch,-300);

        watcher.enterViewport(function() {
            step = pos;
            anime.remove(DOM.shapeEl);
            anime({
                targets: DOM.shapeEl,
                duration: shapes[pos].animation.path.duration,
                easing: shapes[pos].animation.path.easing,
                elasticity: shapes[pos].animation.path.elasticity || 0,
                d: shapes[pos].path,
                fill: {
                    value: shapes[pos].fill.color,
                    duration: shapes[pos].fill.duration,
                    easing: shapes[pos].fill.easing
                },
                complete: function() {
                    initShapeLoop(pos);
                }
            });

            anime.remove(DOM.svg);
            anime({
                targets: DOM.svg,
                duration: shapes[pos].animation.svg.duration,
                easing: shapes[pos].animation.svg.easing,
                elasticity: shapes[pos].animation.svg.elasticity || 0,
                scaleX: shapes[pos].scaleX,
                scaleY: shapes[pos].scaleY,
                translateX: shapes[pos].tx+'px',
                translateY: shapes[pos].ty+'px',
                rotate: shapes[pos].rotate+'deg'
            });
        });

        watcher.exitViewport(function() {
            const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

            if( idx <= contentElemsTotal && step !== idx ) {
                step = idx;
                anime.remove(DOM.shapeEl);
                anime({
                    targets: DOM.shapeEl,
                    duration: shapes[idx].animation.path.duration,
                    easing: shapes[idx].animation.path.easing,
                    elasticity: shapes[idx].animation.path.elasticity || 0,
                    d: shapes[idx].path,
                    fill: {
                        value: shapes[idx].fill.color,
                        duration: shapes[idx].fill.duration,
                        easing: shapes[idx].fill.easing
                    },
                    complete: function() {
                        initShapeLoop(idx);
                    }
                });

                anime.remove(DOM.svg);
                anime({
                    targets: DOM.svg,
                    duration: shapes[idx].animation.svg.duration,
                    easing: shapes[idx].animation.svg.easing,
                    elasticity: shapes[idx].animation.svg.elasticity || 0,
                    scaleX: shapes[idx].scaleX,
                    scaleY: shapes[idx].scaleY,
                    translateX: shapes[idx].tx+'px',
                    translateY: shapes[idx].ty+'px',
                    rotate: shapes[idx].rotate+'deg'
                });
            }
        });
    });
    };

    const init = function() {
        imagesLoaded(document.body, () => {
            initShapeEl();
        createScrollWatchers();
        Array.from(document.querySelectorAll('.content--layout')).forEach(el => new TiltObj(el));
        // Remove loading class from body
        document.body.classList.remove('loading');
    });
    }

    init();
};


/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

    $.fn.unveil = function(threshold, callback) {

        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina? "data-src-retina" : "data-src",
            images = this,
            loaded;

        this.one("unveil", function() {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function unveil() {
            var inview = images.filter(function() {
                var $e = $(this);
                if ($e.is(":hidden")) return;

                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        unveil();

        return this;

    };

})(window.jQuery || window.Zepto);

$(document).ready(function() {
    $("img").unveil();
});

$.ajaxSetup({cache:false});
$("#meet-the-team-ul .team-post").click(function(e){
    $("body").css("overflow", "hidden");
    $('.info-bg').slideDown();
    var post_link = $(this).attr("href");
    var post_loaddiv = $(this).attr("rel");
    $(".info-bg").prepend('<img  style="text-align:center;margin-top:10px;" id="theImg" src="http://new.infinvision.com/wp-content/themes/infinvisionv2/assets/img/ajax-loader.gif" />');
    $(".info-bg").load(post_link);
    e.preventDefault();
});