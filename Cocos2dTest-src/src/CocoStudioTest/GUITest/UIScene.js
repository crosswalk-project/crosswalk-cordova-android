/****************************************************************************
 Copyright (c) 2013 cocos2d-x.org

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

UIScene = cc.Layer.extend({
    _uiLayer: null,
    _widget: null,
    _sceneTitle: null,
    _topDisplayLabel:null,
    _bottomDisplayLabel:null,
    ctor: function () {
        cc.Layer.prototype.ctor.call(this)
        this._uiLayer = null;
        this._widget = null;
    },
    init: function () {
        if (this._super()) {
            this._uiLayer = ccs.UILayer.create();
            this.addChild(this._uiLayer);

            this._widget = ccs.GUIReader.getInstance().widgetFromJsonFile("res/cocosgui/UITest/UITest.json");
            this._uiLayer.addWidget(this._widget);

            this._sceneTitle = this._uiLayer.getWidgetByName("UItest");

            var back_label = this._uiLayer.getWidgetByName("back");
            back_label.addTouchEventListener(this.toExtensionsMainLayer, this);

            var left_button = this._uiLayer.getWidgetByName("left_Button");
            left_button.addTouchEventListener(this.previousCallback ,this);

            var middle_button = this._uiLayer.getWidgetByName("middle_Button");
            middle_button.addTouchEventListener(this.restartCallback ,this);

            var right_button = this._uiLayer.getWidgetByName("right_Button");
            right_button.addTouchEventListener(this.nextCallback ,this);

            var winSize = cc.Director.getInstance().getWinSize();
            var scale = winSize.height / 320;
            this._uiLayer.setAnchorPoint(0,0);
            this._uiLayer.setScale(scale);
            this._uiLayer.setPosition(cc.p((winSize.width - 480 * scale) / 2, (winSize.height - 320 * scale) / 2));

            var widgetSize = this._widget.getSize();
            var eventLabel = ccs.Label.create();
            eventLabel.setText("");
            eventLabel.setFontName("Marker Felt");
            eventLabel.setFontSize(32);
            eventLabel.setAnchorPoint(0.5, -1);
            eventLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0));
            this._uiLayer.addWidget(eventLabel);
            this._topDisplayLabel = eventLabel;

            var uiLabel = ccs.Label.create();
            uiLabel.setText("");
            uiLabel.setFontName("Marker Felt");
            uiLabel.setFontSize(30);
            uiLabel.setColor(cc.c3b(159, 168, 176));
            uiLabel.setPosition(cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0 - uiLabel.getSize().height * 1.75));
            this._uiLayer.addWidget(uiLabel);
            this._bottomDisplayLabel = uiLabel;
            return true;
        }
        return false;
    },
    setSceneTitle: function (title) {
        this._sceneTitle.setText(title);
    },
    toExtensionsMainLayer: function (sender, type) {
        if (type == ccs.TouchEventType.ended) {
            UISceneManager.purge();
            ccs.ActionManager.purge();
            ccs.SceneReader.purge();
            var scene = new CocoStudioTestScene();
            scene.runThisTest();
        }
    },

    previousCallback: function (sender, type) {
        if (type == ccs.TouchEventType.ended) {
            this._uiLayer.unscheduleUpdate();
            this._uiLayer.removeFromParent();
            cc.Director.getInstance().replaceScene(UISceneManager.getInstance().previousUIScene());
        }
    },

    restartCallback: function (sender, type) {
        if (type == ccs.TouchEventType.ended) {
            this._uiLayer.unscheduleUpdate();
            this._uiLayer.removeFromParent();
            cc.Director.getInstance().replaceScene(UISceneManager.getInstance().currentUIScene());
        }
    },

    nextCallback: function (sender, type) {
        if (type == ccs.TouchEventType.ended) {
            this._uiLayer.unscheduleUpdate();
            this._uiLayer.removeFromParent();
            cc.Director.getInstance().replaceScene(UISceneManager.getInstance().nextUIScene());
        }
    }
});