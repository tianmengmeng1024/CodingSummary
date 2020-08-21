# 获取当前页面的URL(网址信息)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title></title>
		<script>
			var url;
 
			url = window.location.href; /* 获取完整URL */
			alert(url); /* http://127.0.0.1:8080/Test/index.html#test?name=test */
 
			url = window.location.pathname; /* 获取文件路径（文件地址） */
			alert(url); /* /Test/index.html */
 
			url = window.location.protocol; /* 获取协议 */
			alert(url); /* http */
 
			url = window.location.host; /* 获取主机地址和端口号 */
			alert(url); /* http://127.0.0.1:8080/ */
 
			url = window.location.hostname; /* 获取主机地址 */
			alert(url); /* http://127.0.0.1/ */
 
			url = window.location.port; /* 获取端口号 */
			alert(url); /* 8020 */
 
			url = window.location.hash; /* 获取锚点（“#”后面的分段） */
			alert(url); /* #test?name=test */
 
			url = window.location.search; /* 获取属性（“?”后面的分段） */
			alert(url);
 
			/* 如果需要URL中的某一部分，可以自己进行处理 */
			url = window.location.pathname;
			url = url.substring(url.lastIndexOf('/') + 1, url.length);
			alert(url); /* /index.html */
 
			/* 
			 * 如果页面使用了框架（frameset）
			 * 要获取到指定页面的URL
			 * 只要把window换成指定的页面即可
			 */
			/* 'frame'为指定页面的class名 */
			var url = window.parent.frames['frame'].location.href;
			/* 获取当前地址栏中显示的URL */
			var url = window.parent.location.href;
			/* window parent 可互换 */
			var url = parent.window.location.href;
		</script>
	</head>
	<body>
	</body>
</html>
```