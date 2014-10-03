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
package org.apache.cordova;

import java.io.ByteArrayInputStream;
import java.util.Hashtable;

import org.apache.cordova.CordovaInterface;

import org.apache.cordova.LOG;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.graphics.Bitmap;
import android.net.Uri;
import android.net.http.SslError;
import android.util.Log;
import android.view.View;
//import android.webkit.HttpAuthHandler;
//import android.webkit.SslErrorHandler;
import android.webkit.ValueCallback;
import android.webkit.WebResourceResponse;
//import android.webkit.WebView;
//import android.webkit.WebViewClient;
import org.chromium.net.NetError;
import org.xwalk.core.XWalkNavigationHistory;
import org.xwalk.core.XWalkResourceClient;
import org.xwalk.core.XWalkView;

/**
 * This class is the XWalkResourceClient that implements callbacks for our web view.
 * The kind of callbacks that happen here are regarding the rendering of the
 * document instead of the chrome surrounding it, such as onPageStarted(), 
 * shouldOverrideUrlLoading(), etc. Related to but different than
 * CordovaChromeClient.
 *
 * @see <a href="http://developer.android.com/reference/android/webkit/WebViewClient.html">WebViewClient</a>
 * @see <a href="http://developer.android.com/guide/webapps/webview.html">WebView guide</a>
 * @see CordovaChromeClient
 * @see CordovaWebView
 */
public class CordovaWebViewClient extends XWalkResourceClient {

	private static final String TAG = "CordovaWebViewClient";
	private static final String CORDOVA_EXEC_URL_PREFIX = "http://cdv_exec/";
    CordovaInterface cordova;
    CordovaWebView appView;

    // Success
    public static final int ERROR_OK = 0;
    // Generic error
    public static final int ERROR_UNKNOWN = -1;
    // Server or proxy hostname lookup failed
    public static final int ERROR_HOST_LOOKUP = -2;
    // Unsupported authentication scheme (not basic or digest)
    public static final int ERROR_UNSUPPORTED_AUTH_SCHEME = -3;
    // User authentication failed on server
    public static final int ERROR_AUTHENTICATION = -4;
    // User authentication failed on proxy
    public static final int ERROR_PROXY_AUTHENTICATION = -5;
    // Failed to connect to the server
    public static final int ERROR_CONNECT = -6;
    // Failed to read or write to the server
    public static final int ERROR_IO = -7;
    // Connection timed out
    public static final int ERROR_TIMEOUT = -8;
    // Too many redirects
    public static final int ERROR_REDIRECT_LOOP = -9;
    // Unsupported URI scheme
    public static final int ERROR_UNSUPPORTED_SCHEME = -10;
    // Failed to perform SSL handshake
    public static final int ERROR_FAILED_SSL_HANDSHAKE = -11;
    // Malformed URL
    public static final int ERROR_BAD_URL = -12;
    // Generic file error
    public static final int ERROR_FILE = -13;
    // File not found
    public static final int ERROR_FILE_NOT_FOUND = -14;
    // Too many requests during this load
    public static final int ERROR_TOO_MANY_REQUESTS = -15;

    CordovaUriHelper helper;

    /** The authorization tokens. */
    private Hashtable<String, AuthenticationToken> authenticationTokens = new Hashtable<String, AuthenticationToken>();

    /**
     * Constructor.
     *
     * @param cordova
     */
    public CordovaWebViewClient(CordovaInterface cordova) {
        super(null);
        this.cordova = cordova;
    }

    /**
     * Constructor.
     *
     * @param cordova
     * @param view
     */
    public CordovaWebViewClient(CordovaInterface cordova, CordovaWebView view) {
        super(view);
        this.cordova = cordova;
        this.appView = view;
        helper = new CordovaUriHelper(cordova, view);
    }

    /**
     * Constructor.
     *
     * @param view
     */
    public void setWebView(CordovaWebView view) {
        this.appView = view;
        helper = new CordovaUriHelper(cordova, view);
    }


    // Parses commands sent by setting the webView's URL to:
    // cdvbrg:service/action/callbackId#jsonArgs
	private void handleExecUrl(String url) {
		int idx1 = CORDOVA_EXEC_URL_PREFIX.length();
		int idx2 = url.indexOf('#', idx1 + 1);
		int idx3 = url.indexOf('#', idx2 + 1);
		int idx4 = url.indexOf('#', idx3 + 1);
		if (idx1 == -1 || idx2 == -1 || idx3 == -1 || idx4 == -1) {
			Log.e(TAG, "Could not decode URL command: " + url);
			return;
		}
		String service    = url.substring(idx1, idx2);
		String action     = url.substring(idx2 + 1, idx3);
		String callbackId = url.substring(idx3 + 1, idx4);
		String jsonArgs   = url.substring(idx4 + 1);
        appView.pluginManager.exec(service, action, callbackId, jsonArgs);
	}

     /**
     * Report an error to the host application. These errors are unrecoverable (i.e. the main resource is unavailable).
     * The errorCode parameter corresponds to one of the ERROR_* constants.
     *
     * @param view          The WebView that is initiating the callback.
     * @param errorCode     The error code corresponding to an ERROR_* value.
     * @param description   A String describing the error.
     * @param failingUrl    The url that failed to load.
     */
    @Override
    public void onReceivedLoadError(XWalkView view, int errorCode, String description,
            String failingUrl) {
        LOG.d(TAG, "CordovaWebViewClient.onReceivedError: Error code=%s Description=%s URL=%s", errorCode, description, failingUrl);

        // Clear timeout flag
        this.appView.loadUrlTimeout++;

        // If this is a "Protocol Not Supported" error, then revert to the previous
        // page. If there was no previous page, then punt. The application's config
        // is likely incorrect (start page set to sms: or something like that)
        if (errorCode == XWalkResourceClient.ERROR_UNSUPPORTED_SCHEME) {
            if (view.getNavigationHistory().canGoBack()) {
                view.getNavigationHistory().navigate(
                    XWalkNavigationHistory.Direction.BACKWARD, 1);
                return;
            } else {
                super.onReceivedLoadError(view, errorCode, description, failingUrl);
            }
        }

        // Handle other errors by passing them to the webview in JS
        JSONObject data = new JSONObject();
        try {
            data.put("errorCode", errorCode);
            data.put("description", description);
            data.put("url", failingUrl);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        this.appView.postMessage("onReceivedError", data);
    }
    
    @Override
    public boolean shouldOverrideUrlLoading(XWalkView view, String url) {
        return helper.shouldOverrideUrlLoading(view, url);
    }
    
    /**
     * Sets the authentication token.
     *
     * @param authenticationToken
     * @param host
     * @param realm
     */
    public void setAuthenticationToken(AuthenticationToken authenticationToken, String host, String realm) {
        if (host == null) {
            host = "";
        }
        if (realm == null) {
            realm = "";
        }
        this.authenticationTokens.put(host.concat(realm), authenticationToken);
    }

    /**
     * Removes the authentication token.
     *
     * @param host
     * @param realm
     *
     * @return the authentication token or null if did not exist
     */
    public AuthenticationToken removeAuthenticationToken(String host, String realm) {
        return this.authenticationTokens.remove(host.concat(realm));
    }

    /**
     * Gets the authentication token.
     *
     * In order it tries:
     * 1- host + realm
     * 2- host
     * 3- realm
     * 4- no host, no realm
     *
     * @param host
     * @param realm
     *
     * @return the authentication token
     */
    public AuthenticationToken getAuthenticationToken(String host, String realm) {
        AuthenticationToken token = null;
        token = this.authenticationTokens.get(host.concat(realm));

        if (token == null) {
            // try with just the host
            token = this.authenticationTokens.get(host);

            // Try the realm
            if (token == null) {
                token = this.authenticationTokens.get(realm);
            }

            // if no host found, just query for default
            if (token == null) {
                token = this.authenticationTokens.get("");
            }
        }

        return token;
    }

    /**
     * Clear all authentication tokens.
     */
    public void clearAuthenticationTokens() {
        this.authenticationTokens.clear();
    }

}
