Cocos2d-Cordova-Crosswalk
=======================

本工具为Cocos2d-HTML5开发者提供高效和功能强大的Android Web Runtime.
* 包含加速的Cocos2d-HTML5引擎，并且支持最新的HTML5功能
* 我们还提供对Cordova的支持，开发者可以使用成千上万的Cordova插件，包括社交分享，支付以及广告等丰富的功能

了解更多的关于Cordova的信息，请访问：
[Cordova](http://cordova.apache.org)
和
[Cordova plugins](http://cordova.apache.org/docs/en/5.0.0/plugin_ref_plugman.md.html#Using%20Plugman%20to%20Manage%20Plugins)

准备工作
---

* 配置开发环境：
  [Windows host](https://crosswalk-project.org/documentation/android/windows_host_setup.html)

  [Linux host](https://crosswalk-project.org/documentation/android/linux_host_setup.html)

  请注意：您可以在其他的平台进行开发，但官方仅支持Windows和Linux平台上的开发
* 安装 [Node.js](http://nodejs.org/download/)
* 安装 plugman: npm install -g plugman

如何打包并运行 Cocos2dTest:
---
```
./bin/create Cocos2dTest com.test.Cocos2dTest Cocos2dTest
cd Cocos2dTest
```
将 ```Cocos2dTest/assets/www/*``` 下的文件替换为 ```Cocos2dTest-src/*```
```
./cordova build
```
安装 ```out/Cocos2dTest-debug.apk``` 到您的Android手机并运行.

创建新的项目:
---
```
./bin/create [path package activity]
例如
./bin/create Test com.my.test Test
```
在 ```Test/assets/www``` 下进行游戏开发

如何使用 cordova plugin:
---
以 cordova dialog plugin 为例:

*1. 搜索 cordova dialog plugin:*
```
#plugman search dialogs

org.apache.cordova.dialogs - Cordova Notification Plugin
com.google.google-play-services - 
    Google play service  Plugin of Admob ,base on admob ios sdk 6.10 and android google play service sdk 4.5 ,support ios and android,support all admob banner and Interstitial
    project home:https://github.com/gooogleadmob/admob-phonegap
    
hu.dpal.phonegap.plugins.pindialog - 
			PhoneGap numeric password dialog plugin for Android and iOS. Forked from https://github.com/apache/cordova-plugin-dialogs.git
	
ga.moviecube.mcmanager.pindialog - 
			PhoneGap numeric password dialog plugin for Android and iOS. Forked from https://github.com/apache/cordova-plugin-dialogs.git

#cd Test
#plugman install --platform android --plugin https://github.com/apache/cordova-plugin-dialogs.git --project .
```
*2. 编辑 `index.html`:*
```
...
<body style="padding:0; margin: 0; background: #000;">
<canvas id="gameCanvas" width="321" height="480"></canvas>
<script type="text/javascript" src="cordova.js"></script>
+<script type="text/javascript" src="app.js"></script>
<script src="cocos2d.js"></script>
</body>
...
```
*3. app.js:*
```
var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onBackKey: function() {
        navigator.notification.confirm(
            'Exit the game?',  // message
            app.onConfirm,                  // callback to invoke
            '',            // title
            ['Ok','Cancel']             // buttonLabels
       );
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        document.addEventListener("backbutton", app.onBackKey, false);
    },
    onConfirm: function(buttonIndex) {
        if (1 == buttonIndex) {
            navigator.app.exitApp();
        }
    }
};
app.initialize();
```
当用户点击返回键, 将会弹出一个Dialog，而不是退出游戏.

如何把您的游戏集成到 cocos2d-cordova-crosswalk:
---
1. 通过该工具创建一个新的项目
2. 在 ```assets/www/cocos2d.js```中:
   在 ```appFiles:[]``` 中加入您的游戏JS文件
3. ```assets/www/main.js``` 是游戏的主入口.
   替换 ```var myApp = new cocos2dApp(MyScene);``` 中的MyScene为您自己的游戏Scene.
4. ```assets/www/engine``` 中包含 Cocos2d-html5 引擎, 请不要修改改目录下的文件.

在Google play中的真实案例:
---
[CosmicCrash](https://play.google.com/store/apps/details?id=org.cocos.CosmicCrash.googleplay)

如何编译自己的 xwalk_core_library
---
请参考下面的链接:
[Build xwalk_core_library](https://github.com/crosswalk-project/cocos2d-cordova-crosswalk/blob/master/How%20to%20build%20optimized%20xwalk_core_library.md)
