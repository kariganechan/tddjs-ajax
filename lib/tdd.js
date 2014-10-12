// tddjsの定義 + namespaceの実装
var tddjs = (function(){
    function namespace(string){
        var object = this;
        var levels = string.split(".");

        for(var i = 0, l = levels.length; i < l; i++){
            if(typeof object[levels[i]] == "undefined"){
                object[levels[i]] = {};
            }
            object = object[levels[i]];
        }
        return object;
    }
    return {
        namespace: namespace
    };
}());

// uidの実装
(function(){
    var id = 0;
    function uid(object){
        if (typeof object.__uid != "number") {
            object.__uid = id++;
        }
        return object.__uid;
    }

    if (typeof tddjs == "object") {
        tddjs.uid = uid;
    }
}());


// iterator の実装
(function(){
    function iterator (collection){
        var index = 0;
        var length = collection.length;

        function next(){
            var item = collection[index++];
            next.hasNext = index < length;

            return item;
        }

        next.hasNext = index < length;
        return next;
    }

    if (typeof tddjs == "object") {
        tddjs.iterator = iterator;
    }

}());


// isOqnProperty の実装
tddjs.isOwnProperty = (function(){
    var hasOwn = Object.prototype.hasOwnProperty;

    if(typeof hasOwn == "function"){
        return function (object, property) {
            return hasOwn.call(object, property);
        };
    } else {

    }
}());

// each の実装
tddjs.each = (function(){
    // 引数のオブジェクトのプロパティで for-inループに姿を現さないものの配列を返す
    function unEnumerated(object, properties){
        var length = properties.length;

        // すべてのプロパティをtrueにセット
        for (var i = 0; i < length; i++) {
            object[properties[i]] = true;
        }

        var enumerated = length;

        // for-inに現れる、自身のプロパティのみfalseで上書き
        for (var prop in object) {
            if (tddjs.isOwnProperty(object, prop)){
                enumerated -= 1;
                object[prop] = false;
            }
        }

        if (!enumerated){
            return;
        }

        var needsFix = [];

        // falseに上書きされていないプロパティをneedsfix配列にプッシュ
        for (i = 0; i < length; i++) {
            if (object[properties[i]]) {
                needsFix.push(properties[i]);
            }
        }

        return needsFix;
    }

    var oFixes = unEnumerated( {},
        ["toStrind", "toLocaleString", "valueOf", "hasOwnProperty",
         "isPrototypeOf", "constructor", "propertyIsEnumerable"]);

    var ffixes = unEnumerated( function(){},
        ["call", "apply", "prototype"]);

    if (ffixes && oFixes) {
        ffixes = oFixes.concat(ffixes);
    }

    var needsFix = { "object": oFixes, "function": ffixes };

    return function (object, callback) {
        if (typeof callback != "function"){
            throw new TypeError("callback is not a function");
        }

        // 通常のループ、準拠ブラウザではすべての列挙可能プロパティが列挙される
        for (var prop in object) {
            if (tddjs.isOwnProperty(object, prop)) {
                callback(prop, object[prop]);
            }
        }

        // ブラウザで列挙されていなかったプロパティを列挙
        var fixes = needsFix[typeof object];

        if (fixes) {
            var property;
            for (var i = 0, l = fixes.length; i < l; i++) {
                property = fixes[i];
                if (tddjs.isOwnProperty(object, property)) {
                    callback(property, object[property]);
                }
            }
        }
    };
}());

// extend の実装
tddjs.extend = (function(){
    function extend (target, source) {
        tddjs.each(source, function (prop, val){
            target[prop] = val;
        });
    }
    return extend;
}());

// dom の実装
(function() {
    var dom = tddjs.namespace("dom");

    function addClassName(element,cName){
        var regexp = new RegExp("(^|\\s)" + cName + "(\\s|$)");

        if (element && !regexp.test(element.className)) {
            cName = element.className + " " + cName;
            element.className = cName.replace(/^\s+|\s+$/g, "");
        }
    }

    function removeClassName(element, cName){

        var r = new RegExp("(^|\\s)" + cName + "(\\s|$)");

        if(element){
            cName = element.className.replace(r, " ");
            element.className = cName.replace(/^\s+|\s+$/g, "");
        }
    }

    dom.addClassName = addClassName;
    dom.removeClassName = removeClassName;
}());

// isHostObject の実装
tddjs.isHostMethod = (function(){
    function isHostMethod(object, property){
        var type = typeof object[property];

        return type == "function" ||
                       (type == "object" && !!object[property]) ||
                       type == "unknown";
    }
    return isHostMethod;
}());

// isEventSupported の実装
tddjs.isEventSupported = (function(){
    var TAGNAMES = {
        select: "input",
        change: "input",
        submit: "form",
        reset: "form",
        error: "img",
        load: "img",
        abort: "img"
    };

    function isEventSupported(eventName){
        var tagname = TAGNAMES[eventName];
        var el = document.createElement(tagName || "div");
        eventName = "on" + eventName;
        var isSupported = (eventName in el);

        if(!isSupported){
            el.setAttribute(eventName, "return;");
            isSupported = typeof el[eventName] == "function";
        }
        el = null;
        return isSupported;
    }
    return isEventSupported;
});

// isCSSPropertySupported の実装
tddjs.isCSSPropertySupported = (function(){
    var element = document.createElement("div");

    function isCSSPropertySupported(property) {
        return typeof element.style[property] == "string";
    }

    return isCSSPropertySupported;
}());

