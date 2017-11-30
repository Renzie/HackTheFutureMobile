/**
 * Created by Renzie on 30/11/2017.
 */
var crud = {
    //GET
    get: function (items) {
        $.get("http://37.230.98.72/htf/api/" + items);

        /*$.ajax({
            url: "http://37.230.98.72/htf/api/",
            data: data,
            success: success,
            dataType: dataType
        });

        beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password)); };*/
    },
    getTerrorists: function () {
        crud.get("terrorists");
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

var listTerrorists = () => {
    crud.getTerrorists().then((data) => {
        $(data).each(key, value, function () {
            var html = '<th>' + value.id + '<tr></th>' +
                '<td>' + value.name  + '</td>' +
                '<td>' + value.image + '</td>' +
                '<td>' + value.riskLevel + '</td>' +
                '<td>' + value.rank + '</td></tr>';
            $(".terrorlist").append(html);
        })
        
    })
};

var listMines = () =>{
    crud.getMines().then((data) => {
        $(data).each(key, value, function () {
            var html = '<th>' + value.id + '<tr></th>' +
                '<td>' + value.name  + '</td>' +
                '<td>' + value.type + '</td>' +
                '<td>' + value.region + '</td>' +
                '<td><a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Link with href></a></td>' +
                '</tr>';
            $(".minelist").append(html);
        })
    })
};



