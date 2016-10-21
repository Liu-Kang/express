/**
 * 首页
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

function indexInit(){
    $('html').css('font-size',sizeRate);
    gardenSetting();
}

function gardenSetting(){
    $loveHeart = $("#loveHeart");
    $loveHeart.height( $loveHeart.width() );
    offsetX = $loveHeart.width() / 2;
    offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $loveHeart.width();
    gardenCanvas.height = $loveHeart.height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
    
    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);

    if (document.createElement('canvas').getContext) {
        startHeartAnimation();
    }
}

function getHeartPoint(angle) {
    var t = angle / Math.PI;
    var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
    var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
    var angle = 10;
    var heart = new Array();
    var animationTimer = setInterval(function () {
        var bloom = getHeartPoint(angle);
        var draw = true;
        for (var i = 0; i < heart.length; i++) {
            var p = heart[i];
            var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (angle >= 30) {
            clearInterval(animationTimer);
        } else {
            angle += 0.2;
        }
    }, 50);
}

$(document).ready(function(){
    indexInit();
});