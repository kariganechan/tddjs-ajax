(function(){
    var xhr;
    var ajax = tddjs.namespace("ajax");

    var options = [
        function(){
            return new activeXObject("Microdoft.XMLHTTP");
        },
        function(){
            return new XMLHttpRequest();
        }
    ];

    for (var i = 0, l = options.length; i < l; i++) {
        try{
            xhr = options[i]();
            ajax.create = options[i];
            break;
        } catch(e){}
    }

}());


