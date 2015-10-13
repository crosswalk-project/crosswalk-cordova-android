Cocos2d-Cordova-Crosswalk
=======================

This repository provides accelerated and powerful Android Web Runtime for Cocos2d-HTML5 developers.

* We provide high performance Cocos2d-HTML5 APIs, including full HTML5 features.

* With cordova support, we provide thousands of plugins, including social network, payment and advertising integration.

For more information about Cordova, please refer:
[Cordova](http://cordova.apache.org)
and
[Cordova plugins](http://cordova.apache.org/docs/en/5.0.0/plugin_ref_plugman.md.html#Using%20Plugman%20to%20Manage%20Plugins)

Preparation
---

* Set up the host: the machine where you will be developing the application.

  [Windows host](https://crosswalk-project.org/documentation/android/windows_host_setup.html)

  [Linux host](https://crosswalk-project.org/documentation/android/linux_host_setup.html)

  Note that it may be possible to develop for Crosswalk on other platforms, but only Windows and Linux are officially supported.

* Install [Node.js](http://nodejs.org/download/)
* Install plugman: npm install -g plugman

Run the Cocos2dTest:
---
```
./bin/create Cocos2dTest com.test.Cocos2dTest Cocos2dTest
cd Cocos2dTest
```
Replace files ```Cocos2dTest/assets/www/*``` with ```Cocos2dTest-src/*```
```
./cordova build
```
Install ```out/Cocos2dTest-debug.apk``` on your device and run.

Create your new Cocos2d project:
---
```
./bin/create [path package activity]
e.g.
./bin/create Test com.my.test Test
```
Write your game under ```Test/assets/www```

How to use cordova plugin:
---
Example for cordova dialog plugin:

*1. Search the cordova dialog plugin:*
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
*2. Modify `index.html`:*
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
When user click back button, there will be a dialog prompted.

How to integrate your game with cocos2d-cordova-crosswalk:
---
1. Create a new project with this tool
2. On ```assets/www/cocos2d.js```:
   Add your game source path in ```appFiles:[]```
3. ```assets/www/main.js``` is the entry of the game.
   Change ```var myApp = new cocos2dApp(MyScene);``` MyScene with your cocos2d scene.
4. ```assets/www/engine``` folder contains Cocos2d-html5 engine, do not modify this folder.

A Real use case on Google play:
---
[CosmicCrash](https://play.google.com/store/apps/details?id=org.cocos.CosmicCrash.googleplay)

How to build your own optimized xwalk_core_library
---
Please refer below link:
[Build xwalk_core_library](https://github.com/crosswalk-project/cocos2d-cordova-crosswalk/blob/master/How%20to%20build%20optimized%20xwalk_core_library.md)
