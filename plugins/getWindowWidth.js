//=============================================================================
// getWindowWidth.js
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
			console.log("maxWidth");
			console.log(maxWidth);
			lineWidth = 0;
			break;
		default:
			if( text[index] >= '0' && text[index] <= '9' )
				lineWidth += fontSize / 2;
			else if( text[index] >= 'A' && text[index] <= 'Z' )
				lineWidth += fontSize / 2;
			else if( text[index] >= 'a' && text[index] <= 'z' )
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