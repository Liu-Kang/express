// 数据库page字段
// {
// 		"num":1,
// 		"dynamicBg":0,
// 		"text":'xxxxx&&xxx,xx?xx!xxxxx&&xxx' //即通过&&进行分割
// }

module.exports = {
	//定义动画种类
	animate:[
		'typewriter','fade','scale','slideLeft',
		'slideRight','slideTop','slideBottom','rotate',
		'rotateLeft','rotateRight'
	],
	//定义背景种类：static:静态背景；；dynamic:动态背景
	staticBg:['bg1','bg2','bg3','bg4','bg5','bg6','bg7'],
	dynamicBg:['neon','rose','snow','star'],
	//设定背景音乐
	music:{
		'爱如空气.mp3':'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_234728&type=convert_url&response=res',
		'valentine.mp3':'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_2120748&type=convert_url&response=res',
		'when you say nothing at all.mp3':'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_472413&type=convert_url&response=res',
		'遇见.mp3':'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_203307&type=convert_url&response=res',
		'小酒窝.mp3':'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_295835&type=convert_url&response=res'
	}
}