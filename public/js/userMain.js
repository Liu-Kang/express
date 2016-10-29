/**
 * 用户主页
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);
    goRecordDetail();
}

function goRecordDetail(){
	$('.record-sg').click(function(){
		var recordid = $(this).attr('data-rid');
		window.location.href = window.location.origin + '/record/' + recordid;
	});
}

$(document).ready(function(){
    indexInit();
});