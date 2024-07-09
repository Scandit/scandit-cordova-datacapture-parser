/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.parser

import android.Manifest
import com.scandit.datacapture.cordova.core.ScanditCaptureCore
import com.scandit.datacapture.cordova.core.communication.CameraPermissionGrantedListener
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.core.handlers.ActionsHandler
import com.scandit.datacapture.cordova.core.handlers.CameraPermissionsActionsHandlerHelper
import com.scandit.datacapture.cordova.parser.factories.ParserActionFactory
import com.scandit.datacapture.frameworks.parser.ParserModule
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray

class ScanditParser : CordovaPlugin(), CameraPermissionGrantedListener {

    private val parserModule = ParserModule()
    private val actionFactory: ActionFactory = ParserActionFactory(parserModule)
    private val actionsHandler: ActionsHandler = ActionsHandler(
        actionFactory, CameraPermissionsActionsHandlerHelper(actionFactory)
    )

    override fun pluginInitialize() {
        super.pluginInitialize()
        ScanditCaptureCore.addPlugin(serviceName)
        parserModule.onCreate(cordova.context)

        if (cordova.hasPermission(Manifest.permission.CAMERA)) {
            onCameraPermissionGranted()
        }
    }

    override fun onReset() {
        parserModule.onDestroy()
        pluginInitialize()
    }

    override fun onDestroy() {
        parserModule.onDestroy()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return try {
            actionsHandler.addAction(action, args, callbackContext)
        } catch (e: InvalidActionNameError) {
            println(e)
            false
        } catch (e: Exception) {
            println(e)
            true
        }
    }

    override fun onCameraPermissionGranted() {
        actionsHandler.onCameraPermissionGranted()
    }
}
