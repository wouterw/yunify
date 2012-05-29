$(function($) {
	$('.jclock').jclock({
			timeout: 60000,
			format: '%H:%M',
	});
});

$(function() {
		$.simpleWeather({
				zipcode: 'FRXX4403',
				unit: 'c',
				success: function(weather) {
						html = weather.currently;

						$("#weather").html(html);
				},
				error: function(error) {
						$("#weather").html(error);
				}
		});
});

var relativeTime = function(time) {
	var period = new Date(time);
	var delta = new Date() - period;

	if (delta <= 10000) {    // Less than 10 seconds ago
			return 'Just now';
	}
	var units = null;
	var conversions = {
			millisecond: 1,     // ms -> ms
			second: 1000,       // ms -> sec
			minute: 60,         // sec -> min
			hour: 60,           // min -> hour
			day: 24,            // hour -> day
			month: 30,          // day -> month (roughly)
			year: 12            // month -> year
	};

	for (var key in conversions) {
			if (delta < conversions[key]) {
					break;
			}
			else {
					units = key;
					delta = delta / conversions[key];
			}
	}

	// Pluralize if necessary:
	delta = Math.floor(delta);
	if (delta !== 1) { units += 's'; }
	return [delta, units, "ago"].join(' ');
}

String.prototype.parseHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","%23")
		return t.link("http://search.twitter.com/search?q="+tag);
	});
};

String.prototype.parseURL = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
		return url.link(url);
	});
};

String.prototype.parseUsername = function() {
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
		var username = u.replace("@","")
		return u.link("http://twitter.com/"+username);
	});
};

$(function(){
  $('.slide_page').hide().fadeIn('slow');
});