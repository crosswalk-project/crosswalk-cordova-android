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

/**
 * @function
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 */
cc.AffineTransform = crosswalk.AffineTransform;

cc.__AffineTransformMake = function (a, b, c, d, tx, ty) {
    return new cc.AffineTransform(a, b, c, d, tx, ty);
};

/**
 * @function
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformMake = function (a, b, c, d, tx, ty) {
    return new cc.AffineTransform(a, b, c, d, tx, ty);
};

cc.__PointApplyAffineTransform = function (point, t) {
    return new cc.Point(t.a * point.x + t.c * point.y + t.tx, t.b * point.x + t.d * point.y + t.ty)
};

/**
 * @function
 * @param {cc.Point} point
 * @param {cc.AffineTransform} t
 * @return {cc.Point}
 * Constructor
 */
cc.PointApplyAffineTransform = function (point, t) {
    return new cc.Point(t.a * point.x + t.c * point.y + t.tx, t.b * point.x + t.d * point.y + t.ty);
};

cc._PointApplyAffineTransform = function (x, y, t) {
    return new cc.Point(t.a * x + t.c * y + t.tx, t.b * x + t.d * y + t.ty);
};

cc.__SizeApplyAffineTransform = function (size, t) {
    return new cc.Size(t.a * size.width + t.c * size.height, t.b * size.width + t.d * size.height);
};

/**
 * @function
 * @param {cc.Size} size
 * @param {cc.AffineTransform} t
 * @return {cc.Size}
 * Constructor
 */
cc.SizeApplyAffineTransform = function (size, t) {
    return new cc.Size(t.a * size.width + t.c * size.height, t.b * size.width + t.d * size.height);
};

/**
 * @function
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformMakeIdentity = function () {
    return new cc.AffineTransform(1, 0, 0, 1, 0, 0);
};

/**
 * @function
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformIdentity = function () {
    return new cc.AffineTransform(1, 0, 0, 1, 0, 0);
};

/**
 * @function
 * @param {cc.Rect} rect
 * @param {cc.AffineTransform} anAffineTransform
 * @return {cc.Rect}
 * Constructor
 */
cc.RectApplyAffineTransform = function (rect, anAffineTransform) {
    var top = cc.rectGetMinY(rect);
    var left = cc.rectGetMinX(rect);
    var right = cc.rectGetMaxX(rect);
    var bottom = cc.rectGetMaxY(rect);

    var topLeft = cc._PointApplyAffineTransform(left, top, anAffineTransform);
    var topRight = cc._PointApplyAffineTransform(right, top, anAffineTransform);
    var bottomLeft = cc._PointApplyAffineTransform(left, bottom, anAffineTransform);
    var bottomRight = cc._PointApplyAffineTransform(right, bottom, anAffineTransform);

    var minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);

    return cc.rect(minX, minY, (maxX - minX), (maxY - minY));
};

cc._RectApplyAffineTransformIn = function(rect, anAffineTransform){
    var top = cc.rectGetMinY(rect);
    var left = cc.rectGetMinX(rect);
    var right = cc.rectGetMaxX(rect);
    var bottom = cc.rectGetMaxY(rect);

    var topLeft = cc._PointApplyAffineTransform(left, top, anAffineTransform);
    var topRight = cc._PointApplyAffineTransform(right, top, anAffineTransform);
    var bottomLeft = cc._PointApplyAffineTransform(left, bottom, anAffineTransform);
    var bottomRight = cc._PointApplyAffineTransform(right, bottom, anAffineTransform);

    var minX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var maxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
    var minY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
    var maxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);

    rect.x = minX;
    rect.y = minY;
    rect.width = maxX - minX;
    rect.height = maxY - minY;
    return rect;
};

/**
 * @function
 * @param {cc.AffineTransform} t
 * @param {Number} tx
 * @param {Number}ty
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformTranslate = function (t, tx, ty) {
    return new cc.AffineTransform(t.a, t.b, t.c, t.d, t.tx + t.a * tx + t.c * ty, t.ty + t.b * tx + t.d * ty);
};

/**
 * @function
 * @param {cc.AffineTransform} t
 * @param {Number} sx
 * @param {Number} sy
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformScale = function (t, sx, sy) {
    return new cc.AffineTransform(t.a * sx, t.b * sx, t.c * sy, t.d * sy, t.tx, t.ty);
};

/**
 * @function
 * @param {cc.AffineTransform} aTransform
 * @param {Number} anAngle
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformRotate = function (aTransform, anAngle) {
    var fSin = Math.sin(anAngle);
    var fCos = Math.cos(anAngle);

    return new cc.AffineTransform(
        aTransform.a * fCos + aTransform.c * fSin,
        aTransform.b * fCos + aTransform.d * fSin,
        aTransform.c * fCos - aTransform.a * fSin,
        aTransform.d * fCos - aTransform.b * fSin,
        aTransform.tx,
        aTransform.ty
        );
};

/** Concatenate `t2' to `t1' and return the result:<br/>
 * t' = t1 * t2
 * @param {cc.AffineTransform} t1
 * @param {cc.AffineTransform} t2
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformConcat = function (t1, t2) {
    return new cc.AffineTransform(
        t1.a * t2.a + t1.b * t2.c,                               //a
        t1.a * t2.b + t1.b * t2.d,                               //b
        t1.c * t2.a + t1.d * t2.c,                               //c
        t1.c * t2.b + t1.d * t2.d,                               //d
        t1.tx * t2.a + t1.ty * t2.c + t2.tx,                     //tx
        t1.tx * t2.b + t1.ty * t2.d + t2.ty
        );
};

/**
 * Return true if `t1' and `t2' are equal, false otherwise.
 * @function
 * @param {cc.AffineTransform} t1
 * @param {cc.AffineTransform} t2
 * @return {Boolean}
 * Constructor
 */
cc.AffineTransformEqualToTransform = function (t1, t2) {
    return ((t1.a === t2.a) && (t1.b === t2.b) && (t1.c === t2.c) && (t1.d === t2.d) && (t1.tx === t2.tx) && (t1.ty === t2.ty));
};

/**
 * @function
 * @param {cc.AffineTransform} t
 * @return {cc.AffineTransform}
 * Constructor
 */
cc.AffineTransformInvert = function (t) {
    var determinant = 1 / (t.a * t.d - t.b * t.c);
    return new cc.AffineTransform(
        determinant * t.d,
        -determinant * t.b,
        -determinant * t.c,
        determinant * t.a,
        determinant * (t.c * t.ty - t.d * t.tx),
        determinant * (t.b * t.tx - t.a * t.ty)
        );
};
