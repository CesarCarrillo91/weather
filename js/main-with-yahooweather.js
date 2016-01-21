var setWeatherIcon = function (condid) {
    var icon = '';
    switch(condid) {
        case '0': icon  = 'wi-tornado';
        break;
        case '1': icon = 'wi-storm-showers';
        break;
        case '2': icon = 'wi-tornado';
        break;
        case '3': icon = 'wi-thunderstorm';
        break;
        case '4': icon = 'wi-thunderstorm';
        break;
        case '5': icon = 'wi-snow';
        break;
        case '6': icon = 'wi-rain-mix';
        break;
        case '7': icon = 'wi-rain-mix';
        break;
        case '8': icon = 'wi-sprinkle';
        break;
        case '9': icon = 'wi-sprinkle';
        break;
        case '10': icon = 'wi-hail';
        break;
        case '11': icon = 'wi-showers';
        break;
        case '12': icon = 'wi-showers';
        break;
        case '13': icon = 'wi-snow';
        break;
        case '14': icon = 'wi-storm-showers';
        break;
        case '15': icon = 'wi-snow';
        break;
        case '16': icon = 'wi-snow';
        break;
        case '17': icon = 'wi-hail';
        break;
        case '18': icon = 'wi-hail';
        break;
        case '19': icon = 'wi-cloudy-gusts';
        break;
        case '20': icon = 'wi-fog';
        break;
        case '21': icon = 'wi-fog';
        break;
        case '22': icon = 'wi-fog';
        break;
        case '23': icon = 'wi-cloudy-gusts';
        break;
        case '24': icon = 'wi-cloudy-windy';
        break;
        case '25': icon = 'wi-thermometer';
        break;
        case '26': icon = 'wi-cloudy';
        break;
        case '27': icon = 'wi-night-cloudy';
        break;
        case '28': icon = 'wi-day-cloudy';
        break;
        case '29': icon = 'wi-night-cloudy';
        break;
        case '30': icon = 'wi-day-cloudy';
        break;
        case '31': icon = 'wi-night-clear';
        break;
        case '32': icon = 'wi-day-sunny';
        break;
        case '33': icon = 'wi-night-clear';
        break;
        case '34': icon = 'wi-day-sunny-overcast';
        break;
        case '35': icon = 'wi-hail';
        break;
        case '36': icon = 'wi-day-sunny';
        break;
        case '37': icon = 'wi-thunderstorm';
        break;
        case '38': icon = 'wi-thunderstorm';
        break;
        case '39': icon = 'wi-thunderstorm';
        break;
        case '40': icon = 'wi-storm-showers';
        break;
        case '41': icon = 'wi-snow';
        break;
        case '42': icon = 'wi-snow';
        break;
        case '43': icon = 'wi-snow';
        break;
        case '44': icon = 'wi-cloudy';
        break;
        case '45': icon = 'wi-lightning';
        break;
        case '46': icon = 'wi-snow';
        break;
        case '47': icon = 'wi-thunderstorm';
        break;
        case '3200': icon = 'wi-cloud';
        break;
        default: icon = 'wi-cloud';
        break;
    }
    //return '<i class="wi '+icon+'"></i>';
    return 'wi '+icon; // Return the classes.
};

var date = new Date();
var dias = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
var meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
var pad = function(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

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

var callbackFunction = function(data) {
    // Obtener los resultados del query hecho a Yahoo Weather API.
    var results = data.query.results,
        channel = results.channel,
        units = channel.units,
        item = channel.item,
        forecast = item.forecast;

    /*
    **
    ** CLIMA DE HOY
    **
    */

    var temp_promedio = Math.round((parseInt(forecast[1].high) +
        parseInt(forecast[1].low)) / 2);

    $("#today-condition").attr("class", setWeatherIcon(forecast[0].code));
    $("#today-temperature").html(temp_promedio+"&deg;"+
            units.temperature);

    /*
    **
    ** CLIMA DE MAÑANA
    **
    */

    var dia_despues = (date.getDay() + 1) > 6
        ? (date.getDay() + 1) - 7
        : (date.getDay() + 1);

    temp_promedio = Math.round((parseInt(forecast[1].high) +
        parseInt(forecast[1].low)) / 2);

    $("#tomorrow .day-name").html(dias[dia_despues]);
    $("#tomorrow-condition").attr("class", setWeatherIcon(forecast[1].code));
    $("#tomorrow-temperature").html(temp_promedio+"&deg;"+
            units.temperature);

    /*
    **
    ** CLIMA DE PASADO MAÑANA
    **
    */

    dia_despues = (date.getDay() + 2) > 6
        ? (date.getDay() + 2) - 7
        : (date.getDay() + 2);

    temp_promedio = Math.round((parseInt(forecast[2].high) +
        parseInt(forecast[2].low)) / 2);

    $("#after-tomorrow .day-name").html(dias[dia_despues]);
    // $("#after-tomorrow-condition").addClass("icon-"+weather.forecast[2].code);
    $("#after-tomorrow-condition").attr("class", setWeatherIcon(forecast[2].code));
    $("#after-tomorrow-temperature").html(temp_promedio+"&deg;"+
            units.temperature);

    /*
    **
    ** CLIMA DEL TERCER DIA
    **
    */

    dia_despues = (date.getDay() + 3) > 6
        ? (date.getDay() + 3) - 7
        : (date.getDay() + 3);

    temp_promedio = Math.round((parseInt(forecast[3].high) +
        parseInt(forecast[3].low)) / 2);

    $("#last-day .day-name").html(dias[dia_despues]);
    $("#last-day-condition").attr("class", setWeatherIcon(forecast[3].code));
    $("#last-day-temperature").html(temp_promedio+"&deg;"+
            units.temperature);

    // Iniciar el reloj.
    clock();

    // Ciclo para refresecar el reloj cada segundo.
    setInterval(clock, 1000);

    resize();

    // console.log(results);
    // console.log(setWeatherIcon(results.channel.item.forecast[0].code));
};

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