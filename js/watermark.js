/*
 * 网页水印
 * 
 * @author lihaitao
 * @date 2021/4/26
 */
(function() {

	function TextWatermark(element, settings) {
		Watermark.call(this, element, settings);
		this.text = settings.text;
		this.color = settings.color;
		this.fontFamily = settings.fontFamily;
		this.fontSize = settings.fontSize;
	}

	function Watermark(element, settings) {
		this.element = element;
		this.style = style;
	}

	function PositionWatermarkStyle(settings) {
		WatermarkStyle.call(this, settings);
		this.position = settings.position;
	}

	function RepeatWatermarkStyle(settings) {
		WatermarkStyle.call(this, settings);
		this.cols = settings.cols;
		this.rows = settings.rows;
		this.xSpace = settings.xSpace;
		this.ySpace = settings.ySpace;
		this.xStart = settings.xStart;
		this.yStart = settings.yStart;
	}

	function WatermarkStyle(settings) {
		// 不透明度（范围 0~1: 0-完全透明，1-完全不透明）
		this.opacity = settings.opacity;
		// 旋转度
		this.rotateDeg = formatDeg[settings.format];
	}

	
	/*
	 * 水印版式：水平，垂直，倾斜
	 */
	var formatDeg = {
		"horizontal" : 0,
		"vertical" : -90,
		"oblique" : -45
	}

	/*
	 * 水印位置：左上，左下，右上，右下，居中
	 */
	var positionClass = {

	}


})();