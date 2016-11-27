/**
 * 编辑新的express
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
	$('html').css('font-size',sizeRate);
    selectMusic();
    viewMod();
    editContent();
    editResultOperation();
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
 * 动态模板显示及删除
 */
function viewMod(){
	$('.show-dynamic-bg').click(function(){
		$('.dynamic-mod').show();
		$('.mod-iframe').prop('src','/record/1');
		$('.container').hide();
	});

	$('.edit-page-dynamic .delete-bg').click(function(){
		$('.bg-selected').attr('data-bg','2').html('snow');
		$(this).hide();
	});
}

/**
 * 关闭模板
 */
function closeIframe(){
	$('.dynamic-mod').hide();
	$('.mod-iframe').prop('src','');
	$('.container').show();
}

/**
 * 选择模板
 */
function chooseMod(mod,modname){
	$('.dynamic-mod').hide();
	$('.mod-iframe').prop('src','');
	$('.container').show();
	$('.bg-selected').attr('data-bg',mod).html(modname);
	$('.delete-bg').show();
}

/**
 * 编辑想说的话
 */
function editContent(){
	$('#add-content').click(function(){
		var index = $('.content-list li').length;

		var text = 
		'<li class="content-sg" data-animate="0">'+
		'	<div class="tac">'+
		'		<span class="mr10">第' + (index + 1) + '段</span>'+
		'		<a class="mr20 cfff delete-content-sg" href="javascript:void(0);">删除此段</a>'+
		'		<a class="cfff set-content-animation" href="javascript:void(0);">设置动画</a>'+
		'	</div>'+
		'	<textarea class="mt10 textarea content' + index + '"></textarea>'+
		'</li>';
		$('.content-list').append(text);
	});

	$('.container').on('click','.delete-content-sg',function(){
		$(this).parents('.content-sg').remove();
	});

	$('.container').on('click','.set-content-animation',function(){
		var index = $(this).parents('.content-sg').index();
		$('.font-box').show().attr('data-index',index);
	});

	$('.font-sg a').click(function(){
		var index = $('.font-box').attr('data-index');
		var animate = $(this).attr('data-font');
		var animateName = $(this).text();
		$('.edit-content .content-sg').eq(index).attr('data-animate',animate);
		$('.edit-content .content-sg').eq(index).find('.set-content-animation').text('动画：' + animateName + '（修改）');
		$('.font-box').hide();
	});
}

/**
 * 预览/保存/退出
 */
function editResultOperation(){
	$('#preview').click(function(){
		var $tgt = $(this);

		if($tgt.attr('data-ajax') == '1'){
			return false;
		}

		var title = $.trim( $('#title').val() );
		var music = $('.music-selected').attr('data-music');
		var bg = $('.bg-selected').attr('data-bg');
		var bgType = $('.edit-page').hasClass('edit-page-static') ? 'static' : 'dynamic';
		var content = '',animation = '';
		$('.content-sg').each(function(){
			var value = $.trim( $(this).find('textarea').val() );
			if(value !== ''){
				content += '&&' + $.trim( $(this).find('textarea').val() );
				animation += '&&' + $(this).attr('data-animate');
			}
		});
		content = content.substring(2);
		animation = animation.substring(2);

		if(!title || title === ''){
			alertBox('请填写标题');
			return false;
		}

		if(title.length > 50){
			alertBox('标题长度不多于50个字');
			return false;
		}

		if(content.length > 1000){
			alertBox('表达内容不多于1000个字');
			return false;
		}

		var oData = {
			userid:$tgt.parent().attr('data-userid'),
			music:music,
			bg:bg,
			bgType:bgType,
			title:title,
			content:content,
			animation:animation
		};

		$tgt.attr('data-ajax',1);
		$.ajax({
            url:'/editdeal/previewRecord/',
            data:oData,
            type:'POST',
            dataType:'json',
            success:function(result){
                if(result.errorCode === 0){
                	window.location.href = window.location.origin + '/record/preview';
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

	$('#save').click(function(){
		var $tgt = $(this);

		if($tgt.attr('data-ajax') == '1'){
			return false;
		}

		var title = $.trim( $('#title').val() );
		var music = $('.music-selected').attr('data-music');
		var bg = $('.bg-selected').attr('data-bg');
		var bgType = $('.edit-page').hasClass('edit-page-static') ? 'static' : 'dynamic';
		var content = '',animation = '';
		$('.content-sg').each(function(){
			var value = $.trim( $(this).find('textarea').val() );
			if(value !== ''){
				content += '&&' + $.trim( $(this).find('textarea').val() );
				animation += '&&' + $(this).attr('data-animate');
			}
		});
		content = content.substring(2);
		animation = animation.substring(2);

		if(!title || title === ''){
			alertBox('请填写标题');
			return false;
		}

		if(title.length > 50){
			alertBox('标题长度不多于50个字');
			return false;
		}

		if(content.length > 1000){
			alertBox('表达内容不多于1000个字');
			return false;
		}

		var oData = {
			userid:$tgt.parent().attr('data-userid'),
			music:music,
			bg:bg,
			bgType:bgType,
			title:title,
			content:content,
			animation:animation
		};

		$tgt.attr('data-ajax',1);
		$.ajax({
            url:'/editdeal/submitRecord/',
            data:oData,
            type:'POST',
            dataType:'json',
            success:function(result){
                if(result.errorCode === 0){
                	window.location.href = window.location.origin + '/record/' + result.rid;
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

	$('#exit').click(function(){
		var $tgt = $(this);

		confirmAlert({
			msg:'确定不保存吗？',
	        cancelFunc:function(){
	            $('.confirm').remove();
	        },
	        sureFunc:function(){
	        	if($tgt.attr('data-ajax') == '1'){
					return false;
				}

				$tgt.attr('data-ajax',1);
				$.ajax({
		            url:'/editdeal/destroyPreview/',
		            data:{},
		            type:'GET',
		            dataType:'json',
		            success:function(result){
		                if(result.errorCode === 0){
		                	$('.confirm').remove();
	            			window.location.href = window.location.origin + '/user/' + $tgt.parent().attr('data-userid');
		                }
		            },
		            complete:function(){
		                $tgt.attr('data-ajax',0);
		            }
		        });
	        }
		});
	});
}

$(document).ready(function(){
    indexInit();
});

