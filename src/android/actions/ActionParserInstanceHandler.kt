/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.parser.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.frameworks.parser.ParserModule
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionParserInstanceHandler(
    private val parserModule: ParserModule,
    private val actionName: String
) : Action {
    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        if (actionName == ACTION_DISPOSE_INSTANCE) {
            parserModule.disposeParser(
                args.getString(0),
                CordovaResult(callbackContext)
            )
            return
        }

        parserModule.createOrUpdateParser(
            args.getString(0),
            CordovaResult(callbackContext)
        )
    }

    companion object {
        const val ACTION_CREATE_UPDATE_INSTANCE = "createUpdateNativeInstance"
        const val ACTION_DISPOSE_INSTANCE = "disposeParser"
    }
}
