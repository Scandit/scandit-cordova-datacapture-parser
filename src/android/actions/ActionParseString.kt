/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.parser.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.frameworks.parser.ParserModule
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionParseString(
    private val parserModule: ParserModule
) : Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext) {
        parserModule.parseString(
            args.getJSONObject(0).toString(),
            CordovaResult(callbackContext)
        )
    }
}
