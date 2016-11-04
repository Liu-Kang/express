/**
 * 编辑新的express
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);
    submitRecord();
    selectMusic();
    viewMod();
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

	if(article.length < 10){
		alertBox('正文长度不少于10个字');
		return false;
	}

	return true;
}


/**
 * 查看音乐列表并选择音乐
 */
function selectMusic(){
	$('.show-music').click(function(){
		$('.music-box').show();
		$('.alertMain').addClass('scale');
	});

	$('.music-sg a').click(function(){
		var musicName = $(this).text();
		var musicid = $(this).attr('data-music');
		$('.music-selected').html(musicName).attr('data-music',musicid);
		$('.delete-music').show();
	});

	$('.delete-music').click(function(){
		confirmAlert({
			msg:'确定删除背景音乐吗？',
			sureFunc:function(){
				$('.music-selected').html('无');
				$('.delete-music').hide();
				$('.confirm').remove();
			}
		});
	});
}

/**
 * 查看动态模板
 */
function viewMod(){
	$('.show-dynamic-bg').click(function(){
		$('.dynamic-mod').show();
	});
}

$(document).ready(function(){
    indexInit();
});

