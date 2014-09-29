paella.plugins.FullScreenPlugin = Class.create(paella.ButtonPlugin, {
	getIndex:function() { return 551; },
	getAlignment:function() { return 'right'; },
	getSubclass:function() { return "showFullScreenButton"; },
	getName:function() { return "es.upv.paella.fullScreenButtonPlugin"; },
	checkEnabled:function(onSuccess) {
		var enabled = (!paella.extended) && (paella.player.checkFullScreenCapability());
		if (base.userAgent.browser.IsMobileVersion) {
			enabled = paella.player.videoContainer.isMonostream && (enabled);
		}
		onSuccess(enabled);
	},
	getDefaultToolTip:function() { return base.dictionary.translate("Go Fullscreen"); },

	setup:function() {
		var thisClass = this;
		paella.events.bind(paella.events.enterFullscreen, function(event) { thisClass.onEnterFullscreen(); });
		paella.events.bind(paella.events.exitFullscreen, function(event) { thisClass.onExitFullscreen(); });
	},

	action:function(button) {
		this.doFullScreen(button);
	},

	doFullScreen:function(button) {
		var fs = document.getElementById(paella.player.mainContainer.id);
		fs.style.width = '100%';
		fs.style.height = '100%';
		
		if (paella.player.isFullScreen()) {
			paella.player.exitFullScreen();			
		}
		else {
			paella.player.goFullScreen();
			if (this.isFullscreen() == false) {
				alert(base.dictionary.translate('Your browser does not support fullscreen mode'));
			}
		}
	},

	isFullscreen:function() {
		return paella.player.isFullScreen();
	},

	onEnterFullscreen: function() {
		this.setToolTip(base.dictionary.translate("Exit Fullscreen"));
		this.button.className = this.getButtonItemClass(true);		
	},
	
	onExitFullscreen: function() {
		this.setToolTip(base.dictionary.translate("Go Fullscreen"));
		this.button.className = this.getButtonItemClass(false);		
	},


	getButtonItemClass:function(selected) {
		return 'buttonPlugin '+this.getAlignment() +' '+ this.getSubclass() + ((selected) ? ' active':'');
	}
});

paella.plugins.fullScreenPlugin = new paella.plugins.FullScreenPlugin();
