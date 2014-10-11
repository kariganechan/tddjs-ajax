TestCase("AjaxCreateTest",{
    "test should return XMLHttpRequest object": function(){
        var xhr = tddjs.ajax.create();

        assertNumber(xhr.readyState);
        assert(tddjs.isHostObject(xhr, "open"));
        assert(tddjs.isHostObject(xhr, "send"));
        assert(tddjs.isHostObject(xhr, "setRequestHeader"));
    }
});