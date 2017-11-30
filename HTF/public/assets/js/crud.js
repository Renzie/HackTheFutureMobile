var crud = {
    //GET
    get: function (items) {
        return $.get("/" + items);
    },
    getTerrorists: function () {
        return crud.get("terrorists");
    },
    getMines: function () {
        return crud.get("mines")
    },
    getMineDetails : function (id) {
        return crud.get("mines/" + id);
    },
    getImages: function () {
        return crud.get("images");
    },

    //POST
    post: function (data) {
        $.post(data).then((data) => {
            console.log("success!")
        })
    }
};

$(function () {
    listTerrorists();
    listMines();
    listImages();

    $('body').on('click', 'a.mineDetails', function(event) {
        event.preventDefault();
        var id = $(this).parent().parent().attr('data-role');

        $('.tab').hide();
        $('.tab#'  + $(this).attr("data-role")).fadeIn();

        mineDetails(id);
    });
});

var listTerrorists = () => {
    crud.getTerrorists().then((data) => {
        var obj = JSON.parse(data);

        obj.forEach(function (terrorist) {
            var html = '<tr><th>' + terrorist.name + '</th>' +
                '<td><img class="terroristImage" src="http://37.230.98.72/htf' + terrorist.image + '" alt="' + terrorist.name + '"></td>' +
                '<td>' + terrorist.riskLevel + '</td>' +
                '<td>' + terrorist.rank + '</td></tr>';
            $(".terrorlist").append(html);
        });
    })
};

var listMines = () =>{
    crud.getMines().then((data) => {
        var obj = JSON.parse(data);

        obj.forEach(function (value) {
            var html = '<tr data-role="' + value.id + '">' +
                '<td>' + value.name  + '</td>' +
                '<td>' + value.type + '</td>' +
                '<td>' + value.region + '</td>' +
                ' <td><a href="" class="mineDetails" data-role="mineDetails">View details</a></td>' +
                '</tr>';
            $(".minelist").append(html);
        });
    })
};

var mineDetails = (id) =>{
    crud.getMineDetails(id).then((data) => {
        var obj = JSON.parse(data);

        var html = '<h1 class="text-center">' + obj.name + '</h1>' +
            '<div class="row container-fluid"><p class="col">ID</p><p class="col text-right">' + obj.id + '</p></div>' +
            '<div class="row container-fluid"><p class="col">Name</p><p class="col text-right" >' + obj.name + '</p></div> ' +
            '<div class="row container-fluid"> <p class="col">Type</p><p class="col text-right">' + obj.type + '</p></div> ' +
            '<div class="row container-fluid"> <p class="col">Region</p><p class="col text-right" >' + obj.region + '</p> </div>' +
            '<div class="row container-fluid"><p class="col">Location</p></div>';

        $('#mineDetails').html(html);
    });
};

var listImages = () =>{
    crud.getImages().then((data) => {
        var obj = JSON.parse(data);

        obj.forEach(function (value) {
            var html = '<tr><th>' + formatDate(new Date(value.date)) + '</th><th>' + checkDescription(value.description) + '</th>' +
                '<th><img width="200" height="200" src="http://37.230.98.72/htf' + value.url + '" alt="' + value.name + '" ></th>' +
                '<th>' + value.user.name + '</th><th>' + value.user.family + '</th></tr>';
            $(".imagelist").append(html);
        });
    })
};

function checkDescription(description){
    if(description === undefined){
        return '';
    } else {
        return description;
    }
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minutes;
}