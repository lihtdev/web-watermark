/**
 * watermarkSettings 参数传入该js，参数格式如下：
 * watermarkSettings = {
 *    watermarkText:"text", // 水印内容
 *    watermarkColor:"000000", // 水印字体颜色
 *    watermarkTransparency:30, // 水印透明度
 *    watermarkFontSize:"40", // 水印字体大小
 *    watermarkFont:"微软雅黑", // 水印字体
 *    watermarkFormat:15, // 水印倾斜度数,
 *    watermarkStyle:1, // 显示风格 1固定位置 2固定数量
 *    watermarkPosition:"1,2,3,4", // 水印位置 1居中 2左上 3左下 4右上 5右下
 *    watermark_x:20, // 水印起始位置x轴坐标
 *    watermark_y:20, // 水印起始位置Y轴坐标
 *    verticalCount:20, // 水印纵向个数
 *    horizontalCount:20, // 水印横向个数
 *    watermark_x_space:20, // 水印x轴间隔
 *    watermark_y_space:20, // 水印y轴间隔
 *    watermark_width:100, // 水印宽度
 *    watermark_height:100 // 水印长度
 * }
 * @author lihaitao
 * @date 2021/4/26
 */
window.onload = function() {
    if (!watermarkSettings) {
        return;
    }
    let watermarkObj = JSON.parse(watermarkSettings);
    let watermarkLayer = document.getElementById('watermark-layer');
    let settings = {
        text : watermarkObj.watermarkText,
        color : previewConverter.color(watermarkObj.watermarkColor),
        fontFamily : watermarkObj.watermarkFont,
        fontSize : previewConverter.fontSize(watermarkObj.watermarkFontSize),
        opacity : previewConverter.opacity(watermarkObj.watermarkTransparency),
        format : previewConverter.format(watermarkObj.watermarkStyle, watermarkObj.watermarkFormat),
        style : previewConverter.style(watermarkObj.watermarkStyle),
        positions : previewConverter.positions(watermarkObj.watermarkPosition),
        cols : watermarkObj.verticalCount,
        rows : watermarkObj.horizontalCount,
        xSpace : previewConverter.getNumberWithPx(watermarkObj.watermark_x_space),
        ySpace : previewConverter.getNumberWithPx(watermarkObj.watermark_y_space)
    };
    new watermark.Text(watermarkLayer, settings).create();
};

let previewConverter = {
    color : function (value) {
        if (value) {
            value += '';
            return value.startsWith('#') ? value : '#' + value;
        }
        return null;
    },
    fontSize : function (value) {
        if (value) {
            value += '';
            return value.endsWith('px') ? value : value + 'px';
        }
        return null;
    },
    opacity : function (value) {
        if (value) {
            value = Number(value);
            return value < 1 ? value : value / 100;
        }
        return null;
    },
    format : function (style, value) {
        if (style === 1) {
            return 'horizontal';
        }
        if (!value) {
            return null;
        } else if (value === 0) {
            return 'horizontal';
        } else if (value === 90) {
            return 'vertical';
        } else {
            return 'oblique';
        }
    },
    style : function (value) {
        if (value) {
            return value === 1 ? 'position' : 'repeat';
        }
        return null;
    },
    positions : function (value) {
        if (!value) {
            return null;
        }
        let pos = { '1' : 'center', '2' : 'left-top', '3' : 'left-bottom', '4' : 'right-top', '5' : 'right-bottom' };
        value += '';
        let oldPosArray = value.split(',');
        let newPosArray = [];
        for (let i = 0; i < oldPosArray.length; i++) {
            let newPos = pos[oldPosArray[i]];
            if (newPos) {
                newPosArray.push(newPos);
            }
        }
        return newPosArray;
    },
    getNumberWithPx : function (value) {
        if (typeof value === 'number') {
            return value + 'px';
        }
        if (typeof value === 'string') {
            if (value.endsWith('px')) {
                return value;
            } else {
                return value + 'px';
            }
        }
        return 0;
    }
};
