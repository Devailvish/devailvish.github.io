$(document).ready(function () {

    $(".menu__item").click(function () {
        $(".menu__item").removeClass("menu__item_current_true");
        $(this).addClass("menu__item_current_true");
    })
})
