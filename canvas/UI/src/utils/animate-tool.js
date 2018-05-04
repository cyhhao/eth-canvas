class AnimateTool {
	static scrollTo(element, to, duration) {
		if (duration <= 0) return;
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;
		setTimeout(function () {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop === to) return;
			AnimateTool.scrollTo(element, to, duration - 10);
		}, 10);
	}

	static windowScrollTo(to, duration) {
		if (duration <= 0) return;
		var difference = to - AnimateTool.getWindowScrollTop();
		var perTick = difference / duration * 10;
		setTimeout(function () {
			scrollTo(0,AnimateTool.getWindowScrollTop() + perTick);
			if (AnimateTool.getWindowScrollTop() === to) return;
			AnimateTool.scrollTo(to, duration - 10);
		}, 10);
	}

	static getWindowScrollTop() {
		if (typeof pageYOffset != 'undefined') {
			//most browsers except IE before #9
			return pageYOffset;
		}
		else {
			var B = document.body; //IE 'quirks'
			var D = document.documentElement; //IE with doctype
			D = (D.clientHeight) ? D : B;
			return D.scrollTop;
		}
	}
}

export default AnimateTool;
