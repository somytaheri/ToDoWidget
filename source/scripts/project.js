/**
 * Created by Amir on 19/04/15.
 */


var toDoWidget = (function() {

    var $list;

    var init = function() {
        container();
        addCardComposer();
    }

    var container = function() {

        $("body").append("<div class='list'></div>");

    };

    var addCardComposer = function() {

        $list = $('.list');
        $list.append('<a href="" class="card__composer">Add Card</a>');

    };

    var publicAPI = {

        init: init

    };

    return publicAPI;

})();

toDoWidget.init();