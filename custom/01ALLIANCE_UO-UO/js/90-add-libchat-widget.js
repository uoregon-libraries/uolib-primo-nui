(() => {
	const libchatHash = 'a54710f6510ca38fd3242978d83b43b244f09c53eca366af507d822302de9a79'; 
	const almaDStr = `https://${location.hostname}/discovery/delivery/`; // indicates Alma-D viewer
    const host = 'uoregon.libanswers.com';
	const div = document.createElement('div');
	div.id = `libchat_${libchatHash}`;
	document.getElementsByTagName('body')[0].appendChild(div);
	const scr = document.createElement('script');
	scr.src = `https://${host}/load_chat.php?hash=${libchatHash}`;
	setTimeout(() => {
		if (location.href.indexOf(almaDStr) !== 0) {
			// don't include in Alma viewer
			document.getElementsByTagName('body')[0].appendChild(scr);
		}
	}, 2000);
})();
(() => {
	const libchatHash = 'da6b63e0a9c4a519fef69a45b56b59c19dae46e8ea41eb53790bafdf1c695776'; 
	const almaDStr = `https://${location.hostname}/discovery/delivery/`; // indicates Alma-D viewer
    const host = 'uoregon.libanswers.com';
	const div = document.createElement('div');
	div.id = `libchat_${libchatHash}`;
	document.getElementsByTagName('body')[0].appendChild(div);
	const scr = document.createElement('script');
	scr.src = `https://${host}/load_chat.php?hash=${libchatHash}`;
	setTimeout(() => {
		if (location.href.indexOf(almaDStr) !== 0) {
			// don't include in Alma viewer
			document.getElementsByTagName('body')[0].appendChild(scr);
		}
	}, 2000);
})();
(() => {
	const libchatHash = '1f1d92135522a24b42f965b500a7d3debc475463e911b51fe7c02733d4b17857'; 
	const almaDStr = `https://${location.hostname}/discovery/delivery/`; // indicates Alma-D viewer
    const host = 'uoregon.libanswers.com';
	const div = document.createElement('div');
	div.id = `libchat_${libchatHash}`;
	document.getElementsByTagName('body')[0].appendChild(div);
	const scr = document.createElement('script');
	scr.src = `https://${host}/load_chat.php?hash=${libchatHash}`;
	setTimeout(() => {
		if (location.href.indexOf(almaDStr) !== 0) {
			// don't include in Alma viewer
			document.getElementsByTagName('body')[0].appendChild(scr);
		}
	}, 2000);
})();
