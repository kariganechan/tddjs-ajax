(function(){
    var ajax = tddjs.ajax;

    TestCase("GetRequestTest",{
        "test should define get method": function(){
            assertFunction(ajax.get);
        },

        "test should trow error without url": function(){
            assertException(function(){
                ajax.get();
            },"TypeError");
        }
    });
}());
