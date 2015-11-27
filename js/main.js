// Docs at http://simpleweatherjs.com
$(document).ready(function() {
    $.simpleWeather({
        location: 'Ciudad Madero, Tamaulipas, MX',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            $("#today-condition").addClass("icon-"+weather.code);
            // var html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            // html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
            // html += '<li class="currently">'+weather.currently+'</li>';
            // html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

            // $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
});