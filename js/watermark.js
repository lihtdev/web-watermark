/*
 * 网页水印js插件
 * 
 * @author lihaitao
 * @date 2021/4/26
 */
(function() {

	// public
	this.watermark = {
		Text : TextWatermark,
		Image : ImageWatermark
	};


	/*
	 * 文本水印
	 */
	function TextWatermark(element, settings) {
		Watermark.apply(this, arguments);
		this.text = settings.text;
		this.color = settings.color;
		this.fontFamily = settings.fontFamily;
		this.fontSize = settings.fontSize;
	}
	TextWatermark.prototype.create = function() {

	}

	/*
	 * TODO 图片水印
	 */
	function ImageWatermark(element, settings) {
		Watermark.apply(this, arguments);
		this.imagePath = settings.imagePath;
		this.width = settings.width;
		this.height = settings.height;
	}

	/*
	 * 水印父类
	 */
	function Watermark(element, settings) {
		this.element = element;
		this.style = watermarkStyle[settings.style];
	}

	/*
	 * 固定位置水印样式
	 */
	function PositionWatermarkStyle(settings) {
		WatermarkStyle.call(this, settings);
		this.positions = settings.positions;
	}

	/*
	 * 重复水印样式
	 */
	function RepeatWatermarkStyle(settings) {
		WatermarkStyle.call(this, settings);
		this.cols = settings.cols;
		this.rows = settings.rows;
		this.xSpace = settings.xSpace;
		this.ySpace = settings.ySpace;
		this.xOffset = settings.xOffset;
		this.yOffset = settings.yOffset;
	}

	/*
	 * 水印样式父类
	 */
	function WatermarkStyle(settings) {
		this.opacity = settings.opacity;
		this.rotate = formatRotate[settings.format];
	}

	/*
	 * 水印版式（版式：旋转度）
	 */
	let formatRotate = {
		horizontal : 0,
		vertical : -90,
		oblique : -36
	}

	/*
	 * 水印样式
	 */
	let watermarkStyle = {
		position : function(settings) {
			return new PositionWatermarkStyle(settings);
		},
		repeat : function(settings) {
			return new RepeatWatermarkStyle(settings);
		}
	}

	/*
	 * 设置CSS变量值
	 */
	let watermarkCss = {
		set : function(key, value) {
			var r = document.querySelector(':root');
			r.style.setProperty(key, value);
		}
	}

	// 固定位置文本水印默认配置
	let POSITION_TEXT_WATERMARK_SETTINGS = {
		text : '文本水印',
		color : 'gray',
		fontFamily : '楷体',
		fontSize : '16px',
		opacity : 0.5, // 不透明度（范围 0~1: 0-完全透明，1-完全不透明）
		format : 'horizontal', // 版式：horizontal-水平，vertical-垂直，oblique-斜式
		style : 'position', // 水印风格：position-固定位置，repeat-重复
		positions : ['left-top', 'left-bottom', 'right-top', 'right-bottom', 'center']
	};

	// 重复文本水印默认配置
	let REPEAT_TEXT_WATERMARK_SETTINGS = {
		text : '文本水印',
		color : 'gray',
		fontFamily : '楷体',
		fontSize : '16px',
		opacity : 0.5, // 不透明度（范围 0~1: 0-完全透明，1-完全不透明）
		format : 'oblique', // 版式：horizontal-水平，vertical-垂直，oblique-斜式
		style : 'repeat', // 水印风格：position-固定位置，repeat-重复
		rows : 20, // 行数
		cols : 30, // 列数
		xSpace : 30, // x轴间距
		ySpace : 50, // y轴间距
		xOffset : -20, // x轴偏移量
		yOffset : -10 // y轴偏移量 
	};

})();