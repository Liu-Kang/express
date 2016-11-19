/**
 * @func record detail
 * @author liukang
 * @date 2016/11/19
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function Animate(){}

/**
 * 文字动画：模仿计算机打字效果
 * @return {[callback]}   [一段文字完成之后的回掉]
 */
Animate.prototype.typewriter = function(text,callback){
    var callback = callback || function(){};
    var $type = $('<div class="text text-type" style="display:block;">' + text + '</div>');
    $type.css({
        'width':'90%',
        'margin':'0.30rem auto'
    });
    $type.appendTo('.content-box');
    $type.each(function() {
        var str = $type.html(), progress = 0;
        $type.html('');
        var timer = window.setInterval(function() {
            var current = str.substr(progress, 1);
            if (current === '<') {
                progress = str.indexOf('>', progress) + 1;
            } else {
                progress ++;
            }
            if (progress > str.length) {
                window.clearInterval(timer);
                $type.html( str );
                callback();
            }else{
                $type.html( str.substring(0, progress) + (progress & 1 ? '_' : '') );
            }
        }, 150);
    });
};

/**
 * 透明度增加效果
 */
Animate.prototype.fade = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        'opacity':'0'
    }).show();
     $fade.css({
        'opacity':'1',
        'transition':'opacity 5s'
    });
    window.setTimeout(callback,5000);
};

/**
 * 文字放大效果
 */
Animate.prototype.scale = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'scale(0)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'scale(1)'
    });
    window.setTimeout(callback,1500);
};

/**
 * 文字从左边滑入
 */
Animate.prototype.slideLeft = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'translateX(-500px)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'translateX(0)'
    });
    window.setTimeout(callback,1500);
};

/**
 * 文字从右边滑入
 */
Animate.prototype.slideRight = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'translateX(500px)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'translateX(0)'
    });
    window.setTimeout(callback,1500);
};

/**
 * 文字从顶部滑入
 */
Animate.prototype.slideTop = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'translateY(-800px)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'translateY(0)'
    });
    window.setTimeout(callback,1500);
};

/**
 * 文字从底部滑入
 */
Animate.prototype.slideBottom = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'translateY(800px)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'translateY(0)'
    });
    window.setTimeout(callback,1500);
};

/**
 * 文字旋转进入
 */
Animate.prototype.rotate = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'rotate(360deg) scale(0.2)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'rotate(0) scale(1)'
    });
    window.setTimeout(callback,1500);
};

/**
 * 文字从左边旋转进入
 */
Animate.prototype.rotateLeft = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'translateX(-300px) rotate(-100deg) scale(0.2)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'translateX(0) rotate(0) scale(1)'
    });
    window.setTimeout(callback,1500);
};

/**
 * 文字从左边旋转进入
 */
Animate.prototype.rotateRight = function(text,callback){
    var callback = callback || function(){};
    var $fade = $('<div class="text text-fade" style="display:none;">' + text + '</div>');
    $fade.appendTo('.content-box');
    $fade.css({
        'width':'90%',
        'margin':'0.30rem auto',
        '-webkit-transform':'translateX(300px) rotate(100deg) scale(0.2)'
    }).show();
    $fade.css({
        '-webkit-transition':'-webkit-transform 1.5s',
        '-webkit-transform':'translateX(0) rotate(0) scale(1)'
    });
    window.setTimeout(callback,1500);
};



/**
 * 启动动画
 */
function startAnimation(){
    var contentArr = $.trim( $('#page-content').text() ).split('&&');
    var animationArr = $.trim( $('#page-animation').text() ).split('&&');
    var animate = new Animate();
    var i = 0,next = true;
    var animateLoop = window.setInterval(function(){
        if(next){
            next = false;
            var callback = function(){
                i ++;
                if(i >= contentArr.length){
                    window.clearInterval(animateLoop);
                }
                next = true;
            };
            
            eval('animate.' + animationArr[i] + '(contentArr[i],callback)');
        }
        console.log(55);
    },1000);
}

$(document).ready(function(){
    $('html').css('font-size',sizeRate);
    startAnimation();
});