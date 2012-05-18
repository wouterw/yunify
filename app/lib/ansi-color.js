(function() {
// ANSI color code outputs for strings

var ANSI_CODES = {
  "off": 0,
  "bold": 1,
  "italic": 3,
  "underline": 4,
  "blink": 5,
  "inverse": 7,
  "hidden": 8,
  "black": 30,
  "red": 31,
  "green": 32,
  "yellow": 33,
  "blue": 34,
  "magenta": 35,
  "cyan": 36,
  "white": 37,
  "black_bg": 40,
  "red_bg": 41,
  "green_bg": 42,
  "yellow_bg": 43,
  "blue_bg": 44,
  "magenta_bg": 45,
  "cyan_bg": 46,
  "white_bg": 47
};

function setColor(str,color) {
  if(!color) return str;
  var color_attrs = color.split("+");
  var ansi_str = "";
  for(var i=0, attr; attr = color_attrs[i]; i++) {
    ansi_str += "\033[" + ANSI_CODES[attr] + "m";
  }
  ansi_str += str + "\033[" + ANSI_CODES["off"] + "m";
  return ansi_str;
}

function logMessage(message,color) {
  console.log(setColor(message,color));
}

function replace(full_text, search_regex, color) {
  try {
  var regex = new RegExp('(' + search_regex + ')', 'ig');
	var new_text = full_text.replace(regex, setColor('$1', color));
	 return new_text;
  } catch (e) {
	 return full_text;
  }
}

if (typeof exports !== "undefined") {
  exports.log = logMessage;
  exports.set = setColor;
  exports.replace = replace;
} else if (typeof define !== "undefined") {
  define([], function() { return { set: setColor, log: logMessage };  });
}
}());
