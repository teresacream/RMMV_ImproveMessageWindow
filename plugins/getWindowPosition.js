//=============================================================================
// getWindowPosition.js
//=============================================================================

function getWindowPosition()
{
	throw new Error('This is a static class');
}

getWindowPosition.flag = 0;	//if 1, move the window above event

getWindowPosition.Enable = function() {
	this.flag = 1;
};

getWindowPosition.Disable = function() {
	this.flag = 0;
};

getWindowPosition.isFlag = function() {
	return this.flag == 1;
};

getWindowPosition.returnX = function() {
	return this.x;
};

getWindowPosition.returnY = function() {
	return this.y;
};

getWindowPosition.getXY = function( eventID ) {
	if (eventID == 0) {
		this.x = $gamePlayer.screenX();
		this.y = $gamePlayer.screenY();
	}
	else if (eventID < 0) {
		this.x = $gamePlayer.followers().follower(0 - (eventID + 1)).screenX();
		this.y = $gamePlayer.followers().follower(0 - (eventID + 1)).screenY();
	}
	else {
	this.x = $gameMap.event( eventID ).screenX();
	this.y = $gameMap.event( eventID ).screenY();
	}
};

getWindowPosition.adjustX = function( x, width ) {
	var x_left = x - width / 2;
	var x_right = x_left + width;
	
	if (x_right > 816)
		return 816 - width;
	else if (x_left < 0)
		return 0;
	else
		return x_left;
};

getWindowPosition.adjustY = function( y, height ) {
	var y_down = y - 48;
	var y_up = y_down - height;
	
	if(y_up < 0)
		return y;
	else
		return  y_up;
};
