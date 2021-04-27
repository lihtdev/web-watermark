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
	TextWatermark.prototype = {
		extendStyle : function() {
			let textWidth = getTextWidth(this.text, this.fontSize + ' ' + this.fontFamily, this.style.rotate) + 'px';
			let textHeight = textWidth;
			watermarkCss.set('--color', this.color);
			watermarkCss.set('--font-family', this.fontFamily);
			watermarkCss.set('--font-size', this.fontSize);
			watermarkCss.set('--watermark-width', textWidth);
			watermarkCss.set('--watermark-height', textHeight);
			if (this.style instanceof RepeatWatermarkStyle) {
				let textWidthNum = getNumberWithoutPx(textWidth);
				let xOffsetNum = Math.abs(getNumberWithoutPx(this.style.xOffset));
				let xSpaceNum = Math.abs(getNumberWithoutPx(this.style.xSpace));
				let repeatRowWidthNum = (textWidthNum + xOffsetNum + xSpaceNum) * this.style.cols;
				watermarkCss.set('--repeat-row-width', repeatRowWidthNum + 'px');
			}
		},
		_create : function() {
			this.element.setAttribute('class', 'watermark-layer');
			if (this.style instanceof PositionWatermarkStyle) {
				let positions = this.style.positions;
				let html = '';
				for (let i = 0; i < positions.length; i++) {
					html += ('<div class="position-watermark ' + positions[i] + '">' + this.text + '</div>');
				}
				this.element.innerHTML = html;
			} else if (this.style instanceof RepeatWatermarkStyle) {
				this.element.setAttribute('class', 'watermark-layer repeat-watermark');
				var html = '';
				for (let row = 0; row < this.style.rows; row++) {
					html += ('<div class="row' + (row == 0 ? ' first-row' : '') + '">');
					for (let col = 0; col < this.style.cols; col++) {
						html += ('<div class="col' + (col == 0 ? ' first-col' : '') + '">' + this.text + '</div>');
					}
					html += '</div>'
				}
				this.element.innerHTML = html;
			}
		}
	};
	
	/*
	 * TODO 图片水印
	 */
	function ImageWatermark(element, settings) {
		Watermark.apply(this, arguments);
		this.imagePath = settings.imagePath;
		this.width = settings.width;
		this.height = settings.height;
	}
	ImageWatermark.prototype = {
		extendStyle : function() {
			// TODO
		},
		_create : function() {
			// TODO
		}
	};

	/*
	 * 水印父类
	 */
	function Watermark(element, settings) {
		this.element = element;
		this.style = new watermarkStyle[settings.style](settings);
		this.useStyle = function() {
			this.style.use();
			if (typeof this.extendStyle === 'function') {
				this.extendStyle();
			}
		},
		this.create = function() {
			this.useStyle();
			this._create();
		}
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
	}
	RepeatWatermarkStyle.prototype.extend = function() {
		watermarkCss.set('--x-space', this.xSpace);
		watermarkCss.set('--y-space', this.ySpace);
	}

	/*
	 * 水印样式父类
	 */
	function WatermarkStyle(settings) {
		this.opacity = settings.opacity;
		this.rotate = formatRotate[settings.format];
		this.xOffset = settings.xOffset;
		this.yOffset = settings.yOffset;
		this.use = function() {
			watermarkCss.set('--opacity', this.opacity);
			watermarkCss.set('--rotate', this.rotate);
			watermarkCss.set('--x-offset', this.xOffset);
			watermarkCss.set('--y-offset', this.yOffset);
			if (typeof this.extend === 'function') {
				this.extend();
			}
		}
	}

	/*
	 * 水印版式（版式：旋转度）
	 */
	let formatRotate = {
		horizontal : '0deg',
		vertical : '-90deg',
		oblique : '-36deg'
	};

	/*
	 * 水印样式
	 */
	let watermarkStyle = {
		position : PositionWatermarkStyle,
		repeat : RepeatWatermarkStyle
	};

	/*
	 * 设置CSS变量值
	 */
	let watermarkCss = {
		set : function(key, value) {
			var r = document.querySelector(':root');
			r.style.setProperty(key, value);
		},
		get : undefined
	};

	/*
	 * 获取文本宽度高度
	 * 
	 * @param text 文本
	 * @param font 字体（例如：normal 20px 楷体）
	 *
	 */
	function getTextWidth(text, font, rotate) {
		// re-use canvas object for better performance
		let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		let context = canvas.getContext("2d"); 
		context.font = font;
		context.rotate = rotate;
		let metrics = context.measureText(text);
		return metrics.width;
	}

	/*
	 * 获取不带px的数字
	 */
	function getNumberWithoutPx(value) {
		if (typeof value === 'number') {
			return value;
		}
		if (typeof value === 'string' && value.match('px$')) {
			return value.substring(0, value.length - 2);
		}
		return 0;
	}

	/*
	 * 默认配置
	 */
	let setDefaultSettings = function(settings) {
		let defaultSettings = settings;
		if (this instanceof TextWatermark) {
			if (this.style instanceof PositionWatermarkStyle) {
				defaultSettings = Object.assign(POSITION_TEXT_WATERMARK_SETTINGS, settings);
			}
		}
	};

	// 固定位置文本水印默认配置
	let POSITION_TEXT_WATERMARK_SETTINGS = {
		text : '文本水印',
		color : 'gray',
		fontFamily : '楷体',
		fontSize : '30px',
		opacity : 0.5, // 不透明度（范围 0~1: 0-完全透明，1-完全不透明）
		format : 'horizontal', // 版式：horizontal-水平，vertical-垂直，oblique-斜式
		style : 'position', // 水印风格：position-固定位置，repeat-重复
		xOffset : '30px', // x轴偏移量
        yOffset : '30px', // y轴偏移量
		positions : ['left-top', 'left-bottom', 'right-top', 'right-bottom', 'center']
	};

	// 重复文本水印默认配置
	let REPEAT_TEXT_WATERMARK_SETTINGS = {
		text : '文本水印',
		color : 'gray',
		fontFamily : '楷体',
		fontSize : '30px',
		opacity : 0.5, // 不透明度（范围 0~1: 0-完全透明，1-完全不透明）
		format : 'oblique', // 版式：horizontal-水平，vertical-垂直，oblique-斜式
		style : 'repeat', // 水印风格：position-固定位置，repeat-重复
		rows : 20, // 行数
		cols : 30, // 列数
		xSpace : '30px', // x轴间距
		ySpace : '50px', // y轴间距
		xOffset : '-20px', // x轴偏移量
		yOffset : '20px' // y轴偏移量
	};

})();