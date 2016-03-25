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
        unit: 'f',
        success: function(weather) {
            // date.getDay() devuelve de 0 a 6; 0 es Domingo.
            var dia_str = dias[date.getDay()];
            var dia_num = pad(date.getDate(), 2);

            // date.getMonth() devuelve de 0 a 11; 0 es Enero.
            var mes = meses[date.getMonth()];

            // Obtener los ultimos dos digitos del año.
            var temporada = date.getFullYear().toString().slice(2);

            // Reloj dinamico.
            var clock = function() {
                // Se debe obtener nuevamente la fecha actual
                // cada refesh.
                var date = new Date();

                var gmt = 0;
                var doce = 12;
                if (date.getHours() > 11) {
                    var hora = date.getHours() === 12
                        ? 12
                        : pad(Math.abs(date.getHours() - 12),2);
                    var meridiano = "PM";
                } else {
                    var hora = date.getHours() === 0
                        ? 12
                        : pad(Math.abs(date.getHours()),2);
                    var meridiano = "AM";
                }

                var minutos = pad(date.getMinutes(),2);
                var segundos = pad(date.getSeconds(),2);

                var fecha = dia_num + " " + mes +
                " " + temporada;
                var horario = hora + ":" + minutos +
                ":" + segundos +" " + meridiano;

                $("#header-title").html(fecha);
                $("#footer-title").html(horario);
            };

            clock();
            // Ciclo para refresecar el reloj cada segundo.
            setInterval(clock, 1000);

            resize();

            /*
            * CLIMA DE HOY
            */
            // $("#today-condition").addClass("icon-"+weather.code);
            $("#today-condition").attr("src", weather.image);
            $("#today-temperature").html(weather.temp+"&deg;"+weather.units.temp);

            /*
            * CLIMA DE MAÑANA
            */
            var dia_despues = (date.getDay() + 1) > 6
                ? (date.getDay() + 1) - 7
                : (date.getDay() + 1);

            var temp_promedio = Math.round((parseInt(weather.forecast[1].high) +
                parseInt(weather.forecast[1].low)) / 2);

            $("#tomorrow .day-name").html(dias[dia_despues]);
            // $("#tomorrow-condition").addClass("icon-"+weather.forecast[1].code);
            $("#tomorrow-condition").attr("src", weather.forecast[1].image);
            $("#tomorrow-temperature").html(temp_promedio+"&deg;"+weather.units.temp);

            /*
            * CLIMA DE PASADO MAÑANA
            */
            dia_despues = (date.getDay() + 2) > 6
                ? (date.getDay() + 2) - 7
                : (date.getDay() + 2);

            temp_promedio = Math.round((parseInt(weather.forecast[2].high) +
                parseInt(weather.forecast[2].low)) / 2);

            $("#after-tomorrow .day-name").html(dias[dia_despues]);
            // $("#after-tomorrow-condition").addClass("icon-"+weather.forecast[2].code);
            $("#after-tomorrow-condition").attr("src", weather.forecast[2].image);
            $("#after-tomorrow-temperature").html(temp_promedio+"&deg;"+weather.units.temp);

            /*
            * CLIMA DEL 3ER Y ULTIMO DIA
            */
            dia_despues = (date.getDay() + 3) > 6
                ? (date.getDay() + 3) - 7
                : (date.getDay() + 3);

            temp_promedio = Math.round((parseInt(weather.forecast[3].high) +
                parseInt(weather.forecast[3].low)) / 2);

            $("#last-day .day-name").html(dias[dia_despues]);
            // $("#last-day-condition").addClass("icon-"+weather.forecast[3].code);
            $("#last-day-condition").attr("src", weather.forecast[3].image);
            $("#last-day-temperature").html(temp_promedio+"&deg;"+weather.units.temp);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });

    var resize = function() {
        $("#weather .main")
            .css("height", "calc(100% - " +
                ( $("#weather .header").prop("offsetHeight") +
                $("#weather .footer").prop("offsetHeight") ) +
                "px)");
    };

    $(window).resize(function() {
        resize();
    });
});