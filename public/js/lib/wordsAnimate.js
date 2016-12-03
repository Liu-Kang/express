(function($){
	
	window.Animate = function(){};

	/**
	 * 文字动画：模仿计算机打字效果
	 * @return {[callback]}   [一段文字完成之后的回掉]
	 */
	Animate.prototype.typewriter = function(text,callback){
	    var callback = callback || function(){};
	    var $type = $('<div class="text text-type" style="display:block;">' + text + '</div>');
	    $type.css({
	        'width':'90%',
	        'margin':'0.15rem auto'
	    });
	    $type.appendTo('.content-main');
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
	    $fade.appendTo('.content-main');
	    $fade.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
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
	    var $scale = $('<div class="text text-scale" style="display:none;">' + text + '</div>');
	    $scale.appendTo('.content-main');
	    $scale.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'scale(0)'
	    }).show();
	    $scale.css({
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
	    var $slideLeft = $('<div class="text text-slideLeft" style="display:none;">' + text + '</div>');
	    $slideLeft.appendTo('.content-main');
	    $slideLeft.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'translateX(-500px)'
	    }).show();
	    $slideLeft.css({
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
	    var $slideRight = $('<div class="text text-slideRight" style="display:none;">' + text + '</div>');
	    $slideRight.appendTo('.content-main');
	    $slideRight.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'translateX(500px)'
	    }).show();
	    $slideRight.css({
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
	    var $slideTop = $('<div class="text text-slideTop" style="display:none;">' + text + '</div>');
	    $slideTop.appendTo('.content-main');
	    $slideTop.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'translateY(-800px)'
	    }).show();
	    $slideTop.css({
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
	    var $slideBottom = $('<div class="text text-slideBottom" style="display:none;">' + text + '</div>');
	    $slideBottom.appendTo('.content-main');
	    $slideBottom.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'translateY(800px)'
	    }).show();
	    $slideBottom.css({
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
	    var $rotate = $('<div class="text text-rotate" style="display:none;">' + text + '</div>');
	    $rotate.appendTo('.content-main');
	    $rotate.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'rotate(360deg) scale(0.2)'
	    }).show();
	    $rotate.css({
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
	    var $rotateLeft = $('<div class="text text-rotateLeft" style="display:none;">' + text + '</div>');
	    $rotateLeft.appendTo('.content-main');
	    $rotateLeft.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'translateX(-300px) rotate(-100deg) scale(0.2)'
	    }).show();
	    $rotateLeft.css({
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
	    var $rotateRight = $('<div class="text text-rotateRight" style="display:none;">' + text + '</div>');
	    $rotateRight.appendTo('.content-main');
	    $rotateRight.css({
	        'width':'90%',
	        'margin':'0.15rem auto',
	        '-webkit-transform':'translateX(300px) rotate(100deg) scale(0.2)'
	    }).show();
	    $rotateRight.css({
	        '-webkit-transition':'-webkit-transform 1.5s',
	        '-webkit-transform':'translateX(0) rotate(0) scale(1)'
	    });
	    window.setTimeout(callback,1500);
	};
})(Zepto);