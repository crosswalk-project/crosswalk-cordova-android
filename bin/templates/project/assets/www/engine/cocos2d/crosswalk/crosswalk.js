cc.RESOLUTION_POLICY = {
    // The entire application is visible in the specified area without trying to preserve the original aspect ratio.
    // Distortion can occur, and the application may appear stretched or compressed.
    EXACT_FIT: 0,
    // The entire application fills the specified area, without distortion but possibly with some cropping,
    // while maintaining the original aspect ratio of the application.
    NO_BORDER: 1,
    // The entire application is visible in the specified area without distortion while maintaining the original
    // aspect ratio of the application. Borders can appear on two sides of the application.
    SHOW_ALL: 2,
    // The application takes the height of the design resolution size and modifies the width of the internal
    // canvas so that it fits the aspect ratio of the device
    // no distortion will occur however you must make sure your application works on different
    // aspect ratios
    FIXED_HEIGHT: 3,
    // The application takes the width of the design resolution size and modifies the height of the internal
    // canvas so that it fits the aspect ratio of the device
    // no distortion will occur however you must make sure your application works on different
    // aspect ratios
    FIXED_WIDTH: 4,

    UNKNOWN: 5
};

cc.isString = function(obj) {
    return typeof obj == 'string' || Object.prototype.toString.call(obj) == '[object String]';
};

cc.isFunction = function(obj) {
    return typeof obj == 'function';
};

cc.isRegisterEvent = false;

cc.getHTMLElementPosition = function (element) {
    var docElem = document.documentElement;
    var win = window;
    var box = null;
    if (typeof element.getBoundingClientRect === 'function') {
        box = element.getBoundingClientRect();
    } else {
        if (element instanceof HTMLCanvasElement) {
            box = {
                left:0,
                top:0,
                width:element.width,
                height:element.height
            };
        } else {
            box = {
                left:0,
                top:0,
                width:parseInt(element.style.width),
                height:parseInt(element.style.height)
            };
        }
    }
    return {
        left:box.left + win.pageXOffset - docElem.clientLeft,
        top:box.top + win.pageYOffset - docElem.clientTop,
        width:box.width,
        height:box.height
    };
};

cc.Director.prototype.registerHtmlElementEvent = function (element) {
    if (cc.isRegisterEvent) return;

    if (cc.Browser.isMobile) {
        //register canvas touch event
        element.addEventListener("touchstart", function (event) {
            if (!event.changedTouches) return;

            var posArr = [];
            var pos = cc.getHTMLElementPosition(element);

            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            var touch_event, tx, ty;
            var num = 0;
            var idArr = [];
            var xArr= [];
            var yArr = [];
            var length = event.changedTouches.length;
            for (var i = 0; i < length; i++) {
                touch_event = event.changedTouches[i];
                if (touch_event) {
                    tx = touch_event.clientX;
                    ty = touch_event.clientY;

                    var location = {x: (tx - pos.left), y: (ty - pos.top)};

                    num++;
                    idArr.push(touch_event.identifier);
                    xArr.push(location.x);
                    yArr.push(location.y);
                }
            }
            cc.EGLView.getInstance().handleTouchesBegin(num, idArr, xArr, yArr);
            event.stopPropagation();
            event.preventDefault();
        }, false);

        element.addEventListener("touchmove", function (event) {
            if (!event.changedTouches) return;

            var posArr = [];
            var pos = cc.getHTMLElementPosition(element);

            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            var touch_event, tx, ty;
            var num = 0;
            var idArr = [];
            var xArr= [];
            var yArr = [];
            var length = event.changedTouches.length;
            for (var i = 0; i < length; i++) {
                touch_event = event.changedTouches[i];
                if (touch_event) {
                    tx = touch_event.clientX;
                    ty = touch_event.clientY;

                    var location = {x: (tx - pos.left), y: (ty - pos.top)};

                    num++;
                    idArr.push(touch_event.identifier);
                    xArr.push(location.x);
                    yArr.push(location.y);
                }
            }
            cc.EGLView.getInstance().handleTouchesMove(num, idArr, xArr, yArr);
            event.stopPropagation();
            event.preventDefault();
        }, false);

        element.addEventListener("touchend", function (event) {
            if (!event.changedTouches) return;

            var posArr = [];
            var pos = cc.getHTMLElementPosition(element);

            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            var touch_event, tx, ty;
            var num = 0;
            var idArr = [];
            var xArr= [];
            var yArr = [];
            var length = event.changedTouches.length;
            for (var i = 0; i < length; i++) {
                touch_event = event.changedTouches[i];
                if (touch_event) {
                    tx = touch_event.clientX;
                    ty = touch_event.clientY;

                    var location = {x: (tx - pos.left), y: (ty - pos.top)};

                    num++;
                    idArr.push(touch_event.identifier);
                    xArr.push(location.x);
                    yArr.push(location.y);
                }
            }
            cc.EGLView.getInstance().handleTouchesEnd(num, idArr, xArr, yArr);
            event.stopPropagation();
            event.preventDefault();
        }, false);

        element.addEventListener("touchcancel", function (event) {
            if (!event.changedTouches) return;

            var pos = cc.getHTMLElementPosition(element);

            pos.left -= document.body.scrollLeft;
            pos.top -= document.body.scrollTop;

            var touch_event, tx, ty;
            var num = 0;
            var idArr = [];
            var xArr= [];
            var yArr = [];
            var length = event.changedTouches.length;
            for (var i = 0; i < length; i++) {
                touch_event = event.changedTouches[i];
                if (touch_event) {
                    tx = touch_event.clientX;
                    ty = touch_event.clientY;

                    var location = {x: (tx - pos.left), y: (ty - pos.top)};

                    num++;
                    idArr.push(touch_event.identifier);
                    xArr.push(location.x);
                    yArr.push(location.y);
                }
            }
            cc.EGLView.getInstance().handleTouchesCancel(num, idArr, xArr, yArr);
            event.stopPropagation();
            event.preventDefault();
        }, false);
    }

    cc.isRegisterEvent = true;
};

cc.Director.prototype._createStatsLabel = function() {
    //TODO
};

// For deprecated API of CCTMXTiledMap.
cc.TMXTiledMap.prototype.propertiesForGID = cc.TMXTiledMap.prototype.getPropertiesForGID;

/** creates the action with the callback
 * @param {function} selector
 * @param {object|null} [selectorTarget=]
 * @param {*|Null} [data=] data for function, it accepts all data types.
 * @return {cc.CallFunc}
 * @example
 * // example
 * // CallFunc without data
 * var finish = cc.CallFunc.create(this.removeSprite, this);
 *
 * // CallFunc with data
 * var finish = cc.CallFunc.create(this.removeFromParentAndCleanup, this._grossini,  true),
 */
cc.CallFunc.create = function (selector, selectorTarget, data) {
    if (!selector) {
        return null;
    }
    var ret = new cc.CallFunc();
    if(arguments.length == 1){
        if (ret) {
            ret.setCallback(function(target) {
                selector.call(null, target);
            });
            return ret;
        }
    }else{
        if (ret) {
            ret.setCallback(function(target) {
                selector.call(selectorTarget, target, data);
            });
            return ret;
        }
    }
    return null;
};

cc.Spawn.create = function (/*Multiple Arguments*/tempArray) {
    var paraArray = (tempArray instanceof Array) ? tempArray : arguments;
    if ((paraArray.length > 0) && (paraArray[paraArray.length - 1] == null))
        cc.log("parameters should not be ending with null in Javascript");

    var prev = paraArray[0];
    for (var i = 1; i < paraArray.length; i++) {
        if (paraArray[i])
            prev = cc.Spawn._actionOneTwo(prev, paraArray[i]);
    }
    return prev;
};

/** creates the action
 * @param {cc.FiniteTimeAction} actionOne
 * @param {cc.FiniteTimeAction} actionTwo
 * @return {cc.Spawn}
 * @private
 */
cc.Spawn._actionOneTwo = function (actionOne, actionTwo) {
    var spawn = new cc.Spawn();
    spawn.autorelease();
    spawn.initWithTwoActions(actionOne, actionTwo);
    return spawn;
};

cc.Sequence.create = function (/*Multiple Arguments*/tempArray) {
    var paraArray = (tempArray instanceof Array) ? tempArray : arguments;
    if ((paraArray.length > 0) && (paraArray[paraArray.length - 1] == null))
        cc.log("parameters should not be ending with null in Javascript");

    var prev = paraArray[0];
    for (var i = 1; i < paraArray.length; i++) {
        if (paraArray[i])
            prev = cc.Sequence._actionOneTwo(prev, paraArray[i]);
    }
    return prev;
};

/** creates the action
 * @param {cc.FiniteTimeAction} actionOne
 * @param {cc.FiniteTimeAction} actionTwo
 * @return {cc.Sequence}
 * @private
 */
cc.Sequence._actionOneTwo = function (actionOne, actionTwo) {
    var sequence = new cc.Sequence();
    sequence.autorelease();
    sequence.initWithTwoActions(actionOne, actionTwo);
    return sequence;
};

cc.Director.prototype.getScheduler = function() {
    if (!cc._sharedScheduler) {
        cc._sharedScheduler = new cc.Scheduler();
    }
    return cc._sharedScheduler;
}

cc.Node.prototype.schedule = function (callback_fn, interval, repeat, delay) {
    interval = interval || 0;

    if(!callback_fn)
        throw "cc.Node.schedule(): callback function must be non-null";
    if(interval < 0)
        throw "cc.Node.schedule(): interval must be positive";

    repeat = (repeat == null) ? cc.REPEAT_FOREVER : repeat;
    delay = delay || 0;

    cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(this, callback_fn, interval, repeat, delay, !this.isRunning());
}

cc.Node.prototype.scheduleOnce = function (callback_fn, delay) {
    this.schedule(callback_fn, 0.0, 0, delay);
}

cc.Node.prototype.scheduleUpdateWithPriority = function (priority) {
    cc.Director.getInstance().getScheduler().scheduleUpdateForTarget(this, priority, !this.isRunning());
}

cc.Node.prototype.unscheduleUpdate = function () {
    cc.Director.getInstance().getScheduler().unscheduleUpdateForTarget(this);
}

cc.Node.prototype.scheduleUpdate = function () {
    this.scheduleUpdateWithPriority(0);
}

cc.Node.prototype.unschedule = function (callback_fn) {
    // explicit nil handling
    if (!callback_fn)
        return;

    cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(this, callback_fn);
}

cc.Node.prototype.unscheduleAllCallbacks = function () {
    cc.Director.getInstance().getScheduler().unscheduleAllCallbacksForTarget(this);
}

cc.GLProgram.create = function (vShaderFileName, fShaderFileName) {
    var program = new cc.GLProgram();
    if (program && program.init(vShaderFileName, fShaderFileName))
        return program;
    return null;
};

cc.GLProgram.prototype.setUniformLocationF32 = function () {
    if (arguments.length < 2)
        return;

    switch (arguments.length) {
        case 2:
            this.setUniformLocationWith1f(arguments[0], arguments[1]);
            break;
        case 3:
            this.setUniformLocationWith2f(arguments[0], arguments[1], arguments[2]);
            break;
        case 4:
            this.setUniformLocationWith3f(arguments[0], arguments[1], arguments[2], arguments[3]);
            break;
        case 5:
            this.setUniformLocationWith4f(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
            break;
        }
};

cc.Node.prototype.setAnchorPoint = function(point, y) {
    if (arguments.length === 2) {
        var p = cc.p(point, y);
        this.setAnchorPointInternal(p);
    } else {
        this.setAnchorPointInternal(point);
    }
}

cc.Node.prototype.setContentSize = function (size, height) {
    if (arguments.length === 2) {
        var s = cc.size(size, height);
        this.setContentSizeInternal(s);
    } else {
        this.setContentSizeInternal(size);
    }
}

cc.TextureCache.prototype._initializingRenderer = function() {}

cc.Menu.create = function (menuItems) {
    if((arguments.length > 0) && (arguments[arguments.length-1] == null))
        cc.log("parameters should not be ending with null in Javascript");

    var ret = new cc.Menu();
    ret.autorelease();

    if (arguments.length == 0) {
        ret.init();
        return ret;
    } else if (arguments.length == 1) {
        if (arguments[0] instanceof Array) {
            ret.initWithArray(arguments[0]);
            return ret;
        }
    }
    ret.initWithItems(arguments);
    return ret;
};

function getCallWrapper(target, callback, _this) {
    var callbackWrapper = function() {
        var locTarget = target, locCallback = callback;
        if (!locCallback)
            return;
        if (locTarget && cc.isString(locCallback)) {
            locTarget[locCallback](_this);
        } else if (locTarget && cc.isFunction(locCallback)) {
            locCallback.call(locTarget, _this);
        } else
            locCallback(_this);
    }
    return callbackWrapper;
}


cc.MenuItemSprite.create = function (normalSprite, selectedSprite, three, four, five) {
    var len = arguments.length;
    normalSprite = arguments[0];
    selectedSprite = arguments[1];
    var disabledImage, target, callback;
    var ret = new cc.MenuItemSprite();
    ret.autorelease();
    //when you send 4 arguments, five is undefined
    if (len == 5) {
        disabledImage = arguments[2];
        callback = arguments[3];
        target = arguments[4];
        ret.setDisabledImage(disabledImage);
    } else if (len == 4 && typeof arguments[3] === "function") {
        disabledImage = arguments[2];
        ret.setDisabledImage(disabledImage);
        callback = arguments[3];
    } else if (len == 4 && typeof arguments[2] === "function") {
        target = arguments[3];
        callback = arguments[2];
    } else if (len <= 2) {
        disabledImage = arguments[2];
        ret.setDisabledImage(disabledImage);
    }
    ret.setNormalImage(normalSprite);
    ret.setSelectedImage(selectedSprite);
    var callbackWrapper = getCallWrapper(target, callback, ret);
    ret.initWithNormalSprite(normalSprite, selectedSprite, disabledImage,  callbackWrapper, target);
    return ret;
};

cc.MenuItemImage.create = function (normalImage, selectedImage, three, four, five) {
    if (arguments.length == 0) {
        return cc.MenuItemImage.create(null, null, null, null, null);
    }
    if (arguments.length == 3)  {
        return cc.MenuItemImage.create(normalImage, selectedImage, null, three, null);
    }
    if (arguments.length == 4) {
        return cc.MenuItemImage.create(normalImage, selectedImage, null, three, four);
    }
    var ret = new cc.MenuItemImage();
    ret.autorelease();
    var callbackWrapper = getCallWrapper(five, four, ret);
    ret.initWithNormalImage(normalImage, selectedImage, three, five, callbackWrapper);
    return ret;
};

cc.MenuItemFont.create = function (value, callback, target) {
    var ret = new cc.MenuItemFont();
    ret.autorelease();
    if (callback == undefined) {
        callback = null;
    }
    if (target == undefined) {
        target = null;
    }
    var callbackWrapper = getCallWrapper(target, callback, ret);
    ret.initWithString(value, callbackWrapper, target);
    return ret;
};

cc.MenuItemFont.prototype.setFontSize = cc.MenuItemFont.prototype.setFontSizeObj;
cc.MenuItemFont.prototype.setFontName = cc.MenuItemFont.prototype.setFontNameObj;

cc.MenuItemLabel.create = function (label, selector, target) {
    var ret = new cc.MenuItemLabel();
    ret.autorelease();
    var callbackWrapper = getCallWrapper(target, selector, ret);
    ret.initWithLabel(label, callbackWrapper, target);
    return ret;
};

cc.MenuItemToggle.create = function (/*Multiple arguments follow*/) {
    if((arguments.length > 0) && (arguments[arguments.length-1] == null))
        cc.log("parameters should not be ending with null in Javascript");
    var ret = new cc.MenuItemToggle();
    ret.autorelease();
    ret.initWithItems(arguments);
    return ret;
};

cc.MenuItemToggle.prototype.initWithItems = function (args) {
    var l =  args.length;
    // passing callback.
    var callbackWrapper;
    if (typeof args[args.length-2] === 'function') {
        callbackWrapper = getCallWrapper(args[args.length-1], args[args.length-2], this);
        l = l-2;
    } else if(typeof args[args.length-1] === 'function'){
        callbackWrapper = getCallWrapper(null, args[args.length-1], this);
        l = l-1;
    }

    var locSubItems = [];
    for (var i = 0; i < l; i++) {
        if (args[i]) {
            if (i == 0) {
                this.initWithItem(args[i]);
            } else {
                this.addSubItem(args[i]);
            }
        }
    }
    if (callbackWrapper) {
        this.setMenuItemCallback(callbackWrapper);
    }
    this.setSelectedIndex(0);

    this.setCascadeColorEnabled(true);
    this.setCascadeOpacityEnabled(true);

    return true;
}

cc.MenuItem.prototype.setCallback = cc.MenuItem.prototype.setMenuItemCallback;

cc.Menu.prototype.alignItemsInColumns = function() {
    var array = crosswalk.Array.fromJSArray(arguments);
    this.alignItemsInColumnsWithArray(array);
}

cc.Menu.prototype.alignItemsInRows = function() {
    var array = crosswalk.Array.fromJSArray(arguments);
    this.alignItemsInRowsWithArray(array);
}

cc.AnimationFrame.prototype.setUserInfo = function(userInfo) {
    if(!(userInfo instanceof crosswalk.Dictionary))
    {
        var infoDict = crosswalk.Dictionary.fromJSObj(userInfo);
        this.setUserInfoWithDictionary(infoDict);
    }
    else
        this.setUserInfoWithDictionary(userInfo);
}
    
cc.AnimationFrame.prototype.initWithSpriteFrames = function(spriteFrame, delayUnits,userInfo) {
    if(userInfo && !(userInfo instanceof crosswalk.Dictionary)) {
        var infoDict = crosswalk.Dictionary.fromJSObj(userInfo);
        this.initWithSpriteFrameWithDictionary(spriteFrame, delayUnits, infoDict);
    } else {
        this.initWithSpriteFrameWithDictionary(arguments);
    }
}

cc.LayerMultiplex.create = function() {
    var layerMultiplex = new cc.LayerMultiplex();
    layerMultiplex.autorelease();
    var array = crosswalk.Array.fromJSArray(arguments);
    layerMultiplex.initWithArray(array);
    return layerMultiplex;
}

cc.Animation.create = function (frames, delay, loops) {
    var len = arguments.length;
    var animation = new cc.Animation();
    animation.autorelease();
    if (len == 0) {
        var nullframes= [];
        animation.initWithSpriteFrames(nullframes, 0);
    } else if (len == 2) {
        /** with frames and a delay between frames */
        delay = delay || 0;
        animation.initWithSpriteFrames(frames, delay);
    } else if (len == 3) {
        animation.initWithAnimationFrames(frames, delay, loops);
    }
    return animation;
};

cc.BezierTo.create = function (t, c) {
    var bezierTo = new cc.BezierTo();
    bezierTo.autorelease();
    bezierTo.initWithDuration(t, c);
    return bezierTo;
};

cc.BezierBy.create = function (t, c) {
    var bezierBy = new cc.BezierBy();
    bezierBy.autorelease();
    bezierBy.initWithDuration(t, c);
    return bezierBy;
};

//Use jsarray as points, CCPointArray is not used
cc.CardinalSplineBy.create = function (duration, points, tension) {
    var ret = new cc.CardinalSplineBy();
    ret.autorelease();
    if (ret.initWithDuration(duration, points, tension))
        return ret;
    return null;
};

cc.CatmullRomTo.create = function (dt, points) {
    var ret = new cc.CatmullRomTo();
    ret.autorelease();
    if (ret.initWithDuration(dt, points))
        return ret;
    return null;
};

cc.CatmullRomBy.create = function (dt, points) {
    var ret = new cc.CatmullRomBy();
    ret.autorelease();
    if (ret.initWithDuration(dt, points))
        return ret;
    return null;
};

cc.registerTargetedDelegate = function(priority, swallowsTouches, delegate){
    cc.TouchDelegate.registerTargetedDelegate(delegate, priority, swallowsTouches);
    //    cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(delegate, priority, swallowsTouches);
};

cc.unregisterTouchDelegate = function(delegate) {
    cc.TouchDelegate.unregisterTouchDelegate(delegate);
}

cc.Node.prototype.setBlendFunc = function(x, y) {

}

cc.SpriteFrame.prototype.textureLoaded = function () {return true;}
cc.Texture2D.prototype.isLoaded = function() {return true;}

cc.LayerGradient.prototype.init = function(start, end, v)
{
   start = start || cc.c4b(0,0,0,255);
   end   = end || cc.c4b(0,0,0,255);
   v = v || cc.p(0, -1);

   this.initWithColor(start, end, v);

}

ccs.ArmatureAnimation.prototype.setAnimationScale = ccs.ArmatureAnimation.prototype.setSpeedScale;
ccs.ArmatureAnimation.prototype.getAnimationScale = ccs.ArmatureAnimation.prototype.getSpeedScale;
ccs.ArmatureAnimation.prototype.playByIndex = function(animationIndex, durationTo, durationTween, loop, tweenEasing) {
    if (typeof durationTo == "undefined") {
        durationTo = -1;
    }
    if (typeof loop == "undefined") {
        loop = -1;
    }
    if (typeof tweenEasing == "undefined") {
        loop = 10000;
    }
    this.playWithIndex(animationIndex, durationTo, durationTween, loop, tweenEasing);
}


//Copied from CCGLProgram.js for constant definition

cc.VERTEX_ATTRIB_POSITION = 0;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_COLOR = 1;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_TEX_COORDS = 2;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_MAX = 3;

//------------Uniforms------------------
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_PMATRIX = 0;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_MVMATRIX = 1;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_MVPMATRIX = 2;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_TIME = 3;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_SINTIME = 4;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_COSTIME = 5;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_RANDOM01 = 6;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_SAMPLER = 7;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_MAX = 8;

//------------Shader Name---------------
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURECOLOR = "ShaderPositionTextureColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURECOLORALPHATEST = "ShaderPositionTextureColorAlphaTest";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_COLOR = "ShaderPositionColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURE = "ShaderPositionTexture";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURE_UCOLOR = "ShaderPositionTexture_uColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTUREA8COLOR = "ShaderPositionTextureA8Color";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_UCOLOR = "ShaderPosition_uColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_LENGTHTEXTURECOLOR = "ShaderPositionLengthTextureColor";

//------------uniform names----------------
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_PMATRIX_S = "CC_PMatrix";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_MVMATRIX_S = "CC_MVMatrix";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_MVPMATRIX_S = "CC_MVPMatrix";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_TIME_S = "CC_Time";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_SINTIME_S = "CC_SinTime";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_COSTIME_S = "CC_CosTime";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_RANDOM01_S = "CC_Random01";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_SAMPLER_S = "CC_Texture0";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_ALPHA_TEST_VALUE_S = "CC_alpha_value";

//------------Attribute names--------------
/**
 * @constant
 * @type {String}
 */
cc.ATTRIBUTE_NAME_COLOR = "a_color";
/**
 * @constant
 * @type {String}
 */
cc.ATTRIBUTE_NAME_POSITION = "a_position";
/**
 * @constant
 * @type {String}
 */
cc.ATTRIBUTE_NAME_TEX_COORD = "a_texCoord";

cc.HashUniformEntry = function (value, location, hh) {
    this.value = value;
    this.location = location;
    this.hh = hh || {};
};

//Finished Copied from CCGLProgram.js for constant definition

for (var f in crosswalk) {
    if (typeof crosswalk[f] == "function") {
        if (typeof crosswalk[f].createInternal == "function") {
            crosswalk[f].create = crosswalk[f].createInternal;
        }
    }
}

cc.LabelAtlas.create = function (strText, charMapFile, itemWidth, itemHeight, startCharMap) {
    var length = arguments.length;
    if (length == 5) {
        return cc.LabelAtlas.createInternal(strText, charMapFile, itemWidth, itemHeight, startCharMap.charCodeAt(0));
    } else if (length == 2) {
        return cc.LabelAtlas.createInternal(strText, charMapFile);
    } else {
        return null;
    }
};

cc.Lens3D.prototype.setPosition = cc.MotionStreak.prototype.setPosition = cc.Ripple3D.prototype.setPosition = cc.Twirl.prototype.setPosition  = function(x, y) {
    var p;
    if(arguments.length === 1){
        p = new crosswalk.Point(x.x, x.y);
    } else {
        p = new crosswalk.Point(x, y);
    }
    this.setPositionInternal(p);
}

cc.SCROLLVIEW_DIRECTION_NONE = -1;
cc.SCROLLVIEW_DIRECTION_HORIZONTAL = 0;
cc.SCROLLVIEW_DIRECTION_VERTICAL = 1;
cc.SCROLLVIEW_DIRECTION_BOTH = 2;
cc.TABLEVIEW_FILL_TOPDOWN = 0;
cc.TABLEVIEW_FILL_BOTTOMUP = 1;

cc.TableView.prototype.setDataSource = function(dataSource) {
    var self = this;
    var sizeForIndexCallback = function(idx) {
        var size;
        if (typeof dataSource["tableCellSizeForIndex"] == "function") {
            size = dataSource["tableCellSizeForIndex"].call(dataSource, self, idx);
        } else if (typeof dataSource["cellSizeForTable"] == "function") {
            size = dataSource["cellSizeForTable"].call(dataSource, self, idx);
        }
        self.setCellSizeInternal(size);
    };
    var cellAtIndexCallback = function(idx) {
        var cell;
        if (typeof dataSource["tableCellAtIndex"] == "function") {
            cell = dataSource["tableCellAtIndex"].call(dataSource, self, idx);
        }
        self.setCurrentCellInternal(cell);
    };
    var numberOfCellsCallback = function() {
        var number;
        if (typeof dataSource["numberOfCellsInTableView"] == "function") {
            cell = dataSource["numberOfCellsInTableView"].call(dataSource, self);
        }
        self.setNumberOfCellsInternal(cell);
    }
    this.setDataSourceInternal(sizeForIndexCallback, numberOfCellsCallback, cellAtIndexCallback);
}

cc.ScrollView.prototype.setDelegate = function(delegate) {
    var scrollViewDidScroll = function() {
        if (typeof delegate["scrollViewDidScroll"] == "function") {
            delegate["scrollViewDidScroll"].call(delegate);
        }
    }
    var scrollViewDidZoom = function() {
        if (typeof delegate["scrollViewDidZoom"] == "function") {
            delegate["scrollViewDidZoom"].call(delegate);
        }
    }
    this.setDelegateInternal(scrollViewDidScroll, scrollViewDidZoom);
}

cc.TableView.prototype.setDelegate = function(delegate) {
    var scrollViewDidScroll = function() {
        if (typeof delegate["scrollViewDidScroll"] == "function") {
            delegate["scrollViewDidScroll"].call(delegate);
        }
    }
    var scrollViewDidZoom = function() {
        if (typeof delegate["scrollViewDidZoom"] == "function") {
            delegate["scrollViewDidZoom"].call(delegate);
        }
    }
    var tableCellTouched = function(cell) {
        if (typeof delegate["tableCellTouched"] == "function") {
            delegate["tableCellTouched"].call(delegate, self, cell);
        }
    }
    var tableCellHighlight = function(cell) {
        if (typeof delegate["tableCellHighlight"] == "function") {
            delegate["tableCellHighlight"].call(delegate, self, cell);
        }
    }
    var tableCellUnhighlight = function(cell) {
        if (typeof delegate["tableCellUnhighlight"] == "function") {
            delegate["tableCellUnhighlight"].call(delegate, self, cell);
        }
    }
    var tableCellWillRecycle = function(cell) {
        if (typeof delegate["tableCellWillRecycle"] == "function") {
            delegate["tableCellWillRecycle"].call(delegate, self, cell);
        }
    }
    this.setDelegateInternal(scrollViewDidScroll,scrollViewDidZoom,
        tableCellTouched,tableCellHighlight,tableCellUnhighlight,
        tableCellWillRecycle);
}

cc.TableView.create = function (dataSource, size, container) {
    var table = new cc.TableView();
    table.autorelease();
    if (dataSource != null) {
        table.setDataSource(dataSource);
    }
    if (size != undefined) {
        table.initWithViewSize(size, container);
    }
    table.reloadData();
    return table;
};

cc.LabelTTF.create = function (label, fontName, fontSize, dimensions, hAlignment, vAlignment) {
    label = label || "";
    fontName = fontName || "Arial";
    fontSize = fontSize || 16;
    dimensions = dimensions || cc.size(0, 0);
    hAlignment = hAlignment || cc.TEXT_ALIGNMENT_LEFT;
    vAlignment = vAlignment || cc.VERTICAL_TEXT_ALIGNMENT_TOP;
    return cc.LabelTTF.createInternal(label, fontName, fontSize, dimensions, hAlignment, vAlignment);
};

var scrollViewSetContentOffset = cc.ScrollView.prototype.setContentOffset;
cc.ScrollView.prototype.setContentOffset = function(size, animation) {
    animation = animation || true;
    scrollViewSetContentOffset.call(this, size, animation);
};

cc.Sprite.create = function(filename, rect) {

    if(typeof filename == "string")
    {
        if((filename.substr(0,4) == "http") || (filename.substr(0,4) == "HTTP"))
        {
           var img = new Image(); //document.createElement("img");
           img.src = filename;
           var sprite = cc.Sprite.createInternal();
           sprite.retain();
           sprite.setContentSize(cc.size(50, 50));
           var argslength = arguments.length;
           var rect;
           if(argslength > 1)
               rect = arguments[1];

           var texture = new cc.Texture2D();
           texture.initWithElement(img);

           img.onload = function()
           {
               texture.handleLoadedTexture();

               if(argslength ==1)
                   sprite.initWithTexture(texture);
               else
                   sprite.initWithTexture(texture, rect);

               sprite.setDirty(true);
               img.onload = null;
               sprite.release();
           }
           return sprite;
        }
    }

    if(arguments.length ==1)
        return cc.Sprite.createInternal(arguments[0]);
    else if(arguments.length ==0)
        return cc.Sprite.createInternal();
    else
        return cc.Sprite.createInternal(arguments[0], arguments[1]);

}

cc.TextureCache.prototype.cacheImage = function() {

}