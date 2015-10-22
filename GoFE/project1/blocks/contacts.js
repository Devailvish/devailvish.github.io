function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(50.439017, 30.498723),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }



    var map = new google.maps.Map(mapCanvas, mapOptions)
    var companyPos = new google.maps.LatLng(50.439017, 30.498723);
    var companyMarker = new google.maps.Marker({
        position: companyPos,
        map: map,
        title: "Company Name Head Office"
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
