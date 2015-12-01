// Docs at http://simpleweatherjs.com
$(document).ready(function() {
    var date = new Date();
    var dias = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
    var meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
        "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    var pad = function(str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

    $.simpleWeather({
        location: 'Ciudad Madero, Tamaulipas, MX',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            // date.getDay() devuelve de 0 a 6; 0 es Domingo.
            var dia_str = dias[date.getDay()];
            var dia_num = pad(date.getDate(), 2);

            // date.getMonth() devuelve de 0 a 11; 0 es Enero.
            var mes = meses[date.getMonth()];

            var temporada = date.getFullYear().toString().slice(2);

            var gmt = -2;
            if (date.getHours() > 11) {
                var hora = pad(Math.abs(date.getHours() - 10 + gmt),2);
                var minutos = pad(date.getMinutes(),2);
                var meridiano = "PM";
            } else {
                var hora = pad(Math.abs(date.getHours() + 1 + gmt),2);
                var minutos = pad(date.getMinutes(),2);
                var meridiano = "AM";
            }

            var fecha = dia_str + " " + dia_num + " " + mes +
                " " + temporada + " " + hora + ":" + minutos + " " + meridiano;

            $("#header-title").html(fecha);

            $("#today-condition").addClass("icon-"+weather.code);
            $("#today-temperature").html(weather.temp+"&deg;"+weather.units.temp);

            var dia_despues = (date.getDay() + 1) > 6
                ? (date.getDay() + 1) - 6
                : (date.getDay() + 1);

            $("#tomorrow .day-name").html(dias[dia_despues]);
            $("#tomorrow-condition").addClass("icon-"+weather.forecast[1].code);
            $("#tomorrow-temperature").html(weather.forecast[1].low+"&deg;"+weather.units.temp);

            dia_despues = (date.getDay() + 2) > 6
                ? (date.getDay() + 2) - 6
                : (date.getDay() + 2);

            $("#after-tomorrow .day-name").html(dias[dia_despues]);
            $("#after-tomorrow-condition").addClass("icon-"+weather.forecast[2].code);
            $("#after-tomorrow-temperature").html(weather.forecast[2].low+"&deg;"+weather.units.temp);

            dia_despues = (date.getDay() + 3) > 6
                ? (date.getDay() + 3) - 6
                : (date.getDay() + 3);

            $("#last-day .day-name").html(dias[dia_despues]);
            $("#last-day-condition").addClass("icon-"+weather.forecast[3].code);
            $("#last-day-temperature").html(weather.forecast[3].low+"&deg;"+weather.units.temp);
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