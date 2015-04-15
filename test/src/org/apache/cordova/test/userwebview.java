/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package org.apache.cordova.test;

import android.os.Bundle;
//import android.webkit.WebView;
import org.xwalk.core.XWalkView;

import org.apache.cordova.*;

public class userwebview extends MainTestActivity {
    
    public TestViewClient testViewClient;
    public TestChromeClient testChromeClient;
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        testViewClient = new TestViewClient(this, appView);
        testChromeClient = new TestChromeClient(this, appView);
        super.init();
        appView.setWebViewClient(testViewClient);
        appView.setWebChromeClient(testChromeClient);
        super.loadUrl("file:///android_asset/www/userwebview/index.html");
    }

    public class TestChromeClient extends CordovaChromeClient {
        public TestChromeClient(CordovaInterface ctx, CordovaWebView app) {
            super(ctx, app);
            LOG.d("userwebview", "TestChromeClient()");
        }

        // TODO(gaochun): Implement onGeolocationPermissionsShowPrompt() in CordovaChromeClient
        // and add the test here.
    }

    /**
     * This class can be used to override the GapViewClient and receive notification of webview events.
     */
    public class TestViewClient extends CordovaWebViewClient {
        public TestViewClient(CordovaInterface ctx, CordovaWebView app) {
            super(ctx, app);
            LOG.d("userwebview", "TestViewClient()");
        }

        // TODO(gaochun): Implement shouldOverrideUrlLoading() onReceivedError()
        // in CordovaWebViewClient and add the related tests here.
    }

}
