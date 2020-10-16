```js
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
```

## 调用
```js
// 生成海报 创建画布
createSharePoster() {
	uni.showLoading({
		title:'正在生成...'
	})
	var ctx = uni.createCanvasContext('sharePoster', this);
	// 每次都重置画布
	ctx.clearRect(0, 0, 252, 396);
	// 画背景图
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, 252, 396);
	// 顶部小程序logo
	ctx.drawImage('../../static/logo.png', 35, 24, 30, 30);
	// 顶部title
	ctx.setFillStyle('#333');
	ctx.setFontSize(14);
	ctx.fillText('顶部title', 75, 36);
	ctx.setFillStyle('#333');
	ctx.setFontSize(12);
	ctx.fillText('给您推荐了一个活动', 75, 54);
	// 阴影
	ctx.setShadow(0, 2, 8, 'rgba(0, 0, 0, 0.04)');
	// 画内容背景图 注：roundRect为封装的函数
	roundRect(ctx, 35, 68, 182, 300, 8, '#fff');
	// 阴影取消
	ctx.setShadow(0, 2, 8, 'rgba(0, 0, 0, 0)');
	// 现价
	ctx.setFillStyle('#FF282A');
	ctx.setFontSize(16);
	ctx.fillText(`￥99`, 45, 272);
	// 原价 加删除线
	ctx.setFillStyle('#bcbcbc');
	ctx.setFontSize(12);
	const originalPrice = this.detailData.originalPrice;
	if (originalPrice) {
		ctx.fillText(`￥${originalPrice}`, 47, 290);
		textLineThrough(ctx, `￥${originalPrice}`, 47, 274, 12, '#bcbcbc', 1, 0);
	}
	// 标题 超出换行
	ctx.setFillStyle('#333');
	ctx.setFontSize(12);
	textPrewrap(ctx, '标题 超出换行标题 超出换行标题 超出换行标题 超出换行标题 超出换行标题 超出换行标题 超出换行标题 超出换行标题 超出换行标题 超出换行标题 超出换行', 45, 310, 16, 80, 3);

	// 小程序码
	ctx.drawImage('../../static/code.png', 140, 290, 65, 65);

 	// 网络图片不存在
	if (!this.detailData.coverImg) {
		this.drawFun(ctx, 'sharePoster');
		return
	}
	
	let imageSrc = '';
	//如果图片是网络图片需要调用该函数转为本地图片地址
	this.handleNetImg(this.detailData.coverImg).then((res) => {
		imageSrc = res.path;
		// 商品图片
		ctx.drawImage(imageSrc, 35, 68, 182, 182);
		this.drawFun(ctx, 'sharePoster');
	}).catch((errorMsg) => {
		this.drawFun(ctx, 'sharePoster');
		uni.showToast({
			title: errorMsg,
			mask: true,
			icon: "none",
			duration: 1000
		})
	})
},
drawFun(ctx, canvasId) {
	//开始画画完后生成新的临时图片地址
	ctx.draw(false, () => {
		setTimeout(()=>{
			uni.canvasToTempFilePath({
				canvasId: canvasId,
				success: (res) => {
					uni.hideLoading();
					if (canvasId == 'sharePoster') {
						// posterTempUrl为生成的图片地址
						this.posterTempUrl = res.tempFilePath;
					}
				}
			});
		}, 200);
	})
},
handleNetImg(imagePath) {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: imagePath,
			success: function (res) {
				resolve(res);
			}
		});
	});
},
```