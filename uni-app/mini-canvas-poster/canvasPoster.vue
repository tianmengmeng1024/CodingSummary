<template>
	<view class="bgfff fullPage">
		<!-- canvas画布，在调试的时候可以将隐藏样式先去掉；
		注意：不能用display:none;或者是opacity:0;之类的隐藏画布，
		这些在编译器上不显示，但是在真机运行时是会显示出来的。 -->
		<view class="canvas-box">
			<canvas canvas-id="sharePoster" style="width: 252px; height: 396px"></canvas>
		</view>

		<button style="margin: 1px 0 0" @tap="popupVisible('popupPoster')">
			生成海报
		</button>
		<!-- 海报 -->
		<uni-popup ref="popupPoster" type="center" :animation="true" :maskClick="false">
			<view class="popup-qrcode">
				<image src="../../static/img/close-qrcode.png" mode="widthFix" @tap="popupClose('popupPoster')" class="qr-close"></image>
				<view class="qr-content" style="width: 252px; padding: 0">
					<image :src="posterTempUrl" class="download-img"></image>
				</view>
				<view class="qr-btn" @tap="saveImage(posterTempUrl)">保存图片</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getUrlParms,
		getMiniUrlParms,
		roundRect,
		textPrewrap,
		textLineThrough,
	} from "../../js_sdk/tools/tools.js";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				params: {},
				openId: "",
				sessionKey: "",
				unionId: "",
				apiConfig: {
					GetCommodityDetail: "Commodity/GetCommodityDetail", // 商品详情
					GetCompDetail: "Comp/GetCompDetail", // 商户详情
				},
				popQrcode: false, // 客服二维码
				CommodityCode: "", // 商品编码
				CompId: "", // 商户ID
				detailData: {}, // 商品详情
				compDetailData: {}, // 商户详情
				buttonFlag: true, // 授权按钮
				qrCode: "", // 二维码
				qrCodeUrl: "", // 二维码相对路径
				posterTempUrl: "", // canvas生成海报
			};
		},
		created() {},
		components: {
			uniPopup,
		},
		onLoad(options) {
			console.log(options);
			this.$mta.Page.init();
			let getCode = "",
				getId = "",
				sceneQuery = "";
			if (options.scene) {
				// 管理后台扫码获取的参数
				sceneQuery = decodeURIComponent(options.scene);
			}
			let value = uni.getStorageSync("userInfo");
			// #ifdef MP-WEIXIN
			getCode = options.commoditycode || getMiniUrlParms(sceneQuery, "p");
			getId =
				getApp().globalData.compId ||
				options.compid ||
				getMiniUrlParms(sceneQuery, "c");
			// #endif

			this.CommodityCode = getCode;
			this.CompId = getId;

			let guid = uni.getStorageSync("guid");
			if (guid) {
				this.openId = guid.openId;
				this.sessionKey = guid.sessionKey;
				this.unionId = guid.unionId;
				let _this = this;
				uni.checkSession({
					success() {
						console.log("productinfo session_key 未过期");
						//session_key 未过期，并且在本生命周期一直有效
					},
					fail() {
						console.log("productinfo session_key过期");
						// session_key 已经失效，需要重新执行登录流程
					},
				});
			}

			// #ifdef MP-WEIXIN
			this.getDetail(getCode, getId);
			this.getCompDetail(getId);
			this.getQRCode(getId); // 联系二维码
			// #endif
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage: function(options) {
			var _this = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: "[好友推荐]" + _this.detailData.name, // 默认是小程序的名称(可以写slogan等)
				path: `/shop/productinfo/productinfo?commoditycode=${_this.CommodityCode}&compid=${_this.CompId}`, // 默认是当前页面，必须是以‘/’开头的完整路径
				imageUrl: _this.detailData.shareCoverImg || "", //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
				success: function(res) {
					// 转发成功之后的回调
					console.log(res);
					if (res.errMsg == "shareAppMessage:ok") {}
				},
				fail: function(res) {
					// 转发失败之后的回调
					console.log(res);
					if (res.errMsg == "shareAppMessage:fail cancel") {
						// 用户取消转发
					} else if (res.errMsg == "shareAppMessage:fail") {
						// 转发失败，其中 detail message 为详细失败信息
					}
				},
			};
			// 返回shareObj
			return shareObj;
		},
		// #endif
		methods: {
			// 获取商品详情
			getDetail(CommodityCode, CompId) {
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				this.$httpForContent
					.get(this.apiConfig.GetCommodityDetail, {
						params: {
							CommodityCode,
							CompId,
						},
					})
					.then((res) => {
						if (res.data.code == 1) {
							console.log(res.data.data);
							this.detailData = res.data.data;

							uni.hideLoading();
						} else {
							uni.hideLoading();
							uni.showToast({
								title: res.data.message,
								icon: "none",
							});
						}
					})
					.catch((error) => {
						console.log(error);
						uni.hideLoading();
						uni.showToast({
							title: error,
							icon: "none",
						});
					});
			},

			// 获取商户详情
			getCompDetail(CompId) {
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				this.$httpForContent
					.get(this.apiConfig.GetCompDetail, {
						params: {
							CompId,
						},
					})
					.then((res) => {
						if (res.data.code == 1) {
							console.log(res.data.data);
							this.compDetailData = res.data.data;
							if (res.data.data.compName) {
								uni.setNavigationBarTitle({
									title: res.data.data.compName || "商品详情",
								});
							}
							uni.hideLoading();
						} else {
							uni.hideLoading();
							uni.showToast({
								title: res.data.message,
								icon: "none",
							});
						}
					})
					.catch((error) => {
						console.log(error);
						uni.hideLoading();
						uni.showToast({
							title: error,
							icon: "none",
						});
					});
			},

			// 海报弹框
			popupVisible(ref) {
				this.$refs[ref].open();
				if (ref == 'popupPoster') {
					this.createSharePoster();
				}
			},

			popupClose(ref) {
				this.$refs[ref].close();
			},

			// 保存到相册
			saveImage(canvasToUrl) {
				const _this = this;
				uni.authorize({
					scope: "scope.writePhotosAlbum",
					success() {
						console.log("授权成功");
						_this.saveImageToPhotosAlbum(canvasToUrl);
					},
					fail() {
						console.log("拒绝授权保存到相册");
						uni.getSetting({
							success(res) {
								console.log("getSetting", res.authSetting);
								if (!res.authSetting["scope.writePhotosAlbum"]) {
									uni.openSetting({
										success(res2) {
											console.log("openSetting", res2.authSetting);
											if (res2.authSetting["scope.writePhotosAlbum"]) {
												_this.saveImageToPhotosAlbum(canvasToUrl);
											}
										},
									});
								}
							},
						});
					},
				});
			},
			handleNetImg(imagePath) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imagePath,
						success: function(res) {
							resolve(res);
						},
					});
				});
			},
			getImageInfo(absoluteUrl, isFirst) {
				const _this = this;
				this.handleNetImg(absoluteUrl)
					.then((image) => {
						console.log(image.path);
						if (isFirst) {
							_this.qrCodeUrl = image.path;
						} else {
							_this.saveImageToPhotosAlbum(image.path);
						}
					})
					.catch((errorMsg) => {
						uni.showToast({
							title: errorMsg,
							mask: true,
							icon: "none",
							duration: 1000,
						});
					});
			},
			saveImageToPhotosAlbum(src) {
				const _this = this;
				uni.showToast({
					title: "正在保存...",
					icon: "loading",
					duration: 2200,
				});
				uni.saveImageToPhotosAlbum({
					filePath: src,
					success: function() {
						console.log("save success");
						uni.showToast({
							title: "保存成功",
							icon: "success",
							duration: 2200,
						});
						_this.popupClose("popupPoster");
					},
				});
			},

			// 联系二维码
			getQRCode(compId) {
				const _this = this;
				this.$httpForContent
					.get("MarketingOrder/QRCode", {
						params: {
							compId,
						},
					})
					.then((res) => {
						if (res.data.code == 1) {
							console.log(res.data.data);
							_this.qrCode = res.data.data.qrCode;
							_this.getImageInfo(res.data.data.qrCode, true);
						} else {
							uni.showToast({
								title: res.data.message,
								icon: "none",
							});
						}
					})
					.catch((error) => {
						console.log(error);
						uni.showToast({
							title: error,
							icon: "none",
						});
					});
			},

			// 生成海报 创建画布
			createSharePoster() {
				uni.showLoading({
					title: "正在生成...",
				});
				var ctx = uni.createCanvasContext("sharePoster", this);
				// 每次都重置画布
				ctx.clearRect(0, 0, 252, 396);
				// 画背景图
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, 252, 396);
				// 顶部小程序logo
				ctx.drawImage("../../static/love-logo.png", 35, 24, 30, 30);
				// 顶部title
				ctx.setFillStyle("#333");
				ctx.setFontSize(14);
				ctx.fillText("这是用户昵称", 75, 36);
				ctx.setFillStyle("#333");
				ctx.setFontSize(12);
				ctx.fillText("给您推荐了一个活动", 75, 54);
				// 阴影
				ctx.setShadow(0, 2, 8, "rgba(0, 0, 0, 0.04)");
				// 画内容背景图 注：roundRect为封装的函数
				roundRect(ctx, 35, 68, 182, 300, 8, "#fff");
				// 阴影取消
				ctx.setShadow(0, 2, 8, "rgba(0, 0, 0, 0)");
				// 现价
				ctx.setFillStyle("#FF282A");
				ctx.setFontSize(16);
				ctx.fillText(`￥${this.detailData.currentPrice || 0}`, 45, 272);
				// 原价 加删除线
				ctx.setFillStyle("#bcbcbc");
				ctx.setFontSize(12);
				const originalPrice = this.detailData.originalPrice;
				if (originalPrice) {
					ctx.fillText(`￥${originalPrice}`, 47, 290);
					textLineThrough(
						ctx,
						`￥${originalPrice}`,
						47,
						274,
						12,
						"#bcbcbc",
						1,
						0
					);
				}
				// 标题 超出换行
				ctx.setFillStyle("#333");
				ctx.setFontSize(12);
				textPrewrap(ctx, this.detailData.name, 45, 310, 16, 80, 3);

				// 小程序码
				ctx.drawImage(this.qrCodeUrl, 140, 290, 65, 65);

				if (!this.detailData.coverImg) {
					this.drawFun(ctx, "sharePoster");
					return;
				}

				let imageSrc = "";
				//如果图片是网络图片需要调用该函数转为本地图片地址
				this.handleNetImg(this.detailData.coverImg)
					.then((res) => {
						imageSrc = res.path;
						// 商品图片
						ctx.drawImage(imageSrc, 35, 68, 182, 182);
						this.drawFun(ctx, "sharePoster");
					})
					.catch((errorMsg) => {
						this.drawFun(ctx, "sharePoster");
						uni.showToast({
							title: errorMsg,
							mask: true,
							icon: "none",
							duration: 1000,
						});
					});
			},
			drawFun(ctx, canvasId) {
				//开始画画完后生成新的临时图片地址
				ctx.draw(false, () => {
					setTimeout(() => {
						uni.canvasToTempFilePath({
							canvasId: canvasId,
							success: (res) => {
								uni.hideLoading();
								if (canvasId == "sharePoster") {
									this.posterTempUrl = res.tempFilePath;
								}
							},
						});
					}, 200);
				});
			},
		},
	};
</script>

<style lang="scss">
	@import "@/lib/style.scss";

	button {
		display: block;
		width: 200px;
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		padding: 0;
		color: #fff;
		background-color: #ff282a;
		border: none;
		border-radius: 16px;
		margin: 20px auto !important;
	}

	button::after {
		border: none;
		font-size: 14px;
		color: #fff;
		border-radius: 16px;
	}

	.popup-qrcode {
		position: relative;
		text-align: center;

		.qr-close {
			width: 32px;
			height: 32px;
			position: absolute;
			right: -32px;
			top: -48px;
		}

		.qr-content {
			// width: 252px;
			width: 200px;
			// height: 396px;
			background: #ffffff;
			border-radius: 8px;
			padding: 20px 26px;
			font-size: 0;
			overflow: hidden;

			.qr-title {
				font-size: 16px;
				color: #333333;
				line-height: 24px;
			}

			.down-img {
				width: 200px;
				height: 200px;
				margin: 20px 0;
			}

			.steward-tips {
				text-align: center;
				font-size: 14px;
				font-weight: 400;
				color: #999999;
				line-height: 20px;

				view {
					margin: 2px 0;
				}
			}

			// 合成图
			.download-img {
				width: 252px;
				height: 396px;
				border-radius: 8px;
			}
		}

		.qr-btn {
			width: 252px;
			height: 44px;
			line-height: 44px;
			background: #ff282a;
			border-radius: 22px;
			text-align: center;
			color: #fff;
			font-size: 18px;
			margin-top: 20px;
		}
	}

	.canvas-box {
		width: 0px;
		height: 0px;
		overflow: hidden;
		position: absolute;
		top: -1000px;
	}
</style>
