//=============================================================================
//
// 改寫Window_Message
//
//=============================================================================
Window_Message.prototype.updatePlacement = function() {
	if( getWindowPosition.isFlag() ) {
		var width = getWindowWidth.measureWidth(getWindowWidth.getNormalChar(this._textState)) + this.standardPadding() / 2;		
		var height = this.calcTextHeight( this._textState, true )  + this.lineHeight();
		var x = getWindowPosition.adjustX( getWindowPosition.returnX(), width );
		var y = getWindowPosition.adjustY( getWindowPosition.returnY(), height );
		
		if( this.x != x || this.y != y || this.height != height || this.width != width ) {
			this.x = x;
			this.y = y;
			this.height = height;
			this.width = width;
			this.move( this.x, this.y, this.width , this.height );
		}
	}
	else {
		this.width = this.windowWidth();
		this.height = this.windowHeight();
		this.x = (Graphics.boxWidth - width) / 2;
		this._positionType = $gameMessage.positionType();
		this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
		this.move( this.x, this.y, this.width , this.height );
	}
    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};


//=============================================================================
// getWindowPosition
// 
// static class
// 獲得對話框位置
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
	
	if (x_right > Graphics.boxWidth)
		return Graphics.boxWidth - width;
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


//=============================================================================
// getWindowWidth
//
// static Class
// 獲得對話框寬度
//=============================================================================
function getWindowWidth()
{
	throw new Error('This is a static class');
}

getWindowWidth.getNormalChar = function(textState) {
	var normalText = [];
	textState.index = 0;
    while (textState.index < textState.text.length) {
		switch (textState.text[textState.index]) {
		case '\f':
			textState.index++;
			break;
		case '\x1b':
			this.deleteEscapeCharacter(this.obtainEscapeCode(textState), textState, normalText);
			break;
		case '\n':
		default:
			normalText.push( textState.text[textState.index] );
			textState.index++;
			break;
		}
	}
	textState.index = 0;
	return normalText;
};

getWindowWidth.deleteEscapeCharacter = function(code, textState, normalText) {
    switch (code) {
    case 'C':
    case 'I':
		this.obtainEscapeParam(textState);
		break;
    case '{':
		normalText.push( '{' );
		break;
    case '}':
		normalText.push( '}' );
        break;
    }
};

getWindowWidth.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return '';
    }
};

getWindowWidth.obtainEscapeParam = function(textState) {
    var arr = /^\[\d+\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return parseInt(arr[0].slice(1));
    } else {
        return '';
    }
};

getWindowWidth.measureWidth = function(text) {
	var index = 0;
	var fontSize = 28;
	var lineWidth = 0;
	var maxWidth = 0;
	while( index < text.length )
	{
		switch(text[index]) {
		case '{': 
			if (fontSize <= 96) {
				fontSize += 12;
			}
			break;
		case '}': 
			if (fontSize >= 24) {
				fontSize -= 12;
			}
			break;
		case ']':
		case '[':
			break;
		case '\n':
			lineWidth += fontSize;
			if( lineWidth > maxWidth ) {
				maxWidth = lineWidth;
			}
			lineWidth = 0;
			break;
		default:
			if( text[index] >= '!' && text[index] <= '~' )
				lineWidth += fontSize / 2;
			else
				lineWidth += fontSize;
			break;
		}
		index++;
	}
	
	lineWidth += fontSize;
	if( lineWidth > maxWidth ) {
		maxWidth = lineWidth;
	}
	return maxWidth;
};
