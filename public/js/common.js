$(document).ready(function(){
    loginOut();
    closeAlert();
});

/**
 * 退出登录
 * @return {[type]} [description]
 */
function loginOut(){
    $('.login-out').click(function(){
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

/**
 * 消息提示弹窗
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
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

/**
 * 关闭弹窗
 */
function closeAlert(){
    $('.container').on('click','.alertBg',function(event){
        $(this).parents('.alert').hide();
    });
    $('.container').on('click','.alertMain',function(event){
        event.stopPropagation();
    });
}

function confirmAlert(opt){
    var param = {
        msg:'确定删除？',
        cancelFunc:function(){
            $('.confirm').remove();
        },
        sureFunc:function(){
            $('.confirm').remove();
        }
    }

    var option = $.extend(param,opt);
    var confirmHtml = 
    '<div class="confirm" style="display:block;">'+
        '<div class="confirmBg"></div>'+
        '<div class="confirmMain">'+
            '<div class="tac confirm-text">' + option.msg + '</div>'+
            '<div class="confrim-btn clearfix">'+
                '<a class="fl confirm-cancel" href="javascript:void(0);">取消</a>'+
                '<a class="fr confirm-sure" href="javascript:void(0);">确定</a>'+
            '</div>'+
        '</div>'+
    '</div>';

    $('.container').append(confirmHtml);

    $('.container').on('click','.confirm-cancel',function(){
        option.cancelFunc();
    });

    $('.container').on('click','.confirm-sure',function(){
        option.sureFunc();
    });
}