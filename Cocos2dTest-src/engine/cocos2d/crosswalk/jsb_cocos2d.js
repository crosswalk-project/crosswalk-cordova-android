//
// cocos2d constants
//
// var canvas = document.getElementById("gameCanvas");
// var params = {
//                 'stencil': true,
//                 'preserveDrawingBuffer': true,
//                 'antialias': true,
//                 'alpha': false};
// var context = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);
// crosswalk.setContext(context);
var cc = cc || {};

/**
 * Device type
 * @constant
 * @type {Object}
 */
cc.TARGET_PLATFORM = {
    WINDOWS:0,
    LINUX:1,
    MACOS:2,
    ANDROID:3,
    IPHONE:4,
    IPAD:5,
    BLACKBERRY:6,
    NACL:7,
    EMSCRIPTEN:8,
    MOBILE_BROWSER:100,
    PC_BROWSER:101
};

cc.LANGUAGE_ENGLISH    = 0;
cc.LANGUAGE_CHINESE    = 1;
cc.LANGUAGE_FRENCH     = 2;
cc.LANGUAGE_ITALIAN    = 3;
cc.LANGUAGE_GERMAN     = 4;
cc.LANGUAGE_SPANISH    = 5;
cc.LANGUAGE_RUSSIAN    = 6;
cc.LANGUAGE_KOREAN     = 7;
cc.LANGUAGE_JAPANESE   = 8;
cc.LANGUAGE_HUNGARIAN  = 9;
cc.LANGUAGE_PORTUGUESE = 10;
cc.LANGUAGE_ARABIC     = 11;

cc.DIRECTOR_PROJECTION_2D = 0;
cc.DIRECTOR_PROJECTION_3D = 1;

cc.TEXTURE_PIXELFORMAT_RGBA8888 = 0;
cc.TEXTURE_PIXELFORMAT_RGB888 = 1;
cc.TEXTURE_PIXELFORMAT_RGB565 = 2;
cc.TEXTURE_PIXELFORMAT_A8 = 3;
cc.TEXTURE_PIXELFORMAT_I8 = 4;
cc.TEXTURE_PIXELFORMAT_AI88 = 5;
cc.TEXTURE_PIXELFORMAT_RGBA4444 = 6;
cc.TEXTURE_PIXELFORMAT_RGB5A1 = 7;
cc.TEXTURE_PIXELFORMAT_PVRTC4 = 8;
cc.TEXTURE_PIXELFORMAT_PVRTC4 = 9;
cc.TEXTURE_PIXELFORMAT_DEFAULT = cc.TEXTURE_PIXELFORMAT_RGBA8888;

cc.TEXT_ALIGNMENT_LEFT  = 0;
cc.TEXT_ALIGNMENT_CENTER = 1;
cc.TEXT_ALIGNMENT_RIGHT = 2;

cc.VERTICAL_TEXT_ALIGNMENT_TOP = 0;
cc.VERTICAL_TEXT_ALIGNMENT_CENTER = 1;
cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM = 2;

cc.IMAGE_FORMAT_JPEG = 0;
cc.IMAGE_FORMAT_PNG = 0;

cc.PROGRESS_TIMER_TYPE_RADIAL = 0;
cc.PROGRESS_TIMER_TYPE_BAR = 1;

cc.PARTICLE_TYPE_FREE = 0;
cc.PARTICLE_TYPE_RELATIVE = 1;
cc.PARTICLE_TYPE_GROUPED = 2;
cc.PARTICLE_DURATION_INFINITY = -1;
cc.PARTICLE_MODE_GRAVITY = 0;
cc.PARTICLE_MODE_RADIUS = 1;
cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE = -1;
cc.PARTICLE_START_RADIUS_EQUAL_TO_END_RADIUS = -1;

cc.TOUCH_ALL_AT_ONCE = 0;
cc.TOUCH_ONE_BY_ONE = 1;

cc.TMX_TILE_HORIZONTAL_FLAG = 0x80000000;
cc.TMX_TILE_VERTICAL_FLAG = 0x40000000;
cc.TMX_TILE_DIAGONAL_FLAG = 0x20000000;

cc.TRANSITION_ORIENTATION_LEFT_OVER = 0;
cc.TRANSITION_ORIENTATION_RIGHT_OVER = 1;
cc.TRANSITION_ORIENTATION_UP_OVER = 0;
cc.TRANSITION_ORIENTATION_DOWN_OVER = 1;

cc.RED = {r:255, g:0, b:0};
cc.GREEN = {r:0, g:255, b:0};
cc.BLUE = {r:0, g:0, b:255};
cc.BLACK = {r:0, g:0, b:0};
cc.WHITE = {r:255, g:255, b:255};
cc.YELLOW = {r:255, g:255, b:0};

cc.POINT_ZERO = {x:0, y:0};

// XXX: This definition is different than cocos2d-html5
// cc.REPEAT_FOREVER = - 1;
// We can't assign -1 to cc.REPEAT_FOREVER, since it will be a very big double value after
// converting it to double by JS_ValueToNumber on android.
// Then cast it to unsigned int, the value will be 0. The schedule will not be able to work.
// I don't know why this occurs only on android.
// So instead of passing -1 to it, I assign it with max value of unsigned int in c++.
cc.REPEAT_FOREVER = 0xffffffff;

cc.MENU_STATE_WAITING = 0;
cc.MENU_STATE_TRACKING_TOUCH = 1;
cc.MENU_HANDLER_PRIORITY = -128;
cc.DEFAULT_PADDING = 5;

// reusable objects
cc._reuse_p = [ {x:0, y:0}, {x:0,y:0}, {x:0,y:0}, {x:0,y:0} ];
cc._reuse_p_index = 0;
cc._reuse_size = {width:0, height:0};
cc._reuse_rect = {x:0, y:0, width:0, height:0};
cc._reuse_color3b = {r:255, g:255, b:255 };
cc._reuse_color4b = {r:255, g:255, b:255, a:255 };
cc.log = console.log;

//
// Color 3B
//
cc.c3b = function( r, g, b )
{
    switch (arguments.length) {
        case 0:
            return {r:0, g:0, b:0 };
        case 1:
            if (r && r instanceof cc.c3b) {
                  return {r:r.r, g:r.g, b:r.b };
            } else {
                return {r:0, g:0, b:0 };
            }
        case 3:
            return {r:r, g:g, b:b };
        default:
            throw "unknown argument type";
            break;
    }
};

cc.integerToColor3B = function (intValue) {
    intValue = intValue || 0;

    var offset = 0xff;
    var retColor = {r:0, g:0, b:0 };
    retColor.r = intValue & (offset);
    retColor.g = (intValue >> 8) & offset;
    retColor.b = (intValue >> 16) & offset;
    return retColor;
};

cc._c3b = function( r, g, b )
{
    cc._reuse_color3b.r = r;
    cc._reuse_color3b.g = g;
    cc._reuse_color3b.b = b;
    return cc._reuse_color3b;
};

cc.c3BEqual = function(color1, color2){
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
};

cc.white = function () {
    return cc.c3b(255, 255, 255);
};

cc.yellow = function () {
    return cc.c3b(255, 255, 0);
};

cc.blue = function () {
    return cc.c3b(0, 0, 255);
};

cc.green = function () {
    return cc.c3b(0, 255, 0);
};

cc.red = function () {
    return cc.c3b(255, 0, 0);
};

cc.magenta = function () {
    return cc.c3b(255, 0, 255);
};

cc.black = function () {
    return cc.c3b(0, 0, 0);
};

cc.orange = function () {
    return cc.c3b(255, 127, 0);
};

cc.gray = function () {
    return cc.c3b(166, 166, 166);
};

//
// Color 4B
//
cc.c4b = function (r, g, b, a) {
    return {r:r, g:g, b:b, a:a };
};

cc._c4b = function( r, g, b, a )
{
    cc._reuse_color4b.r = r;
    cc._reuse_color4b.g = g;
    cc._reuse_color4b.b = b;
    cc._reuse_color4b.a = a;
    return cc._reuse_color4b;
};
// compatibility
cc.c4 = cc.c4b;
cc._c4 = cc._c4b;

cc.c4f = function (r, g, b, a) {
    return {r:r, g:g, b:b, a:a };
};

cc.c4FFromccc3B = function (c) {
    return cc.c4f(c.r / 255.0, c.g / 255.0, c.b / 255.0, 1.0);
};

cc.c4FFromccc4B = function (c) {
    return cc.c4f(c.r / 255.0, c.g / 255.0, c.b / 255.0, c.a / 255.0);
};

cc.c4BFromccc4F = function (c) {
    return cc.c4f(0 | (c.r * 255), 0 | (c.g * 255), 0 | (c.b * 255), 0 | (c.a * 255));
};

cc.c4FEqual = function (a, b) {
    return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a;
};

/**
 * convert Color3B to a string of color for style.
 * e.g.  Color3B(255,6,255)  to : "#ff06ff"
 * @param clr
 * @return {String}
 */
cc.convertColor3BtoHexString = function (clr) {
    var hR = clr.r.toString(16);
    var hG = clr.g.toString(16);
    var hB = clr.b.toString(16);
    var stClr = "#" + (clr.r < 16 ? ("0" + hR) : hR) + (clr.g < 16 ? ("0" + hG) : hG) + (clr.b < 16 ? ("0" + hB) : hB);
    return stClr;
};

//
// Point
//
cc.p = function( x, y )
{
    return {x:x, y:y};
};
cc._p = function( x, y )
{
    if( cc._reuse_p_index == cc._reuse_p.length )
        cc._reuse_p_index = 0;

    var p = cc._reuse_p[ cc._reuse_p_index];
    cc._reuse_p_index++;
    p.x = x;
    p.y = y;
    return p;
};

cc.pointEqualToPoint = function (point1, point2) {
    return ((point1.x == point2.x) && (point1.y == point2.y));
};

cc.PointZero = function () {
    return cc.p(0, 0);
};

//
// Grid
//
cc._g = function( x, y )
{
    cc._reuse_grid.x = x;
    cc._reuse_grid.y = y;
    return cc._reuse_grid;
};

//
// Size
//
cc.size = function(w,h)
{
    return {width:w, height:h};
};
cc._size = function(w,h)
{
    cc._reuse_size.width = w;
    cc._reuse_size.height = h;
    return cc._reuse_size;
};
cc.sizeEqualToSize = function (size1, size2)
{
    return ((size1.width == size2.width) && (size1.height == size2.height));
};
cc.SizeZero = function () {
    return cc.size(0, 0);
};

//
// Rect
//
cc.rect = function() {
    return {x:0, y:0, width:0, height:0};
};

cc._rect = function(x,y,w,h)
{
    cc._reuse_rect.x = x;
    cc._reuse_rect.y = y;
    cc._reuse_rect.width = w;
    cc._reuse_rect.height = h;
    return cc._reuse_rect;
};
cc.rectEqualToRect = function (rect1, rect2) {
    return ( rect1.x==rect2.x && rect1.y==rect2.y && rect1.width==rect2.width && rect1.height==rect2.height);
};

cc.rectContainsRect = function (rect1, rect2) {
    if ((rect1.x >= rect2.x) || (rect1.y >= rect2.y) ||
        ( rect1.x + rect1.width <= rect2.x + rect2.width) ||
        ( rect1.y + rect1.height <= rect2.y + rect2.height))
        return false;
    return true;
};

cc.rectGetMaxX = function (rect) {
    return (rect.x + rect.width);
};

cc.rectGetMidX = function (rect) {
    return (rect.x + rect.width / 2.0);
};

cc.rectGetMinX = function (rect) {
    return rect.x;
};

cc.rectGetMaxY = function (rect) {
    return(rect.y + rect.height);
};

cc.rectGetMidY = function (rect) {
    return rect.y + rect.height / 2.0;
};

cc.rectGetMinY = function (rect) {
    return rect.y;
};

cc.rectContainsPoint = function (rect, point) {
    var ret = false;
    if (point.x >= rect.x && point.x <= rect.x + rect.width &&
        point.y >= rect.y && point.y <= rect.y + rect.height) {
        ret = true;
    }
    return ret;
};

cc.rectIntersectsRect = function( rectA, rectB )
{
    var bool = ! (  rectA.x > rectB.x + rectB.width ||
                    rectA.x + rectA.width < rectB.x ||
                    rectA.y > rectB.y +rectB.height ||
                    rectA.y + rectA.height < rectB.y );

    return bool;
};

cc.rectUnion = function (rectA, rectB) {
    var rect = cc.rect(0, 0, 0, 0);
    rect.x = Math.min(rectA.x, rectB.x);
    rect.y = Math.min(rectA.y, rectB.y);
    rect.width = Math.max(rectA.x + rectA.width, rectB.x + rectB.width) - rect.x;
    rect.height = Math.max(rectA.y + rectA.height, rectB.y + rectB.height) - rect.y;
    return rect;
};

cc.rectIntersection = function (rectA, rectB) {
    var intersection = cc.rect(
        Math.max(rectA.x, rectB.x),
        Math.max(rectA.y, rectB.y),
        0, 0);

    intersection.width = Math.min(rectA.x+rectA.width, rectB.x+rectB.width) - intersection.x;
    intersection.height = Math.min(rectA.y+rectA.height, rectB.y+rectB.height) - intersection.y;
    return intersection;
};

cc.RectZero = function () {
    return cc.rect(0, 0, 0, 0);
};

cc.VisibleRect = {
    _topLeft:cc.p(0,0),
    _topRight:cc.p(0,0),
    _top:cc.p(0,0),
    _bottomLeft:cc.p(0,0),
    _bottomRight:cc.p(0,0),
    _bottom:cc.p(0,0),
    _center:cc.p(0,0),
    _left:cc.p(0,0),
    _right:cc.p(0,0),
    _width:0,
    _height:0,
    init:function(size){
        this._width = size.width;
        this._height = size.height;

        var w = this._width;
        var h = this._height;

        //top
        this._topLeft.y = h;
        this._topRight.x = w;
        this._topRight.y = h;
        this._top.x = w/2;
        this._top.y = h;

        //bottom
        this._bottomRight.x = w;
        this._bottom.x = w/2;

        //center
        this._center.x = w/2;
        this._center.y = h/2;

        //left
        this._left.y = h/2;

        //right
        this._right.x = w;
        this._right.y = h/2;
    },
    getWidth:function(){
        return this._width;
    },
    getHeight:function(){
        return this._height;
    },
    topLeft:function(){
        return this._topLeft;
    },
    topRight:function(){
        return this._topRight;
    },
    top:function(){
        return this._top;
    },
    bottomLeft:function(){
        return this._bottomLeft;
    },
    bottomRight:function(){
        return this._bottomRight;
    },
    bottom:function(){
        return this._bottom;
    },
    center:function(){
        return this._center;
    },
    left:function(){
        return this._left;
    },
    right:function(){
        return this._right;
    }
};

//
// Array: for cocos2d-html5 compatibility
//

/**
 * Returns index of first occurence of object, -1 if value not found.
 * @function
 * @param {Array} arr Source Array
 * @param {*} findObj find object
 * @return {Number} index of first occurence of value
 */
cc.ArrayGetIndexOfObject = function (arr, findObj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == findObj)
            return i;
    }
    return -1;
};

/**
 * Returns a Boolean value that indicates whether value is present in the array.
 * @function
 * @param {Array} arr
 * @param {*} findObj
 * @return {Boolean}
 */
cc.ArrayContainsObject = function (arr, findObj) {
    return cc.ArrayGetIndexOfObject(arr, findObj) != -1;
};

cc.ArrayRemoveObject = function (arr, delObj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == delObj) {
            arr.splice(i, 1);
        }
    }
};

//
// Helpers
//
cc.dump = function(obj)
{
    for( var i in obj )
        cc.log( i + " = " + obj[i] );
};

// dump config info, but only in debug mode
var sys = sys || undefined;
cc.dumpConfig = function()
{
    if (sys) {
        cc.dump(sys);
        cc.dump(sys.capabilities);
    }
};

//
// Bindings Overrides
//
// MenuItemToggle

// cc.MenuItemToggle.create = function( /* var args */) {

//     var n = arguments.length;

//     if (typeof arguments[n-2] === 'function' || typeof arguments[n-1] === 'function') {
//         var args = Array.prototype.slice.call(arguments);
//         var obj = null;
//         if( typeof arguments[n-2] === 'function' )
//             obj = args.pop();

//         var func = args.pop();

//         // create it with arguments,
//         var item = cc.MenuItemToggle._create.apply(this, args);

//         // then set the callback
//         if( obj !== null )
//             item.setCallback(func, obj);
//         else
//             item.setCallback(func);
//         return item;
//     } else {
//         return cc.MenuItemToggle._create.apply(this, arguments);
//     }
// };

// LabelAtlas
// cc.LabelAtlas.create = function( a,b,c,d,e ) {

//     var n = arguments.length;

//     if ( n == 5) {
//         return cc.LabelAtlas._create(a,b,c,d,e.charCodeAt(0));
//     } else {
//         return cc.LabelAtlas._create.apply(this, arguments);
//     }
// };

// cc.LayerMultiplex.create = cc.LayerMultiplex.createWithArray;


/**
 * Associates a base class with a native superclass
 * @function
 * @param {object} jsobj subclass
 * @param {object} klass superclass
 */
cc.associateWithNative = function( jsobj, superclass_or_instance ) {};

//
// JSB supports 2 official ways to create subclasses
//
// 1) Google "subclasses" borrowed from closure library
// This is the recommended way to do it
//
cc.inherits = function (childCtor, parentCtor) {
    /** @constructor */
    function tempCtor() {};
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;

    // Copy "static" method, but doesn't generate subclasses.
//  for( var i in parentCtor ) {
//      childCtor[ i ] = parentCtor[ i ];
//  }
};
cc.base = function(me, opt_methodName, var_args) {
    var caller = arguments.callee.caller;
    if (caller.superClass_) {
        // This is a constructor. Call the superclass constructor.
        ret =  caller.superClass_.constructor.apply( me, Array.prototype.slice.call(arguments, 1));
        return ret;
    }

    var args = Array.prototype.slice.call(arguments, 2);
    var foundCaller = false;
    for (var ctor = me.constructor;
        ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
        if (ctor.prototype[opt_methodName] === caller) {
            foundCaller = true;
        } else if (foundCaller) {
            return ctor.prototype[opt_methodName].apply(me, args);
        }
    }

    // If we did not find the caller in the prototype chain,
    // then one of two things happened:
    // 1) The caller is an instance method.
    // 2) This method was not called by the right caller.
    if (me[opt_methodName] === caller) {
        return me.constructor.prototype[opt_methodName].apply(me, args);
    } else {
        throw Error(
                    'cc.base called from a method of one name ' +
                    'to a method of a different name');
    }
};


//
// 2) Using "extend" subclassing
// Simple JavaScript Inheritance By John Resig http://ejohn.org/
//
function isNative(fn) {
    return (/\{\s*\[native code\]\s*\}/).test('' + fn);
}

//Todo:maybe more strict check???
function hasNativeConstructor(obj)
{
   if(obj.constructor === Object) return false;
   if(obj.constructor&&isNative(obj.constructor))
      return true;
   else return false;
}

function instantiate(constructor, args) {
    return new (unbind(constructor, null).apply(null, args));
}
function isInSuperFunction(_super, name) {
    var proto = _super;
    while(proto) {
        if (typeof proto[name] == "function")
            return true;
        proto = proto.__proto__;
    }
    return false;
}

// var ClassManager = {
//     instanceId : (0|(Math.random()*998)),
//     getNewInstanceId : function(){
//         return this.instanceId++;
//     }
// }

function setCallback(name, func, _this) {
    if (func) {
        func(function() {
            var ret = _this[name].apply(_this, arguments);
            //TODO: Add ActionManager resume and pause
            if (name == "onEnter") {
                cc.Director.getInstance().getScheduler().resumeTarget(_this);
            } else if (name == "onExit") {
                cc.Director.getInstance().getScheduler().pauseTarget(_this);
            }
            return ret;
        });
    }
}

function overrideCall(__super, __name) {
    var _super = __super;
    var _name = __name;
    _super[_name].call = function(thisArg) {
         var _this = arguments[0];
         var args = Array.prototype.slice.call(arguments, 1);
        return _super[_name].apply(_this.__native_obj__, args);
     }
 }

cc.Class = function(){};
cc.Class.extend = function (prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    var prototype = Object.create(_super);
    fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
        if (typeof prop[name] == "function") {
            if (isInSuperFunction(_super, name) && fnTest.test(prop[name])) {
                prototype[name] = (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];
                        if (isNative(this._super))
                            this._super = this._super.bind(this.__native_obj__);

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]);
            } else {
                prototype[name] = prop[name];
            }
        } else {
            prototype[name] = prop[name];
        }
    }

    // if (isNative(this)) {
    //     var parent = prototype.__proto__;
    //     if (parent) {
    //         for (var f in parent) {
    //             if (typeof parent[f] == "function" && isNative(parent[f])) {
    //                 parent[f] = (function (fn) {
    //                     return function () {
    //                         var ret;
    //                         if (this.__native_obj__)
    //                             ret = fn.apply(this.__native_obj__, arguments);
    //                         else
    //                             ret = fn.apply(this, arguments);
    //                         return ret;
    //                     };
    //                 })(parent[f]);
    //             }
    //         }
    //         // parent = parent.__proto__;
    //     }
    // }

    if (isNative(this)) {
        for (var f in _super) {
            if (isNative(_super[f])) {
                overrideCall(_super, f);
            }
        }
    }

    // The dummy class constructor
    function Class() {
        if (this.__native_prototype__) {
            this.__native_obj__ = new this.__native_prototype__();
            for (var f in this) {
                if (typeof this[f] == "function" && isNative(this[f])) {
                    this[f] = this[f].bind(this.__native_obj__);
                }
            }
        } else {
            this._instanceId = (0||Math.random()*999);
        }

        if (this.ctor)
            this.ctor.apply(this, arguments);

        if (typeof this["onEnter"] == "function") {
            setCallback("onEnter", this.setOnEnterEventCallback, this);
        }
        if (typeof this["onEnterTransitionDidFinish"] == "function") {
            setCallback("onEnterTransitionDidFinish", this.setOnEnterTransitionDidFinishEventCallback, this);
        }
        if (typeof this["onExit"] == "function") {
            setCallback("onExit", this.setOnExitEventCallback, this);
        }
        if (typeof this["onExitTransitionDidStart"] == "function") {
            setCallback("onExitTransitionDidStart", this.setOnExitTransitionDidStartEventCallback, this);
        }

        if (typeof this["onTouchBegan"] == "function") {
            setCallback("onTouchBegan", this.setTouchBeganCallback, this);
        }
        if (typeof this["onTouchMoved"] == "function") {
            setCallback("onTouchMoved", this.setTouchMovedCallback, this);
        }
        if (typeof this["onTouchEnded"] == "function") {
            setCallback("onTouchEnded", this.setTouchEndedCallback, this);
        }
        if (typeof this["onTouchCancelled"] == "function") {
            setCallback("onTouchCancelled", this.setTouchCancelledCallback, this);
        }
        if (typeof this["onTouchesBegan"] == "function") {
            setCallback("onTouchesBegan", this.setTouchesBeganCallback, this);
        }
        if (typeof this["onTouchesMoved"] == "function") {
            setCallback("onTouchesMoved", this.setTouchesMovedCallback, this);
        }
        if (typeof this["onTouchesEnded"] == "function") {
            setCallback("onTouchesEnded", this.setTouchesEndedCallback, this);
        }
        if (typeof this["onTouchesCancelled"] == "function") {
            setCallback("onTouchesCancelled", this.setTouchesCancelledCallback, this);
        }
		if (typeof this["draw"] == "function") {
            setCallback("draw", this.setDrawCallback, this);
        }
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    Object.defineProperties(Class.prototype,
        {
            "instanceId": {
                get: function() {
                    if (this.__native_obj__) {
                        return this.__native_obj__.instanceId;
                    } else {
                        return this._instanceId;
                    }
                },

            }
        }
    );

    // And make this class extendable
    Class.extend = arguments.callee;

    if (isNative(this)) {
        Class.prototype.__native_prototype__ = this;
    }

    return Class;
};

cc.DrawNode = crosswalk.DrawNode
cc.DrawNode.extend = cc.Class.extend
cc.ScrollView = crosswalk.ScrollView
cc.ScrollView.extend = cc.Class.extend
cc.EaseSineIn = crosswalk.EaseSineIn
cc.EaseSineIn.extend = cc.Class.extend
cc.ProgressTo = crosswalk.ProgressTo
cc.ProgressTo.extend = cc.Class.extend
cc.Hide = crosswalk.Hide
cc.Hide.extend = cc.Class.extend
cc.TransitionMoveInB = crosswalk.TransitionMoveInB
cc.TransitionMoveInB.extend = cc.Class.extend
cc.TransitionMoveInL = crosswalk.TransitionMoveInL
cc.TransitionMoveInL.extend = cc.Class.extend
cc.EGLView = crosswalk.EGLView
cc.EGLView.extend = cc.Class.extend
cc.TransitionMoveInR = crosswalk.TransitionMoveInR
cc.TransitionMoveInR.extend = cc.Class.extend
// Will be used as JS wrapper
// cc.Scheduler = crosswalk.Scheduler
// cc.Scheduler.extend = cc.Class.extend
cc.ParticleSystem = crosswalk.ParticleSystem
cc.ParticleSystem.extend = cc.Class.extend
cc.ParticleFlower = crosswalk.ParticleFlower
cc.ParticleFlower.extend = cc.Class.extend
cc.ParticleGalaxy = crosswalk.ParticleGalaxy
cc.ParticleGalaxy.extend = cc.Class.extend
cc.ParticleMeteor = crosswalk.ParticleMeteor
cc.ParticleMeteor.extend = cc.Class.extend
cc.ParticleSpiral = crosswalk.ParticleSpiral
cc.ParticleSpiral.extend = cc.Class.extend
cc.ParticleExplosion = crosswalk.ParticleExplosion
cc.ParticleExplosion.extend = cc.Class.extend
cc.ParticleSmoke = crosswalk.ParticleSmoke
cc.ParticleSmoke.extend = cc.Class.extend
cc.ParticleSnow = crosswalk.ParticleSnow
cc.ParticleSnow.extend = cc.Class.extend
cc.ParticleRain = crosswalk.ParticleRain
cc.ParticleRain.extend = cc.Class.extend
cc.ParticleSun = crosswalk.ParticleSun
cc.ParticleSun.extend = cc.Class.extend
cc.ParticleFire = crosswalk.ParticleFire
cc.ParticleFire.extend = cc.Class.extend
cc.ParticleFireworks = crosswalk.ParticleFireworks
cc.ParticleFireworks.extend = cc.Class.extend
cc.TransitionProgressHorizontal = crosswalk.TransitionProgressHorizontal
cc.TransitionProgressHorizontal.extend = cc.Class.extend
cc.MoveTo = crosswalk.MoveTo
cc.MoveTo.extend = cc.Class.extend
cc.JumpBy = crosswalk.JumpBy
cc.JumpBy.extend = cc.Class.extend
cc.AnimationFrame = crosswalk.AnimationFrame
cc.AnimationFrame.extend = cc.Class.extend
cc.EaseBounceIn = crosswalk.EaseBounceIn
cc.EaseBounceIn.extend = cc.Class.extend
cc.TransitionRotoZoom = crosswalk.TransitionRotoZoom
cc.TransitionRotoZoom.extend = cc.Class.extend
//Make sure single instance is destroyed before use it
crosswalk.Director.destroyDirector();
cc.Director = crosswalk.Director
cc.Director.extend = cc.Class.extend
cc.Texture2D = crosswalk.Texture2D
cc.Texture2D.extend = cc.Class.extend
cc.EaseElasticOut = crosswalk.EaseElasticOut
cc.EaseElasticOut.extend = cc.Class.extend
cc.EaseBackOut = crosswalk.EaseBackOut
cc.EaseBackOut.extend = cc.Class.extend
cc.TransitionFlipX = crosswalk.TransitionFlipX
cc.TransitionFlipX.extend = cc.Class.extend
cc.StopGrid = crosswalk.StopGrid
cc.StopGrid.extend = cc.Class.extend
cc.TransitionScene = crosswalk.TransitionScene
cc.TransitionScene.extend = cc.Class.extend
cc.SkewBy = crosswalk.SkewBy
cc.SkewBy.extend = cc.Class.extend
cc.TransitionProgressVertical = crosswalk.TransitionProgressVertical
cc.TransitionProgressVertical.extend = cc.Class.extend
cc.Layer = crosswalk.Layer
cc.Layer.extend = cc.Class.extend
cc.EaseElastic = crosswalk.EaseElastic
cc.EaseElastic.extend = cc.Class.extend
cc.Grid3DAction = crosswalk.Grid3DAction
cc.Grid3DAction.extend = cc.Class.extend
cc.FadeIn = crosswalk.FadeIn
cc.FadeIn.extend = cc.Class.extend
cc.NodeRGBA = crosswalk.NodeRGBA
cc.NodeRGBA.extend = cc.Class.extend
cc.AnimationCache = crosswalk.AnimationCache
cc.AnimationCache.extend = cc.Class.extend
cc.FlipY3D = crosswalk.FlipY3D
cc.FlipY3D.extend = cc.Class.extend
cc.EaseSineInOut = crosswalk.EaseSineInOut
cc.EaseSineInOut.extend = cc.Class.extend
cc.TransitionFlipAngular = crosswalk.TransitionFlipAngular
cc.TransitionFlipAngular.extend = cc.Class.extend
cc.TransitionMoveInT = crosswalk.TransitionMoveInT
cc.TransitionMoveInT.extend = cc.Class.extend
cc.EaseElasticInOut = crosswalk.EaseElasticInOut
cc.EaseElasticInOut.extend = cc.Class.extend
cc.EaseBounce = crosswalk.EaseBounce
cc.EaseBounce.extend = cc.Class.extend
cc.Show = crosswalk.Show
cc.Show.extend = cc.Class.extend
cc.FadeOut = crosswalk.FadeOut
cc.FadeOut.extend = cc.Class.extend
cc.CallFunc = crosswalk.CallFunc
cc.CallFunc.extend = cc.Class.extend
cc.Waves3D = crosswalk.Waves3D
cc.Waves3D.extend = cc.Class.extend
cc.Touch = crosswalk.Touch
cc.Touch.extend = cc.Class.extend
cc.MenuItemImage = crosswalk.MenuItemImage
cc.MenuItemImage.extend = cc.Class.extend
cc.MenuItem = crosswalk.MenuItem
cc.MenuItem.extend = cc.Class.extend
cc.ActionEase = crosswalk.ActionEase
cc.ActionEase.extend = cc.Class.extend
cc.TransitionSceneOriented = crosswalk.TransitionSceneOriented
cc.TransitionSceneOriented.extend = cc.Class.extend
cc.TransitionZoomFlipAngular = crosswalk.TransitionZoomFlipAngular
cc.TransitionZoomFlipAngular.extend = cc.Class.extend
cc.EaseIn = crosswalk.EaseIn
cc.EaseIn.extend = cc.Class.extend
cc.EaseExponentialInOut = crosswalk.EaseExponentialInOut
cc.EaseExponentialInOut.extend = cc.Class.extend
cc.EaseBackInOut = crosswalk.EaseBackInOut
cc.EaseBackInOut.extend = cc.Class.extend
cc.EaseExponentialOut = crosswalk.EaseExponentialOut
cc.EaseExponentialOut.extend = cc.Class.extend
cc.FlipX3D = crosswalk.FlipX3D
cc.FlipX3D.extend = cc.Class.extend
cc.DelayTime = crosswalk.DelayTime
cc.DelayTime.extend = cc.Class.extend
cc.ProgressTimer = crosswalk.ProgressTimer
cc.ProgressTimer.extend = cc.Class.extend
cc.LabelBMFont = crosswalk.LabelBMFont
cc.LabelBMFont.extend = cc.Class.extend
cc.TransitionFadeBL = crosswalk.TransitionFadeBL
cc.TransitionFadeBL.extend = cc.Class.extend
cc.EaseElasticIn = crosswalk.EaseElasticIn
cc.EaseElasticIn.extend = cc.Class.extend
cc.TransitionFadeTR = crosswalk.TransitionFadeTR
cc.TransitionFadeTR.extend = cc.Class.extend
cc.FiniteTimeAction = crosswalk.FiniteTimeAction
cc.FiniteTimeAction.extend = cc.Class.extend
cc.FadeOutDownTiles = crosswalk.FadeOutDownTiles
cc.FadeOutDownTiles.extend = cc.Class.extend
cc.JumpTiles3D = crosswalk.JumpTiles3D
cc.JumpTiles3D.extend = cc.Class.extend
cc.EaseBackIn = crosswalk.EaseBackIn
cc.EaseBackIn.extend = cc.Class.extend
cc.SpriteBatchNode = crosswalk.SpriteBatchNode
cc.SpriteBatchNode.extend = cc.Class.extend
cc.ActionCamera = crosswalk.ActionCamera
cc.ActionCamera.extend = cc.Class.extend
cc.ActionTween = crosswalk.ActionTween
cc.ActionTween.extend = cc.Class.extend
cc.TransitionFadeDown = crosswalk.TransitionFadeDown
cc.TransitionFadeDown.extend = cc.Class.extend
cc.ProgressFromTo = crosswalk.ProgressFromTo
cc.ProgressFromTo.extend = cc.Class.extend
cc.ActionManager = crosswalk.ActionManager
cc.ActionManager.extend = cc.Class.extend
cc.FlipX = crosswalk.FlipX
cc.FlipX.extend = cc.Class.extend
cc.FlipY = crosswalk.FlipY
cc.FlipY.extend = cc.Class.extend
cc.TransitionSplitCols = crosswalk.TransitionSplitCols
cc.TransitionSplitCols.extend = cc.Class.extend
cc.Timer = crosswalk.Timer
cc.Timer.extend = cc.Class.extend
cc.FadeTo = crosswalk.FadeTo
cc.FadeTo.extend = cc.Class.extend
cc.RepeatForever = crosswalk.RepeatForever
cc.RepeatForever.extend = cc.Class.extend
cc.Place = crosswalk.Place
cc.Place.extend = cc.Class.extend
cc.TiledGrid3D = crosswalk.TiledGrid3D
cc.TiledGrid3D.extend = cc.Class.extend
cc.MenuItemLabel = crosswalk.MenuItemLabel
cc.MenuItemLabel.extend = cc.Class.extend
cc.RenderTexture = crosswalk.RenderTexture
cc.RenderTexture.extend = cc.Class.extend
cc.Animate = crosswalk.Animate
cc.Animate.extend = cc.Class.extend
cc.TransitionShrinkGrow = crosswalk.TransitionShrinkGrow
cc.TransitionShrinkGrow.extend = cc.Class.extend
cc.LabelTTF = crosswalk.LabelTTF
cc.LabelTTF.extend = cc.Class.extend
cc.LayerMultiplex = crosswalk.LayerMultiplex
cc.LayerMultiplex.extend = cc.Class.extend
cc.Blink = crosswalk.Blink
cc.Blink.extend = cc.Class.extend
cc.ShaderCache = crosswalk.ShaderCache
cc.ShaderCache.extend = cc.Class.extend
cc.JumpTo = crosswalk.JumpTo
cc.JumpTo.extend = cc.Class.extend
cc.AtlasNode = crosswalk.AtlasNode
cc.AtlasNode.extend = cc.Class.extend
cc.TransitionJumpZoom = crosswalk.TransitionJumpZoom
cc.TransitionJumpZoom.extend = cc.Class.extend
cc.SpriteFrameCache = crosswalk.SpriteFrameCache
cc.SpriteFrameCache.extend = cc.Class.extend
cc.CatmullRomBy = crosswalk.CatmullRomBy
cc.CatmullRomBy.extend = cc.Class.extend
cc.TiledGrid3DAction = crosswalk.TiledGrid3DAction
cc.TiledGrid3DAction.extend = cc.Class.extend
cc.GLProgram = crosswalk.GLProgram
cc.GLProgram.extend = cc.Class.extend
cc.Twirl = crosswalk.Twirl
cc.Twirl.extend = cc.Class.extend
cc.LayerColor = crosswalk.LayerColor
cc.LayerColor.extend = cc.Class.extend
cc.FadeOutBLTiles = crosswalk.FadeOutBLTiles
cc.FadeOutBLTiles.extend = cc.Class.extend
cc.TransitionProgress = crosswalk.TransitionProgress
cc.TransitionProgress.extend = cc.Class.extend
cc.EaseRateAction = crosswalk.EaseRateAction
cc.EaseRateAction.extend = cc.Class.extend
cc.LayerGradient = crosswalk.LayerGradient
cc.LayerGradient.extend = cc.Class.extend
cc.MenuItemSprite = crosswalk.MenuItemSprite
cc.MenuItemSprite.extend = cc.Class.extend
cc.Node = crosswalk.Node
cc.Node.extend = cc.Class.extend
cc.ToggleVisibility = crosswalk.ToggleVisibility
cc.ToggleVisibility.extend = cc.Class.extend
cc.Repeat = crosswalk.Repeat
cc.Repeat.extend = cc.Class.extend
cc.CardinalSplineBy = crosswalk.CardinalSplineBy
cc.CardinalSplineBy.extend = cc.Class.extend
cc.TransitionFlipY = crosswalk.TransitionFlipY
cc.TransitionFlipY.extend = cc.Class.extend
cc.TurnOffTiles = crosswalk.TurnOffTiles
cc.TurnOffTiles.extend = cc.Class.extend
cc.TintTo = crosswalk.TintTo
cc.TintTo.extend = cc.Class.extend
cc.CatmullRomTo = crosswalk.CatmullRomTo
cc.CatmullRomTo.extend = cc.Class.extend
cc.ActionInstant = crosswalk.ActionInstant
cc.ActionInstant.extend = cc.Class.extend
cc.TargetedAction = crosswalk.TargetedAction
cc.TargetedAction.extend = cc.Class.extend
cc.TransitionTurnOffTiles = crosswalk.TransitionTurnOffTiles
cc.TransitionTurnOffTiles.extend = cc.Class.extend
cc.RotateTo = crosswalk.RotateTo
cc.RotateTo.extend = cc.Class.extend
cc.TransitionSplitRows = crosswalk.TransitionSplitRows
cc.TransitionSplitRows.extend = cc.Class.extend
cc.TransitionProgressRadialCCW = crosswalk.TransitionProgressRadialCCW
cc.TransitionProgressRadialCCW.extend = cc.Class.extend
cc.ScaleTo = crosswalk.ScaleTo
cc.ScaleTo.extend = cc.Class.extend
cc.TransitionPageTurn = crosswalk.TransitionPageTurn
cc.TransitionPageTurn.extend = cc.Class.extend
cc.SplitRows = crosswalk.SplitRows
cc.SplitRows.extend = cc.Class.extend
cc.SpriteFrame = crosswalk.SpriteFrame
cc.SpriteFrame.extend = cc.Class.extend
cc.Liquid = crosswalk.Liquid
cc.Liquid.extend = cc.Class.extend
cc.ParticleBatchNode = crosswalk.ParticleBatchNode
cc.ParticleBatchNode.extend = cc.Class.extend
cc.TransitionZoomFlipX = crosswalk.TransitionZoomFlipX
cc.TransitionZoomFlipX.extend = cc.Class.extend
cc.TransitionCrossFade = crosswalk.TransitionCrossFade
cc.TransitionCrossFade.extend = cc.Class.extend
cc.Ripple3D = crosswalk.Ripple3D
cc.Ripple3D.extend = cc.Class.extend
cc.Action = crosswalk.Action
cc.Action.extend = cc.Class.extend
cc.GridBase = crosswalk.GridBase
cc.GridBase.extend = cc.Class.extend
cc.Animation = crosswalk.Animation
cc.Animation.extend = cc.Class.extend
cc.Spawn = crosswalk.Spawn
cc.Spawn.extend = cc.Class.extend
cc.Set = crosswalk.Set
cc.Set.extend = cc.Class.extend
cc.ShakyTiles3D = crosswalk.ShakyTiles3D
cc.ShakyTiles3D.extend = cc.Class.extend
cc.PageTurn3D = crosswalk.PageTurn3D
cc.PageTurn3D.extend = cc.Class.extend
cc.Grid3D = crosswalk.Grid3D
cc.Grid3D.extend = cc.Class.extend
cc.TransitionProgressInOut = crosswalk.TransitionProgressInOut
cc.TransitionProgressInOut.extend = cc.Class.extend
cc.TransitionFadeUp = crosswalk.TransitionFadeUp
cc.TransitionFadeUp.extend = cc.Class.extend
cc.Camera = crosswalk.Camera
cc.Camera.extend = cc.Class.extend
cc.LayerRGBA = crosswalk.LayerRGBA
cc.LayerRGBA.extend = cc.Class.extend
cc.BezierTo = crosswalk.BezierTo
cc.BezierTo.extend = cc.Class.extend
cc.Follow = crosswalk.Follow
cc.Follow.extend = cc.Class.extend
cc.TintBy = crosswalk.TintBy
cc.TintBy.extend = cc.Class.extend
cc.ActionInterval = crosswalk.ActionInterval
cc.ActionInterval.extend = cc.Class.extend
cc.EaseBounceInOut = crosswalk.EaseBounceInOut
cc.EaseBounceInOut.extend = cc.Class.extend
cc.Menu = crosswalk.Menu
cc.Menu.extend = cc.Class.extend
cc.EaseInOut = crosswalk.EaseInOut
cc.EaseInOut.extend = cc.Class.extend
cc.TransitionZoomFlipY = crosswalk.TransitionZoomFlipY
cc.TransitionZoomFlipY.extend = cc.Class.extend
cc.ScaleBy = crosswalk.ScaleBy
cc.ScaleBy.extend = cc.Class.extend
cc.Lens3D = crosswalk.Lens3D
cc.Lens3D.extend = cc.Class.extend
cc.SkewTo = crosswalk.SkewTo
cc.SkewTo.extend = cc.Class.extend
cc.CardinalSplineTo = crosswalk.CardinalSplineTo
cc.CardinalSplineTo.extend = cc.Class.extend
cc.EaseExponentialIn = crosswalk.EaseExponentialIn
cc.EaseExponentialIn.extend = cc.Class.extend
cc.ReuseGrid = crosswalk.ReuseGrid
cc.ReuseGrid.extend = cc.Class.extend
cc.MenuItemAtlasFont = crosswalk.MenuItemAtlasFont
cc.MenuItemAtlasFont.extend = cc.Class.extend
cc.Sprite = crosswalk.Sprite
cc.Sprite.extend = cc.Class.extend
cc.OrbitCamera = crosswalk.OrbitCamera
cc.OrbitCamera.extend = cc.Class.extend
cc.Component = crosswalk.Component
cc.Component.extend = cc.Class.extend
cc.FadeOutUpTiles = crosswalk.FadeOutUpTiles
cc.FadeOutUpTiles.extend = cc.Class.extend
cc.TextFieldTTF = crosswalk.TextFieldTTF
cc.TextFieldTTF.extend = cc.Class.extend
cc.Waves = crosswalk.Waves
cc.Waves.extend = cc.Class.extend
cc.EaseOut = crosswalk.EaseOut
cc.EaseOut.extend = cc.Class.extend
cc.MenuItemFont = crosswalk.MenuItemFont
cc.MenuItemFont.extend = cc.Class.extend
cc.EaseSineOut = crosswalk.EaseSineOut
cc.EaseSineOut.extend = cc.Class.extend
cc.TextureCache = crosswalk.TextureCache
cc.TextureCache.extend = cc.Class.extend
cc.MenuItemToggle = crosswalk.MenuItemToggle
cc.MenuItemToggle.extend = cc.Class.extend
cc.SplitCols = crosswalk.SplitCols
cc.SplitCols.extend = cc.Class.extend
cc.EGLViewProtocol = crosswalk.EGLViewProtocol
cc.EGLViewProtocol.extend = cc.Class.extend
cc.MoveBy = crosswalk.MoveBy
cc.MoveBy.extend = cc.Class.extend
cc.MotionStreak = crosswalk.MotionStreak
cc.MotionStreak.extend = cc.Class.extend
cc.RotateBy = crosswalk.RotateBy
cc.RotateBy.extend = cc.Class.extend
cc.BezierBy = crosswalk.BezierBy
cc.BezierBy.extend = cc.Class.extend
cc.FadeOutTRTiles = crosswalk.FadeOutTRTiles
cc.FadeOutTRTiles.extend = cc.Class.extend
cc.Scene = crosswalk.Scene
cc.Scene.extend = cc.Class.extend
cc.TransitionFade = crosswalk.TransitionFade
cc.TransitionFade.extend = cc.Class.extend
cc.TransitionProgressOutIn = crosswalk.TransitionProgressOutIn
cc.TransitionProgressOutIn.extend = cc.Class.extend
cc.EaseBounceOut = crosswalk.EaseBounceOut
cc.EaseBounceOut.extend = cc.Class.extend
cc.GridAction = crosswalk.GridAction
cc.GridAction.extend = cc.Class.extend
cc.Sequence = crosswalk.Sequence
cc.Sequence.extend = cc.Class.extend
cc.Shaky3D = crosswalk.Shaky3D
cc.Shaky3D.extend = cc.Class.extend
cc.TransitionProgressRadialCW = crosswalk.TransitionProgressRadialCW
cc.TransitionProgressRadialCW.extend = cc.Class.extend
cc.ShuffleTiles = crosswalk.ShuffleTiles
cc.ShuffleTiles.extend = cc.Class.extend
cc.TransitionSlideInR = crosswalk.TransitionSlideInR
cc.TransitionSlideInR.extend = cc.Class.extend
cc.TransitionSlideInT = crosswalk.TransitionSlideInT
cc.TransitionSlideInT.extend = cc.Class.extend
cc.TransitionSlideInL = crosswalk.TransitionSlideInL
cc.TransitionSlideInL.extend = cc.Class.extend
cc.WavesTiles3D = crosswalk.WavesTiles3D
cc.WavesTiles3D.extend = cc.Class.extend
cc.TransitionSlideInB = crosswalk.TransitionSlideInB
cc.TransitionSlideInB.extend = cc.Class.extend
cc.Speed = crosswalk.Speed
cc.Speed.extend = cc.Class.extend
cc.ShatteredTiles3D = crosswalk.ShatteredTiles3D
cc.ShatteredTiles3D.extend = cc.Class.extend
cc.TMXLayer = crosswalk.TMXLayer
cc.TMXLayer.extend =cc.Class.extend
cc.TMXLayerInfo = crosswalk.TMXLayerInfo
cc.TMXLayerInfo.extend = cc.Class.extend
cc.TMXMapInfo = crosswalk.TMXMapInfo
cc.TMXMapInfo.extend = cc.Class.extend
cc.TMXObjectGroup = crosswalk.TMXObjectGroup
cc.TMXObjectGroup.extend = cc.Class.extend
cc.TMXTiledMap = crosswalk.TMXTiledMap
cc.TMXTiledMap.extend = cc.Class.extend
cc.TMXTilesetInfo = crosswalk.TMXTilesetInfo
cc.TMXTilesetInfo.extend = cc.Class.extend
cc.LabelAtlas = crosswalk.LabelAtlas;
cc.LabelAtlas.extend = cc.Class.extend;
cc.Scale9Sprite = crosswalk.Scale9Sprite;
cc.Scale9Sprite.extend = cc.Class.extend;
cc.ClippingNode = crosswalk.ClippingNode;
cc.ClippingNode.extend = cc.Class.extend;
cc.TableViewCell = crosswalk.TableViewCell;
cc.TableViewCell.extend = cc.Class.extend;
cc.GLNode = crosswalk.GLNode;
cc.GLNode.extend = cc.Class.extend;
cc.TableView = crosswalk.TableView;
cc.TableView.extend = cc.Class.extend;

var ccs = ccs || {};
ccs.Armature = crosswalk.Armature;
ccs.Armature.extend = cc.Class.extend;
ccs.ArmatureAnimation = crosswalk.ArmatureAnimation;
ccs.ArmatureAnimation.extend = cc.Class.extend;
ccs.ArmatureDataManager = crosswalk.ArmatureDataManager;
ccs.ArmatureDataManager.extend = cc.Class.extend;
ccs.ComController = crosswalk.ComController;
ccs.ComController.extend = cc.Class.extend;

cc.TouchDelegate = crosswalk.TouchDelegate;
cc.Dictionary = crosswalk.Dictionary
cc.Dictionary.extend = cc.Class.extend
cc.Point = crosswalk.Point
cc.Point.extend = cc.Class.extend
cc.Array = crosswalk.Array
cc.Array.extend = cc.Class.extend
cc.AffineTransform = crosswalk.AffineTransform
cc.AffineTransform.extend = cc.Class.extend
cc.Rect = crosswalk.Rect
cc.Rect.extend = cc.Class.extend
cc.Size = crosswalk.Size
cc.Size.extend = cc.Class.extend

// Cocos2d-html5 supports multi scene resources preloading.
// This is a compatible function for JSB.

var ConfigType = {
    NONE: 0,
    COCOSTUDIO: 1
};

var __onParseConfig = function(type, str) {
    if (type === ConfigType.COCOSTUDIO) {
        ccs.TriggerMng.getInstance().parse(JSON.parse(str));
    }
};

cc.VisibleRect = {
    _topLeft:cc.p(0,0),
    _topRight:cc.p(0,0),
    _top:cc.p(0,0),
    _bottomLeft:cc.p(0,0),
    _bottomRight:cc.p(0,0),
    _bottom:cc.p(0,0),
    _center:cc.p(0,0),
    _left:cc.p(0,0),
    _right:cc.p(0,0),
    _width:0,
    _height:0,
    _isInitialized: false,
    init:function(){
        var director = cc.Director.getInstance();
        var origin = director.getVisibleOrigin();
        var size = director.getVisibleSize();

        this._width = size.width;
        this._height = size.height;

        var x = origin.x;
        var y = origin.y;
        var w = this._width;
        var h = this._height;

        var left = origin.x;
        var right = origin.x + size.width;
        var middle = origin.x + size.width/2;

        //top
        this._top.y = this._topLeft.y = this._topRight.y = y + h;
        this._topLeft.x = left;
        this._top.x = middle;
        this._topRight.x = right;

        //bottom

        this._bottom.y = this._bottomRight.y = this._bottomLeft.y = y;
        this._bottomLeft.x = left
        this._bottom.x = middle;
        this._bottomRight.x = right;

        //center
        this._right.y = this._left.y = this._center.y = y + h/2;
        this._center.x = middle;

        //left
        this._left.x = left;

        //right
        this._right.x = right;
    },

    lazyInit: function(){
        if (!this._isInitialized) {
            this.init();
            this._isInitialized = true;
        }
    },
    getWidth:function(){
        this.lazyInit();
        return this._width;
    },
    getHeight:function(){
        this.lazyInit();
        return this._height;
    },
    topLeft:function(){
        this.lazyInit();
        return this._topLeft;
    },
    topRight:function(){
        this.lazyInit();
        return this._topRight;
    },
    top:function(){
        this.lazyInit();
        return this._top;
    },
    bottomLeft:function(){
        this.lazyInit();
        return this._bottomLeft;
    },
    bottomRight:function(){
        this.lazyInit();
        return this._bottomRight;
    },
    bottom:function(){
        this.lazyInit();
        return this._bottom;
    },
    center:function(){
        this.lazyInit();
        return this._center;
    },
    left:function(){
        this.lazyInit();
        return this._left;
    },
    right:function(){
        this.lazyInit();
        return this._right;
    }
};

Object.defineProperties(cc.Node.prototype,
    {
        onTouchesBegan: {
            get: function () {
                return this._onTouchesBegan;
            },
            set: function (onTouchesBegan) {
                this._onTouchesBegan = onTouchesBegan;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchesBegan"] == "function") {
                    obj.setTouchesBeganCallback(function() {
                        return obj["_onTouchesBegan"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        onTouchesMoved: {
            get: function () {
                return this._onTouchesMoved;
            },
            set: function (onTouchesMoved) {
                this._onTouchesMoved = onTouchesMoved;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchesMoved"] == "function") {
                    obj.setTouchesMovedCallback(function() {
                        return obj["_onTouchesMoved"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        onTouchesEnded: {
            get: function () {
                return this._onTouchesEnded;
            },
            set: function (onTouchesEnded) {
                this._onTouchesEnded = onTouchesEnded;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchesEnded"] == "function") {
                    obj.setTouchesEndedCallback(function() {
                        return obj["_onTouchesEnded"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        onTouchesCancelled: {
            get: function () {
                return this._onTouchesCancelled;
            },
            set: function (onTouchesCancelled) {
                this._onTouchesCancelled = onTouchesCancelled;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchesCancelled"] == "function") {
                    obj.setTouchesCancelledCallback(function() {
                        return obj["_onTouchesCancelled"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        onTouchBegan: {
            get: function () {
                return this._onTouchBegan;
            },
            set: function (onTouchBegan) {
                this._onTouchBegan = onTouchBegan;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchBegan"] == "function") {
                    obj.setTouchBeganCallback(function() {
                        return obj["_onTouchBegan"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        onTouchMoved: {
            get: function () {
                return this._onTouchMoved;
            },
            set: function (onTouchMoved) {
                this._onTouchMoved = onTouchMoved;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchMoved"] == "function") {
                    obj.setTouchMovedCallback(function() {
                        return obj["_onTouchMoved"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        onTouchEnded: {
            get: function () {
                return this._onTouchEnded;
            },
            set: function (onTouchEnded) {
                this._onTouchEnded = onTouchEnded;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchEnded"] == "function") {
                    obj.setTouchEndedCallback(function() {
                        return obj["_onTouchEnded"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        onTouchCancelled: {
            get: function () {
                return this._onTouchCancelled;
            },
            set: function (onTouchCancelled) {
                this._onTouchCancelled = onTouchCancelled;

                var obj = this;
                if (obj.instanceId && typeof obj["_onTouchCancelled"] == "function") {
                    obj.setTouchCancelledCallback(function() {
                        return obj["_onTouchCancelled"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        },
        _position: {
            get: function () {
                return this.getPosition();
            },
            set: function (p) {
                this.setPosition(p);
            },
            enumerable: false,
            configurable: false
        },
        _contentSize: {
            get: function () {
                return this.getContentSize();
            },
            set: function (contentSize) {
                this.setContentSize(contentSize);
            },
            enumerable: false,
            configurable: false
        },
        _anchorPoint: {
            get: function () {
                return this.getAnchorPoint();
            },
            set: function (anchorPoint) {
                this.setAnchorPoint(anchorPoint);
            },
            enumerable: false,
            configurable: false
        }
    }
);

Object.defineProperties(cc.GLNode.prototype,
{
        draw: {
            get: function () {
                return this._draw;
            },
            set: function (onDraw) {
                this._draw = onDraw;

                var obj = this;
                if (obj.instanceId && typeof obj["_draw"] == "function") {
                    obj.setDrawCallback(function() {
                        return obj["_draw"].apply(obj, arguments);
                    });
                }
            },
            enumerable: true,
            configurable: true
        }
});

