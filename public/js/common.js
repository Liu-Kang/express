$(document).ready(function(){
    loginOut();
});

function loginOut(){
    $('body').on('click','.login-out',function(){
        $.ajax({
            url:'/loginOut/',
            type:'get',
            dataType:'json',
            success:function(result){
                if(result.errorCode === 0){
                    window.location.href = result.url;
                }else{
                    $('#error').text(result.errorMsg).show();
                }
            },
            error:function(){
                alertBox('服务器出问题了');
            }
        });
    });
}

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
