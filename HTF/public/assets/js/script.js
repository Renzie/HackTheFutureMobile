$(function () {
    $('.tab-link').on('click',showTab)
});

function showTab(){
    $('.tab').hide();
    $('.tab#'  + $(this).attr("data-role")).fadeIn();
};


function openQRCamera(node) {
    var reader = new FileReader();
    reader.onload = function() {
        node.value = "";
        qrcode.callback = function(res) {
            if(res instanceof Error) {
                alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
            } else {
                node.parentNode.previousElementSibling.value = res;
            }
        };
        qrcode.decode(reader.result);
    };
    reader.readAsDataURL(node.files[0]);
}

function showQRIntro() {
    return confirm("Use your camera to take a picture of a QR code.");
}

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.12),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    addMarker(42,42)
}


function addMarker(lat,lon) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lon),
        title: 'new marker',
        draggable: true,
        map: map
    });
    map.setCenter(marker.getPosition())
}
