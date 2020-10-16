<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-content">
			<image src="https://wechatres.91bihu.com/FoyTktN5vUGKxh_IE58nJ5LRyWQ_" mode="widthFix" style="width: 660upx;height: 990upx;"></image>
			<image :src="src" mode="widthFix" style="width: 328upx;height: 328upx;"></image>
			<view class="ctext">
				{{title}}
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} mode = [base|input] 模式、
	 * 	@value base 基础对话框
	 * 	@value input 可输入对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 */
	export default {
		name: "ImagePop",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '提示'
			},
			/**
			 * 对话框内容
			 */
			src: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}
	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}
	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}
	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
		position: relative;
	}
	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}
	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}
	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}
	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}
	.uni-dialog-button-text {
		font-size: 14px;
	}
	.uni-button-color {
		color: $uni-color-primary;
	}
	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
	}
	.uni-popup__success {
		color: $uni-color-success;
	}
	.uni-popup__warn {
		color: $uni-color-warning;
	}
	.uni-popup__error {
		color: $uni-color-error;
	}
	.uni-popup__info {
		color: #909399;
	}
</style>