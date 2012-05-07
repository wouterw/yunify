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