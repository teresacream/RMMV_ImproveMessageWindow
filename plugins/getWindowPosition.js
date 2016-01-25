//=============================================================================
// getWindowPosition.js
//=============================================================================

function getWindowPosition()
{
	throw new Error('This is a static class');
}

/*getWindowPosition.x = 0;		//eventX
getWindowPosition.y = 0;		//eventY
getWindowPosition.flag = 0;	//if 1, move the window above event*/

getWindowPosition.setFlag = function() {
	this.flag = 1;
};

getWindowPosition.pullFlag = function() {	//拔旗，對不起這是作者的惡趣味
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
	this.x = $gameMap.event( eventID ).screenX();
	this.y = $gameMap.event( eventID ).screenY();
};