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

