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

import org.apache.cordova.CordovaInterface;
//import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;

//import android.annotation.TargetApi;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.webkit.ValueCallback;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;

import org.xwalk.core.XWalkJavascriptResult;
import org.xwalk.core.XWalkUIClient;
import org.xwalk.core.XWalkView;
// FIXME(wang16): Remove internal dependency of crosswalk.
import org.xwalk.core.internal.XWalkWebChromeClient;
/**
 * This class is the WebChromeClient that implements callbacks for our web view.
 * The kind of callbacks that happen here are on the chrome outside the document,
 * such as onCreateWindow(), onConsoleMessage(), onProgressChanged(), etc. Related
 * to but different than CordovaWebViewClient.
 *
 * @see <a href="http://developer.android.com/reference/android/webkit/WebChromeClient.html">WebChromeClient</a>
 * @see <a href="http://developer.android.com/guide/webapps/webview.html">WebView guide</a>
 * @see CordovaWebViewClient
 * @see CordovaWebView
 */
public class CordovaChromeClient extends XWalkUIClient {

    public static final int FILECHOOSER_RESULTCODE = 5173;
    protected CordovaInterface cordova;
    protected CordovaWebView appView;

    // File Chooser
    public ValueCallback<Uri> mUploadMessage;
    
    /**
     * Constructor.
     *
     * @param cordova
     */
    public CordovaChromeClient(CordovaInterface cordova) {
        super(null);
        this.cordova = cordova;
    }

    /**
     * Constructor.
     * 
     * @param ctx
     * @param app
     */
    public CordovaChromeClient(CordovaInterface ctx, CordovaWebView app) {
        super(app);
        this.cordova = ctx;
        this.appView = app;
        this.appView.setXWalkWebChromeClient(new CordovaWebChromeClient(ctx.getActivity(), app));
    }

    /**
     * Constructor.
     * 
     * @param view
     */
    public void setWebView(CordovaWebView view) {
        this.appView = view;
    }

    @Override
    public boolean onJavascriptModalDialog(XWalkView view, JavascriptMessageType type, String url,
            String message, String defaultValue, XWalkJavascriptResult result) {
        switch(type) {
            case JAVASCRIPT_ALERT:
                return onJsAlert(view, url, message, result);
            case JAVASCRIPT_CONFIRM:
                return onJsConfirm(view, url, message, result);
            case JAVASCRIPT_PROMPT:
                return onJsPrompt(view, url, message, defaultValue, result);
            case JAVASCRIPT_BEFOREUNLOAD:
                // Reuse onJsConfirm to show the dialog.
                return onJsConfirm(view, url, message, result);
            default:
                break;
        }
        assert(false);
        return false;
    }

    /**
     * Tell the client to display a javascript alert dialog.
     *
     * @param view
     * @param url
     * @param message
     * @param result
     */
    private boolean onJsAlert(XWalkView view, String url, String message,
            final XWalkJavascriptResult result) {
        AlertDialog.Builder dlg = new AlertDialog.Builder(this.cordova.getActivity());
        dlg.setMessage(message);
        dlg.setTitle("Alert");
        //Don't let alerts break the back button
        dlg.setCancelable(true);
        dlg.setPositiveButton(android.R.string.ok,
                new AlertDialog.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        result.confirm();
                    }
                });
        dlg.setOnCancelListener(
                new DialogInterface.OnCancelListener() {
                    public void onCancel(DialogInterface dialog) {
                        result.cancel();
                    }
                });
        dlg.setOnKeyListener(new DialogInterface.OnKeyListener() {
            //DO NOTHING
            public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK)
                {
                    result.confirm();
                    return false;
                }
                else
                    return true;
            }
        });
        dlg.show();
        return true;
    }

    /**
     * Tell the client to display a confirm dialog to the user.
     *
     * @param view
     * @param url
     * @param message
     * @param result
     */
    private boolean onJsConfirm(XWalkView view, String url, String message,
            final XWalkJavascriptResult result) {
        AlertDialog.Builder dlg = new AlertDialog.Builder(this.cordova.getActivity());
        dlg.setMessage(message);
        dlg.setTitle("Confirm");
        dlg.setCancelable(true);
        dlg.setPositiveButton(android.R.string.ok,
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        result.confirm();
                    }
                });
        dlg.setNegativeButton(android.R.string.cancel,
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        result.cancel();
                    }
                });
        dlg.setOnCancelListener(
                new DialogInterface.OnCancelListener() {
                    public void onCancel(DialogInterface dialog) {
                        result.cancel();
                    }
                });
        dlg.setOnKeyListener(new DialogInterface.OnKeyListener() {
            //DO NOTHING
            public boolean onKey(DialogInterface dialog, int keyCode, KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK)
                {
                    result.cancel();
                    return false;
                }
                else
                    return true;
            }
        });
        dlg.show();
        return true;
    }

    /**
     * Tell the client to display a prompt dialog to the user.
     * If the client returns true, WebView will assume that the client will
     * handle the prompt dialog and call the appropriate JsPromptResult method.
     *
     * Since we are hacking prompts for our own purposes, we should not be using them for
     * this purpose, perhaps we should hack console.log to do this instead!
     *
     * @param view
     * @param url
     * @param message
     * @param defaultValue
     * @param result
     */
    private boolean onJsPrompt(XWalkView view, String url, String message, String defaultValue,
            XWalkJavascriptResult result) {

        // Security check to make sure any requests are coming from the page initially
        // loaded in webview and not another loaded in an iframe.
        boolean reqOk = false;
        if (url.startsWith("file://") || Config.isUrlWhiteListed(url)) {
            reqOk = true;
        }

        // Calling PluginManager.exec() to call a native service using 
        // prompt(this.stringify(args), "gap:"+this.stringify([service, action, callbackId, true]));
        if (reqOk && defaultValue != null && defaultValue.length() > 3 && defaultValue.substring(0, 4).equals("gap:")) {
            JSONArray array;
            try {
                array = new JSONArray(defaultValue.substring(4));
                String service = array.getString(0);
                String action = array.getString(1);
                String callbackId = array.getString(2);
                String r = this.appView.exposedJsApi.exec(service, action, callbackId, message);
                result.confirmWithResult(r == null ? "" : r);
            } catch (JSONException e) {
                e.printStackTrace();
                return false;
            }
        }

        // Sets the native->JS bridge mode. 
        else if (reqOk && defaultValue != null && defaultValue.equals("gap_bridge_mode:")) {
        	try {
                this.appView.exposedJsApi.setNativeToJsBridgeMode(Integer.parseInt(message));
                result.confirmWithResult("");
        	} catch (NumberFormatException e){
                result.confirmWithResult("");
                e.printStackTrace();
        	}
        }

        // Polling for JavaScript messages 
        else if (reqOk && defaultValue != null && defaultValue.equals("gap_poll:")) {
            String r = this.appView.exposedJsApi.retrieveJsMessages("1".equals(message));
            result.confirmWithResult(r == null ? "" : r);
        }

        // Do NO-OP so older code doesn't display dialog
        else if (defaultValue != null && defaultValue.equals("gap_init:")) {
            result.confirmWithResult("OK");
        }

        // Show dialog
        else {
            final XWalkJavascriptResult res = result;
            AlertDialog.Builder dlg = new AlertDialog.Builder(this.cordova.getActivity());
            dlg.setMessage(message);
            final EditText input = new EditText(this.cordova.getActivity());
            if (defaultValue != null) {
                input.setText(defaultValue);
            }
            dlg.setView(input);
            dlg.setCancelable(false);
            dlg.setPositiveButton(android.R.string.ok,
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            String usertext = input.getText().toString();
                            res.confirmWithResult(usertext);
                        }
                    });
            dlg.setNegativeButton(android.R.string.cancel,
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            res.cancel();
                        }
                    });
            dlg.show();
        }
        return true;
    }

    // TODO(yongsheng): remove the dependency of Crosswalk internal class?
    class CordovaWebChromeClient extends XWalkWebChromeClient {
    // Don't add extra indents for keeping them with upstream to avoid
    // merge conflicts.
    private View mVideoProgressView;

    private CordovaWebView appView;

    CordovaWebChromeClient(Context context, CordovaWebView view) {
        super(view);
        appView = view;
    }

    @Override
    /**
     * Ask the host application for a custom progress view to show while
     * a <video> is loading.
     * @return View The progress view.
     */
    public View getVideoLoadingProgressView() {

	    if (mVideoProgressView == null) {	        
	    	// Create a new Loading view programmatically.
	    	
	    	// create the linear layout
	    	LinearLayout layout = new LinearLayout(this.appView.getContext());
	        layout.setOrientation(LinearLayout.VERTICAL);
	        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
	        layoutParams.addRule(RelativeLayout.CENTER_IN_PARENT);
	        layout.setLayoutParams(layoutParams);
	        // the proress bar
	        ProgressBar bar = new ProgressBar(this.appView.getContext());
	        LinearLayout.LayoutParams barLayoutParams = new LinearLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
	        barLayoutParams.gravity = Gravity.CENTER;
	        bar.setLayoutParams(barLayoutParams);   
	        layout.addView(bar);
	        
	        mVideoProgressView = layout;
	    }
    return mVideoProgressView; 
    }
    }
    
    @Override
    public void openFileChooser(XWalkView view, ValueCallback<Uri> uploadMsg, String acceptType,
            String capture) {
        this.openFileChooser(uploadMsg, "*/*");
    }

    public void openFileChooser( ValueCallback<Uri> uploadMsg, String acceptType ) {
        this.openFileChooser(uploadMsg, acceptType, null);
    }
    
    public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture)
    {
        mUploadMessage = uploadMsg;
        Intent i = new Intent(Intent.ACTION_GET_CONTENT);
        i.addCategory(Intent.CATEGORY_OPENABLE);
        i.setType("*/*");
        this.cordova.getActivity().startActivityForResult(Intent.createChooser(i, "File Browser"),
                FILECHOOSER_RESULTCODE);
    }
    
    public ValueCallback<Uri> getValueCallback() {
        return this.mUploadMessage;
    }
}
