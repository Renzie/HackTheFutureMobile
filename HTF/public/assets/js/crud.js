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
                '<td><img src="http://37.230.98.72/htf' + terrorist.image + '" alt="' + terrorist.name + '"></td>' +
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
            '<div class="row container-fluid"><p class="col">ID</p><p class="col">' + obj.id + '</p></div>' +
            '<div class="row container-fluid"><p class="col">Name</p><p class="col" >' + obj.name + '</p></div> ' +
            '<div class="row container-fluid"> <p class="col">Type</p><p class="col">' + obj.type + '</p></div> ' +
            '<div class="row container-fluid"> <p class="col">Region</p><p class="col" >' + obj.region + '</p> </div>' +
            '<div class="row container-fluid"><p class="col">Location</p></div>';

        $('#mineDetails').html(html);
    });
};