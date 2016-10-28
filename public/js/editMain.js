/**
 * 编辑新的express
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);
    submitRecord();
}

function submitRecord(){
	$('#editSubmit').click(function(){
		var $tgt = $(this);
		if($tgt.attr('data-ajax') === '1'){
			return false;
		}

		var title = $.trim( $('#title').val() );
		var article = $.trim( $('#article').val() );
		if(!checkTitle(title)){
			return false;
		}

		if(!checkArticle(article)){
			return false;
		}

		var oData = {
			userid: $tgt.attr('data-userid'),
			title:title,
			article:article
		};

		$tgt.attr('data-ajax',1);
		$.ajax({
            url:'/edit/submitRecord/',
            data:oData,
            type:'get',
            dataType:'json',
            success:function(result){
                if(result.errorCode === 0){
                	alertBox('编辑成功');
                	$('.input,textarea').val('');
                	window.setTimeout(function(){
                        window.location.reload();
                    },2000);
                }else{
                    alertBox(result.errorMsg);
                }
            },
            error:function(){
                alertBox('服务器出问题了');
            },
            complete:function(){
                $tgt.attr('data-ajax',0);
            }
        });
	});
}

/**
 * title check
 */
function checkTitle(title){
	if(!title || title === ''){
		alertBox('请填写标题');
		return false;
	}

	if(title.length > 50){
		alertBox('标题长度不多于50个字');
		return false;
	}

	return true;
}

/**
 * article check
 */
function checkArticle(article){
	if(!article || article === ''){
		alertBox('请填写正文');
		return false;
	}

	if(article.length < 20){
		alertBox('正文长度不少于5个字');
		return false;
	}

	return true;
}

$(document).ready(function(){
    indexInit();
});

