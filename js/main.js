$(function(){
	function resize(){
		//获取屏幕宽度
		var windowWidth = $(window).width();
		//判断屏幕大小
		var isSmallScreen = windowWidth<768;

		//判断屏幕大小为屏幕上每一张轮播图选择背景图
		//$("main-ad>.carousel-inner>.item")//获取到的是一个数组
		$("#main-ad>.carousel-inner>.item").each(function(i,item){
			var $item = $(item);
			var imgSrc = isSmallScreen?$item.data('image-xs'):$item.data('image-lg');
			//设置背景图片
			$item.css('backgroundImage',"url("+imgSrc+")");
			//因为我们需要小图时，尺寸等比例变化，因此，在小图时，加入img标签
			if(isSmallScreen){
				$item.html('<img src="'+imgSrc+'" alt="" />');
			}else{
				$item.empty();
			}
		});
		//控制标签页的标签容器宽度

		var $ulContainer = $('.nav-tabs');
		var $ulWapper = $('.ul-wapper');
		//获取所有子元素的宽度和
		var width = 50;
		//遍历子元素
		$ulContainer.children().each(function(index,element){
			
			//console.log($(element).width());
			width += element.clientWidth;
			//此时width等于所有li的和
		});
		//判断ul的宽度是否超出了屏幕的宽度，超出了，则执行下面的代码，显示横向滚动条
		if(width > $(window).width()){
			$ulContainer.width(width);
			$ulWapper.css('overflowX','scroll');
		};
	};
	$(window).on('resize',resize).trigger('resize');
	
	//初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();

	//新闻部分的a点击事件
	var $newsTitle = $('.news-title');
	$('#news .nav-new a').on('click',function(){
		//获取当前点击元素
		var $this = $(this);
		//获取对应title值
		var title = $this.data('title');
		//将title设置到响应的位子
		$newsTitle.text(title);
	});
	
	//1、线获取手指在轮播图元素上滑动的方向（左右）
	
	//获取界面上的轮播图组件
	var $carousels = $('#main-ad');
	var startX;
	var endX;
	var offset = 50;
	//注册滑动事件
	$carousels.on('touchstart',function(e){
		//手指触摸开始时记录一下手指所在X坐标
		//结束触摸时一瞬间记录手指所在X坐标
		//比大小
		startX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchmove',function(e){
		endX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchend',function(e){
		//控制精度 获取每次运动的距离，当距离大于一定值得时候才认为有方向变化
		var distance = Math.abs(endX - startX);
		if(distance > offset){
			//有方向变化
			//2、根据获得的方向选择选择上一张或下一张
			// bootstrap中的carousel实现
			//console.log(111);
			$(this).carousel(endX > startX ? 'prev' : 'next');
		}
		//console.log(endX>startX?'右':'左');



	});

});