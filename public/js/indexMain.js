/**
 * 首页
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);
    neon();
}

function neon(){
    $('#index-canvas').let_it_snow({
        windPower: 0,
        speed: 0,
        color: '#F21313',
        size:50,
        opacity: 0.00001,
        count: 15,
        interaction: false
    });
}

$(document).ready(function(){
    indexInit();
});