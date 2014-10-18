(function(){
    var ajax = tddjs.ajax;

    TestCase("AjaxCreateTest",{
        setUp: function(){
            this.ajaxCreate = ajax.create;
        },

        tearDown: function(){
            ajax.create = this.ajaxCreate;
        },

        "test should return XMLHttpRequest object": function(){
            var xhr = ajax.create();

            assertNumber(xhr.readyState);
            assert(tddjs.isHostMethod(xhr, "open"));
            assert(tddjs.isHostMethod(xhr, "send"));
            assert(tddjs.isHostMethod(xhr, "setRequestHeader"));
        }
    });
}());
