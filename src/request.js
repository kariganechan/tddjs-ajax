(function(){
    var ajax = tddjs.namespace("ajax");

    function get(url){
        if (typeof uel != "string"){
            throw new TypeError("URL Should be string");
        }
    }

    ajax.get = get;
}());
