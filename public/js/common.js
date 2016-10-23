function alertBox(msg){
	if ($('.alertbox').length <= 0) {
		var alertHtml = 
		'<div class="alertbox">'+
			'<span class="alertboxmsg">' + msg + '</span>'+
			'<div class="alertboxbg"></div>'+
		'</div>';
        $(alertHtml).appendTo('body');
        var h = -$('.alertbox').height() / 2;
        var w = -$('.alertbox').width() / 2;
        $('.alertbox').css({
            top: '50%',
            left: '50%',
            marginTop: h,
            marginLeft: w
        }),
        window.setTimeout(function() {
            $('.alertbox').remove()
        }, 2000);
    }
}
