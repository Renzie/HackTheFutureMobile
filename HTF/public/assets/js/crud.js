var crud = {
    //GET
    get: function (items) {
        return $.post("/" + items);
    },
    getTerrorists: function () {
        return crud.get("terrorists");
    },
    getMines: function () {
        crud.get("mines")
    },
    getMineDetails : function (id) {
        crud.get("mines/" + id);
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
        $(data).each(key, value, function () {
            var html = '<tr><th data-role="mine-' + value.id + '">' + value.id + '</th>' +
                '<td>' + value.name  + '</td>' +
                '<td>' + value.type + '</td>' +
                '<td>' + value.region + '</td>' +
                ' <td><a  class="tab-link" data-role="mineDetails">View details</a></td>' +
                '</tr>';
            $(".minelist").append(html);
        })
    })
};