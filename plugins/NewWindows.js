/*function Window_Testing() 
{
    this.initialize.apply(this, arguments);
}
Window_Testing.prototype = Object.create(Window_Selectable.prototype);

Window_Testing.prototype.initialize = function(x, y, width, height) 
{
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	var textW=360;
	var textH=0;
	this.drawText("Window 1",0,0,textW,'left');
	textH+=this.lineHeight();
	this.drawText("咪趴",0,textH,textW,'left');
	textH+=this.lineHeight();
	this.drawText("置中",0,textH,textW,'center');
	textH+=this.lineHeight();
	this.drawText("靠右",0,textH,textW,'right');
};*/
function getWindowPosition()
{
	throw new Error('This is a static class');
}

this.x = 0;		//eventX
this.y = 0;		//eventY
this.flag = 0;	//if 1, move the window above event

getWindowPosition.setFlag = function() {
	this.flag = 1;
}

getWindowPosition.pullFlag = function() {	//拔旗，對不起這是作者的惡趣味
	this.flag = 0;
}

getWindowPosition.isFlag = function() {
	return ( this.flag == 1 );
}

getWindowPosition.returnX = function() {
	return this.x;
}

getWindowPosition.returnY = function() {
	return this.y;
}

getWindowPosition.getXY = function( eventID ) {
	this.x = $gameMap.event( eventID ).screenX();
	this.y = $gameMap.event( eventID ).screenY();
	
	$gameVariables.setValue( 2, this.x );
	$gameVariables.setValue( 3, this.y );
}

//------------------------------------------------------------------------
function Scene_Testing() 
{
    this.initialize.apply(this, arguments);
}
Scene_Testing.prototype = Object.create(Scene_MenuBase.prototype);

Scene_Testing.prototype.initialize = function() 
{
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Testing.prototype.create = function() 
{
	//var x = $gameVariables.value(1);
	//var y = $gameVariables.value(2);
	//var x = $gameMap.event(1).screenX();
	//var y = $gameMap.event(1).screenY();
	
	Scene_MenuBase.prototype.create.call(this);
    this._commandWindow = new Window_Testing(0, 0, 400, 200);
    this.addWindow(this._commandWindow);
};

Scene_Testing.prototype.update = function() 
{
    if (Input.isTriggered('escape') || Input.isTriggered('cancel')) 
	{
        this._commandWindow.hide();
        SceneManager.goto(Scene_Map);
    }
};