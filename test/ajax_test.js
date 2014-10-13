(function(){
    var ajax = tddjs.ajax;

    TestCase("AjaxCreateTest",{
        "test should return XMLHttpRequest object": function(){
            var xhr = ajax.create();

            assertNumber(xhr.readyState);
            assert(tddjs.isHostMethod(xhr, "open"));
            assert(tddjs.isHostMethod(xhr, "send"));
            assert(tddjs.isHostMethod(xhr, "setRequestHeader"));
        }

    });
}());
