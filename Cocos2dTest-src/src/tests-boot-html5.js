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
(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false,
        showFPS:true,
        loadExtension:true,
        frameRate:60,
        renderMode:2,       //Choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'../www/engine/cocos2d/',
        //SingleEngineFile:'../../lib/Cocos2d-html5-v2.2.2.min.js',
        appFiles:[//'src/AppDelegate.js',

            // base class
            'src/BaseTestLayer/BaseTestLayer.js',

            'src/tests_resources-html5.js',
            'src/tests-main.js',

            'src/TouchesTest/Ball.js',
            'src/TouchesTest/Paddle.js',
            'src/TouchesTest/TouchesTest.js',
            'src/SchedulerTest/SchedulerTest.js',
            'src/ClickAndMoveTest/ClickAndMoveTest.js',
            'src/MenuTest/MenuTest.js',
            'src/ActionsTest/ActionsTest.js',
            'src/TileMapTest/TileMapTest.js',
            'src/TransitionsTest/TransitionsTest.js',
            'src/DrawPrimitivesTest/DrawPrimitivesTest.js',
            'src/ParticleTest/ParticleTest.js',
            'src/ProgressActionsTest/ProgressActionsTest.js',
            'src/LayerTest/LayerTest.js',
            'src/SceneTest/SceneTest.js',
            'src/SpineTest/SpineTest.js',
            'src/SpriteTest/SpriteTest.js',
            'src/TextureCacheTest/TextureCacheTest.js',
            'src/CocosDenshionTest/CocosDenshionTest.js',
            'src/CocosNodeTest/CocosNodeTest.js',
            'src/RotateWorldTest/RotateWorldTest.js',
            'src/RenderTextureTest/RenderTextureTest.js',
            'src/IntervalTest/IntervalTest.js',
            'src/ActionManagerTest/ActionManagerTest.js',
            'src/EaseActionsTest/EaseActionsTest.js',
            'src/ParallaxTest/ParallaxTest.js',
            'src/PerformanceTest/PerformanceTest.js',
            'src/PerformanceTest/PerformanceSpriteTest.js',
            'src/PerformanceTest/PerformanceSpriteTest2.js',
            'src/PerformanceTest/PerformanceParticleTest.js',
            'src/PerformanceTest/PerformanceNodeChildrenTest.js',
            'src/PerformanceTest/PerformanceTextureTest.js',
            'src/PerformanceTest/PerformanceAnimationTest.js',
            'src/PerformanceTest/PerformanceVirtualMachineTest.js',
            'src/PerformanceTest/seedrandom.js',
            'src/FontTest/FontTest.js',
            'src/PerformanceTest/PerformanceTouchesTest.js',
            'src/LabelTest/LabelTest.js',
            'src/CurrentLanguageTest/CurrentLanguageTest.js',
            'src/TextInputTest/TextInputTest.js',
            'src/EventTest/EventTest.js',
            'src/UnitTest/UnitTest.js',
            'src/SysTest/SysTest.js',
            'src/FileTest/FileTest.js',
            'src/EffectsTest/EffectsTest.js',
            'src/EffectsAdvancedTest/EffectsAdvancedTest.js',
            'src/MotionStreakTest/MotionStreakTest.js',
            'src/ClippingNodeTest/ClippingNodeTest.js',
            'src/OpenGLTest/OpenGLTest.js',

            'src/ExtensionsTest/ExtensionsTest.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlSceneManager.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlScene.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlButtonTest/CCControlButtonTest.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlSwitchTest/CCControlSwitchTest.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlSliderTest/CCControlSliderTest.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlStepperTest/CCControlStepperTest.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlPotentiometerTest/CCControlPotentiometerTest.js',
            'src/ExtensionsTest/ControlExtensionTest/CCControlColourPickerTest/CCControlColourPickerTest.js',
            'src/ExtensionsTest/TableViewTest/TableViewTestScene.js',
            'src/ExtensionsTest/CocosBuilderTest/CocosBuilderTest.js',
            'src/ExtensionsTest/CocosBuilderTest/TestHeader/TestHeaderLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/HelloCocosBuilder/HelloCocosBuilderLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/ButtonTest/ButtonTestLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/SpriteTest/SpriteTestLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/MenuTest/MenuTestLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/LabelTest/LabelTestLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/ParticleSystemTest/ParticleSystemTestLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/ScrollViewTest/ScrollViewTestLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/AnimationsTest/AnimationsTestLayer.js',
            'src/ExtensionsTest/CocosBuilderTest/TimelineCallbackTest/TimelineCallbackTestLayer.js',
            'src/ExtensionsTest/EditBoxTest/EditBoxTest.js',
            'src/ExtensionsTest/S9SpriteTest/S9SpriteTest.js',
            'src/ExtensionsTest/NetworkTest/WebSocketTest.js',
            'src/CocoStudioTest/ArmatureTest/ArmatureTest.js',
            'src/CocoStudioTest/ComponentsTest/ComponentsTestScene.js',
            'src/CocoStudioTest/ComponentsTest/EnemyController.js',
            'src/CocoStudioTest/ComponentsTest/GameOverScene.js',
            'src/CocoStudioTest/ComponentsTest/PlayerController.js',
            'src/CocoStudioTest/ComponentsTest/ProjectileController.js',
            'src/CocoStudioTest/ComponentsTest/SceneController.js',
            'src/CocoStudioTest/GUITest/UIScene.js',
            'src/CocoStudioTest/GUITest/UIButtonTest/UIButtonTest.js',
            'src/CocoStudioTest/GUITest/UICheckBoxTest/UICheckBoxTest.js',
            'src/CocoStudioTest/GUITest/UIImageViewTest/UIImageViewTest.js',
            'src/CocoStudioTest/GUITest/UILabelAtlasTest/UILabelAtlasTest.js',
            'src/CocoStudioTest/GUITest/UILabelBMFontTest/UILabelBMFontTest.js',
            'src/CocoStudioTest/GUITest/UILabelTest/UILabelTest.js',
            'src/CocoStudioTest/GUITest/UILayoutTest/UILayoutTest.js',
            'src/CocoStudioTest/GUITest/UIListViewTest/UIListViewTest.js',
            'src/CocoStudioTest/GUITest/UILoadingBarTest/UILoadingBarTest.js',
            'src/CocoStudioTest/GUITest/UINodeContainerTest/UINodeContainerTest.js',
            'src/CocoStudioTest/GUITest/UIPageViewTest/UIPageViewTest.js',
            'src/CocoStudioTest/GUITest/UISceneManager.js',
            'src/CocoStudioTest/GUITest/UIScrollViewTest/UIScrollViewTest.js',
            'src/CocoStudioTest/GUITest/UISliderTest/UISliderTest.js',
            'src/CocoStudioTest/GUITest/UITextFieldTest/UITextFieldTest.js',
            'src/CocoStudioTest/GUITest/UIRichTextTest/UIRichTextTest.js',
            // 'src/CocoStudioTest/SceneTest/TriggerCode/Acts.js',
            // 'src/CocoStudioTest/SceneTest/TriggerCode/Cons.js',
            'src/CocoStudioTest/SceneTest/TriggerCode/EventDef.js',
            'src/CocoStudioTest/SceneTest/SceneEditorTest.js',
            'src/CocoStudioTest/CocoStudioTest.js',
            'src/XHRTest/XHRTest.js'

            //'src/Box2dTest/Box2dTest.js',
            //'src/ChipmunkTest/ChipmunkTest.js']
            ]
    };

    if(!d.createElement('canvas').getContext){
        var s = d.createElement('div');
        s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
            '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
            '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
        var p = d.getElementById(c.tag).parentNode;
        p.style.background = 'none';
        p.style.border = 'none';
        p.insertBefore(s);

        d.body.style.background = '#ffffff';
        return;
    }

    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        /*********Delete this section if you have packed all files into one*******/
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }
        /*********Delete this section if you have packed all files into one*******/
            //s.src = 'cocos2d-html5-testcases-advanced.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

        d.body.appendChild(s);
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        //else if single file specified, load singlefile
    });
})();
