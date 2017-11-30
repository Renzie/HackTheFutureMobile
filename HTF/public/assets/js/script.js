
$(function () {
    $('body').on('click','.nav-item',showTab)
});


var showTab = () => {
    console.log($(this));
    //$('.tab').hide();
    //$('.tab.'  + $(this).val()).show();
};

