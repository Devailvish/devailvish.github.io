/**
 * Created by elenapotebenko on 20.08.15.
 */
function Weather() {
    this.findCity = function (name) {
        Ajax.getJSON('https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality&geocode=' + name, function(geoData){
            var objects = geoData.response.GeoObjectCollection.featureMember.map(function(fm){
                var go = fm.GeoObject,
                    cordinates = go.Point.pos.split('');
                return{
                    name:go.name,
                    description: go.description,
                    kind: go.metaDataProperty.GeocoderMetaData.kind,
                    longitude: cordinates[0],
                    latitude: cordinates[1]
                };
            }).filter(function(o){
                return o.kind === 'locality';
            });

            document.querySelector('.weather__cities').innerHTML = Templates.Cities.render({
                cities: objects
            });
        });

    };

    this.getWeather = function (lat, lon) {
        Ajax.get.JSON('https://geocode-maps.yandex.ru/1.x/?format=json&kind=locality&geocode=' + name.trim(), function(weatherData) {

        })
    };
}

var Templates = {
    Cities: Hogan.compile(document.querySelector('.templates__city').innerHTML),
    Weather: Hogan.compile(document.querySelector('.templates__weather').innerHTML)
};

var Ajax = {
    getJSON: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            callback(JSON.parse(xhr.responseText))
        };

    }
};