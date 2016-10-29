/**
 * 首页
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);

    $('.type-writer').typewriter(function(){
    	window.setTimeout(function(){
    		$('.type-writer').css({
	    		'top':'-0.20rem',
	    		'transform':'scale(0.8)'
	    	}).addClass('scaleout');
	    	$('.go-express').show().addClass('scalein');
    	},2000);
    });
}

$(document).ready(function(){
    indexInit();
});