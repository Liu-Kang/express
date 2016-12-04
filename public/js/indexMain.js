/**
 * 首页
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);

    typewriter($('.type-writer').text(),function(){
    	window.setTimeout(function(){
    		$('.type-writer').css({
	    		'top':'-0.20rem',
	    		'transform':'scale(0.8)'
	    	}).addClass('scaleout');
	    	$('.go-express').show().addClass('scalein');
    	},2000);
    });

    musicPause();
}

function typewriter(text,callback){
    var $type = $('.type-writer');
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
}

/**
 * 音乐暂停和继续播放
 * 暂停后按钮停止旋转，继续播放，按钮旋转
 */
function musicPause(){
    $('#music-switch').click(function(){
        var audio = document.getElementById('audio');
        if(audio.paused){
            audio.play();
            $(this).find('img').css('-webkit-animation-play-state','running');
        }else{
            audio.pause();
            $(this).find('img').css('-webkit-animation-play-state','paused');
        }
    });
}

$(document).ready(function(){
    indexInit();
});