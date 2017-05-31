;(function(win, lib) {
	var doc = win.document;
	var docEl = doc.documentElement;
	var galleryFlex = lib.galleryFlex || (lib.galleryFlex = {});
	var dpr = 0;
	var tid;
	var isAndroid;
	var isIphone;

	if(!dpr) {
		isAndroid = win.navigator.appVersion.match(/android/gi);
		isIphone = win.navigator.appVersion.match(/iphone/gi);
		var devicePixelRatio = win.devicePixelRatio;
		if(isIphone) {
			// iOS 下，屏幕倍率方案
			if(devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
				dpr = 3;
			} else if( devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
				dpr = 2;
			} else {
				dpr = 1;
			}
		} else {
			// 其他设备下，使用 1 倍方案
			dpr = 1;
		}
	}

	docEl.setAttribute('data-dpr', dpr);

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;

		/*
		 * width 获取视口的宽度
		 * 19.2 的值是根据设计稿确定
		 * 当设计稿为 750 时，可以的值是 7.5
		 * 当设计稿为 640 时，可以的值是 6.4
		 * 当设计稿为 1920 时，可以的值是 19.2
		 * 
		 */
		var rem = width / 19.2;
		docEl.style.fontSize = rem + 'px';
		galleryFlex.rem = win.rem = rem;
	}

	win.addEventListener('resize', function() {
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);
	win.addEventListener('pageshow', function(e) {
		if(e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = 12 * dpr + 'px';
	} else {
		doc.addEventListener('DOMContentLoaded', function() {
			doc.body.style.fontSize = 12 * dpr + 'px';
		}, false);
	}

	refreshRem();

	galleryFlex.dpr = win.dpr = dpr;
	galleryFlex.refreshRem = refreshRem;
	galleryFlex.isIphone = isIphone;
	galleryFlex.isAndroid = isAndroid;

})(window, window['lib'] || (window['lib'] = {}));