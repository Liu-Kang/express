/**
 * @func record detail
 * @author liukang
 * @date 2016/11/19
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;

/**
 * 启动动画
 */
function startAnimation(){
    var contentArr = $.trim( $('#page-content').text() ).split('&&');
    var animationArr = $.trim( $('#page-animation').text() ).split('&&');
    var animate = new Animate();
    $('.content-main').css({
        '-webkit-transform':'translateY(0)'
    });
    var i = 0,next = true,moveY = 50;
    var animateLoop = window.setInterval(function(){
        if(next){
            next = false;
            var callback = function(){
                i ++;
                if(i >= contentArr.length){
                    $('.content-main').css({
                        '-webkit-transform':'translateY(0)'
                    });
                    window.clearInterval(animateLoop);
                    goHomePage();
                }
                next = true;
            };
            
            if($('.content-main').height() >= $('.content-box').height() - 30){
                moveY += 50;
                
                $('.content-main').css({
                    '-webkit-transition':'-webkit-transform 300ms linear',
                    '-webkit-transform':'translateY(-' + moveY + 'px)'
                });
            }
            try{
                eval('animate.' + animationArr[i] + '(contentArr[i],callback)');
            }catch(e){
                
            }
            
        }
    },1000);
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

/**
 * 底部按钮：回到主页入口/继续编辑
 */
function goHomePage(){
    if($('.bg-mod-list').length > 0){
        return;
    }
    window.setTimeout(function(){
        $('.ad-box').css({
            '-webkit-transition':'-webkit-transform 500ms ease-in-out',
            '-webkit-transform':'translateY(-50px)'
        });
    },8000);
    
    var startY = 0, endY = 0;
    $('body').on('touchstart',function(event){
        startY = event.touches[0].pageY;
    });
    $('body').on('touchmove',function(event){
        endY = event.touches[0].pageY;

        if(endY - startY <= -10){
            $('.ad-box').css({
                '-webkit-transition':'-webkit-transform 500ms ease-in-out',
                '-webkit-transform':'translateY(-50px)'
            });
        }

        if(endY - startY >= 10){
            $('.ad-box').css({
                '-webkit-transition':'-webkit-transform 500ms ease-in-out',
                '-webkit-transform':'translateY(0)'
            });
        }
    });
}


$(document).ready(function(){
    $('html').css('font-size',sizeRate);
    startAnimation();
    musicPause();
    $('.edit-continue').click(function(){
        window.location.href = window.location.origin + '/edit/dynamic';
    });
});