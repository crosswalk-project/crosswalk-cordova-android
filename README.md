<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->
Crosswalk-based Cordova Android
===

Crosswalk-based Cordova Android is derived from [Cordova Android](https://github.com/apache/cordova-android) 
and uses [Crosswalk](https://github.com/crosswalk-project/crosswalk) as the 
HTML5 runtime. It is an Android application library that allows for Cordova-based
projects to be built for the Android Platform. Cordova based applications are,
at the core, applications written with web technology: HTML, CSS and JavaScript.

[Apache Cordova](http://cordova.io) is a project of The Apache Software Foundation (ASF).


Requires
---

- Java JDK 1.5 or greater
- Apache Ant 1.8.0 or greater
- Android SDK [http://developer.android.com](http://developer.android.com)
- Python 2.6 or greater

Setup Crosswalk Dependency
---

1. Please download the crosswalk-webview for Android package from [Crosswalk download site](https://download.01.org/crosswalk/releases/crosswalk/android/).
2. Unzip the crosswalk-webview package to a folder and create a link named `xwalk_core_library` under `framework` linking to that folder.

For example, on Linux:

    $cd /path/to/crosswalk-cordova-android/framework
    $ln -s /path/to/crosswalk-webview-unzipped-folder/ xwalk_core_library


Cordova Android Developer Tools
---

The Cordova developer tooling is split between general tooling and project level tooling.

General Commands

    ./bin/create [path package activity] ... creates the ./example app or a cordova android project
    ./bin/check_reqs ....................... checks that your environment is set up for cordova-android development
    ./bin/update [path] .................... updates an existing cordova-android project to the version of the framework

Project Commands

These commands live in a generated Cordova Android project. Any interactions with the emulator require you to have an AVD defined.

    ./cordova/clean ........................ cleans the project
    ./cordova/build ........................ calls `clean` then compiles the project
    ./cordova/log   ........................ streams device or emulator logs to STDOUT
    ./cordova/run   ........................ calls `build` then deploys to a connected Android device. If no Android device is detected, will launch an emulator and deploy to it.
    ./cordova/version ...................... returns the cordova-android version of the current project

Importing a Crosswalk-based Cordova Android Project into Eclipse
----

1. Import Crosswalk-based Cordova Android and XWalkCoreLibrary library projects by File > Import... > Existing Android Code Into Workspace. Point to `[path_to_cordova_xwalk_android]/framework` and click  `Finish`.
2. Build `xwalk_core_library` and `Cordova` projects.
3. Import generated project by File > Import... > Existing Android Code. Point to the generated app path.
4. Right click on the project root: Run as > Run Configurations
5. Click on the Target tab and select Manual (this way you can choose the emulator or device to build to)

Running Tests
----
Please see details under test/README.md.

Further Reading
----

- [http://developer.android.com](http://developer.android.com)
- [http://cordova.apache.org/](http://cordova.apache.org)
- [http://wiki.apache.org/cordova/](http://wiki.apache.org/cordova/)
