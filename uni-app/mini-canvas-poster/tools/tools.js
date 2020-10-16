// 获取url参数
export const getUrlParms = (name) => {
    var reg = new RegExp("(^|&\?)" + name + "=([^&]*)(&|$)", "i"); //这里用了蓝色那个问号是因为有可能获取的是第一个参数
      var r = window.location.href.substr(1).match(reg);
      if (r != null) return unescape(r[2]); 
      return null;
};
// 获后台生成小程序码特殊场景（包含scene字段）的参数 
export const getMiniUrlParms = (scene, name) => {
    var reg = new RegExp("(^|&\)" + name + "=([^&]*)(&|$)", "i"); //这里用了蓝色那个问号是因为有可能获取的是第一个参数
        var r = scene.match(reg);
        if (r != null) return unescape(r[2]); 
        return null;
};
// 按钮防抖
export const debounce = (function () {
    function debounce(func, wait, immediate) {
        var timeout, result;
        return function () {
            var context = this;
            var args = arguments;
            if (timeout) clearTimeout(timeout);
            if (immediate) {
                var callNow = !timeout;
                timeout = setTimeout(function () {
                    timeout = null;
                }, wait);
                if (callNow) result = func.apply(context, args);
            } else {
                timeout = setTimeout(function () {
                    func.apply(context, args);
                }, wait);
            }
            return result;
        };
    }
    return debounce;
})();
/**
 * canvas绘制圆角矩形
 * @param {Object} ctx - canvas组件的绘图上下文
 * @param {Number} x - 矩形的x坐标
 * @param {Number} y - 矩形的y坐标
 * @param {Number} w - 矩形的宽度
 * @param {Number} h - 矩形的高度
 * @param {Number} r - 矩形的圆角半径
 * @param {String} [c = 'transparent'] - 矩形的填充色
 */
export const roundRect = (ctx, x, y, w, h, r, c = '#fff') => {
    if (w < 2 * r) {
        r = w / 2;
    }
    if (h < 2 * r) {
        r = h / 2;
    }

    ctx.beginPath();
    ctx.fillStyle = c;

    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.lineTo(x + w, y + r);

    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + w, y + h - r);
    ctx.lineTo(x + w - r, y + h);

    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    ctx.lineTo(x + r, y + h);
    ctx.lineTo(x, y + h - r);

    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);

    ctx.fill();
    ctx.closePath();
}

/**
 * canvas文字自动换行
 * @param {Object} ctx - 画布的上下文环境
 * @param {String} content - 须要绘制的文本内容
 * @param {Number} drawX - 绘制文本的x坐标
 * @param {Number} drawY - 绘制文本的y坐标
 * @param {Number} lineHeight - 文本之间的行高
 * @param {Number} lineMaxWidth - 每行文本的最大宽度
 * @param {Number} lineNum - 最多绘制的行数
 */
export const textPrewrap = (ctx, content, drawX, drawY, lineHeight, lineMaxWidth, lineNum) => {
    var drawTxt = ''; // 当前绘制的内容
    var drawLine = 1; // 第几行最先绘制
    var drawIndex = 0; // 当前绘制内容的索引

    // 推断内容是不是能够一行绘制终了
    if (ctx.measureText(content).width <= lineMaxWidth) {
        ctx.fillText(content.substring(drawIndex, i), drawX, drawY);
    } else {
        for (var i = 0; i < content.length; i++) {
            drawTxt += content[i];
            if (ctx.measureText(drawTxt).width >= lineMaxWidth) {
                if (drawLine >= lineNum) {
                    ctx.fillText(content.substring(drawIndex, i) + '..', drawX, drawY);
                    break;
                } else {
                    ctx.fillText(content.substring(drawIndex, i + 1), drawX, drawY);
                    drawIndex = i + 1;
                    drawLine += 1;
                    drawY += lineHeight;
                    drawTxt = '';
                }
            } else {
                // 内容绘制终了，然则剩下的内容宽度不到lineMaxWidth
                if (i === content.length - 1) {
                    ctx.fillText(content.substring(drawIndex), drawX, drawY);
                }
            }
        }
    }
}
/**
 * canvas文字删除线
 * @param {Object} ctx - 画布的上下文环境
 * @param {String} text - 须要绘制的文本内容
 * @param {Number} x - 绘制文本的x坐标
 * @param {Number} y - 绘制文本的y坐标
 * @param {Number} size - 文本字号
 * @param {String} color - 文本颜色
 * @param {Number} thickness - 删除线粗细
 * @param {Number} offset - 线偏移量
 */
export const textLineThrough = (ctx, text, x, y, size, color, thickness, offset) => {
    var width = ctx.measureText(text).width;

    switch (ctx.textAlign) {
        case "center":
            x -= (width / 2);
            break;
        case "right":
            x -= width;
            break;
    }

    y += size + offset;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();
}