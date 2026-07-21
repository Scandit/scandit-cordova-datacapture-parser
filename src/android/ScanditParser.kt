/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.parser

import com.scandit.datacapture.cordova.core.ScanditCaptureCore
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.cordova.core.utils.CordovaMethodCall
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.frameworks.core.CoreModule
import com.scandit.datacapture.frameworks.core.locator.DefaultServiceLocator
import com.scandit.datacapture.frameworks.parser.ParserModule
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray

class ScanditParser : CordovaPlugin() {

    private val emitter = CordovaEventEmitter()

    private val parserModule = ParserModule()

    private val serviceLocator = DefaultServiceLocator.getInstance()

    override fun pluginInitialize() {
        super.pluginInitialize()
        ScanditCaptureCore.addPlugin(serviceName)
        parserModule.onCreate(cordova.context)
    }

    override fun onReset() {
        parserModule.onDestroy()
        pluginInitialize()
    }

    override fun onDestroy() {
        parserModule.onDestroy()
        super.onDestroy()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return if (action == "executeParser") {
            executeParser(args, callbackContext)
            true
        } else {
            false
        }
    }

    fun executeParser(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val coreModule = serviceLocator.resolve(
            CoreModule::class.java.simpleName
        ) as? CoreModule ?: return run {
            callbackContext.error("Unable to retrieve the CoreModule from the locator.")
        }

        val result = coreModule.execute(
            CordovaMethodCall(args),
            CordovaResult(callbackContext, emitter),
            parserModule
        )

        if (!result) {
            val methodName = argsJson.getString("methodName") ?: "unknown"
            callbackContext.error("Unknown method: $methodName")
        }
    }
}
