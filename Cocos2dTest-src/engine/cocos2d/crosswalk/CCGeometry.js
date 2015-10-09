/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

//--------------------------------------------------------
//
// POINT
//
//--------------------------------------------------------
var bind = Function.bind;
var unbind = bind.bind(bind);

function instantiate(constructor, args) {
    return new (unbind(constructor, null).apply(null, args));
}

/**
 * @class
 * @param {Number|cc.Point} _x
 * @param {Number} _y
 * Constructor
 */
cc.Point = function () {
    return function () {
        var point = instantiate(crosswalk.Point);
        if(arguments.length === 1){
            point.x = arguments[0].x;
            point.y = arguments[0].y;
        } else {
            point.x = arguments[0] || 0;
            point.y = arguments[1] || 0;
        }
        return point;
    }
}();

cc._PointConst = function () {
    return function () {
        var x = arguments[0];
        var y = arguments[1];
        var point = instantiate(crosswalk.Point);
        point.x = x || 0;
        point.y = y || 0;
        return point;
    }
}();


cc._pConst = function (x, y) {
    return new cc._PointConst(x, y);
};

Object.defineProperties(crosswalk.Point.prototype, {
    _x: {
        get: function () {
            return this.x;
        },
        set: function (x) {
            this.x = x;
        },
        enumerable: true
    },

    _y: {
        get: function () {
            return this.y;
        },
        set: function (y) {
            this.y = y;
        },
        enumerable: true
    }
});

/**
 * @function
 * @param {Number} x
 * @param {Number} y
 * @return {cc.Point}
 * @deprecated
 */
cc.PointMake = function (x, y) {
    cc.log("cc.PointMake will be deprecated sooner or later. Use cc.p instead.");
    if(arguments.length === 1){
        return new crosswalk.Point(x.x, x.y);
    } else {
        return new crosswalk.Point(x, y);
    }
};

/**
 * Helper macro that creates a cc.Point.
 * @param {Number|cc.Point} x
 * @param {Number} y
 */
cc.p = function (x, y) {
    // This can actually make use of "hidden classes" in JITs and thus decrease
    // memory usage and overall performance drastically
    // return new cc.Point(x, y);
    // but this one will instead flood the heap with newly allocated hash maps
    // giving little room for optimization by the JIT,
    // note: we have tested this item on Chrome and firefox, it is faster than new cc.Point(x, y)
    // if(arguments.length === 1)
    //     return {x: x.x, y: x.y};
    // else
    //     return {x: x || 0, y: y || 0};
    // For Crosswalk
    if(arguments.length === 1){
        return new crosswalk.Point(x.x, x.y);
    } else {
        return new crosswalk.Point(x, y);
    }
    // return new cc.Point(x, y);
};

// JSB compatbility: in JSB, cc._p reuses objects instead of creating new ones
cc._p = cc.p;

/**
 * The "left bottom" point -- equivalent to cc.p(0, 0).
 * @function
 * @return {cc.Point}
 */
cc.PointZero = function () {
    return cc.p(0, 0);
};

/**
 * @function
 * @param {cc.Point} point1
 * @param {cc.Point} point2
 * @return {Boolean}
 */
cc.pointEqualToPoint = function (point1, point2) {
    if (!point1 || !point2)
        return false;
    return ((point1.x === point2.x) && (point1.y === point2.y));
};

// deprecated
//cc.Point.CCPointEqualToPoint = cc.pointEqualToPoint;


//--------------------------------------------------------
//
// SIZE
//
//--------------------------------------------------------

/**
 * @class
 * @param {Number|cc.Size} _width
 * @param {Number} _height
 * Constructor
 */
cc.Size = function () {
    return function () {
        var size = instantiate(crosswalk.Size);
        if(arguments.length === 1){
            size.width = arguments[0].width;
            size.height = arguments[0].height;
        } else {
            size.width = arguments[0] || 0;
            size.height = arguments[1] || 0;
        }
        return size;
    }
}();

cc._SizeConst = function () {
    return function () {
        var width = arguments[0];
        var height = arguments[1];
        var size = instantiate(crosswalk.Size);
        size.width = width;
        size.height = height;
        return size;
    }
}();


cc._sizeConst = function (width, height) {
    return new cc._SizeConst(width, height);
};

Object.defineProperties(crosswalk.Size.prototype, {
    _width: {
        get: function () {
            return this.width;
        },
        set: function (width) {
            this.width = width;
        },
        enumerable: true
    },

    _height: {
        get: function () {
            return this.height;
        },
        set: function (height) {
            this.height = height;
        },
        enumerable: true
    }
});

/**
 * @function
 * @param {Number} width
 * @param {Number} height
 * @return {cc.Size}
 * @deprecated
 */
cc.SizeMake = function (width, height) {
    cc.log("cc.SizeMake will be deprecated sooner or later. Use cc.size instead.");
    if(arguments.length === 1){
        size.width = arguments[0].width;
        size.height = arguments[0].height;
        return new crosswalk.Size(arguments[0].width, arguments[0].height);
    } else {
        var width = arguments[0] || 0;
        var height = arguments[1] || 0;
        return new crosswalk.Size(width, height);
    }
};

/**
 * @function
 * @param {Number|cc.Size} w width or a size object
 * @param {Number} h height
 * @return {cc.Size}
 */
cc.size = function (w, h) {
    // This can actually make use of "hidden classes" in JITs and thus decrease
    // memory usage and overall performance drastically
    //return new cc.Size(w, h);
    // but this one will instead flood the heap with newly allocated hash maps
    // giving little room for optimization by the JIT
    // note: we have tested this item on Chrome and firefox, it is faster than new cc.Size(w, h)
    // if(arguments.length === 1)
    //     return { width: w.width, height: w.height};
    // else
    //     return { width: w || 0, height: h || 0};
    if(arguments.length === 1){
        size.width = arguments[0].width;
        size.height = arguments[0].height;
        return new crosswalk.Size(arguments[0].width, arguments[0].height);
    } else {
        var width = arguments[0] || 0;
        var height = arguments[1] || 0;
        return new crosswalk.Size(width, height);
    }
};

// JSB compatbility: in JSB, cc._size reuses objects instead of creating new ones
cc._size = cc.size;

/**
 * The "zero" size -- equivalent to cc.size(0, 0).
 * @function
 * @return {cc.Size}
 */
cc.SizeZero = function () {
    return cc.size(0, 0);
};

cc._zeroConsts = {pointZero: cc._pConst(0,0), sizeZero: cc._sizeConst(0,0)};

Object.defineProperties(cc, {
    POINT_ZERO:{
        get:function () {
            return cc._zeroConsts.pointZero;
        }
    },
    SIZE_ZERO:{
        get:function () {
            return cc._zeroConsts.sizeZero;
        }
    },
    RECT_ZERO:{
        get:function () {
            return cc.rect(0, 0, 0, 0);
        }
    }
});


/**
 * @function
 * @param {cc.Size} size1
 * @param {cc.Size} size2
 * @return {Boolean}
 */
cc.sizeEqualToSize = function (size1, size2) {
    if (!size1 || !size2)
        return false;
    return ((size1.width == size2.width) && (size1.height == size2.height));
};

// deprecated
//cc.Size.CCSizeEqualToSize = cc.sizeEqualToSize;

//--------------------------------------------------------
//
// RECT
//
//--------------------------------------------------------

/**
 * @class
 * @param {Number|cc.Point|cc.Rect} [x1] a Number value as x or a cc.Point object as origin or a cc.Rect clone object
 * @param {Number|cc.Size} [y1] x1 a Number value as y or a cc.Size object as size
 * @param {Number} [width1]
 * @param {Number} [height1]
 * Constructor
 */
cc.Rect = function (x1, y1, width1, height1) {
    return function () {
        var x1 = arguments[0];
        var y1 = arguments[1];
        var width1 = arguments[2];
        var height1 = arguments[3];
        var argLen =arguments.length;
        var rect = instantiate(crosswalk.Rect);
        if(argLen === 4){
            rect.origin = new cc.Point(x1 || 0, y1 || 0);
            rect.size = new cc.Size(width1 || 0, height1 || 0);
            return rect;
        }
        if(argLen === 1) {
            rect.origin = new cc.Point(x1.origin.x, x1.origin.y);
            rect.size = new cc.Size(x1.size.width, x1.size.height);
            return rect;
        }
        if(argLen === 0) {
            rect.origin = new cc.Point(0, 0);
            rect.size = new cc.Size(0,0);
            return rect;
        }
        if(argLen === 2) {
            rect.origin = new cc.Point(x1.x, x1.y);
            rect.size = new cc.Size(y1.width,y1.height);
            return rect;
        }
        throw "unknown argument type";
    }
}();

/**
 * @function
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {cc.Rect}
 */
cc.RectMake = function (x1, y1, width1, height1) {
    cc.log("cc.RectMake will be deprecated sooner or later. Use cc.rect instead.");
    var argLen =arguments.length;
    if(argLen === 4){
        return new crosswalk.Rect(x1 || 0, y1 || 0, width1 || 0, height1 || 0);
    }
    if(argLen === 1) {
        return new crosswalk.Rect(x1.origin.x, x1.origin.y, x1.size.width, x1.size.height);
    }
    if(argLen === 0) {
        return new crosswalk.Rect(0, 0);
    }
    if(argLen === 2) {
        return new crosswalk.Rect(x1.x, x1.y, y1.width,y1.height);
    }
};

// backward compatible
cc.rect = function (x1, y1, width1, height1) {
    var argLen =arguments.length;
    if(argLen === 4){
        return new crosswalk.Rect(x1 || 0, y1 || 0, width1 || 0, height1 || 0);
    }
    if(argLen === 1) {
        return new crosswalk.Rect(x1.origin.x, x1.origin.y, x1.size.width, x1.size.height);
    }
    if(argLen === 0) {
        return new crosswalk.Rect(0, 0);
    }
    if(argLen === 2) {
        return new crosswalk.Rect(x1.x, x1.y, y1.width,y1.height);
    }
};

// JSB compatbility: in JSB, cc._rect reuses objects instead of creating new ones
cc._rect = cc.rect;

/**
 * The "zero" rectangle -- equivalent to cc.rect(0, 0, 0, 0).
 * @function
 * @return {cc.Rect}
 */
cc.RectZero = function () {
    return cc.rect(0, 0, 0, 0);
};

/**
 * @function
 * @param {cc.Rect} rect1
 * @param {cc.Rect} rect2
 * @return {Boolean}
 */
cc.rectEqualToRect = function (rect1, rect2) {
    if(!rect1 || !rect2)
        return false;
    return ((cc.pointEqualToPoint(rect1.origin, rect2.origin)) &&
        (cc.sizeEqualToSize(rect1.size, rect2.size)));
};

cc._rectEqualToZero = function(rect){
    if(!rect)
        return false;
    return (rect.x === 0) && (rect.y === 0) && (rect.width === 0) && (rect.height === 0);
};

/**
 * @function
 * @param {cc.Rect} rect1
 * @param {cc.Rect} rect2
 * @return {Boolean}
 */
cc.rectContainsRect = function (rect1, rect2) {
    if (!rect1 || !rect2)
        return false;

    return !((rect1.x >= rect2.x) || (rect1.y >= rect2.y) ||
        ( rect1.x + rect1.width <= rect2.x + rect2.width) ||
        ( rect1.y + rect1.height <= rect2.y + rect2.height));
};

/**
 * return the rightmost x-value of 'rect'
 * @function
 * @param {cc.Rect} rect
 * @return {Number}
 */
cc.rectGetMaxX = function (rect) {
    return (rect.x + rect.width);
};

/**
 * return the midpoint x-value of 'rect'
 * @function
 * @param {cc.Rect} rect
 * @return {Number}
 */
cc.rectGetMidX = function (rect) {
    return (rect.x + rect.width / 2.0);
};
/**
 * return the leftmost x-value of 'rect'
 * @function
 * @param {cc.Rect} rect
 * @return {Number}
 */
cc.rectGetMinX = function (rect) {
    return rect.x;
};

/**
 * Return the topmost y-value of `rect'
 * @function
 * @param {cc.Rect} rect
 * @return {Number}
 */
cc.rectGetMaxY = function (rect) {
    return(rect.y + rect.height);
};

/**
 * Return the midpoint y-value of `rect'
 * @function
 * @param {cc.Rect} rect
 * @return {Number}
 */
cc.rectGetMidY = function (rect) {
    return rect.y + rect.height / 2.0;
};

/**
 * Return the bottommost y-value of `rect'
 * @function
 * @param {cc.Rect} rect
 * @return {Number}
 */
cc.rectGetMinY = function (rect) {
    return rect.y;
};

/**
 * @function
 * @param {cc.Rect} rect
 * @param {cc.Point} point
 * @return {Boolean}
 */
cc.rectContainsPoint = function (rect, point) {
    return (point.x >= cc.rectGetMinX(rect) && point.x <= cc.rectGetMaxX(rect) &&
        point.y >= cc.rectGetMinY(rect) && point.y <= cc.rectGetMaxY(rect)) ;
};

/**
 * @function
 * @param {cc.Rect} rectA
 * @param {cc.Rect} rectB
 * @return {Boolean}
 */
cc.rectIntersectsRect = function (rectA, rectB) {
    return !(cc.rectGetMaxX(rectA) < cc.rectGetMinX(rectB) ||
        cc.rectGetMaxX(rectB) < cc.rectGetMinX(rectA) ||
        cc.rectGetMaxY(rectA) < cc.rectGetMinY(rectB) ||
        cc.rectGetMaxY(rectB) < cc.rectGetMinY(rectA));
};

/**
 * @function
 * @param {cc.Rect} rectA
 * @param {cc.Rect} rectB
 * @return {Boolean}
 */
cc.rectOverlapsRect = function (rectA, rectB) {
    return !((rectA.x + rectA.width < rectB.x) ||
        (rectB.x + rectB.width < rectA.x) ||
        (rectA.y + rectA.height < rectB.y) ||
        (rectB.y + rectB.height < rectA.y));
};

/**
 * Returns the smallest rectangle that contains the two source rectangles.
 * @function
 * @param {cc.Rect} rectA
 * @param {cc.Rect} rectB
 * @return {cc.Rect}
 */
cc.rectUnion = function (rectA, rectB) {
    var rect = cc.rect(0, 0, 0, 0);
    rect.x = Math.min(rectA.x, rectB.x);
    rect.y = Math.min(rectA.y, rectB.y);
    rect.width = Math.max(rectA.x + rectA.width, rectB.x + rectB.width) - rect.x;
    rect.height = Math.max(rectA.y + rectA.height, rectB.y + rectB.height) - rect.y;
    return rect;
};

/**
 * Returns the overlapping portion of 2 rectangles
 * @function
 * @param {cc.Rect} rectA
 * @param {cc.Rect} rectB
 * @return {cc.Rect}
 */
cc.rectIntersection = function (rectA, rectB) {
    var intersection = cc.rect(
        Math.max(cc.rectGetMinX(rectA), cc.rectGetMinX(rectB)),
        Math.max(cc.rectGetMinY(rectA), cc.rectGetMinY(rectB)),
        0, 0);

    intersection.width = Math.min(cc.rectGetMaxX(rectA), cc.rectGetMaxX(rectB)) - cc.rectGetMinX(intersection);
    intersection.height = Math.min(cc.rectGetMaxY(rectA), cc.rectGetMaxY(rectB)) - cc.rectGetMinY(intersection);
    return intersection;
};

//
// Rect JSB compatibility
// JSB uses:
//   rect.x, rect.y, rect.width and rect.height
// while HTML5 uses:
//   rect.origin, rect.size
//
crosswalk.Rect.prototype.getX = function() {
    return this.origin.x;
};
crosswalk.Rect.prototype.setX = function(x) {
    this.origin.x = x;
};
crosswalk.Rect.prototype.getY = function() {
    return this.origin.y;
};
crosswalk.Rect.prototype.setY = function(y) {
    this.origin.y = y;
};
crosswalk.Rect.prototype.getWidth = function(){
    return this.size.width;
};
crosswalk.Rect.prototype.setWidth = function(w){
    this.size.width = w;
};
crosswalk.Rect.prototype.get_Width = function(){
    return this.size.width;
};
crosswalk.Rect.prototype.set_Width = function(w){
    this.size.width = w;
};

crosswalk.Rect.prototype.getHeight = function(){
    return this.size.height;
};
crosswalk.Rect.prototype.setHeight = function(h){
    this.size.height = h;
};

Object.defineProperties(crosswalk.Rect.prototype,
    {
        "_x": {
            get: function () {
                return this.getX();
            },
            set: function (newValue) {
                this.setX(newValue);
            },
            enumerable: true,
            configurable: true
        },
        "_y": {
            get: function () {
                return this.getY();
            },
            set: function (newValue) {
                this.setY(newValue);
            },
            enumerable: true,
            configurable: true
        },
        "_width": {
            get: function () {
                return this.getWidth();
            },
            set: function (newValue) {
                this.setWidth(newValue);
            },
            enumerable: true,
            configurable: true
        },
        "_height": {
            get: function () {
                return this.getHeight();
            },
            set: function (newValue) {
                this.setHeight(newValue);
            },
            enumerable: true,
            configurable: true
        },
        "_size": {
            get: function () {
                return this.size;
            },
            set: function (newValue) {
                this.size = newValue;
            },
            enumerable: true,
            configurable: true
        },
        "_origin": {
            get: function () {
                return this.origin;
            },
            set: function (newValue) {
                this.origin = newValue;
            },
            enumerable: true,
            configurable: true
        }

    }
);

// Deprecated
/*cc.Rect.CCRectEqualToRect = cc.rectEqualToRect;
cc.Rect.CCRectContainsRect = cc.rectContainsRect;
cc.Rect.CCRectGetMaxX = cc.rectGetMaxX;
cc.Rect.CCRectGetMidX = cc.rectGetMidX;
cc.Rect.CCRectGetMinX = cc.rectGetMinX;
cc.Rect.CCRectGetMaxY = cc.rectGetMaxY;
cc.Rect.CCRectGetMidY = cc.rectGetMidY;
cc.Rect.CCRectGetMinY = cc.rectGetMinY;
cc.Rect.CCRectContainsPoint = cc.rectContainsPoint;
cc.Rect.CCRectIntersectsRect = cc.rectIntersectsRect;
cc.Rect.CCRectUnion = cc.rectUnion;
cc.Rect.CCRectIntersection = cc.rectIntersection;*/

