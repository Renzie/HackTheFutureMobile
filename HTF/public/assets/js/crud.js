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
                ' <td><a href="" onclick="mineDetails(' + value.id + ')" data-role="mineDetails">View details</a></td>' +
                '</tr>';
            $(".minelist").append(html);
        });
    })
};

var mineDetails = (id) =>{
    crud.getMineDetails(id).then((data) => {
        var obj = JSON.parse(data);

        console.log(data);
    });
};